console.log('Client side script has been loaded.');

const fetchWeather = async (location) => {
    let response = await fetch(`http://localhost:3000/weather?address=${location}`);
    let data = await response.json();

    const placeParagraph = document.querySelector('#place-name');
    const weatherParagraph = document.querySelector('#weather-data');

    placeParagraph.innerHTML = '';
    weatherParagraph.innerHTML = 'Loading...'
    if(data.error){
        weatherParagraph.innerHTML =  data.error;
    }
    else{
        placeParagraph.innerHTML = `${data.placeName}: ${data.lat}, ${data.lon}`
        weatherParagraph.innerHTML = data.weatherData;
    }
}

const weatherForm = document.querySelector('#weather-form');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.querySelector('#location').value;
    fetchWeather(location);
});