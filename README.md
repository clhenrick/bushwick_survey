# Bushwick Community Map Survey
Web map of data created from a participatory mapping survey of housing and land use in Bushwick, Brooklyn, NY by the North West Bushwick Community Group and Parsons Urban Ecologies, fall 2014.

A temporary map of the data may be viewed [here](http://clhenrick.io/bushwick_survey/).

## The Data
The survey data is being hosted via Cartodb and can be downloaded [here](https://chenrick.cartodb.com/tables/bushwick_survey_joined/public). It's also available in the `data/` directory.

The photo data is a JSON file located in `html/data/photo_data_merge.geojson`. This file contains the latitude longitude coordinates for each photo and a url to each photo's location on Flickr.

## Scripts
The `scripts` directory contains scripts:  
- for joining the survey data to city's MapPLUTO (tax lot) data
- grabbing the url's of each photo using the Flickr API.
- extracting `exif` metadata from the photos to acquire lat lon coordinates.

**note:** the outputs from `getFlickrData.js` and `parse_photos.js` were joined in CartoDB using the photo title as a primary key.
