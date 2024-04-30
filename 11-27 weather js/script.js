const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityNameUI = document.querySelector(".location");
const tempreature = document.querySelector(".temp");
const feelsLike = document.querySelector(".feels .bold");
const humidity = document.querySelector(".humidity .bold");
const wind = document.querySelector(".wind .bold");
const celciusBtn = document.querySelector(".celcius");
const farenheitBtn = document.querySelector(".farenheit");
const body = document.querySelector("body");
const dark = document.querySelector(".dark");
const light = document.querySelector(".light");
let cityName = "";
let unit = "imperial";

const getCityTemp = async (cityName) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=45b6d1548d52a466627f72a82cb325e5&units=${unit}`
  );
  const data = await res.json();
  renderElements(data);
};

const getCityPic = async (cityName) => {
  const res = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=76lSVJPvbAXlVHOUl9Pnn4TQmrMWtjqXknZPgpAUEUI&query=${cityName}`
  );
  const data = await res.json();
  const url = data.results[1].urls.regular;
  body.style.backgroundImage = `url(${url})`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  cityName = cityInput.value;
  getCityTemp(cityName);
  getCityPic(cityName);
});

celciusBtn.addEventListener("click", () => {
  farenheitBtn.classList.remove("active");
  celciusBtn.classList.add("active");
  unit = "metric";
  getCityTemp(cityName);
});
farenheitBtn.addEventListener("click", () => {
  celciusBtn.classList.remove("active");
  farenheitBtn.classList.add("active");
  unit = "imperial";
  getCityTemp(cityName);
});

const renderElements = (data) => {
  let tempValue = unit === "imperial" ? "F" : "C";
  let speedValue = unit === "imperial" ? "miles/hr" : "km/hr";
  cityNameUI.innerHTML = data.name;
  tempreature.innerHTML = `${Math.round(
    data.main.temp
  )}° <span class="temp-unit">${tempValue}</span>`;
  feelsLike.innerText = `${Math.round(data.main.feels_like)}°`;
  humidity.innerText = `${data.main.humidity}%`;
  wind.innerText = `${data.wind.speed} ${speedValue}`;
};

function darkMode() {
  let element = document.body;
  element.classList.toggle("dark-mode");
}

function lightMode() {
  let item = document.querySelector(".mode");
  item.innerHTML.toggle("Light mode");
}
