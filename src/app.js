let celsiusTemperature = null;
function callAxios(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "31238b661b9adec256406a8e4f2cdbd1";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentData);
}

function localData() {
  navigator.geolocation.getCurrentPosition(callAxios);
}

function formatDay(timestamp) {
  let day = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = days[day.getDay()];
  return `${dayOfWeek}`;
}

function formatTimeData(timestamp) {
  let timeData = new Date(timestamp).toLocaleTimeString("en", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
  return `${timeData}`;
}

function displayCurrentData(response) {
  console.log(response);
  document.querySelector("#show-city-heading").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("span#temperature-large").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let iconElement = document.querySelector("#weather-icon-large");
  iconElement.setAttribute(
    "src",
    `./src/icons/${response.data.weather[0].icon}.svg`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  let dayElement = document.querySelector(".day");
  dayElement.innerHTML = formatDay(
    Math.floor(new Date().getTime() / 1000 + response.data.timezone) * 1000
  );
  console.log(response.data.timezone);

  let timeAtDataElement = document.querySelector(".time");
  timeAtDataElement.innerHTML = formatTimeData(
    Math.floor(new Date().getTime() / 1000 + response.data.timezone) * 1000
  );
}

//Display forecast data

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `<div class="col">
      <div class="day-mini">Tue</div>
      <img src="#" alt="⭐" class="weather-icon-mini" />
      <div class="temp-mini-high">15°C</div>
      <div class="temp-mini-low">2°C</div>
    </div>`;
  forecastHTML =
    forecastHTML +
    `<div class="col">
      <div class="day-mini">Tue</div>
      <img src="#" alt="⭐" class="weather-icon-mini" />
      <div class="temp-mini-high">15°C</div>
      <div class="temp-mini-low">2°C</div>
    </div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Search box action

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#input-city-box").value;
  searchCity(cityName);
}

function searchCity(cityName) {
  let unitDisplay = "metric";
  let apiKey = "31238b661b9adec256406a8e4f2cdbd1";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unitDisplay}`;
  axios.get(url).then(displayCurrentData);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", localData);

//Temperature conversion

function convertToF(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature-large");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToC(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature-large");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#farenheit-link");
fahrenheitLink.addEventListener("click", convertToF);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);
localData();
displayForecast();
