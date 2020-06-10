const request = require('postman-request');
const { weatherStackAPI } = require('../config/keys');

const forecast = (lat, lon, callback) => {
     const weatherQuery = `http://api.weatherstack.com/current?access_key=${weatherStackAPI}&query=${lat},${lon}&units=f`;

     request({
         url: weatherQuery,
         json: true
     }, (error, response) => {
        //low level error ie no connection
        if(error) {
            callback('Error - no connection to WeatherStack API is available.', undefined);
        }
        else {
            //URL issue
            if(response.body.error){
                callback(`Error: ${response.body.error.info}`, undefined);
            }
            else {
                let data = response.body;
                let {current, location} = data;
                let logString = `It is currently ${location.localtime} at ${location.name}, ${location.region} and the weather is ${current.weather_descriptions[0].toLowerCase()}. The temperature is ${current.temperature} degrees Fahrenheit and there is a ${current.precip}% chance of rain.`;
                callback(undefined, logString);
            }
        }
     });
}

module.exports = forecast;