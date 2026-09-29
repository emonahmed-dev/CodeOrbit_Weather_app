const searchInput = document.querySelector("#city-search-input");
const searchBtn = document.querySelector("#search-btn");
const closeCty = document.querySelector("#close-cty");
const temps = document.querySelectorAll(".temp");
const successState = document.getElementById("state-success");
const initialState = document.getElementById("state-initial");
const loadingState = document.getElementById("state-loading");
const NotFoundState = document.getElementById("state-404");
const NetworkState = document.getElementById("state-offline");
const validationState = document.getElementById("state-validation");
const states = document.querySelectorAll(".state");

let cityName = "";
let countryName = "";

temps.forEach((temp) => {
  temp.addEventListener("click", (e) => {
    temps.forEach((item) => {
      item.classList.remove("bg-surface-container-lowest");
    });
    e.currentTarget.classList.add("bg-surface-container-lowest");
  });
});

const showState = (state) => {
  states.forEach((el) => {
    el.classList.replace("flex", "hidden");
  });
  state.classList.replace("hidden", "flex");
};

const getCoordinate = () => {
  showState(loadingState);
  let city = searchInput.value.trim().toLowerCase();
  if (!city) {
    Swal.fire({
      title: "please add any city name",
      icon: "error",
      draggable: true,
    });
    return showState(validationState);
  } else {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then(({ results }) => {
        if (!results || results.length === 0) {
          document.getElementById("not-found-query").textContent = city;
          return showState(NotFoundState);
        }
        countryName = results[0].country || "";
        cityName = results[0].name;
        getWeatherData(results);
      })
      .catch(() => showState(NetworkState));

    searchInput.value = "";
  }
};

const getWeatherData = (results) => {
  const { latitude, longitude, timezone } = results[0];
  fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,visibility,dew_point_2m&hourly=temperature_2m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max&timezone=${timezone}`,
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then((data) => showWeather(data))
    .catch(() => showState(NetworkState));
};

const showWeather = (weather) => {
  successState.innerHTML = "";
  const max = weather?.daily?.temperature_2m_max[0];
  const min = weather?.daily?.temperature_2m_min[0];
  const uv = weather?.daily?.uv_index_max[0];
  const {
    temperature_2m,
    weather_code,
    apparent_temperature,
    relative_humidity_2m,
    dew_point_2m,
    wind_speed_10m,
    wind_direction_10m,
    precipitation,
    surface_pressure,
    visibility,
  } = weather.current || weather.daily || {};

  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  const index = Math.round(wind_direction_10m / 22.5) % 16;
  const windDirection = directions[index];
  let weatherIcon = "";
  let weatherCondition = "";
  if (weather_code === 0) {
    weatherCondition = "Clear Sky";
    weatherIcon = "sunny";
  } else if (weather_code === 1 || weather_code === 2 || weather_code === 3) {
    weatherCondition = "Partly Cloudy";
    weatherIcon = "partly_cloudy_day";
  } else if (weather_code === 45 || weather_code === 48) {
    weatherCondition = "Freezing Fog";
    weatherIcon = "foggy";
  } else if (
    weather_code === 51 ||
    weather_code === 53 ||
    weather_code === 55
  ) {
    weatherCondition = "Drizzle";
    weatherIcon = "grain";
  } else if (
    weather_code === 61 ||
    weather_code === 63 ||
    weather_code === 65
  ) {
    weatherCondition = "Rain";
    weatherIcon = "rainy";
  } else if (
    weather_code === 71 ||
    weather_code === 73 ||
    weather_code === 75
  ) {
    weatherCondition = "Snow Fall";
    weatherIcon = "ac_unit";
  } else if (
    weather_code === 80 ||
    weather_code === 81 ||
    weather_code === 82
  ) {
    weatherCondition = "Rain Showers";
    weatherIcon = "shower";
  } else if (
    weather_code === 95 ||
    weather_code === 96 ||
    weather_code === 99
  ) {
    weatherCondition = "Thunderstorm";
    weatherIcon = "thunderstorm";
  } else {
    weatherCondition = "Unknown Weather";
    weatherIcon = "device_thermostat";
  }

  const now = new Date();
  const formattedTime = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const tmpl = document.querySelector("template");
  const clone = tmpl.content.cloneNode(true);
  clone.querySelector("#feels-like-val").textContent =
    `${apparent_temperature}°C`;
  clone.querySelector("#hero-weather-icon").textContent = weatherIcon;
  clone.querySelector("#hero-city-name").textContent = cityName;
  clone.querySelector("#hero-country-name").textContent = countryName;
  clone.querySelector("#hero-local-time").textContent = formattedTime;
  clone.querySelector("#range-val").textContent = `H: ${max}°C • L: ${min}°C`;
  clone.querySelector("#hero-temp-display").textContent = temperature_2m;
  clone.querySelector("#hero-condition-text").textContent = weatherCondition;
  clone.querySelector("#metric-humidity").textContent = relative_humidity_2m;
  clone.querySelector("#humidity-dew").textContent =
    `Dew point ${dew_point_2m}°`;
  clone.querySelector("#wind-direction").textContent =
    `Direction: ${windDirection}(${wind_direction_10m}°)`;
  clone.querySelector("#metric-wind").textContent = wind_speed_10m;
  clone.querySelector("#metric-rain").textContent = precipitation;
  clone.querySelector("#Precipitation-expected").textContent =
    `${precipitation} mm expected`;
  clone.querySelector("#metric-pressure").textContent = surface_pressure;
  clone.querySelector("#metric-visibility").textContent = visibility / 1000;
  clone.querySelector("#metric-uv").textContent = Math.floor(uv);
  clone.querySelector("#bar-humidity").style.width = `${relative_humidity_2m}%`;
  clone.querySelector("#bar-Precipitation").style.width = `${precipitation}%`;
  clone.querySelector("#bar-pressure").style.width =
    `${((surface_pressure - 980) / 70) * 100}%`;
  clone.querySelector("#bar-visibility").style.width =
    `${Math.min((visibility / 10000) * 100, 100)}%`;
  clone.querySelector("#bar-wind").style.width =
    `${(wind_speed_10m / 50) * 100}%`;
  clone.querySelector("#bar-uv").style.width =
    `${Math.floor((uv / 11) * 100)}% `;
  successState.appendChild(clone);
  showState(successState);
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

showState(initialState);
