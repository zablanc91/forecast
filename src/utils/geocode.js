const request = require('postman-request');
const { mapboxToken } = require('../config/keys');

//use callback to allow for flexibility on what to do with API data, will give back coords and name of location
const geocode = (address = '', callback) => {
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=${mapboxToken || process.env.MAPBOX_API}&limit=1`;

    request({
        url: geoURL,
        json: true
    }, (error, response) => {
        //request may send error for low level code such as no connection
        if(error) {
            callback('Error - no connection to Mapbox API is available.', undefined);
        }
        else {
            if(!response.body.features){
                callback('Error - no search term provided.', undefined);
            }
            //no results in search - send back an error
            else if(response.body.features.length === 0) {
                callback(`Error - search term ${response.body.query[0]} returned 0 results.`, undefined);
            }
            else {
                let data = response.body.features[0];
                let placeName = data.place_name;
                let lat = data.center[1];
                let lon = data.center[0];
                callback(undefined, {placeName, lat, lon});
            }
            
        }
    });
};

module.exports = geocode;