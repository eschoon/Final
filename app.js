var map = L.map('map', {
    center: [24.98298
      , 121.54024
    ], 
    zoom: 12
  });

  // map.on('load', function() {
  //   map.setLayoutProperty('country-label', 'text-field', ['format',
  //   ['get', 'name_en'], { 'font-scale': 1.2 },
  //   '\n', {},
  //   ['get', 'name'], {
  //   'font-scale': 0.8,
  //   'text-font': ['literal', [ 'DIN Offc Pro Italic', 'Arial Unicode MS Regular' ]]
  //   }
  //   ]);
     
    // }); 
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  
 

function getColor(d) {
	return d >= 60 ? 'red' :
	       d >= 50  ? 'orange' :
	       d >= 40  ? 'yellow' :
         d >= 30  ? 'green' :
         d >= 20 ? 'LightBlue' :
         d >= 10  ? 'blue' :
	                  'black';
}
  function geojsonMarkerOptions(feature){

    return{
      radius: 6,
      fillColor: getColor(feature.properties.house_price_unit), 
      color: "#000000",  
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
    }
 
  var customLayer = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Date of Home Sale: " + feature.properties.transaction_date +
      "<br>House Price of Unit Area: " + (feature.properties.house_price_unit) + 
      "<br>Age of House (Years) " + (feature.properties.house_age) + 
      "<br>Distance Nearest MRT Station (meter) " + (feature.properties.dist_to_mrt) + 
      "<br>Number of Convenience Stores in Living Circle: " + (feature.properties.no_conv_stores) + "</br>")
      },
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMarkerOptions(feature)
        );
      }
  });

 //create legend

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
  
		grades = [10,20,30,40,50,60]
		labels = ['<strong> Price Per Unit ($) </strong><br></br>'];

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
		div.innerHTML = labels += 
			'<i style="background:' + getColor(grades[i]) + '"></i> ' +
			grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	}

	return div;
};



legend.addTo(map);

// var MapboxLanguage = require('@mapbox/mapbox-gl-language');
// var language = new MapboxLanguage();
// map.addControl(language);
// var language = new MapboxLanguage({  defaultLanguage: 'en'});
// map.addControl(language);

// map.setLayoutProperty('my-layer', 'visibility', 'none');


  var runLayer = omnivore.csv('re_data_set.csv', null, customLayer)
      .on('ready', function() {
          
          map.fitBounds(runLayer.getBounds());
      })
      .addTo(map);

      console.log(customLayer)

