import WeatherItem from './weather.js';
import {initDisplay, updateDisplay} from './guiFunctions.js';


(async () => {
    const itemOne = new WeatherItem('tampa');
    // await itemOne.getInitialData();
    initDisplay(itemOne, 'test1');
    
    setInterval(() => {
        console.log('Interval fired');
        updateDisplay(itemOne, 'test1');
    }, 300000);
})();