const searchBar = document.querySelector(".search-bar");
const stateName = document.querySelector(".State");
const dateElement = document.querySelector(".date");
const cond = document.querySelector(".cond");
const temp = document.querySelector(".temp");
const iconw = document.querySelector(".iconw");
const sunset = document.querySelector(".sunset");
const sunrise = document.querySelector(".sunrise");

fetch("https://ipinfo.io/json")
  .then((r) => r.json())
  .then((data) => fetchAndUpdate(data.city));

const API_KEY = "1561b2c4b7ada334819f833f3abb18eb";

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchAndUpdate(searchBar.value);
});
document
  .querySelector(".search-icon")
  .addEventListener("click", () => fetchAndUpdate(searchBar.value));

async function fetchAndUpdate(state) {
  searchBar.value = "";
  console.log(state);
  await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      state +
      "&appid=" +
      API_KEY
  )
    .then((response) => {
      if (response.status === 200) return response.json();
      else alert("Enter valid state ");
    })
    .then((data) => {
      console.log(data);
      console.log(data.main.feels_like - 273);
      temp.textContent = Math.floor(data.main.temp - 273) + " °C";
      cond.textContent = data.weather[0].description;
      stateName.textContent = data.name;
      var tt = new Date();
      // console.log(tt.slice(0, 21));
      // dateElement.textContent = tt.slice(0, 21);
      dateElement.textContent = "As of " + tt.toLocaleTimeString();
      updateIconAndBkg(data.weather[0].id, data.weather[0].icon);
      sunrise.textContent = new Date(
        1000 * data.sys.sunrise
      ).toLocaleTimeString();
      sunset.textContent = new Date(
        1000 * data.sys.sunset
      ).toLocaleTimeString();
      temp.click();
      temp.focus();
    });
}

function updateIconAndBkg(id, iconid) {
  console.log(id, iconid);
  if (iconid === "50d" || iconid === "50n")
    iconw.setAttribute("src", "images/weather-icons/" + id + ".png");
  else iconw.setAttribute("src", "images/weather-icons/" + iconid + ".png");
}
