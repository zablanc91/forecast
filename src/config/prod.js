//prod.js - utilize environment variables from Heroku

module.exports = {
    weatherStackAPI : process.env.WEATHER_API,
    mapboxToken: process.env.MAPBOX_API
};