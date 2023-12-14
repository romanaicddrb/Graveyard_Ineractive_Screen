function GetGraveBycode(id){
        const features = gravedata.features;
        return features.filter(
            function(grave){
                return grave.properties.Grave_ID == id
            }
        );
    }

    var found = GetGraveBycode('[[${data.Grave_no}]]');
    console.log(found);

    //create map object in map div with co-orrdinate and zoom level

    if(found.length == 0){
        var xaxis = 90.4038127014;
        var yaxis = 23.7990516813;
    }
    else{
        var xaxis = found[0].properties.X;
        var yaxis = found[0].properties.Y;
    }
    var map = L.map('map', {  fullscreenControl: true,  fullscreenControlOptions: {    position: 'topleft'  }}).setView([yaxis, xaxis], 19);

    //set map view as tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 70, // Set the maximum zoom level you want to allow
        minZoom: 1, // Set a minimum zoom level
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    //set marker
    var marker = L.marker([yaxis, xaxis]).addTo(map);
    if(found.length == 0){
        marker.bindPopup("<b>আপনার বর্তমান অবস্থান</b>").openPopup();
    }
    else{
        marker.bindPopup("<b>কবর নম্বরঃ "+found[0].properties.Grave_ID+"<br><b>নাম: "+'[[${data.Dec_name}]]'+"</b>").openPopup();
    }


    //set color of the polygon
    function getColor(d) {
        return  d == "Yes" ? '#52c755' : '#ff0f0f';
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

     var info = L.control();
     info.onAdd = function (map) {
         this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
         this.update();
         return this._div;
     };

     // method that we will use to update the control based on feature properties passed
     info.update = function (props) {
         this._div.innerHTML = '<h4>কবরের বিস্তারিত</h4>' +  (props ?
             '<b>কবর নম্বর:</b> ' + props.Grave_ID + '<br\> <b>ব্লক:</b>' + props.Block + '<br\> <b>লেন:</b>' + props.Lane
             : 'কবর নির্বাচন করুন');
     };
     info.addTo(map);

     var gravedata=L.geoJSON(gravedata).addTo(map);