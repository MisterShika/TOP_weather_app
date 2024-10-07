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
            let sunrise = data.currentConditions.sunriseEpoch;
            let sunset = data.currentConditions.sunsetEpoch;
            let currentTime = data.currentConditions.datetimeEpoch;
    
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

    getTimeBackground () {
        // 7 before sunrise
        // 1 sunrise 
        // 9 midday
        // 1 sunset
        // 5 after sunset
        // 1 darkness
        // 1728299880 time
        // 1728281502 sunrise
        // 1728321833 sunset
        let time = this.currentTime;
        console.log(`Time: ${this.currentTime}`);
        console.log(`Sunrise: ${this.sunrise}, Sunset: ${this.sunset}`);
        if(time < this.sunrise){
            let thePercentage = ((time / this.sunrise) * 100).toFixed(2);
            let timePercent = parseFloat(thePercentage);
            // 20% dark night (darkness)
            // 70% (7 before sunrise)
            // 10% sunrise (1 sunrise)
            console.log(`Before Sunrise. Time Percent: ${timePercent}`);
            switch(true){
                case (timePercent >= 0 && timePercent <= 20):
                    return 'time0';
                    break;
                case (timePercent >= 21 && timePercent <= 30):
                    return 'time1';
                    break;
                case (timePercent >= 31 && timePercent <= 40):
                    return 'time2';
                    break;
                case (timePercent >= 41 && timePercent <= 50):
                    return 'time3';
                    break;
                case (timePercent >= 51 && timePercent <= 60):
                    return 'time4';
                    break;
                case (timePercent >= 61 && timePercent <= 70):
                    return 'time5';
                    break;
                case (timePercent >= 71 && timePercent <= 80):
                    return 'time6';
                    break;
                case (timePercent >= 81 && timePercent <= 90):
                    return 'time6';
                    break;
                case (roundedPercentage >= 91 && roundedPercentage <= 100):
                    return 'time7';
                    break;
            }
        }
        if(time < this.sunset){
            let thePercentage = ((time / this.sunset) * 100).toFixed(0);
            let timePercent = parseFloat(thePercentage);
            // 5% sunrise (1 sunrise)
            // 40% before midday (4 midday)
            // 10% midday (1 midday)
            // 40% after midday (4 midday)
            // 5% sunset (1 sunset)
            console.log(`Before Sunset. Time Percent: ${thePercentage}`);
            switch(true){
                case (timePercent >= 0 && timePercent <= 5):
                    return 'time7';
                    break;
                case (timePercent >= 6 && timePercent <= 15):
                    return 'time8';
                    break;
                case (timePercent >= 16 && timePercent <= 25):
                    return 'time9';
                    break;
                case (timePercent >= 26 && timePercent <= 35):
                    return 'time10';
                    break;
                case (timePercent >= 36 && timePercent <= 45):
                    return 'time11';
                    break;
                case (timePercent >= 46 && timePercent <= 55):
                    return 'time12';
                    break;
                case (timePercent >= 56 && timePercent <= 65):
                    return 'time13';
                    break;
                case (timePercent >= 66 && timePercent <= 75):
                    return 'time14';
                    break;
                case (timePercent >= 76 && timePercent <= 85):
                    return 'time15';
                    break;
                case (timePercent >= 86 && timePercent <= 95):
                    return 'time16';
                    break;
                case (timePercent >= 96 && timePercent <= 100):
                    return 'time17';
                    break;
            }
        }
        if(time > this.sunset){
            let thePercentage = ((this.sunset / time) * 100).toFixed(2);
            let timePercent = parseFloat(thePercentage);
            // 10% sunset (1 sunset)
            // 50% after sunset (5 after sunset)
            // 40% dark night (darkness)
            console.log(`After Sunset. Time Percent: ${timePercent}`);
            switch(true){
                case (timePercent >= 0 && timePercent <= 10):
                    return 'time17';
                    break;
                case (timePercent >= 11 && timePercent <= 20):
                    return 'time18';
                    break;
                case (timePercent >= 21 && timePercent <= 30):
                    return 'time19';
                    break;
                case (timePercent >= 31 && timePercent <= 40):
                    return 'time20';
                    break;
                case (timePercent >= 41 && timePercent <= 50):
                    return 'time21';
                    break;
                case (timePercent >= 51 && timePercent <= 60):
                    return 'time22';
                    break;
                case (timePercent >= 61 && timePercent <= 100):
                    return 'time23';
                    break;
            }
        }
    }
}

