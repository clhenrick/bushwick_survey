var app = app || {};

app.main = (function(w,d,$){  

  // variables within 'app' scope
  var el = {
    map : null,
    cdbTileLayer: null,
    photoPoints : null,
    dataLayer : new L.featureGroup(),
    surveyLots : null,
    markerOptions : {
      radius: 4,
      fillColor: "#ff7800",
      color: "#fff",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8          
    },
    styles : null,
    // default css for tax lot sublayer
    surveyLotsCSS : "#bushwick_survey_joined{" +
      "polygon-fill: #A53ED5;" +
      "polygon-opacity: 0.3;" +
      "line-color: #000;" +
      "line-width: 1;" +
      "line-opacity: 0.3;" +
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
      // maxBounds : L.latLngBounds([40.675496,-73.957987],[40.714216,-73.877306]),       
      attributionControl: true
    };

    el.styles = app.mapStyles;
    
    el.map = L.map('map', params);

    el.cdbTileLayer = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    });
     
    el.map.addLayer(el.cdbTileLayer);
    el.dataLayer.addTo(el.map);
    loadCdbData();

    el.map.on('popupopen', function(e) {
      $('img.survey-photo').load(function(){
         var $img = $(this);
         $img.attr('width', $img.width()).attr('height', $img.height());
      });
    });
  }

  // zoom to a feature for when user clicks on it
  function zoomToFeature(e) {
    el.map.fitBounds(e.target.getBounds());
  }

  // load the geojson data, style it, add pop-ups
  function loadPhotoData(file, layerToLoad) {
    $.getJSON('data/' + file, function(data) {
      console.log(data);
      el.photoPoints = L.geoJson(data, {
        onEachFeature : function(feature, layer) {
          if (feature.properties.url !== null) {
            layer.bindPopup('<img class="survey-photo" src=' + feature.properties.url + '/>');
          }
        },
        pointToLayer : function(feature, latlng) {
          return L.circleMarker(latlng, el.markerOptions);
        }
      }).addTo(layerToLoad);
    });
  }

  function loadCdbData() {
    var cdbUrl = "https://chenrick.cartodb.com/api/v2_1/viz/12fa33b2-a8a6-11e4-a75b-0e9d821ea90d/viz.json";   
    var options = {
      cartodb_logo: false, 
      legends: false,
      https: true      
    };
    cartodb.createLayer(el.map, cdbUrl, options, function(layer) {
      layer.setInteraction(true);
      
      // survey tax lot data is 0, photo points layer is 1
      el.surveyLots = layer.getSubLayer(0);
      el.surveyLots.setSQL(app.sql.allLots);
      el.surveyLots.setCartoCSS(app.mapStyles.zoning);
      
      layer.getSubLayer(1).hide();
      // el.photoPoints.setCartoCSS(el.photoPointsCSS);
      
      el.map.addLayer(layer, false);
      el.cdbTileLayer.bringToBack();
    })
      .on('done', function(layer) {
        console.log('cdb all done');
        // loadPhotoData('photo_data_merge.geojson', el.dataLayer);
      })      
      .on('error', function(err) {
        console.log('error: ', err);        
      })

      // console.log('loadCdbData called');
  }

  // to get everything going
  function init() {    
    initMap();
    app.surveryLotsUI.init();
    $('#allLots').addClass('selected');
  }

  return {
    el : el,
    init : init
  }   

})(window, document, jQuery);
