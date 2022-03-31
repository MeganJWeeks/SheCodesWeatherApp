localData();

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "31238b661b9adec256406a8e4f2cdbd1";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayCurrentData);
}

function localData() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function formatTime(timestamp) {
  let time = new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  console.log(time);

  return `${time}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp);
  let daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = daysList[date.getDay()];
  return `${day}`;

  //dayLabel.innerHTML = `${day}`;
}

function displayCurrentData(response) {
  document.querySelector("#show-city-heading").innerHTML = response.data.name;
  document.querySelector("span#temperature-large").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  let dateElement = document.querySelector(".time");
  dateElement.innerHTML = formatTime(response.data.dt * 1000);
  let dayElement = document.querySelector(".day");
  dayElement.innerHTML = formatDay(response.data.dt * 1000);

  //console.log(response.data);
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

// Convert unit action
//let isTempFormatCelcius = true;

//function convertToF() {
//let temperatureC = document.querySelector("span#temperature-units");

//if (isTempFormatCelcius) {
//temperatureC.innerHTML = `59°F`;
//isTempFormatCelcius = false;
//} else {
//temperatureC.innerHTML = `15°C`;
//isTempFormatCelcius = true;
//}
//}

//let temperatureClick = document.querySelector("span#temperature-units");

//temperatureClick.addEventListener("click", convertToF);
