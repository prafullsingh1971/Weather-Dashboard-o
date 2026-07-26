/* ===== RESET & BASE STYLES ===== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: background-color 0.5s ease, color 0.3s ease;
    /* Default gradient background - will be overridden by weather-specific backgrounds */
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-attachment: fixed;
}

/* ===== CONTAINER ===== */
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    /* Glassmorphism effect */
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

/* ===== HEADER ===== */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px 20px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 20px;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.header-icon {
    font-size: 2rem;
    color: #ffd700;
    animation: float 3s ease-in-out infinite;
}

.header h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    letter-spacing: 1px;
}

.header-right {
    display: flex;
    align-items: center;
}

.theme-toggle {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    padding: 10px 15px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
}

/* ===== SEARCH SECTION ===== */
.search-section {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 25px;
}

.search-container {
    display: flex;
    gap: 10px;
    align-items: center;
}

.search-input {
    flex: 1;
    padding: 14px 20px;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
}

.search-input:focus {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.search-btn {
    padding: 14px 25px;
    border: none;
    border-radius: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.action-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.action-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    color: #fff;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    gap: 8px;
}

.action-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
}

.unit-toggle-container {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    font-size: 0.95rem;
}

.unit-btn {
    padding: 6px 15px;
    border: none;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
}

.unit-btn:hover {
    background: rgba(255, 255, 255, 0.3);
}

/* ===== SEARCH HISTORY ===== */
.search-history {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 5px;
    min-height: 35px;
}

.history-item {
    background: rgba(255, 255, 255, 0.15);
    padding: 5px 15px;
    border-radius: 20px;
    color: #fff;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;
}

.history-item:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: scale(1.05);
}

.history-item .remove-history {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.7rem;
    cursor: pointer;
    transition: color 0.3s ease;
}

.history-item .remove-history:hover {
    color: #ff6b6b;
}

/* ===== LOADING ===== */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #fff;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 20px;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ===== ERROR MESSAGE ===== */
.error-message {
    background: rgba(255, 107, 107, 0.2);
    backdrop-filter: blur(10px);
    padding: 15px 25px;
    border-radius: 15px;
    border: 1px solid rgba(255, 107, 107, 0.3);
    color: #fff;
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 10px 0;
    animation: slideDown 0.4s ease;
}

