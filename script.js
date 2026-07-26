/**
 * ============================================
 * REAL-TIME WEATHER DASHBOARD - JavaScript
 * ============================================
 * This file handles all the functionality including:
 * - API calls to OpenWeatherMap
 * - DOM manipulation
 * - Event listeners
 * - Local storage for search history
 * - Geolocation API
 * - Temperature unit conversion
 * - Dark/Light mode toggle
 * - Weather-based background changes
 * ============================================
 */

// ============================================
// 1. CONFIGURATION & API KEY
// ============================================

// IMPORTANT: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
// Get your free API key from: https://openweathermap.org/api
const API_KEY = "830889ef400efb1f29e0ab83d5464aa7";

// Base URL for OpenWeatherMap API
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// ============================================
// 2. DOM ELEMENTS - Getting references to HTML elements
// ============================================

// Search elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const locationBtn = document.getElementById('locationBtn');
const refreshBtn = document.getElementById('refreshBtn');
const searchHistory = document.getElementById('searchHistory');

// Loading and error elements
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');

// Weather display elements
const weatherDisplay = document.getElementById('weatherDisplay');
const cityName = document.getElementById('cityName');
const currentDateTime = document.getElementById('currentDateTime');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const pressure = document.getElementById('pressure');
const visibility = document.getElementById('visibility');
const sunrise = document.getElementById('sunrise');
const sunset = document.getElementById('sunset');

// Forecast elements
const forecastContainer = document.getElementById('forecastContainer');

// Theme toggle
const themeToggle = document.getElementById('themeToggle');

// Unit toggle
const unitToggle = document.getElementById('unitToggle');

// ============================================
// 3. APPLICATION STATE
// ============================================

// Store the current state of the application
let state = {
    currentCity: '',        // Currently displayed city name
    currentCountry: '',     // Currently displayed country code
    currentTemp: 0,         // Current temperature in Kelvin
    isCelsius: true,        // Temperature unit: true = °C, false = °F
    isDarkMode: false,      // Theme mode: true = dark, false = light
    searchHistoryList: [],  // Array of searched cities
    weatherData: null,      // Full weather data object from API
    forecastData: null,     // Full forecast data object from API
    lat: null,              // Latitude for current location
    lon: null               // Longitude for current location
};

// ============================================
// 4. INITIALIZATION - Runs when page loads
// ============================================

/**
 * Initialize the application
 * - Load saved settings from localStorage
 * - Load search history from localStorage
 * - Setup event listeners
 * - Load default city weather
 */
function init() {
    console.log('Weather Dashboard initializing...');
    
    // Load saved settings from localStorage
    loadSavedSettings();
    
    // Load search history from localStorage
    loadSearchHistory();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Load default city weather (London as default)
    getWeatherData('London');
}

// ============================================
// 5. LOCAL STORAGE FUNCTIONS
// ============================================

/**
 * Save user settings to localStorage
 * Saves: theme preference, temperature unit preference
 */
