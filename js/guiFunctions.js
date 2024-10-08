const forecastBlock = document.getElementById("forecastBlock");

function createWeatherBox (divID) {
    const newDiv = document.createElement('div');
        newDiv.setAttribute('id', divID);
    return newDiv;
}

export async function initDisplay (weatherObject, divID){
    const newBox = createWeatherBox(divID);
    const theWeather = weatherObject;
    await theWeather.getInitialData();
    newBox.innerHTML = theWeather.getTemp();

    forecastBlock.classList = '';
    forecastBlock.classList.add(theWeather.getBackground()); 

    forecastBlock.appendChild(newBox);

}

export async function updateDisplay (weatherObject, divID) {
    const theWeather = weatherObject;
    await theWeather.updateData();
    const weatherBox = document.getElementById(divID);
    weatherBox.innerHTML = theWeather.getTemp();
    // console.log(theWeather.getTimeBackground());
    console.log(`New temperature ${theWeather.getTemp()}.`);
}