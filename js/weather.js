import {visualCrossingKey} from './apiKey.js';

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
        this.getInitialData();
        //this.getNewDataTimer();
    }

    setInitialData (location, currentTemp, conditions, sunrise, sunset, time){
        this.location = location;
        this.currentTemp = currentTemp;
        this.currentConditions = conditions;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.time = time;
    }

    updateTemp (currentTemp) {
        this.currentTemp = currentTemp;
    }
    
    updateCurrentConditions (conditions) {
        this.currentConditions = conditions;
    }

    async getNewData () {
        const response = await fetch(this.fullQuery);
        const data = await response.json();
        return data;
    }

    logTestData () {
        let readableTime = new Date(this.time * 1000);
        readableTime = readableTime.toLocaleString();
        console.log(`Weather for ${this.location} at ${readableTime} : ${this.currentTemp} and ${this.currentConditions}.`);
    }

    getInitialData () {
        this.getNewData()
            .then(data => {
                console.log(data.currentConditions.temp);
                let location = data.resolvedAddress;
                let currentTemp = data.currentConditions.temp;
                let conditions = data.currentConditions.conditions;
                    conditions = conditions.replace(/\s+/g, '-'); // Turns conditions from the API into css-usable text.
                let sunrise = data.currentConditions.sunriseEpoch;
                let sunset = data.currentConditions.sunsetEpoch;
                let time = data.currentConditions.datetimeEpoch;
                this.setInitialData(location, currentTemp, conditions, sunrise, sunset, time);
                this.logTestData();
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    updateData () {
        this.getNewData()
        .then(data => {
            let currentTemp = data.currentConditions.temp;
            let conditions = data.currentConditions.conditions;
                conditions = conditions.replace(/\s+/g, '-'); 
            this.updateTemp(currentTemp);
            this.updateCurrentConditions(conditions);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
    }

    getTemp () {
        return this.currentTemp;
    }
}

