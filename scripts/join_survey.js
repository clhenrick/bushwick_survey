var fs = require('fs'),
      jf = require('jsonfile'),
      csv = require('csv'),          
      joiner = require('joiner'),
      GeoJson = require('geojson');

var geo_key = 'bbl_pluto',
      value_key = 'bbl',
      geo_data = JSON.parse(fs.readFileSync('data/bushwick_pluto14v1.geojson')),
      value_data = JSON.parse(fs.readFileSync('data/bushwick_survey_fixed.json')),
      joined_data,
      data_out= {"type": "FeatureCollection","features": []},
      geo_data_parsed = {"type": "FeatureCollection","features": []};

// console.log('value_data: ', value_data);
// console.log('joined_data: ', joined_data.report.prose.summary);

function parseData() {
  var i = 0,
        l = value_data.length,
        out = [];

  for (i; i< l; i++) {
    value_data[i].bbl = parseInt(value_data[i].bbl);
    out.push(value_data[i])    
  }

  geo_data.features.forEach(function(entry) {
    // console.log(entry);
    geo_data_parsed.features.push({
      type: "Feature",
      properties: {
            units_res_pluto : entry.properties.UnitsRes,
            owner_name_pluto : entry.properties.OwnerName,
            bbl_pluto : entry.properties.BBL,
            tract2010_pluto : entry.properties.Tract2010,
            zoning_pluto : entry.properties.AllZoning1,
            address_pluto : entry.properties.Address,
            res_far_pluto : entry.properties.ResidFAR,
            floors_pluto : entry.properties.NumFloors,
            landuse_pluto : entry.properties.LandUse
      },
      geometry : entry.geometry
    });    
  });

  // console.log('geo_data_parsed.features:', geo_data_parsed);

  joined_data = joiner.geoJson(geo_data_parsed, geo_key, value_data, value_key, 'properties');      
  console.log('joined_data: ', joined_data.report.prose.summary);

  // loop over joined data and get only the features that have values from joined survey data
  joined_data.data.features.forEach(function(entry) {
    if (entry.properties.address !== null) {
      // console.log(entry);
      data_out.features.push(entry);
    }
  });

  console.log(data_out.features.length);

  // write the data to a file
  if (data_out.features.length === 746) { writeData(); }       
}

function writeData() {
  var outFile = 'bushwick_survey_joined.geojson';

  jf.writeFile(outFile, data_out, function(err) {
    if (err) { console.log(err); return; }  
  });
}

parseData();
