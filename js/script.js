import {visualCrossingKey} from './apiKey.js';

const baseQuery = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
const locationQuery = 'london';
const queryAPI = `?key=${visualCrossingKey}`;

const fullQuery = baseQuery + locationQuery + queryAPI;

console.log(fullQuery);

async function getWeather () {
    const response = await fetch(fullQuery);
    const data = await response.json();
    return data;
}

getWeather()
    .then(data => {
        console.log(data.description);  // Access the address when the promise resolves
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);  // Handle errors
    });