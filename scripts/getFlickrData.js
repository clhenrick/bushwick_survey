var fs = require('fs'),
      jf = require('jsonfile'),
      Flickr = require('flickrapi'),
      async = require('async'),
      joiner = require('joiner'),
      GeoJson = require('geojson');

var flickrOptions = {
      api_key: "78e1a42bb57b47805ce5ae4740802257",
      secret: "ac773fd0b2ce6a93",
      user_id: "130225935@N02"
    };

var newGeoJson;

function callFlickrAPI() {

  var count = 0;
  var data = [];

  Flickr.tokenOnly(flickrOptions, function(error, flickr) {
    for (var i=1; i<4; i++) {
      flickr.photos.search({
        user_id: flickr.options.user_id,
        page: i,
        per_page: 500,
        extras: "url_m"
      }, 

      function(err, result) {
        
        if (err) { console.log('error: ', err); return; }              
        
        var photos = result.photos.photo;

        for (var j=0; j< photos.length; j++) {
          data.push(photos[j]);
          count ++;
        }

        if (count === 1003) {
          console.log('data: ', data.length);
          processJson(data);
        }        

      });  
    }      
  });
}

function processJson(data) {
  var i = 0,
        o = [];
  for (i; i < data.length; i++) {
    o.push({
      title : data[i].title,
      url : data[i].url_m
    });
  }
  jf.writeFile('flickrPhotoData.json', o, function(err) {
    if (err) { console.log('error: ', err); }
  })
  joinJson(o);
}

function joinJson(data) {
  var data_a = newGeoJson,
        data_b = data,
        key_a = 'name',
        key_b = 'title',
        data_joined = joiner.geoJson(data_a, key_a, data_b, key_b, 'properties');
  writeJson(data_joined);
}

function writeJson(data) {
  var file = "flickrData.json";
  jf.writeFile(file, data, function(err) {
    if (err) { console.log('writeJson error: ', err); return;}
    console.log('data written. report: ', data.report.prose.summary);
  })
}

function processGeoJson() {
  var inputGeoJson = JSON.parse(fs.readFileSync('data/nwb_photos.geojson'));
  var jsonOut = [];
  // var newGeoJson = GeoJson.parse(inputGeoJson.features, {Point: ['geometry.coordinates[1]', 'geometry.coordinates[0]'], include: ['Name'] });
  // console.log('input geojson: ', inputGeoJson);
  // console.log('newGeoJson: ', newGeoJson);
  for (var i = 0; i<inputGeoJson.features.length; i++) {
    jsonOut.push({
      name : inputGeoJson.features[i].properties.Name,
      lat : inputGeoJson.features[i].geometry.coordinates[1],
      lon : inputGeoJson.features[i].geometry.coordinates[0]
    });
    // console.log(inputGeoJson.features[i].geometry.coordinates);
  }
  
  newGeoJson = GeoJson.parse(jsonOut, {Point: ['lat', 'lon'], include: ['name']});
  // console.log(newGeoJson);
  callFlickrAPI();
}

processGeoJson();
