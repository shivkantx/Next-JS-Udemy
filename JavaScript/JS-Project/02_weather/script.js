document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "f47e99179f3e7111ba5eed5ad7be769a";

  // Button click event
  getWeatherBtn.addEventListener("click", getWeather);

  // Press Enter to search
  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      getWeather();
    }
  });

  async function getWeather() {
    const city = cityInput.value.trim();

    if (!city) {
      showError("Please enter a city name");
      return;
    }

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      console.error("Error:", error);
      showError(error.message);
    }
  }

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    console.log("Response:", response);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log("Weather Data:", data);

    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }

  function showError(message) {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
    errorMessage.textContent = message;
  }
});
