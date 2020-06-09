const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//use Handlebars template engine
app.set('view engine', 'hbs');

//tell express name of folder containing views/templates to render with Handlebars
const templatesPath = path.join(__dirname, '../templates/views');
app.set('views', templatesPath);

const partialsPath = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsPath);

//static takes path of folder we want to use, makes this the root
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

//routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dr. Evil'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'No such thing as a dumb question, please email us for support!',
        title: 'Help',
        name: 'Dr. Evil'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me???',
        content: 'Created by Dr. Evil, will sell for ONE MILLION DOLLARS',
        name: 'Dr. Evil'
    });
});

app.get('/weather', (req, res) => {
    //API call with the address pulled from URL
    geocode(req.query.address, (error, {lat, lon, placeName} = {}) => {
        if(error){
            return res.send({
                error
            });
        }
        
        forecast(lat, lon, (error, weatherData) => {
            if(error){
                return res.send({
                    error
                });
            }
            console.log(`${placeName}: ${lat}, ${lon}`);
            console.log(weatherData);
            res.send({
                placeName,
                lat,
                lon,
                weatherData
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Error',
        errorMessage: '404 - help article not found.',
        name: 'Dr. Evil'
    });
});

//catch unknown URLS for 404
app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Error',
        errorMessage: '404 - page not found.',
        name: 'Dr. Evil'
    });
});

//start up the server
app.listen(3000, () => {
    console.log('Server is online.');
});