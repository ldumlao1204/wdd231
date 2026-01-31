// ================================================
// WEATHER API - OpenWeatherMap
// ================================================

// API Configuration
const apiKey = '350390bbf1828b6f3c0decce2bdf19c9'; // My API key
const lat = '16.41312336329535';  // Baguio City Latitude
const lon = '120.58716868053386'; // Baguio City Longitude

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Fetch Weather Data
async function fetchWeather() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (weatherResponse.ok && forecastResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayCurrentWeather(weatherData);
            displayForecast(forecastData);
        } else {
            throw new Error('Error fetching weather data');
        }
    } catch (error) {
        console.error('Weather fetch error:', error);
        displayWeatherError();
    }
}

// Display Current Weather
function displayCurrentWeather(data) {
    const iconContainer = document.getElementById('icon-container');
    const descElement = document.getElementById('desc');
    const cityElement = document.getElementById('city');
    const tempElement = document.getElementById('current-temp');

    if (!iconContainer || !descElement || !cityElement || !tempElement) {
        console.error('Weather display elements not found');
        return;
    }

    // Current weather details
    const currentTemp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const cityName = data.name;

    // Update DOM elements
    iconContainer.innerHTML = `<img src="${iconUrl}" alt="${description}" id="weather-icon">`;
    descElement.textContent = description;
    cityElement.textContent = cityName;
    tempElement.innerHTML = `${currentTemp}&deg;C`;
}

// Display 3-Day Forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-content');

    if (!forecastContainer) {
        console.error('Forecast container not found');
        return;
    }

    // Filter for noon readings (12:00:00) to get one per day
    const threeDayForecast = data.list
        .filter(item => item.dt_txt.includes('12:00:00'))
        .slice(0, 3);

    let forecastHTML = '';

    threeDayForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const temp = Math.round(day.main.temp);
        const description = day.weather[0].description;

        forecastHTML += `
            <p><strong>${dayName}:</strong> ${temp}&deg;C - ${description}</p>
        `;
    });

    forecastContainer.innerHTML = forecastHTML;
}

// Display error message
function displayWeatherError() {
    const tempElement = document.getElementById('current-temp');
    if (tempElement) {
        tempElement.textContent = 'Weather data unavailable';
    }
}

// Initialize weather on page load
if (document.getElementById('current-temp')) {
    fetchWeather();
}