function saveSettings() {
    try {
        const settings = {
            isDarkMode: state.isDarkMode,
            isCelsius: state.isCelsius
        };
        localStorage.setItem('weatherSettings', JSON.stringify(settings));
        console.log('Settings saved to localStorage');
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

/**
 * Load saved settings from localStorage
 */
function loadSavedSettings() {
    try {
        const settingsJSON = localStorage.getItem('weatherSettings');
        if (settingsJSON) {
            const settings = JSON.parse(settingsJSON);
            state.isDarkMode = settings.isDarkMode || false;
            state.isCelsius = settings.isCelsius !== undefined ? settings.isCelsius : true;
            
            // Apply loaded settings to UI
            if (state.isDarkMode) {
                document.body.classList.add('dark-mode');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
            
            updateUnitDisplay();
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

/**
 * Save search history to localStorage
 * Only saves unique cities, max 10 items
 */
function saveSearchHistory() {
    try {
        // Remove duplicates and keep only unique cities
        const uniqueHistory = [...new Set(state.searchHistoryList)];
        // Keep only last 10 items
        const limitedHistory = uniqueHistory.slice(0, 10);
        localStorage.setItem('searchHistory', JSON.stringify(limitedHistory));
        console.log('Search history saved to localStorage');
    } catch (error) {
        console.error('Error saving search history:', error);
    }
}

/**
 * Load search history from localStorage
 */
function loadSearchHistory() {
    try {
        const historyJSON = localStorage.getItem('searchHistory');
        if (historyJSON) {
            state.searchHistoryList = JSON.parse(historyJSON);
            renderSearchHistory();
            console.log('Search history loaded from localStorage');
        }
    } catch (error) {
        console.error('Error loading search history:', error);
        state.searchHistoryList = [];
    }
}

// ============================================
// 6. EVENT LISTENERS SETUP
// ============================================

/**
 * Set up all event listeners for the application
 */
function setupEventListeners() {
    // Search button click
    searchBtn.addEventListener('click', handleSearch);
    
    // Enter key press in search input
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    // Location button click
    locationBtn.addEventListener('click', getCurrentLocationWeather);
    
    // Refresh button click
    refreshBtn.addEventListener('click', refreshWeather);
    
    // Theme toggle button click
    themeToggle.addEventListener('click', toggleTheme);
    
    // Unit toggle button click
    unitToggle.addEventListener('click', toggleUnit);
}

// ============================================
// 7. SEARCH FUNCTIONALITY
// ============================================

/**
 * Handle search input and trigger weather fetch
 */
function handleSearch() {
    const city = searchInput.value.trim();
    
    // Validate input - must not be empty
    if (!city) {
        showError('Please enter a city name');
        return;
    }
    
    // Fetch weather data for the entered city
    getWeatherData(city);
}

/**
 * Add a city to search history
 * @param {string} city - City name to add to history
 */
function addToSearchHistory(city) {
    // Don't add if city is empty
    if (!city) return;
    
    // Remove city if it already exists (to move it to the top)
    state.searchHistoryList = state.searchHistoryList.filter(item => 
        item.toLowerCase() !== city.toLowerCase()
    );
    
    // Add city to the beginning of the array
    state.searchHistoryList.unshift(city);
    
    // Keep only last 10 items
    if (state.searchHistoryList.length > 10) {
        state.searchHistoryList.pop();
    }
    
    // Save to localStorage and re-render
    saveSearchHistory();
    renderSearchHistory();
}

/**
 * Render search history as clickable tags
 */
function renderSearchHistory() {
    if (state.searchHistoryList.length === 0) {
        searchHistory.innerHTML = '';
        return;
    }
    
    // Create HTML for each history item
    let historyHTML = '';
    state.searchHistoryList.forEach(city => {
        historyHTML += `
            <div class="history-item" data-city="${city}">
                <i class="fas fa-history"></i>
                ${city}
                <span class="remove-history" data-city="${city}">×</span>
            </div>
        `;
    });
    
    searchHistory.innerHTML = historyHTML;
    
    // Add click event listeners to history items
    document.querySelectorAll('.history-item').forEach(item => {
        // Click on the item to search that city
        item.addEventListener('click', (e) => {
            // Don't trigger if clicking the remove button
            if (e.target.classList.contains('remove-history')) return;
            
            const city = item.dataset.city;
            if (city) {
                searchInput.value = city;
                getWeatherData(city);
            }
        });
        
        // Click on the remove button to delete history item
        const removeBtn = item.querySelector('.remove-history');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                const city = removeBtn.dataset.city;
                removeFromSearchHistory(city);
            });
        }
    });
}

/**
 * Remove a city from search history
 * @param {string} city - City name to remove
 */
function removeFromSearchHistory(city) {
    state.searchHistoryList = state.searchHistoryList.filter(item => 
        item.toLowerCase() !== city.toLowerCase()
    );
    saveSearchHistory();
    renderSearchHistory();
}

// ============================================
// 8. GEOLOCATION API - Get current location weather
// ============================================

/**
 * Get user's current location using Geolocation API
 * Then fetch weather data for that location
 */
function getCurrentLocationWeather() {
    // Check if browser supports Geolocation API
    if (!navigator.geolocation) {
        showError('Geolocation is not supported by your browser');
        return;
    }
    
    // Show loading state
    showLoading();
    
    // Get current position
    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            // Extract latitude and longitude from position
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Store in state
            state.lat = lat;
            state.lon = lon;
            
            // Fetch weather data using coordinates
            getWeatherDataByCoords(lat, lon);
        },
        // Error callback
        (error) => {
            console.error('Geolocation error:', error);
            hideLoading();
            
            // Show user-friendly error message
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    showError('Location permission denied. Please allow location access and try again.');
                    break;
                case error.POSITION_UNAVAILABLE:
                    showError('Location information is unavailable. Please enter a city name manually.');
                    break;
                case error.TIMEOUT:
                    showError('Location request timed out. Please try again.');
                    break;
                default:
                    showError('Unable to get your location. Please enter a city name.');
            }
        },
        // Options for geolocation
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

// ============================================
// 9. API CALLS - Fetch weather data
// ============================================

/**
 * Fetch weather data by city name
 * @param {string} city - City name to search
 */
async function getWeatherData(city) {
    // Validate city input
    if (!city || city.trim() === '') {
        showError('Please enter a valid city name');
        return;
    }
    
    // Show loading state
    showLoading();
    hideError();
    hideWeatherDisplay();
    
    try {
        // Build the API URL for current weather
        const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
        
        console.log(`Fetching weather data for: ${city}`);
        
        // Make API call using fetch
        const response = await fetch(url);
        
        // Check if response is successful
        if (!response.ok) {
            // Handle specific HTTP errors
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else if (response.status === 429) {
                throw new Error('Too many requests. Please wait a moment and try again.');
            } else {
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
            }
        }
        
        // Parse JSON response
        const data = await response.json();
        console.log('Weather data received:', data);
        
        // Store weather data in state
        state.weatherData = data;
        state.currentCity = data.name;
        state.currentCountry = data.sys.country;
        state.currentTemp = data.main.temp;
        
        // Add to search history
        addToSearchHistory(data.name);
        
        // Now fetch 5-day forecast
        await getForecastData(data.coord.lat, data.coord.lon);
        
        // Update UI with weather data
        updateWeatherDisplay(data);
        
        // Change background based on weather
        updateBackground(data.weather[0].main);
        
        // Hide loading, show weather display
        hideLoading();
        showWeatherDisplay();
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        hideLoading();
        showError(error.message || 'Failed to fetch weather data. Please try again.');
    }
}

/**
 * Fetch weather data by coordinates (latitude and longitude)
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
async function getWeatherDataByCoords(lat, lon) {
    showLoading();
    hideError();
    hideWeatherDisplay();
    
    try {
        // Build the API URL for current weather by coordinates
        const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        
        console.log(`Fetching weather data for coordinates: ${lat}, ${lon}`);
        
        // Make API call
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Location not found. Please try a different location.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your OpenWeatherMap API key.');
            } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        }
        
        const data = await response.json();
        console.log('Location weather data received:', data);
        
        // Store in state
        state.weatherData = data;
        state.currentCity = data.name;
        state.currentCountry = data.sys.country;
        state.currentTemp = data.main.temp;
        state.lat = lat;
        state.lon = lon;
        
        // Add to search history
        addToSearchHistory(data.name);
        
        // Fetch forecast
        await getForecastData(lat, lon);
        
        // Update UI
        updateWeatherDisplay(data);
        updateBackground(data.weather[0].main);
        
        hideLoading();
        showWeatherDisplay();
        
    } catch (error) {
        console.error('Error fetching weather by coordinates:', error);
        hideLoading();
        showError(error.message || 'Failed to fetch weather for your location. Please search for a city.');
    }
}

/**
 * Fetch 5-day weather forecast
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
async function getForecastData(lat, lon) {
    try {
        // Build forecast API URL
        const url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
        
        console.log('Fetching forecast data...');
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Forecast API error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Forecast data received:', data);
        
        // Store forecast data in state
        state.forecastData = data;
        
        // Update forecast display
        updateForecastDisplay(data);
        
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        // Don't show error for forecast - weather data is more important
        forecastContainer.innerHTML = '<p style="color: rgba(255,255,255,0.6);">Forecast data temporarily unavailable</p>';
    }
}

// ============================================
// 10. UPDATE UI - Display weather data
// ============================================

/**
 * Update the UI with current weather data
 * @param {Object} data - Weather data from API
 */
function updateWeatherDisplay(data) {
    // Update city and country
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    
    // Update date and time
    updateDateTime();
    
    // Update temperature (convert from Kelvin)
    const tempInCelsius = data.main.temp - 273.15;
    state.currentTemp = data.main.temp; // Store in Kelvin
    updateTemperatureDisplay(tempInCelsius);
    
    // Update weather description (capitalized)
    const description = data.weather[0].description;
    weatherDescription.textContent = description.charAt(0).toUpperCase() + description.slice(1);
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
    
    // Update humidity
    humidity.textContent = `${data.main.humidity}%`;
    
    // Update wind speed (convert from m/s to km/h)
    const windSpeedKmh = (data.wind.speed * 3.6).toFixed(1);
    windSpeed.textContent = `${windSpeedKmh} km/h`;
    
    // Update pressure (in hPa)
    pressure.textContent = `${data.main.pressure} hPa`;
    
    // Update visibility (convert from meters to km)
    const visibilityKm = (data.visibility / 1000).toFixed(1);
    visibility.textContent = `${visibilityKm} km`;
    
    // Update sunrise and sunset (convert Unix timestamp to readable time)
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    sunrise.textContent = formatTime(sunriseTime);
    sunset.textContent = formatTime(sunsetTime);
}

/**
 * Update the 5-day forecast display
 * @param {Object} data - Forecast data from API
 */
function updateForecastDisplay(data) {
    // Clear existing forecast
    forecastContainer.innerHTML = '';
    
    // Group forecast data by day (get one entry per day at noon)
    const dailyForecasts = {};
    const list = data.list;
    
    list.forEach(item => {
        // Extract date from timestamp
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        // Only keep forecast at noon (around 12:00) for each day
        const hour = date.getHours();
        if (hour >= 11 && hour <= 13) {
            dailyForecasts[dateKey] = item;
        }
    });
    
    // Convert to array and get first 5 days
    const forecastDays = Object.values(dailyForecasts).slice(0, 5);
    
    // If we don't have 5 days of data, use whatever we have
    if (forecastDays.length < 5) {
        // Alternative: take every 8th entry (3-hour intervals, 8 per day)
        const alternativeForecast = [];
        for (let i = 0; i < list.length && alternativeForecast.length < 5; i += 8) {
            alternativeForecast.push(list[i]);
        }
        forecastDays.length = 0;
        forecastDays.push(...alternativeForecast);
    }
    
    // Create a forecast card for each day
    forecastDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        // Temperature in Celsius
        const tempCelsius = day.main.temp - 273.15;
        const tempDisplay = state.isCelsius ? 
            `${Math.round(tempCelsius)}°C` : 
            `${Math.round((tempCelsius * 9/5) + 32)}°F`;
        
        // Create card HTML
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <div class="day">${dayName}</div>
            <div class="forecast-date">${dayDate}</div>
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" 
                 alt="${day.weather[0].description}">
            <div class="forecast-temp">${tempDisplay}</div>
            <div class="forecast-desc">${day.weather[0].description}</div>
        `;
        
        forecastContainer.appendChild(card);
    });
}

/**
 * Update the date and time display
 * Updates every second
 */
function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };
    currentDateTime.textContent = now.toLocaleDateString('en-US', options);
}

// Update date/time every second
setInterval(updateDateTime, 1000);

/**
 * Format Unix timestamp to readable time
 * @param {Date} date - Date object
 * @returns {string} Formatted time string
 */
function formatTime(date) {
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

// ============================================
// 11. TEMPERATURE UNIT TOGGLE
// ============================================

/**
 * Toggle between Celsius and Fahrenheit
 */
function toggleUnit() {
    state.isCelsius = !state.isCelsius;
    updateUnitDisplay();
    saveSettings();
    
    // Update displayed temperature
    if (state.weatherData) {
        const tempCelsius = state.currentTemp - 273.15;
        updateTemperatureDisplay(tempCelsius);
    }
    
    // Update forecast temperatures
    if (state.forecastData) {
        updateForecastDisplay(state.forecastData);
    }
}

/**
 * Update the unit toggle button display
 */
function updateUnitDisplay() {
    unitToggle.textContent = state.isCelsius ? '°C' : '°F';
}

/**
 * Update temperature display with current unit
 * @param {number} tempCelsius - Temperature in Celsius
 */
function updateTemperatureDisplay(tempCelsius) {
    if (state.isCelsius) {
        temperature.textContent = Math.round(tempCelsius);
    } else {
        const tempFahrenheit = (tempCelsius * 9/5) + 32;
        temperature.textContent = Math.round(tempFahrenheit);
    }
}

// ============================================
// 12. THEME TOGGLE - Dark/Light Mode
// ============================================

/**
 * Toggle between dark and light mode
 */
function toggleTheme() {
    state.isDarkMode = !state.isDarkMode;
    
    if (state.isDarkMode) {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    saveSettings();
}

// ============================================
// 13. WEATHER BACKGROUND CHANGES
// ============================================

/**
 * Change background based on weather condition
 * @param {string} weatherMain - Main weather category (e.g., Clear, Rain, Clouds)
 */
function updateBackground(weatherMain) {
    // Remove all weather classes
    document.body.className = document.body.className
        .split(' ')
        .filter(cls => !cls.startsWith('weather-'))
        .join(' ');
    
    // Map weather conditions to CSS classes
    const weatherMap = {
        'Clear': 'weather-clear',
        'Clouds': 'weather-clouds',
        'Rain': 'weather-rain',
        'Drizzle': 'weather-rain',
        'Snow': 'weather-snow',
        'Thunderstorm': 'weather-thunderstorm',
        'Mist': 'weather-mist',
        'Smoke': 'weather-mist',
        'Haze': 'weather-mist',
        'Fog': 'weather-mist'
    };
    
    const className = weatherMap[weatherMain] || 'weather-default';
    document.body.classList.add(className);
}

// ============================================
// 14. REFRESH FUNCTIONALITY
// ============================================

/**
 * Refresh the weather data
 * Re-fetches weather for the currently displayed city or location
 */
function refreshWeather() {
    if (state.currentCity) {
        // If we have a city, refresh by city name
        getWeatherData(state.currentCity);
    } else if (state.lat && state.lon) {
        // If we have coordinates, refresh by coordinates
        getWeatherDataByCoords(state.lat, state.lon);
    } else {
        // Default to London
        getWeatherData('London');
    }
}

// ============================================
// 15. UI HELPER FUNCTIONS
// ============================================

/**
 * Show loading animation
 */
function showLoading() {
    loading.style.display = 'flex';
}

/**
 * Hide loading animation
 */
function hideLoading() {
    loading.style.display = 'none';
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    // Auto-hide after 6 seconds
    setTimeout(() => {
        hideError();
    }, 6000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.style.display = 'none';
}

/**
 * Show weather display
 */
function showWeatherDisplay() {
    weatherDisplay.style.display = 'block';
}

/**
 * Hide weather display
 */
function hideWeatherDisplay() {
    weatherDisplay.style.display = 'none';
}

// ============================================
// 16. INITIALIZE APPLICATION
// ============================================

// Start the application when the page loads
document.addEventListener('DOMContentLoaded', init);

// ============================================
// 17. ERROR HANDLING - Global
// ============================================

/**
 * Global error handler for uncaught errors
 */
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // Don't show to user unless it's critical
});

/**
 * Handle promise rejections
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Don't show to user unless it's critical
});

// ============================================
// 18. CONSOLE HELPERS (for debugging)
// ============================================

// Log version and environment info
console.log('Weather Dashboard v1.0');
console.log('API Key configured:', API_KEY !== 'YOUR_API_KEY');
console.log('Current state:', state);
