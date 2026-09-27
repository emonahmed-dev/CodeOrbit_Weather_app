// fetch(
//   "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&timezone=Asia/Dhaka",
// ).then((res) => res.json().then((data) => console.log(data)));

// https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en

const searchInput = document.querySelector("#city-search-input");
const searchBtn = document.querySelector("#search-btn");
const closeCty = document.querySelector("#close-cty");

const getCoordinate = () => {
  let city = searchInput.value.trim().toLowerCase();
  if (!city) {
    return Swal.fire({
      title: "please add any city name",
      icon: "error",
      draggable: true,
    });
  } else if (city.includes(" ")) {
    return Swal.fire({
      title: "space do not allow between city name",
      icon: "error",
      draggable: true,
    });
  } else {
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=dhaka&count=1")
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(({ results }) => {
        if(!results){
         return console.log("validation Error");
        }
        console.log(results);
      })
      .catch(() => console.log( "Network error"))
      .finally(() => console.log("Finally off loading........."));

    searchInput.value = "";
  }
};
searchBtn.addEventListener("click", getCoordinate);

closeCty.addEventListener("click", () => {
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    return getCoordinate();
  }
});
