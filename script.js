const searchBar = document.querySelector(".search-bar");
const stateName = document.querySelector(".State");

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
      console.log(data.weather[0].description);
      stateName.textContent = data.name;
    });
}
