import {visualCrossingKey} from './apiKey.js';
import {getTimeBackground} from './timeFunctions.js';

export default class WeatherItem{
    constructor(location){
        this.baseQuery = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.locationQuery = location;
        this.queryAPI = `?key=${visualCrossingKey}`;

        this.fullQuery = this.baseQuery + this.locationQuery + this.queryAPI;

        this.location;
        this.currentTemp;
        this.currentConditions;
        this.sunrise;
        this.sunset;
        this.currentTime;

        console.log(`Object with ${this.queryAPI} and ${this.locationQuery} has been created!`);
        console.log(this.fullQuery);
    }

    setInitialData (location, currentTemp, conditions, sunrise, sunset, currentTime){
        this.location = location;
        this.currentTemp = currentTemp;
        this.currentConditions = conditions;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.currentTime = currentTime;
    }

    updateTemp (currentTemp) {
        this.currentTemp = currentTemp;
    }
    
    updateCurrentConditions (conditions) {
        this.currentConditions = conditions;
    }

    logTestData () {
        let readableTime = new Date(this.time * 1000);
        readableTime = readableTime.toLocaleString();
        console.log(`Weather for ${this.location} at ${readableTime} : ${this.currentTemp} and ${this.currentConditions}.`);
    }

    async getNewData () {
        const response = await fetch(this.fullQuery);
        const data = await response.json();
        return data;
    }

    async getInitialData() {
        try {
            const data = await this.getNewData(); // Wait for data to be fetched
            console.log(data.currentConditions.temp);
            
            let location = data.resolvedAddress;
            let currentTemp = data.currentConditions.temp;
            let conditions = data.currentConditions.conditions;
            
            // Turns conditions from the API into CSS-usable text
            conditions = conditions.replace(/\s+/g, '-'); 
            let sunrise = data.currentConditions.sunriseEpoch * 1000;
            let sunset = data.currentConditions.sunsetEpoch * 1000;
            let currentTime = data.currentConditions.datetimeEpoch * 1000;
    
            // Set the initial data
            this.setInitialData(location, currentTemp, conditions, sunrise, sunset, currentTime);
            this.logTestData();
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }
    
    async updateData () {
        try {
            const data = await this.getNewData(); // Wait for data to be fetched
            let currentTemp = data.currentConditions.temp;
            let conditions = data.currentConditions.conditions;
                conditions = conditions.replace(/\s+/g, '-'); 
            this.updateTemp(currentTemp);
            this.updateCurrentConditions(conditions);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    getConditions () {
        return this.currentConditions;
    }

    getTemp () {
        return this.currentTemp;
    }

    getBackground () {
        return getTimeBackground(this.currentTime, this.sunrise, this.sunset);
    }

    
}

