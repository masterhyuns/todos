const IMAGE_NUMBER = 13;
const ACTIVE_CLASS = "active";
const COORDS = "coords";
const weather = document.querySelector(".js-weather");
const API_KEY = "8dfaabf0bce650043c75f3a82a334fca";

function loadingBackgroundImage() {
  setInterval(() => {
    const number = Math.floor(Math.random() * IMAGE_NUMBER) + 1;
    bodyEl.style.backgroundImage = `url('./todos/images/bg/mac_bg_${number}.jpeg')`;
  }, 5000);
}
function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerHTML = `기온 : ${temperature}°C  </br>위치 : ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCords = localStorage.getItem(COORDS);
  if (loadedCords === null) {
    askForCoords();
  } else {
    // getWeather
    const parseCoords = JSON.parse(loadedCords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function indexInit() {
  loadingBackgroundImage();
  loadCoords();
}
indexInit();
