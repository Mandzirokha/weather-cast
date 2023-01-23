function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentTime = new Date();
  let currentDay = days[currentTime.getDay()];
  let currentHours = formatHours(currentTime);
  let currentMinutes = formatMinutes(currentTime);

  let currentDate = `${currentHours}:${currentMinutes}`;

  let dayEl = document.querySelector("#date");
  return (dayEl.innerHTML = `${currentDay} ${currentDate}`);
}

function formatHours(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return hours;
}

function formatMinutes(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return minutes;
}

formatDate();

let formEl = document.querySelector("#search-form");
formEl.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  e.currentTarget.reset();
}

const API_KEY = "3499ef150985eccadd080ff408a018df";
const URL = "https://api.openweathermap.org/data/2.5/weather";

function searchCity(city) {
  let apiUrl = `${URL}?q=${city}&appid=${API_KEY}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function showWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

searchCity("Kyiv");
