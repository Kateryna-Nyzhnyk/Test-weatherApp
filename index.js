new Date();

let now = new Date();
console.log(now.getMilliseconds());

console.log(now.getDay());
console.log(now.getHours());

console.log(now.getFullYear());

console.log(now.getMonth());
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();

h2.innerHTML = `${day}, ${hour}:${minute}, ${month} ${date}, ${year}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let h3 = document.querySelector("h3");
  h3.innerHTML = `Searching for ${searchInput.value}`;
}

let form = document.querySelector("form");

form.addEventListener("submit", search);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

//week5

function displayTemperature(response) {
  let temperatureValue = Math.round(response.data.main.temp);
  let tempMain = document.querySelector("#now-temp");
  tempMain.innerHTML = `${temperatureValue}`;
  let weatherInCity = document.querySelector("#city");
  weatherInCity.innerHTML = response.data.name;
}

function searchLocation(event) {
  event.preventDefault();

  let input = document.querySelector("#city-form-input");
  let weatherInCity = document.querySelector("#city");

  if (input.value) {
    weatherInCity.innerHTML = `${input.value}`;
    let apiKey = "5e387561f8f5058e809d86875e69f37e";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayTemperature);
  } else {
    weatherInCity.innerHTML = "We do not know where you are";
  }
}

let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", searchLocation);

//Homework week5, task 2

function getCurrentCityTemp(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "2e8a4b45b375acbabf901bd141fc3608";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentCityTemp);
}

let currentWeatherButton = document.querySelector("#current-location-button");
currentWeatherButton.addEventListener("click", getCurrentPosition);
