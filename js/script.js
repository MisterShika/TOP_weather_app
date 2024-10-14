import WeatherItem from './weather.js';
import {initDisplay, updateDisplay} from './guiFunctions.js';


(async () => {
    const itemOne = new WeatherItem('sapporo');
    initDisplay(itemOne, 'test1');
    
    setInterval(() => {
        console.log('Interval fired');
        updateDisplay(itemOne, 'test1');
    }, 300000);
})();

(async () => {
    const itemTwo = new WeatherItem('venice FL');
    initDisplay(itemTwo, 'test2');
    
    setInterval(() => {
        console.log('Interval fired');
        updateDisplay(itemTwo, 'test2');
    }, 300000);
})();