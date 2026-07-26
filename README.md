# 🌤️ Real-Time Weather Dashboard

A beautiful, interactive weather dashboard that provides real-time weather information for any city worldwide. Built with vanilla HTML, CSS, and JavaScript using the OpenWeatherMap API.

![Weather Dashboard Screenshot](screenshot.png)

## 📋 Table of Contents

- [Project Introduction](#-project-introduction)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Installation Steps](#-installation-steps)
- [How to Get API Key](#-how-to-get-api-key)
- [Folder Structure](#-folder-structure)
- [Technologies Used](#-technologies-used)
- [How It Works](#-how-it-works)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🌟 Project Introduction

The Real-Time Weather Dashboard is a single-page web application that allows users to check current weather conditions and a 5-day forecast for any city in the world. It features a modern glassmorphism UI design, responsive layout, and multiple interactive features including search history, location-based weather, and dark/light mode.

This project was built as a learning resource for beginner to intermediate web developers to understand:
- Working with REST APIs using `fetch()`
- Async/await pattern in JavaScript
- DOM manipulation
- Event handling
- Local Storage for data persistence
- Geolocation API
- Modern CSS techniques (glassmorphism, gradients, animations)
- Responsive web design

## ✨ Features

### Core Features
- ✅ **Search Weather by City** - Enter any city name to get current weather
- ✅ **5-Day Forecast** - View weather forecast for the next 5 days
- ✅ **Current Location** - Get weather for your current location using Geolocation API
- ✅ **Temperature Unit Toggle** - Switch between Celsius (°C) and Fahrenheit (°F)
- ✅ **Dark/Light Mode** - Toggle between dark and light themes
- ✅ **Search History** - View and click previously searched cities (saved in Local Storage)
- ✅ **Press Enter to Search** - Quick search functionality

### Weather Information Display
- 🌆 City Name & Country
- 🌡️ Current Temperature
- ☁️ Weather Description
- 💧 Humidity
- 💨 Wind Speed
- 📊 Pressure
- 👁️ Visibility
- 🌅 Sunrise Time
- 🌇 Sunset Time
- 🎨 Weather Icon
- 📅 Current Date & Time

### Visual Features
- 🎨 **Glassmorphism Design** - Modern glass-like UI effects
- 🌈 **Dynamic Backgrounds** - Background changes based on weather conditions:
  - ☀️ Sunny
  - ☁️ Clouds
  - 🌧️ Rain
  - ❄️ Snow
  - ⛈️ Thunderstorm
- ✨ **Smooth Animations** - Hover effects, loading spinner, fade-ins
- 📱 **Fully Responsive** - Works on all devices (desktop, tablet, mobile)
- 🎯 **Interactive Elements** - Hover effects and smooth transitions

## 🚀 Live Demo

[View Live Demo](https://your-username.github.io/weather-dashboard)

*Replace with your actual GitHub Pages URL after deployment*

## 📦 Installation Steps

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- OpenWeatherMap API key (free)

### Step-by-Step Installation

#### 1. Clone or Download the Repository

**Option A: Clone with Git**
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
