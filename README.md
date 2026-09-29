# Weatherly — Weather Dashboard

A clean and responsive weather dashboard built with HTML, Tailwind CSS, and Vanilla JavaScript. The project uses the Open-Meteo APIs to search for cities and display weather information dynamically.

## Live Demo

https://code-orbit-weather-app-psi.vercel.app/

## 📸Preview

![Weatherly Preview](https://i.ibb.co.com/pjMpVsJL/Screenshot-2026-09-29-113709.png)

## Features

- Search weather by city name
- City and country identification through the Open-Meteo Geocoding API
- Dynamically displays current temperature, weather condition, feels-like temperature, high/low temperature, humidity, dew point, wind speed, wind direction, precipitation, pressure, visibility, and UV index
- Weather condition and icon mapping from Open-Meteo weather codes
- Loading skeleton state
- City not found state
- Network/API error state
- Empty search validation state
- Press Enter to search
- Clear search input button
- Responsive desktop, tablet, and mobile layout
- SweetAlert2 validation feedback

> Note: The Celsius/Fahrenheit toggle and "Use My Location" button are currently UI elements only. The forecast data is requested from the API, but its UI is currently not rendered.

## Technologies

- HTML5
- Tailwind CSS
- Vanilla JavaScript
- Open-Meteo Geocoding API
- Open-Meteo Forecast API
- SweetAlert2
- Material Symbols
- Google Fonts

## APIs

### Open-Meteo Geocoding API

Used to convert a city name into geographic coordinates.

```text
https://geocoding-api.open-meteo.com/v1/search
```

### Open-Meteo Forecast API

Used to retrieve weather data for the selected coordinates.

```text
https://api.open-meteo.com/v1/forecast
```

No API key is required for this project.

## How It Works

```text
User enters a city
        ↓
Validate input
        ↓
Geocoding API
        ↓
City → Latitude + Longitude
        ↓
Weather Forecast API
        ↓
Receive weather JSON
        ↓
Extract required values
        ↓
Map weather codes to conditions/icons
        ↓
Update the DOM
        ↓
Display weather information
```

## Project Structure

```text
Weatherly/
├── assets/
│   ├── logo.png
│   └── ...
├── index.html
├── input.css
├── style.css
├── script.js
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/emonahmed-dev/CodeOrbit_Weather_app.git
```

### 2. Open the project

```bash
cd CodeOrbit_Weather_app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Build Tailwind CSS

```bash
npm run build
```

### 5. Run the project

Open `index.html` in a browser or use VS Code Live Server.

## JavaScript Concepts Practiced

This project was mainly created to revise and strengthen Vanilla JavaScript fundamentals.

### DOM Manipulation

- `querySelector()`
- `querySelectorAll()`
- `getElementById()`
- `textContent`
- `innerHTML`
- `<template>` and `cloneNode()`
- Dynamic class manipulation

### Events

- `click`
- `keydown`
- Enter key handling

### API & Asynchronous JavaScript

- `fetch()`
- Promises
- `.then()`
- `.catch()`
- `response.json()`
- HTTP response checking with `response.ok`
- URL encoding with `encodeURIComponent()`

### JavaScript Data Handling

- Objects
- Arrays
- Destructuring
- Optional chaining
- `forEach()`
- Template literals
- Conditional statements
- Functions and parameters

### Application States

The project handles:

```text
Initial
  ↓
Loading
  ↓
Success
```

and:

```text
Validation Error
City Not Found
Network/API Error
```

## Weather Code Mapping

Open-Meteo returns WMO weather codes rather than ready-made condition names.

The application converts those numeric codes into readable weather conditions and Material Symbols icons.

Examples:

```text
0          → Clear Sky
1, 2, 3    → Partly Cloudy
45, 48     → Freezing Fog
51, 53, 55 → Drizzle
61, 63, 65 → Rain
71, 73, 75 → Snow Fall
80, 81, 82 → Rain Showers
95, 96, 99 → Thunderstorm
```

## Responsive Design

The interface is designed for:

- Desktop
- Tablet
- Mobile

Tailwind CSS responsive utilities are used to adapt the layout, search controls, weather cards, and spacing.

## What I Learned

- How to work with a public weather API
- How to use a geocoding API before requesting weather data
- How to chain dependent API requests
- How to handle asynchronous JavaScript
- How to validate user input
- How to handle loading, success, validation, not-found, and network-error states
- How to extract values from nested API responses
- How to dynamically update an existing UI
- How to map API codes to user-friendly content
- How to build a responsive API-driven interface with Vanilla JavaScript

## Future Improvements

- Implement Celsius/Fahrenheit conversion
- Implement the "Use My Location" feature
- Render the 5-day forecast dynamically
- Add retry functionality to the network-error state
- Add clickable example-city buttons
- Improve precipitation probability handling
- Expand weather-code mapping
- Add recent-search functionality

## Credits

- Weather data: Open-Meteo
- Alert dialogs: SweetAlert2
- Icons: Material Symbols
- UI styling: Tailwind CSS

## Author

**Md Emon**

Frontend Developer in Progress
