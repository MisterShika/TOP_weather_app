import {visualCrossingKey} from './apiKey.js';

export default class WeatherItem{
    constructor(location){
        this.baseQuery = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        this.locationQuery = location;
        this.queryAPI = `?key=${visualCrossingKey}`;

        this.fullQuery = this.baseQuery + this.locationQuery + this.queryAPI;

        this.currentTemp;
        this.currentConditions;
        this.sunrise;
        this.sunset;
        this.currentTime;

        console.log(`Object with ${this.queryAPI} and ${this.location} has been created!`);
        // console.log(this.fullQuery);
        this.getNewDataTimer();
    }

    setInitialData (temp, conditions, sunrise, sunset, time){
        this.temp = temp;
        this.currentConditions = conditions;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.time = time;
    }

    updateTemp (temp) {
        this.temp = temp;
    }
    
    updateCurrentConditions (conditions) {
        this.currentConditions = conditions;
    }

    async getNewData () {
        const response = await fetch(this.fullQuery);
        const data = await response.json();
        return data;
    }

    getInitialData () {
        this.getNewData()
            .then(data => {
                ///console.log(data.currentConditions.temp);
                let temp = data.currentConditions.temp;
                let conditions = data.currentConditions.conditions;
                    conditions = conditions.replace(/\s+/g, '-'); // Turns conditions from the API into css-usable text.
                let sunrise = data.currentConditions.sunriseEpoch;
                let sunset = data.currentConditions.sunsetEpoch;
                let time = data.currentConditions.datetimeEpoch;
                this.setInitialData(temp, conditions, sunrise, sunset, time);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    getNewDataTimer () {
        setInterval(() => {
            this.getNewData()
                .then(data => {
                    let temp = data.currentConditions.temp;
                    let conditions = data.currentConditions.conditions;
                        conditions = conditions.replace(/\s+/g, '-'); 
                    this.updateTemp(temp);
                    this.updateCurrentConditions(conditions);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }, 10000);
    }
}

