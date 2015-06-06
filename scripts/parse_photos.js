// script to grab lat lon data from images
// processes a director of images and writes a geojson file containing the image name, lat, lon, modify data
// usage: touch photo_data.json && node parse_photos.js > photo_data.json

var fs = require('graceful-fs');
var path = require('path');
var ExifImage = require('exif').ExifImage;
var exifCount = 0;
var imgDir = path.join(__dirname, '../all_photos/');
var imgData = {
                "type" : "FeatureCollection",
                "crs": {
                  "type": "name",
                  "properties": {
                    "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                  },
                "features" : []
              };
var errors = [];

// converts lat lon from Degrees Minutes Seconds to Decimal Degrees
function convertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

function parseExifData(exifObj, name) {
  var data = {
                "type" : "Feature",
                "geometry" : {
                  "type" : "Point",
                  "coordinates" : []
                },
                "properties" : {}
              };
  var d = exifObj;  
  var imgName = name.split('/')
  data.properties.file_name = imgName[imgName.length-1];
  data.coordinates[1] = convertDMSToDD(
                            d.gps.GPSLatitude[0],
                            d.gps.GPSLatitude[1],
                            d.gps.GPSLatitude[2],
                            d.gps.GPSLatitudeRef
                            );
  data.coordinates[0] = convertDMSToDD(
                            d.gps.GPSLongitude[0],
                            d.gps.GPSLongitude[1],
                            d.gps.GPSLongitude[2],
                            d.gps.GPSLongitudeRef
                            );
  data.properties.modify_date = d.image.ModifyDate;
  imgData.features.push(data);
  exifCount ++;

  if (exifCount === 1006) {
    imgData = JSON.stringify(imgData);
    errors = JSON.stringify(errors);
    console.log(imgData);
  }
}

function readImage(img) {
  try {
      new ExifImage({ image : img }, function (error, exifData) {
          if (error)            
            errors.push({name: img, err: error.message});
          else
            parseExifData(exifData, img);
      });
  } catch (error) {      
      errors.push({name: img, err: error.message});
  }  
}

function readDataDir(path) {
  var files = fs.readdirSync(path);
  var count = 0;
  files.forEach(function(file,i){
    file = '../all_photos/' + file;
    readImage(file);
    count++
  });
}

readDataDir('../all_photos/');