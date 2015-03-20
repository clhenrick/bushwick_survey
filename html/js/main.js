var app = app || {};

app = (function(w,d,$){

  // variables within 'app' scope
  var el = {
    map : null,
    mapboxTiles : null,
    dataLayers : new L.FeatureGroup(),
    photoPoints : null,
    surveyLots : null,
    markerOptions : {
      radius: 5,
      fillColor: "#ff7800",
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8          
    },
    surveyLotsCSS : "#bushwick_survey_joined{" +
      "polygon-fill: #081B47;" +
      "polygon-opacity: 1;" +
      "line-color: #fff;" +
      "line-width: 1;" +
      "line-opacity: 1;" +
    "}"
  }

  // functions:
  // set up the map
  function initMap() {    
    var params = {
      center : [40.694631,-73.925028],
      minZoom : 13,
      maxZoom : 20,
      zoom : 15,
      maxBounds : L.latLngBounds([40.675496,-73.957987],[40.714216,-73.877306]),       
      attributionControl: true
    };
    
    el.map = L.map('map', params);   
    
    // mapbox stuff
    L.mapbox.accessToken = 'pk.eyJ1IjoiY2hlbnJpY2siLCJhIjoiLVhZMUZZZyJ9.HcNi26J3P-MiOmBKYHIbxw';
    el.mapboxTiles = L.mapbox.tileLayer('chenrick.map-3gzk4pem');
    el.map.addLayer(el.mapboxTiles);     
    
    el.dataLayers.addTo(el.map);

    loadData('flickrData.json', el.dataLayers);
    loadCdbData();
  }

  // zoom to a feature for when user clicks on it
  function zoomToFeature(e) {
    el.map.fitBounds(e.target.getBounds());
  }

  // load the geojson data, style it, add pop-ups
  function loadData(file, layerToLoad) {
    $.getJSON('data/' + file, function(data) {
      console.log(data);
      photoPoints = L.geoJson(data.data, {
        onEachFeature : function(feature, layer) {
          layer.bindPopup('<img class="survey-photo" src=' + feature.properties.url + '/>');
        },
        pointToLayer : function(feature, latlng) {
          return L.circleMarker(latlng, el.markerOptions);
        }
      }).addTo(layerToLoad);
    });
  }

  function loadCdbData() {
    var cdbUrl = "http://chenrick.cartodb.com/api/v2/viz/12fa33b2-a8a6-11e4-a75b-0e9d821ea90d/viz.json";   
    cartodb.createLayer(el.map, cdbUrl, function(layer) {
      // console.log('cdb sublayer 0: ', layer.getSubLayer(0), '\ncdb sublayer 1: ', layer.getSubLayer(1));
      layer.setInteraction(true);          
      // layer.getSubLayer(0).setSQL('SELECT * FROM bushwick_survey_joined');
      layer.getSubLayer(0).setCartoCSS(el.surveyLotsCSS);
      // layer.getSubLayer(0).show();
      layer.getSubLayer(1).hide();
      el.surveyLots = layer.getSubLayer(0);
      console.log('surveyLots: ', el.surveyLots);
      el.map.addLayer(layer, false);

      el.mapboxTiles.bringToBack();                
    })
      .on('done', function(layer) {
        console.log('cdb all done');        
      })      
      .on('error', function(err) {
        console.log('error: ', err);
        // surveyLots.bringToFront();        
      })

      // console.log('loadCdbData called');
  }

  // to get everything going
  function init() {
    initMap();    
  }

  return {
    el : el,
    init : init
  }   
})(window, document, jQuery);

// call app.map.init() once the DOM is loaded
window.addEventListener('DOMContentLoaded', function(){
  app .init();  
});