.error-message i {
    font-size: 1.5rem;
    color: #ff6b6b;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== WEATHER DISPLAY ===== */
.weather-display {
    animation: fadeIn 0.6s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ===== CURRENT WEATHER CARD ===== */
.card {
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(15px);
    border-radius: 25px;
    padding: 30px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 30px;
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.weather-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-bottom: 25px;
}

.weather-header h2 {
    font-size: 2.2rem;
    color: #fff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.datetime {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    font-weight: 300;
}

.weather-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
}

.weather-icon img {
    width: 100px;
    height: 100px;
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.temperature {
    font-size: 4rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    margin: 5px 0;
}

.unit-symbol {
    font-size: 1.5rem;
    font-weight: 400;
}

.description {
    font-size: 1.3rem;
    color: rgba(255, 255, 255, 0.9);
    text-transform: capitalize;
    font-weight: 300;
    letter-spacing: 1px;
}

/* ===== WEATHER DETAILS GRID ===== */
.weather-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.detail-item {
    background: rgba(255, 255, 255, 0.08);
    padding: 15px;
    border-radius: 15px;
    text-align: center;
    color: #fff;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-item:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.02);
}

.detail-item i {
    font-size: 1.5rem;
    margin-bottom: 8px;
    display: block;
    color: rgba(255, 255, 255, 0.7);
}

.detail-item span {
    display: block;
    font-size: 0.85rem;
    opacity: 0.8;
    margin-bottom: 5px;
}

.detail-value {
    font-size: 1.1rem;
    font-weight: 600;
}

/* ===== FORECAST SECTION ===== */
.forecast-section h3 {
    color: #fff;
    font-size: 1.5rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.forecast-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
}

.forecast-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 18px;
    padding: 20px 15px;
    text-align: center;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.forecast-card:hover {
    transform: translateY(-5px) scale(1.02);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.forecast-card .day {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-bottom: 8px;
}

.forecast-card .forecast-date {
    font-size: 0.8rem;
    opacity: 0.6;
    margin-bottom: 10px;
}

.forecast-card img {
    width: 50px;
    height: 50px;
    margin: 5px auto;
}

.forecast-card .forecast-temp {
    font-size: 1.3rem;
    font-weight: 600;
    margin: 5px 0;
}

.forecast-card .forecast-desc {
    font-size: 0.8rem;
    opacity: 0.8;
    text-transform: capitalize;
}

/* ===== FOOTER ===== */
.footer {
    text-align: center;
    padding: 20px 0 10px 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: 20px;
}

/* ===== WEATHER-SPECIFIC BACKGROUNDS ===== */
/* These classes will be added to body based on weather conditions */

/* Clear / Sunny */
body.weather-clear {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

body.weather-clouds {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

body.weather-rain {
    background: linear-gradient(135deg, #0c3483 0%, #a2b6df 100%);
}

body.weather-snow {
    background: linear-gradient(135deg, #e6dada 0%, #274046 100%);
}

body.weather-thunderstorm {
    background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);
}

body.weather-mist {
    background: linear-gradient(135deg, #89abbb 0%, #3b5d6d 100%);
}

body.weather-default {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* ===== DARK MODE ===== */
body.dark-mode {
    background: linear-gradient(135deg, #141e30 0%, #243b55 100%);
}

body.dark-mode .container {
    background: rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.1);
}

body.dark-mode .search-input {
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
}

body.dark-mode .search-input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

body.dark-mode .card {
    background: rgba(0, 0, 0, 0.3);
}

body.dark-mode .detail-item {
    background: rgba(0, 0, 0, 0.2);
}

body.dark-mode .forecast-card {
    background: rgba(0, 0, 0, 0.2);
}

body.dark-mode .theme-toggle {
    background: rgba(255, 255, 255, 0.1);
}

/* ===== ANIMATIONS ===== */
@keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

/* ===== RESPONSIVE DESIGN ===== */

/* Tablets and small laptops */
@media screen and (max-width: 992px) {
    .container {
        padding: 15px;
    }
    
    .header h1 {
        font-size: 1.5rem;
    }
    
    .temperature {
        font-size: 3rem;
    }
    
    .weather-details {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Mobile devices */
@media screen and (max-width: 768px) {
    body {
        padding: 10px;
    }
    
    .container {
        padding: 12px;
        border-radius: 20px;
    }
    
    .header {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
    
    .header-left {
        width: 100%;
        justify-content: space-between;
    }
    
    .header h1 {
        font-size: 1.3rem;
    }
    
    .search-container {
        flex-direction: column;
        gap: 10px;
    }
    
    .search-input {
        width: 100%;
        font-size: 0.95rem;
    }
    
    .search-btn {
        width: 100%;
        justify-content: center;
    }
    
    .action-buttons {
        flex-direction: column;
    }
    
    .action-btn {
        width: 100%;
        justify-content: center;
    }
    
    .weather-header {
        flex-direction: column;
        gap: 8px;
    }
    
    .weather-header h2 {
        font-size: 1.6rem;
    }
    
    .temperature {
        font-size: 2.8rem;
    }
    
    .weather-icon img {
        width: 80px;
        height: 80px;
    }
    
    .weather-details {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
    
    .detail-item {
        padding: 12px;
    }
    
    .forecast-container {
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        gap: 10px;
    }
    
    .forecast-card {
        padding: 15px 10px;
    }
    
    .unit-toggle-container {
        justify-content: center;
    }
}

/* Small mobile devices */
@media screen and (max-width: 480px) {
    .container {
        padding: 10px;
        border-radius: 15px;
    }
    
    .header h1 {
        font-size: 1.1rem;
    }
    
    .header-icon {
        font-size: 1.5rem;
    }
    
    .temperature {
        font-size: 2.2rem;
    }
    
    .weather-details {
        grid-template-columns: 1fr 1fr;
        gap: 8px;
    }
    
    .detail-item {
        padding: 10px;
    }
    
    .detail-item i {
        font-size: 1.2rem;
    }
    
    .detail-value {
        font-size: 0.95rem;
    }
    
    .forecast-container {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .forecast-card .forecast-temp {
        font-size: 1.1rem;
    }
}

/* Extra small devices */
@media screen and (max-width: 380px) {
    .weather-details {
        grid-template-columns: 1fr;
    }
    
    .forecast-container {
        grid-template-columns: 1fr 1fr;
    }
}
