import WeatherItem from './weather.js';
import {initDisplay, updateDisplay} from './guiFunctions.js';


(async () => {
    const itemOne = new WeatherItem('tokyo');
    initDisplay(itemOne, 'test1');
    
    setInterval(() => {
        console.log('Interval fired');
        updateDisplay(itemOne, 'test1');
    }, 300000);
})();

// (async () => {
//     const itemTwo = new WeatherItem('chicago');
//     initDisplay(itemTwo, 'test2');
    
//     setInterval(() => {
//         console.log('Interval fired');
//         updateDisplay(itemTwo, 'test2');
//     }, 300000);
// })();