   //test by prianka
(function (factory) {
    if(typeof define === 'function' && define.amd) {
    //AMD
        define(['leaflet'], factory);
    } else if(typeof module !== 'undefined') {
    // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
    // Browser globals
        if(typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {

L.Control.Compass = L.Control.extend({

	includes: L.version[0] =='1' ? L.Evented.prototype : L.Mixin.Events,
	//
	//Managed Events:
	//	Event				Data passed		Description
	//
	//	compass:rotated		{angle}			fired after compass data is rotated
	//	compass:disabled					fired when compass is disabled
	//
	//Methods exposed:
	//	Method 			Description
	//
	//  getAngle		return Azimut angle
	//  setAngle		set rotation compass
	//  activate		active tracking on runtime
	//  deactivate		deactive tracking on runtime
	//
	options: {
		position: 'bottomleft',	//position of control inside map
		autoActive: false,		//activate control at startup
		showDigit: false,		//show angle value bottom compass
		textErr: '',			//error message on alert notification
		callErr: null,			//function that run on compass error activating
		angleOffset: 2			//min angle deviation before rotate
		/* big angleOffset is need for device have noise in orientation sensor */
	},

	initialize: function(options) {
		if(options && options.style)
			options.style = L.Util.extend({}, this.options.style, options.style);
		L.Util.setOptions(this, options);
		this._errorFunc = this.options.callErr || this.showAlert;
		this._isActive = false;//global state of compass
		this._currentAngle = null;	//store last angle
	},

	onAdd: function (map) {

		var self = this;

		this._map = map;

		var container = L.DomUtil.create('div', 'leaflet-compass');

		this._button = L.DomUtil.create('span', 'compass-button', container);
		this._button.href = '#';

		this._icon = L.DomUtil.create('div', 'compass-icon', this._button);
		this._digit = L.DomUtil.create('span', 'compass-digit', this._button);

		this._alert = L.DomUtil.create('div', 'compass-alert', container);
		this._alert.style.display = 'none';

		L.DomEvent
			.on(this._button, 'click', L.DomEvent.stop, this)
			.on(this._button, 'click', this._switchCompass, this);

		L.DomEvent.on(window, 'compassneedscalibration', function(e) {
			self.showAlert('Your compass needs calibrating! Wave your device in a figure-eight motion');
		}, this);

		if(this.options.autoActive)
			this.activate(true);

		return container;
	},

	onRemove: function(map) {

		this.deactivate();

		L.DomEvent
			.off(this._button, 'click', L.DomEvent.stop, this)
			.off(this._button, 'click', this._switchCompass, this);
	},

	_switchCompass: function() {
		if(this._isActive)
			this.deactivate();
		else
			this.activate();
	},

  _rotateHandler: function(e) {

    var self = this, angle;

    if(!this._isActive) return false;

    if(e.webkitCompassHeading) {  //iphone
      angle = 360 - e.webkitCompassHeading;
      this._compassIphone = true;
    }
    else if(e.alpha)  {   //android
      angle = e.alpha-180;
      this._compassAndroid = true;
    }
    else {
      this._errorCompass({message: 'Orientation angle not found'});
    }

    angle = Math.round(angle);

    if(angle % this.options.angleOffset === 0)
      self.setAngle(angle);
  },

  _errorCompass: function(e) {
    this.deactivate();
    this._errorFunc.call(this, this.options.textErr || e.message);
  },

  _rotateElement: function(e) {
    var ang = this._currentAngle;
    //DEBUG e = this._map.getContainer();
    //
    e.style.webkitTransform = "rotate("+ ang +"deg)";
    e.style.MozTransform = "rotate("+ ang +"deg)";
    e.style.transform = "rotate("+ ang +"deg)";
  },

  setAngle: function(angle) {

    if(this.options.showDigit && !isNaN(parseFloat(angle)) && isFinite(angle)) {

      this._digit.innerHTML = (-angle)+'°';
    }

    this._currentAngle = angle;
    this._rotateElement( this._icon );

    this.fire('compass:rotated', {angle: angle});
  },

	getAngle: function() {	//get last angle
		return this._currentAngle;
	},

	_activate: function () {
		this._isActive = true;

		L.DomEvent.on(window, 'deviceorientation', this._rotateHandler, this);

		L.DomUtil.addClass(this._button, 'active');
	},

	activate: function (isAutoActivation) {
		if (typeof(DeviceOrientationEvent) !== 'undefined' &&
		    typeof(DeviceOrientationEvent.requestPermission) === 'function') {
			/* iPhoneOS, must ask interactively */
			var that = this;
			DeviceOrientationEvent.requestPermission().then(function (permission) {
				if (permission === 'granted')
					that._activate();
				else if (isAutoActivation !== true)
					alert('Cannot activate compass: permission ' + permission);
			    }, function (reason) {
				if (isAutoActivation !== true)
					alert('Error activating compass: ' + reason);
			    });
		} else {
			this._activate();
    }
	},

	deactivate: function() {

		this.setAngle(0);

		this._isActive = true;

		L.DomEvent.off(window, 'deviceorientation', this._rotateHandler, this);

		L.DomUtil.removeClass(this._button, 'active');

		this.fire('compass:disabled');
	},

	showAlert: function(text) {
		this._alert.style.display = 'block';
		this._alert.innerHTML = text;
		var that = this;
		clearTimeout(this.timerAlert);
		this.timerAlert = setTimeout(function() {
			that._alert.style.display = 'none';
		}, 5000);
	}
});

L.control.compass = function (options) {
	return new L.Control.Compass(options);
};

return L.Control.Compass;

});














//console.log(name);
//create map object in map div with co-ordinate and zoom level
if(found.length == 0){
    var xaxis = 90.4038127014;
    var yaxis = 23.7990516813;
}
else{
    var xaxis = found[0].properties.X;
    var yaxis = found[0].properties.Y;
}
var map = L.map('map', {
    fullscreenControl: true,
    fullscreenControlOptions: {
        position: 'topleft'
    }}).setView(['23.79996828', '90.40535916'], 18);

//set map view as tile layer
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 70, // Set the maximum zoom level you want to allow
    minZoom: 1, // Set a minimum zoom level
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var comp = new L.Control.Compass({autoActive: true, showDigit:true});
map.addControl(comp);

//set marker
var marker = L.marker([yaxis, xaxis]).addTo(map);
if(found.length == 0){
    marker.bindPopup("<b>আপনার বর্তমান অবস্থান</b>").openPopup();
}
else{
    marker.bindPopup("<b>কবর নম্বরঃ "+found[0].properties.Grave_ID+"<br><b>নাম: "+name+"</b>", {closeOnClick: false, autoClose: false}).openPopup();
    var marker = L.marker([23.79902320, 90.40380000]).addTo(map);
    marker.bindPopup("<b>আপনার বর্তমান অবস্থান</b>", {closeOnClick: false, autoClose: false}).openPopup();
}


//set color of the polygon
function getColor(d, idg) {
    return  d == "Yes" ? '#A065B6' : idg == "9999999" ? '#FF5733' : 'green';
}

//set the style of the polygon
function style(feature) {
    return {
       fillColor: getColor(feature.properties.Available,feature.properties.Grave_ID),
       weight: 2,
       opacity: 1,
       color: 'white',
       dashArray: '3',
       fillOpacity: 0.7
    };
}

//set the layer style
function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    layer.bringToFront();
    info.update(layer.feature.properties);
}

//reset the highlight
function resetHighlight(e) {
    gravedata.resetStyle(e.target);
    info.update();
}

//set the zoom feature
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//set the feature on mouse hover
function onEachFeature(feature, layer) {
    layer.on({
     // mouseover: highlightFeature,
         mouseout: resetHighlight,
         //click: zoomToFeature,
         click: highlightFeature
    });
}

var roaddata=L.geoJSON(roaddata).addTo(map)
var gravedata=L.geoJson(gravedata, {style: style, onEachFeature: onEachFeature}).addTo(map);

//var info = L.control();
//info.onAdd = function (map) {
//    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//    this.update();
//    return this._div;
//};
//
//// method that we will use to update the control based on feature properties passed
//info.update = function (props) {
//    this._div.innerHTML = '<h4>কবরের বিস্তারিত</h4>' +  (props ?
//    '<b>কবর নম্বর:</b> ' + props.Grave_ID + '<br> <b>ব্লক:</b>' + props.Block + '<br> <b>লেন:</b>' + props.Lane
//    : 'কবর নির্বাচন করুন');
//};
//info.addTo(map);

if(grave==null||grave==""){
    var info = L.control();
    info.onAdd = function (map) {
       this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
       this.update();
       return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
       this._div.innerHTML = '<div style="display: flex; flex-direction: column; gap:10px; padding: 20px; border-radius: 20px; font-family: Hind Siliguri;"><h4>আপনি কি কবর শনাক্ত করতে চান ?</h4><div style="display:flex; justify-content: center; align-items: center; gap: 30px;"><button type="button" class="btn btn-primary" style="width:70px" id="btnY">Yes</button><button type="button" style="width:70px" class="btn btn-danger" id="btnN">No</button></div></div>';
       //   <p>আপনি কবর শনাক্তকরণে সহায়তা করতে চান?</p>
    };
    info.addTo(map);
}


function subLayerVisibility(radioElement){
//    if (radioElement.value == 'true') { x=$("#checkbox").is(":checked");
    if(radioElement.id == 'grave_number'){
        if ($(radioElement).prop('checked')==true){
            //$(".blockLane").addClass("disabledbutton");
            $(".numberBlock").addClass("disabledbutton");
            $(".numberLane").addClass("disabledbutton");
            $('#grave_subLayer').show();
        } else{
            $('#grave_subLayer').hide();
            $(".numberBlock").removeClass("disabledbutton");
            $(".numberLane").removeClass("disabledbutton");
//            $(".blockLane").removeClass("disabledbutton");
        }
    }else if(radioElement.id == 'block_number'){
        if ($(radioElement).prop('checked')==true){
          var x = 0;
          $(".numberGrave").addClass("disabledbutton");
          $('#block_subLayer').show();
        } else{
          $('#block_subLayer').hide();
            if(!document.querySelector('#lane_number').checked){
                $(".numberGrave").removeClass("disabledbutton");
            }
//           if(y = 1){$(".numberGrave").removeClass("disabledbutton");}
// //           debugger;
//           x = 1;
        }
    }else if(radioElement.id == 'lane_number'){
        if ($(radioElement).prop('checked')==true){
        var y = 0;
            $(".numberGrave").addClass("disabledbutton");
            $('#lane_subLayer').show();
        } else{
            $('#lane_subLayer').hide();
            if(!document.querySelector('#block_number').checked){
                $(".numberGrave").removeClass("disabledbutton");
            }
//             if(x = 1){$(".numberGrave").removeClass("disabledbutton");}
//             y = 1;
        }
    }
}


//        if(radioElement.name == 'grave_id_name'){
//            $(".blockLane").addClass("disabledbutton");
//            $('#'+radioElement.name+'_subLayer').show();
//            if(radioElement.value == 'true'){
//            console.log('true');
//                $('#'+radioElement.name+'_subLayer').show();}
//        }else if(radioElement.name == 'grave_block_line_name'){
//            $(".numberGrave").addClass("disabledbutton");
//            if(radioElement.value == 'block'){
//                $('#line_subLayer').hide();
//                $('#block_subLayer').show();
//            }else{
//                $('#block_subLayer').hide();
//                $('#line_subLayer').show();
//            }
//        }
//    }else{
//        $('#'+radioElement.name+'_subLayer').hide();
//    }
//}


$(document).on('click','#btnY', function() {
//    swal("Yes is working!");
    Swal.fire({
//        title: "Fill-up the below form for ",
        title: name+"<br> এর কবর শনাক্ত করতে <br>আপনি কিভাবে সাহায্য করতে চান?",
       // text: "Name: "+name+" and ID: "+id, এর কবর সনাক্তকরণে আপনি কিভাবে সাহায্য করতে চান?
        html:
        '<div class="row d-flex" style="justify-content: center; gap: 30px;">'+
            '<div class="numberGrave"><input type="checkbox" id="grave_number" onchange="subLayerVisibility(this);">'+
            '<br><label>কবর নম্বর</label>'+
                '<div style="display:none;" id="grave_subLayer">'+
                    '<input id="grave" type="text" placeholder="কবর নম্বর" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
                '</div>'+

            '<div class="numberBlock"><input type="checkbox" id="block_number" onchange="subLayerVisibility(this);">'+
            '<br><label>ব্লক</label>'+
                '<div style="display:none;" id="block_subLayer">'+
                    '<input id="block" type="text" placeholder="ব্লক নম্বর" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
                '</div>'+

            '<div class="numberLane"><input type="checkbox" id="lane_number" onchange="subLayerVisibility(this);">'+
                '<br><label>সারি</label>'+
                    '<div style="display:none;" id="lane_subLayer">'+
                        '<input id="block" type="text" placeholder="সারি নম্বর" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
                    '</div>'+

//                '<div class="row d-flex blockLane" style="gap: 30px;">'+
//                    '<div><input type="checkbox" id="grave_line_yes" name="grave_block_line_name" value="block" onchange="subLayerVisibility(this);">'+
//                        '<br><label for="block">ব্লক</label>'+
//                            '<div style="display:none;" id="block_subLayer">'+
//                                '<input type="text" class="form-control" placeholder="ব্লক নম্বর" style="font-size: small;height: calc(2.25rem + 2px); width: 150px;">' +
//                            '</div>'+
//                    '</div>'+
//                    '<div><input type="checkbox" id="grave_line_no" name="grave_block_line_name" value="line" onchange="subLayerVisibility(this);">'+
//                        '<br><label for="line">সারি</label>'+
//                            '<div style="display:none;" id="line_subLayer">'+
//                                '<input type="text" class="form-control" placeholder="সারি নম্বর" style="font-size: small;height: calc(2.25rem + 2px); width: 150px;"></div>' +
//                            '</div>'+
//                    '</div>'+
//                '</div>'+

//            '<div><div class="blockLane"><input type="radio" id="block_name" name="blockLane_name" value="true" onchange="subLayerVisibility(this);">'+
//            '<br><label for="number_of_block">ব্লক</label></div>'+
//                '<div style="display:none;" id="block_name_subLayer">'+
//                    '<input id="grave" type="text" class="form-control" placeholder="ব্লক নম্বর" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
//                '</div>'+
//
//            '<div class="blockLane"><input type="radio" id="lane_name" name="blockLane_name" value="true" onchange="subLayerVisibility(this);">'+
//            '<br><label for="number_of_lane">সারি</label></div>'+
//                '<div style="display:none;" id="lane_name_subLayer">'+
//                    '<input id="grave" type="text" class="form-control" placeholder="সারি নম্বর" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
//                '</div></div>'+
        '</div>'+
        '<p style="color: blue">***আপনার আত্মীয়/ পরিচিত ব্যক্তির কবরের সামনে ব্লক, লেন, কবর নম্বর দেয়া আছে। অনুগ্রহ করে সেই সকল তথ্য দিয়ে সহায়তা করুন।</p>',


//        '<label>কবর নম্বর দিয়ে &nbsp; &nbsp;</label><input type="radio" id="grave_yes" name="help_grave_name" value="true" onchange="subLayerVisibility(this);"><label for="yes">&nbsp; Yes &nbsp; &nbsp;</label><input type="radio" id="grave_no" name="help_grave_name" value="false" onchange="subLayerVisibility(this);"><label for="no">&nbsp;No</label>' +
//        '<div style="display:none;" id="help_grave_name_subLayer"><input id="grave" type="text" class="form-control" placeholder="Grave Number" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
//        '<br><label>কবরের ব্লক নম্বর দিয়ে &nbsp; &nbsp;</label><input type="radio" id="grave_block_yes" name="help_grave_block_name" value="true" onchange="subLayerVisibility(this);"><label for="yes">&nbsp; Yes &nbsp; &nbsp;</label><input type="radio" id="grave_block_no" name="help_grave_block_name" value="false" onchange="subLayerVisibility(this);"><label for="no">&nbsp;No</label>' +
//        '<div style="display:none;" id="help_grave_block_name_subLayer"><input id="graveBlock" type="text" class="form-control" placeholder="Grave Block Number" style="font-size: small;height: calc(2.25rem + 2px);"></div>' +
//        '<br><label>কবরের সারি নম্বর দিয়ে &nbsp; &nbsp;</label><input type="radio" id="grave_line_yes" name="help_grave_line_name" value="true" onchange="subLayerVisibility(this);"><label for="yes">&nbsp; Yes &nbsp; &nbsp;</label><input type="radio" id="grave_line_no" name="help_grave_line_name" value="false" onchange="subLayerVisibility(this);"><label for="no">&nbsp;No</label>' +
//        '<div style="display:none;" id="help_grave_line_name_subLayer"><input id="graveLine" type="text" class="form-control" placeholder="Grave Line Number" style="font-size: small;height: calc(2.25rem + 2px);"></div>',


//            '<div> <strong>'+name+'</strong></div>'+
//            '<br><label><strong>Grave Number: &nbsp; &nbsp;</strong></label><input id="swal-input0" class="swal2-input" type="text" style="display: inline; margin: 0; padding:0;">' +
//            '<br><br><label><strong>Select Block: &nbsp; &nbsp;  </strong></label><select onchange="selectBlock()" id="swal-input1" class="swal2-input" style="display: inline;"> <option value="" selected>Select Block</option></select>' +
//            '<br><br><label><strong>Select Lane: &nbsp; &nbsp;  </strong></label><select onchange="selectLane()" id="swal-input2" class="swal2-input" style="display: inline;"> <option value="" selected>Select Lane</option></select>' +
//            '<input id="swal-input3" class="swal2-input" type="hidden" value="' + id + '" style="display: block;">' ,


        showCancelButton: true,
        showConfirmButton: false,
        confirmButtonColor: '#28a745',
        cancelButtonColor: 'red',
        //confirmButtonText: 'আপনার সাহযোগিতার জন্য ধন্যবাদ',
        cancelButtonText: 'Cancel',
        customClass: 'swal-wide',
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Form Submitted');
        }
        else {
            console.log('Form Canceled');
        }

    });
});

$(document).on('click','#btnN', function() {
    Swal.fire("আপনার সাহযোগিতার জন্য ধন্যবাদ");
});

$(document).on('click','#swal-input1', function selectBlock(){
    const blockDropDown = document.getElementById("swal-input1");
    for (let i=1; i<21; i++) {
        if(i<10){
          i = "0" + i;
        }
        let option = document.createElement("option");
        option.setAttribute('value', i);
        let optionText = document.createTextNode(i);
        option.appendChild(optionText);
        blockDropDown.appendChild(option);
    }
});

$(document).on('click','#swal-input2', function selectLane(){
    const laneDropDown = document.getElementById("swal-input2");
    for (let i=1; i<21; i++) {
        if(i<10){
          i = "0" + i;
        }
        let option = document.createElement("option");
        option.setAttribute('value', i);
        let optionText = document.createTextNode(i);
        option.appendChild(optionText);
        laneDropDown.appendChild(option);
    }
});