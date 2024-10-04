import WeatherItem from './weather.js';
import {initDisplay, updateDisplay} from './guiFunctions.js';

const itemOne = new WeatherItem('london');
initDisplay(itemOne, 'test1');

// const testID = 'test1';