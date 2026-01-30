// Weather API Configuration
const apiKey = '350390bbf1828b6f3c0decce2bdf19c9'; // Using the key provided in context
const lat = '16.4023'; // Baguio City Latitude
const lon = '120.5960'; // Baguio City Longitude
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

// Member Data URL
const membersUrl = 'data/members.json';

// --- Weather Functionality ---
async function fetchWeather() {
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        if (weatherResponse.ok && forecastResponse.ok) {
            const weatherData = await weatherResponse.json();
            const forecastData = await forecastResponse.json();
            displayWeather(weatherData, forecastData);
        } else {
            throw new Error('Error fetching weather data');
        }
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(current, forecast) {
    const weatherContainer = document.getElementById('weather-container');
    
    // Current Weather
    const currentTemp = Math.round(current.main.temp);
    const description = current.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    // Process Forecast (Get one reading per day for next 3 days)
    // The API returns data every 3 hours. We filter for roughly 24-hour intervals (noon).
    const threeDayForecast = forecast.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    let forecastHTML = '<div class="forecast-container">';
    threeDayForecast.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        forecastHTML += `
            <div class="forecast-day">
                <p>${dayName}</p>
                <p><strong>${temp}&deg;F</strong></p>
            </div>
        `;
    });
    forecastHTML += '</div>';

    weatherContainer.innerHTML = `
        <div class="current-weather">
            <img src="${icon}" alt="${description}">
            <p class="temperature">${currentTemp}&deg;F</p>
            <p class="description">${description}</p>
        </div>
        <h4>3-Day Forecast</h4>
        ${forecastHTML}
    `;
}

// --- Spotlight Functionality ---
async function fetchMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlights(members) {
    // Filter for Gold (3) or Silver (2) members
    const qualifiedMembers = members.filter(member => 
        member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver' || 
        member.membershipLevel === 3 || member.membershipLevel === 2
    );

    // Shuffle and pick 2-3
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3); // Display up to 3

    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="images/${member.image}" alt="${member.name} Logo" loading="lazy">
            <p class="membership-tag">${member.membershipLevel === 3 || member.membershipLevel === 'Gold' ? 'Gold Member' : 'Silver Member'}</p>
            <div class="spotlight-info">
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Website</a>
            </div>
        `;
        container.appendChild(card);
    });
}

// Initialize
fetchWeather();
fetchMembers();