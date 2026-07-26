// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const state = {
    apiKey:'830889ef400efb1f29e0ab83d5464aa7',
    unit: 'metric', // 'metric' | 'imperial'
    city: 'London',
    data: null, // current weather
    forecast: null, // forecast list
    aqi: null, // air quality
    loading: false,
    error: null,
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  DOM REFS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const apiOverlay = $('#apiOverlay');
const apiKeyInput = $('#apiKeyInput');
const saveApiKeyBtn = $('#saveApiKeyBtn');
const apiError = $('#apiError');

const searchInput = $('#searchInput');
const searchBtn = $('#searchBtn');
const unitBtns = $$('.unit-toggle button');
const weatherContent = $('#weatherContent');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  API HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildUrl(endpoint, params) {
    const base = 'https://api.openweathermap.org/data/2.5';
    const q = new URLSearchParams({ appid: state.apiKey, ...params });
    return `${base}${endpoint}?${q}`;
}

async function fetchWeather(city) {
    const url = buildUrl('/weather', {
        q: city,
        units: state.unit,
    });
    const res = await fetch(url);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'City not found');
    }
    return res.json();
}

async function fetchForecast(city) {
    const url = buildUrl('/forecast', {
        q: city,
        units: state.unit,
        cnt: 40,
    });
    const res = await fetch(url);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Forecast unavailable');
    }
    return res.json();
}

async function fetchAirQuality(lat, lon) {
    const url = buildUrl('/air_pollution', {
        lat,
        lon,
    });
    const res = await fetch(url);
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Air quality unavailable');
    }
    return res.json();
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  RENDER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function getWeatherEmoji(iconCode) {
    const map = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '⛅',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌧️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️',
        '50d': '🌫️',
        '50n': '🌫️',
    };
    return map[iconCode] || '🌤️';
}

function getAqiLabel(aqi) {
    const levels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return levels[aqi - 1] || 'Unknown';
}

function getAqiColor(aqi) {
    const colors = ['#22c55e', '#eab308', '#f59e0b', '#ef4444', '#7f1d1d'];
    return colors[aqi - 1] || '#6b7280';
}

function formatDate(ts) {
    return new Date(ts * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });
}

function formatTime(ts) {
    return new Date(ts * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

function getDayName(ts) {
    return new Date(ts * 1000).toLocaleDateString('en-US', { weekday: 'short' });
}

function getIconUrl(icon) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}

function renderLoading() {
    return `
        <div class="loading-shimmer fade-in">
            <div class="shimmer-line short"></div>
            <div class="shimmer-line medium"></div>
            <div class="shimmer-line"></div>
            <div class="shimmer-grid">
                <div class="shimmer-box"></div><div class="shimmer-box"></div>
                <div class="shimmer-box"></div><div class="shimmer-box"></div>
            </div>
        </div>
    `;
}

function renderError(message) {
    return `
        <div class="error-state fade-in">
            <span class="error-icon">😕</span>
            <h3>Something went wrong</h3>
            <p>${message}</p>
        </div>
    `;
}

function renderDashboard(data, forecast, aqi) {
    const { main, weather, wind, sys, name, visibility, dt } = data;
    const temp = main.temp;
    const feels = main.feels_like;
    const tempMin = main.temp_min;
    const tempMax = main.temp_max;
    const humidity = main.humidity;
    const pressure = main.pressure;
    const windSpeed
