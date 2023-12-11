//create map object in map div with co-orrdinate and zoom level
    // var map = L.map('map').setView([23.799105894372758, 90.4039862233958], 17.5);
    var map = L.map('map', {
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 'topleft'
      }
}).setView([23.7999848513, 90.405272463100005], 18);

    //set map view as tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 70, // Set the maximum zoom level you want to allow
        minZoom: 1, // Set a minimum zoom level
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);



    //set marker
    //var marker = L.marker([23.7990516813, 90.4038127014]).addTo(map);
    var marker = L.marker([23.79902320 , 90.40380000]).addTo(map);
    marker.bindPopup("<b>আপনার বর্তমান অবস্থান</b>").openPopup();

    //set color of the polygon
    function getColor(d) {
        //return d = "0220139" ? '#800026' : '#FFFF00';
        return  d == "Yes" ? '#52c755' : '#ff0f0f';
    }

    //set the style of the polygon
    function style(feature) {
        return {
          //  fillColor: getColor(feature.properties.Grave_ID),
          //  fillColor: (feature.properties.Grave_ID == "0220139") ? '#52c755' : '#ff0f0f',
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
            '<b>কবর নম্বর:</b> ' + props.Grave_ID + '<br\> <b>ব্লক:</b>' + props.Block + '<br\> <b>লেন:</b>' + props.Lane + '<br\> <b>নাম:</b>' + props.Name + '<br\> <b>পিতার নাম:</b>' + props.Father + '<br\> <b>কবর দেয়ার তারিখ:</b>' + props.Burial_Date
            : 'কবর নির্বাচন করুন');
    };

    info.addTo(map);

    var gravedata=L.geoJSON(gravedata).addTo(map);