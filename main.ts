const apiKey: string = '864ae738677cc5d64c1c11e8994328b9';
const resultsDiv: HTMLElement = document.querySelector('#results')!;
const weatherForm: HTMLFormElement = document.querySelector('form')!;
const weatherTodayDiv: HTMLElement = document.querySelector('#weatherToday')!;

function weatherTodayHTML(weather: any, unit: string): void {
  let city: string = weather.name;
  let date: string = new Date(weather.dt).toString();
  let temp: number = Math.round(weather.main.temp);
  let conditions: string = weather.weather[0].main;
  let tempHi: number = Math.round(weather.main.temp_max);
  let tempLo: number = Math.round(weather.main.temp_min);

  let cityH2: HTMLHeadingElement = document.createElement('h2');
  let dateH3: HTMLHeadingElement = document.createElement('h3');
  let tempH1: HTMLHeadingElement = document.createElement('h1');
  let tempSpan: HTMLSpanElement = document.createElement('span');
  let img: HTMLImageElement = document.createElement('img');
  let conditionsP: HTMLParagraphElement = document.createElement('p');
  let tempHiLoP: HTMLParagraphElement = document.createElement('p');

  cityH2.innerHTML = city;
  cityH2.className = 'mt-3';
  dateH3.innerHTML = date.slice(0, 15);
  conditionsP.innerHTML = conditions;
  img.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  if (unit === 'imperial') {
    tempSpan.innerHTML = `${temp}&#8457;`;
    tempHiLoP.innerHTML = `${tempHi}&#8457; / ${tempLo}&#8457;`;
  } else {
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

let getCurrentWeather = async (zipcode: string, unit: string): Promise<void> => {
  try {
    let data: Response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${apiKey}&units=${unit}`);

    let weather: any = await data.json();

    weatherTodayHTML(weather, unit);
    console.log(weather);
  } catch (error) {
    console.log(error);
  }
}

weatherForm.addEventListener('submit', event => {
  event.preventDefault();
  weatherTodayDiv.innerHTML = "";
  const zipCodeInput = document.querySelector('#zipCode');
  const unitsSelect = document.querySelector('#units');
  if (zipCodeInput instanceof HTMLInputElement && unitsSelect instanceof HTMLSelectElement) {
    const zipCode: string = zipCodeInput.value;
    const units: string = unitsSelect.value;
    const unit: string = (units === 'Fahrenheit') ? 'imperial' : 'metric';

    getCurrentWeather(zipCode, unit);
  } else {
    console.error('Zip code input element or Units select element is not found');
  }

  weatherForm.reset();
});

// https://openweathermap.org/img/wn/13d@2x.png
