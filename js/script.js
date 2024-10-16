import WeatherItem from './weather.js';
import {initDisplay, updateDisplay} from './guiFunctions.js';
import { formGeneration } from './formGeneration.js';

const mainArea = document.getElementById('forecastBlock');

function startWeatherBox (location, boxID) {
    (async () => {
        const theWeather = new WeatherItem(location);
        initDisplay(theWeather, boxID);
        
        setInterval(() => {
            console.log('Interval fired');
            updateDisplay(theWeather, boxID);
        }, 300000);
    })();
}

formGeneration(mainArea).then((data) => {
    let formData = data;
    let boxID = 0;
    Object.values(formData).forEach((value) => {
        console.log(value);
        startWeatherBox(value, `'box-${boxID}'`)
        boxID++;
    });
});

// (async () => {
//     const itemOne = new WeatherItem('sapporo');
//     initDisplay(itemOne, 'test1');
    
//     setInterval(() => {
//         console.log('Interval fired');
//         updateDisplay(itemOne, 'test1');
//     }, 300000);
// })();

// (async () => {
//     const itemTwo = new WeatherItem('venice FL');
//     initDisplay(itemTwo, 'test2');
    
//     setInterval(() => {
//         console.log('Interval fired');
//         updateDisplay(itemTwo, 'test2');
//     }, 300000);
// })();