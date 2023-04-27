"use strict";
const apiKey = '864ae738677cc5d64c1c11e8994328b9';
const resultsDiv = document.querySelector('#results');
const weatherForm = document.querySelector('form');
const weatherTodayDiv = document.querySelector('#weatherToday');
function weatherTodayHTML(weather, unit) {
    let city = weather.name;
    let date = new Date(weather.dt).toString();
    let temp = Math.round(weather.main.temp);
    let conditions = weather.weather[0].main;
    let tempHi = Math.round(weather.main.temp_max);
    let tempLo = Math.round(weather.main.temp_min);
    let cityH2 = document.createElement('h2');
    let dateH3 = document.createElement('h3');
    let tempH1 = document.createElement('h1');
    let tempSpan = document.createElement('span');
    let img = document.createElement('img');
    let conditionsP = document.createElement('p');
    let tempHiLoP = document.createElement('p');
    cityH2.innerHTML = city;
    cityH2.className = 'mt-3';
    dateH3.innerHTML = date.slice(0, 15);
    conditionsP.innerHTML = conditions;
    img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;
    if (unit === 'imperial') {
        tempSpan.innerHTML = `${temp}&#8457;`;
        tempHiLoP.innerHTML = `${tempHi}&#8457; / ${tempLo}&#8457;`;
    }
    else {
        tempSpan.innerHTML = `${temp}&#8451;`;
        tempHiLoP.innerHTML = `${tempHi}&#8451; / ${tempLo}&#8451;`;
    }
    tempSpan.classList.add('border-bottom', 'border-3');
    resultsDiv.classList.add('col-12', 'text-center', 'border', 'rounded');
    tempH1.appendChild(tempSpan);
    weatherTodayDiv.appendChild(cityH2);
    weatherTodayDiv.appendChild(dateH3);
    weatherTodayDiv.appendChild(tempH1);
    weatherTodayDiv.appendChild(img);
    weatherTodayDiv.appendChild(conditionsP);
    weatherTodayDiv.appendChild(tempHiLoP);
}
let getCurrentWeather = async (zipcode, unit) => {
    try {
        let data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}&units=${unit}`);
        let weather = await data.json();
        weatherTodayHTML(weather, unit);
        console.log(weather);
    }
    catch (error) {
        console.log(error);
    }
};
weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    weatherTodayDiv.innerHTML = "";
    const zipCodeInput = document.querySelector('#zipCode');
    const unitsSelect = document.querySelector('#units');
    if (zipCodeInput instanceof HTMLInputElement && unitsSelect instanceof HTMLSelectElement) {
        const zipCode = zipCodeInput.value;
        const units = unitsSelect.value;
        const unit = (units === 'Fahrenheit') ? 'imperial' : 'metric';
        getCurrentWeather(zipCode, unit);
    }
    else {
        console.error('Zip code input element or Units select element is not found');
    }
    weatherForm.reset();
});
// https://openweathermap.org/img/wn/13d@2x.png
