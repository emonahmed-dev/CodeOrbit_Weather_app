const searchInput = document.querySelector("#city-search-input");
const searchBtn = document.querySelector("#search-btn");
const closeCty = document.querySelector("#close-cty");
const temps = document.querySelectorAll(".temp");

temps.forEach(temp => {
  temp.addEventListener("click", (e) => {
    temps.forEach(item => {
      item.classList.remove("bg-surface-container-lowest")
    })
    e.currentTarget.classList.add("bg-surface-container-lowest")
  })
})

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
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(({ results }) => {
        if (!results) {
          return console.log("validation Error");
        }
        getWeatherData(results);
      })
      .catch(() => console.log("Network error"));
    // .finally(() => console.log("Finally off loading........."));

    searchInput.value = "";
  }
};

const getWeatherData = (results) => {
  const { latitude, longitude, timezone, name } = results[0];
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=${timezone}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => console.log(data));
};

searchBtn.addEventListener("click", getCoordinate);

closeCty.addEventListener("click", () => {
  searchInput.value = "";
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getCoordinate();
  }
});
