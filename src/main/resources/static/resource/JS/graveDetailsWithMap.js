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
    }}).setView([yaxis, xaxis], 18);

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
function getColor(d) {
    return  d == "Yes" ? 'gray' : 'green';
}

//set the style of the polygon
function style(feature) {
    return {
       fillColor: getColor(feature.properties.Available),
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


var info = L.control();
info.onAdd = function (map) {
   this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
   this.update();
   return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
   this._div.innerHTML = '<div style="display: flex; flex-direction: column; gap:10px; padding: 20px; border-radius: 20px; font-family: Hind Siliguri;"><h4>কবর শনাক্তকরণ হয়নি</h4><p>আপনি কবর শনাক্তকরণে সহায়তা করতে চান?</p> <div style="display:flex; justify-content: center; align-items: center; gap: 30px;"><button type="button" class="btn btn-primary" style="width:70px" id="btnY">Yes</button><button type="button" style="width:70px" class="btn btn-danger" id="btnN">No</button></div></div>';
};
info.addTo(map);



$(document).on('click','#btnY', function() {
//    swal("Yes is working!");
    Swal.fire({
        title: "Fill-up the below form for "+name,
       // text: "Name: "+name+" and ID: "+id,
        html:
//            '<div>Duration of Session </div>'+
            '<label><strong>Grave Number: &nbsp; &nbsp;  </strong></label><input id="swal-input0" class="swal2-input" type="text" style="display: inline;">' +
            '<br><label><strong>Select Block: &nbsp; &nbsp;  </strong></label><select onchange="selectBlock()" id="swal-input1" class="swal2-input" style="display: inline;"> <option value="" selected>Select Block</option></select>' +
            '<br><br><label><strong>Select Lane: &nbsp; &nbsp;  </strong></label><select onchange="selectLane()" id="swal-input2" class="swal2-input" style="display: inline;"> <option value="" selected>Select Lane</option></select>' +
            '<input id="swal-input3" class="swal2-input" type="hidden" value="' + id + '" style="display: block;">' ,
//            '<input type="checkbox" id="Reffered" name="Reffered" value="Yes" >' + "Reffered",

        showCancelButton: true,
        confirmButtonColor: '#28a745',
        cancelButtonColor: '#d0cdcd',
        confirmButtonText: 'Complete',
        customClass: 'swal-wide',


    }).then((result) => {
        if (result.isConfirmed) {
            if (document.getElementById('Reffered').checked) {
                var p = "Yes"
            }
            else {
                var p="No"
            }

            var urlcomplete = '@Url.Action("CompleteTask", "Phycologist")';
            urlcomplete += '/?id=' + id + '&sdate=' + document.getElementById('swal-input1').value + '&edate=' + document.getElementById('swal-input2').value + '&Reffered=' + p
            window.location.href = urlcomplete;
        }
        else {

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