const forecastBlock = document.getElementById("forecastBlock");

function createWeatherBox (divID) {
    const newDiv = document.createElement('div');
        newDiv.setAttribute('id', divID);
    return newDiv;
}

export function initDisplay (weatherObject, divID){
    const newBox = createWeatherBox(divID);
    const theWeather = weatherObject;
    console.log(theWeather.getTemp());
    newBox.innerHTML = theWeather.getTemp();
    forecastBlock.appendChild(newBox);
}

export function updateDisplay (weatherObject, divID) {
    const weather = weatherObject;
    const weatherBlock = document.getElementById(divID);
}