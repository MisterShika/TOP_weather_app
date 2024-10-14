const forecastBlock = document.getElementById("forecastBlock");

function createWeatherBox (divID) {
    const newDiv = document.createElement('div');
        newDiv.setAttribute('id', divID);
    const weatherHolder = document.createElement('div');
        weatherHolder.classList.add('weatherHolder');
    const locationHolder = document.createElement('span');
        locationHolder.classList.add('locationHolder');
    const tempHolder = document.createElement('span');
        tempHolder.classList.add('tempHolder');
    const conditionsHolder = document.createElement('div');
        conditionsHolder.classList.add('conditionsHolder');
        const theConditions = document.createElement('span');
            conditionsHolder.appendChild(theConditions);
    const timeHolder = document.createElement('span');
        timeHolder.classList.add('timeHolder');
        timeHolder.innerHTML = "00:00";
        

    weatherHolder.appendChild(locationHolder);
    weatherHolder.appendChild(tempHolder);
    weatherHolder.appendChild(conditionsHolder);
    weatherHolder.appendChild(timeHolder);

    newDiv.appendChild(weatherHolder);
    return newDiv;
}

function displayTime (timeZone) {
    const gotTime = new Date();
    const newTimeString = gotTime.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timeZone
    });

    const [hours, minutes] = newTimeString.split(":");
    const formattedTime = `${hours}<span>:</span>${minutes}`;

    return formattedTime;
}

function initTimer (time, clockLocation) {
    function updateClock() {
        clockLocation.innerHTML = displayTime(time);
    }

    updateClock();

    setTimeout(function tick() {
        updateClock();
        console.log("updated!");
        const now = new Date();
        const secondsUntilNextMinute = 60 - now.getSeconds();
        setTimeout(tick, secondsUntilNextMinute * 1000);
    }, 1000);
}

export async function initDisplay (weatherObject, divID){
    const newBox = createWeatherBox(divID);
    const theWeather = weatherObject;
    const locationBox = newBox.querySelector('.weatherHolder .locationHolder');
    const temperatureBox = newBox.querySelector('.weatherHolder .tempHolder');
    const conditionsBox = newBox.querySelector('.weatherHolder .conditionsHolder span');
    const timeBox = newBox.querySelector('.weatherHolder .timeHolder');

    await theWeather.getInitialData();

    temperatureBox.innerHTML = theWeather.getTemp();
    locationBox.innerHTML = theWeather.getLocation();
    conditionsBox.classList.add(theWeather.getConditions());

    initTimer(theWeather.getTimeZone(), timeBox);
    //timeBox.innerHTML = displayTime(theWeather.getTimeZone());

    newBox.classList = '';
    newBox.classList.add(theWeather.getBackground()); 

    forecastBlock.appendChild(newBox);
}

export async function updateDisplay (weatherObject, divID) {
    const theWeather = weatherObject;
    await theWeather.updateData();
    const weatherBox = document.getElementById(divID);
    const temperatureBox = weatherBox.querySelector('.weatherHolder .tempHolder');
    const conditionsBox = weatherBox.querySelector('.weatherHolder .conditionsHolder span');

    conditionsBox.classList = '';
    conditionsBox.classList.add(theWeather.getConditions());

    temperatureBox.innerHTML = theWeather.getTemp();
    console.log(theWeather.getBackground());

    weatherBox.classList = '';
    weatherBox.classList.add(theWeather.getBackground()); 
  
    console.log(`New temperature ${theWeather.getTemp()}.`);
}