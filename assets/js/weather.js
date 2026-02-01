// ====================
// Weather API Module (ES6)
// ====================

// ES6 Arrow Function - Weather Service Class
class WeatherService {
    constructor(apiKey = 'c235d9041818fa16c1f33f4f612696e3') {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.forecastData = [];
        this.currentWeather = null;
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache
        this.lastFetchTime = 0;
    }

    // Promise-based function for error handling
    handleError = (error) => {
        console.error('Weather API Error:', error);
        return {
            temp: 'N/A',
            condition: 'Unable to fetch',
            error: true
        };
    }

    // Async/Await function to fetch current weather with proper error handling
    getCurrentWeather = async (city = 'Delhi', skipCache = false) => {
        try {
            // Check cache first (skip if explicitly requested)
            const now = Date.now();
            if (!skipCache && this.currentWeather && (now - this.lastFetchTime) < this.cacheExpiry) {
                console.log('📦 Using cached weather data');
                return this.currentWeather;
            }

            const url = `${this.baseURL}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
            
            const response = await fetch(url);
            
            console.log('🌤️ Weather API Status:', response.status);
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API key');
                } else if (response.status === 404) {
                    throw new Error(`City "${city}" not found`);
                } else {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
            }
            
            const data = await response.json();
            
            console.log('✅ Raw API Response:', data);
            
            this.currentWeather = {
                city: data.name,
                country: data.sys.country,
                temp: Math.round(data.main.temp),
                feelsLike: Math.round(data.main.feels_like),
                humidity: data.main.humidity,
                pressure: data.main.pressure,
                windSpeed: Math.round(data.wind.speed * 10) / 10,
                cloudiness: data.clouds.all,
                description: data.weather[0].description,
                icon: data.weather[0].icon,
                sunrise: new Date(data.sys.sunrise * 1000),
                sunset: new Date(data.sys.sunset * 1000),
                timestamp: now
            };
            
            console.log('✅ Processed Weather Object:', this.currentWeather);
            this.lastFetchTime = now;
            return this.currentWeather;
        } catch (error) {
            console.error('❌ Weather fetch error:', error.message);
            return this.handleError(error);
        }
    }

    // Async/Await function to fetch 5-day forecast with error handling
    getForecast = async (city = 'Delhi') => {
        try {
            const url = `${this.baseURL}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
            
            const response = await fetch(url);
            
            console.log('🌤️ Forecast API Status:', response.status);
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API key');
                } else if (response.status === 404) {
                    throw new Error(`City "${city}" not found`);
                } else {
                    throw new Error(`Forecast API error: ${response.status}`);
                }
            }
            
            const data = await response.json();
            
            console.log('✅ Raw Forecast API Response:', data);
            
            // Process forecast data for graph - get one forecast per day
            this.forecastData = data.list
                .filter((item, index) => index % 8 === 0)
                .slice(0, 5) // Limit to 5 days
                .map((item) => ({
                    date: new Date(item.dt * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    timestamp: item.dt,
                    temp: Math.round(item.main.temp),
                    feelsLike: Math.round(item.main.feels_like),
                    humidity: item.main.humidity,
                    description: item.weather[0].description,
                    icon: item.weather[0].icon,
                    windSpeed: Math.round(item.wind.speed * 10) / 10,
                    pressure: item.main.pressure
                }));
            
            console.log('✅ Processed Forecast Data:', this.forecastData);
            return this.forecastData;
        } catch (error) {
            console.error('Forecast error:', error.message);
            return [];
        }
    }

    // Promise-based function for batch operations
    getCompleteWeatherData = (city = 'Delhi') => {
        return Promise.all([
            this.getCurrentWeather(city),
            this.getForecast(city)
        ]).then(([current, forecast]) => {
            console.log('🌤️ Complete Weather Data:', { current, forecast });
            return { current, forecast };
        }).catch(error => {
            console.error('Error fetching complete weather data:', error);
            return { current: null, forecast: [] };
        });
    }

    // Callback-based function for location-based weather
    getWeatherByCoordinates = (lat, lon, callback) => {
        fetch(
            `${this.baseURL}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        )
        .then(response => response.json())
        .then(data => {
            const weather = {
                city: data.name,
                temp: Math.round(data.main.temp),
                condition: data.weather[0].description
            };
            callback(null, weather);
        })
        .catch(error => callback(error, null));
    }
}

// ====================
// Chart Visualization Module (ES6)
// ====================

class WeatherChart {
    constructor(canvasId = 'weatherChart') {
        this.canvasId = canvasId;
        this.chart = null;
    }

    // Arrow function to prepare chart data
    prepareChartData = (forecastData) => {
        return {
            labels: forecastData.map(item => item.date),
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: forecastData.map(item => item.temp),
                    borderColor: '#FF6384',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#FF6384'
                },
                {
                    label: 'Feels Like (°C)',
                    data: forecastData.map(item => item.feelsLike),
                    borderColor: '#36A2EB',
                    backgroundColor: 'rgba(54, 162, 235, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#36A2EB'
                },
                {
                    label: 'Humidity (%)',
                    data: forecastData.map(item => item.humidity),
                    borderColor: '#4BC0C0',
                    backgroundColor: 'rgba(75, 192, 192, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: '#4BC0C0'
                }
            ]
        };
    }

    // Initialize or update chart
    renderChart = (forecastData) => {
        const ctx = document.getElementById(this.canvasId);
        
        if (!ctx) {
            console.error(`Canvas with id ${this.canvasId} not found`);
            return;
        }

        const chartData = this.prepareChartData(forecastData);

        // Destroy existing chart if it exists
        if (this.chart) {
            this.chart.destroy();
        }

        // Create new chart with Chart.js
        this.chart = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: '5-Day Weather Forecast',
                        font: { size: 16, weight: 'bold' },
                        color: '#2C3E50'
                    },
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 12 }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 13, weight: 'bold' },
                        bodyFont: { size: 12 },
                        callbacks: {
                            afterLabel: (context) => {
                                const index = context.dataIndex;
                                const forecast = forecastData[index];
                                return `Description: ${forecast.description}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)',
                            drawBorder: true
                        },
                        ticks: {
                            font: { size: 11 }
                        },
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    }
}

// ====================
// Weather UI Module (ES6)
// ====================

const WeatherUI = (() => {
    // Private variables using IIFE pattern
    let weatherService = new WeatherService();
    let weatherChart = new WeatherChart();
    let currentCity = 'Delhi';

    // Private arrow function to update current weather display
    const updateCurrentWeatherDisplay = (weather) => {
        if (weather.error) {
            updateWeatherWidgetError();
            return;
        }

        const tempElement = document.getElementById('weatherTemp');
        const conditionElement = document.getElementById('weatherCondition');
        const detailsElement = document.getElementById('weatherDetails');

        if (tempElement) {
            tempElement.textContent = `${weather.temp}°C`;
        }
        if (conditionElement) {
            conditionElement.textContent = weather.description || 'Unknown';
        }

        // Create detailed weather info if element exists
        if (detailsElement) {
            detailsElement.innerHTML = `
                <div class="weather-details-grid">
                    <div class="detail-item">
                        <span class="detail-label">Feels Like:</span>
                        <span class="detail-value">${weather.feelsLike}°C</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Humidity:</span>
                        <span class="detail-value">${weather.humidity}%</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Wind Speed:</span>
                        <span class="detail-value">${weather.windSpeed} m/s</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Pressure:</span>
                        <span class="detail-value">${weather.pressure} hPa</span>
                    </div>
                </div>
            `;
        }
    };

    // Private arrow function for error handling
    const updateWeatherWidgetError = () => {
        const tempElement = document.getElementById('weatherTemp');
        const conditionElement = document.getElementById('weatherCondition');

        if (tempElement) {
            tempElement.textContent = 'N/A';
        }
        if (conditionElement) {
            conditionElement.textContent = 'Unable to fetch weather data';
        }
    };

    // Public methods using return object pattern
    return {
        // Initialize weather module
        init: async function() {
            try {
                // Show loading state
                const conditionElement = document.getElementById('weatherCondition');
                if (conditionElement) {
                    conditionElement.textContent = 'Loading weather data...';
                }

                // Fetch complete weather data using async/await with timeout
                // skipCache=true ensures fresh data on page load
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Weather request timeout')), 10000)
                );
                
                const weatherPromise = Promise.all([
                    weatherService.getCurrentWeather(currentCity, true),
                    weatherService.getForecast(currentCity)
                ]).then(([current, forecast]) => ({
                    current,
                    forecast
                }));
                
                const weatherData = await Promise.race([weatherPromise, timeoutPromise]);
                
                // Update UI with current weather
                if (weatherData.current && !weatherData.current.error) {
                    updateCurrentWeatherDisplay(weatherData.current);
                    console.log('Current weather updated:', weatherData.current);
                } else {
                    updateWeatherWidgetError();
                    console.warn('Failed to load current weather');
                }

                // Render forecast chart if data available and canvas exists
                if (weatherData.forecast && weatherData.forecast.length > 0) {
                    if (document.getElementById('weatherChart')) {
                        weatherChart.renderChart(weatherData.forecast);
                        console.log('Forecast chart rendered with', weatherData.forecast.length, 'days');
                    }
                }
            } catch (error) {
                console.error('Error initializing weather:', error.message);
                updateWeatherWidgetError();
                
                // Show error in console for debugging
                const conditionElement = document.getElementById('weatherCondition');
                if (conditionElement) {
                    conditionElement.textContent = `Error: ${error.message}`;
                }
            }
        },

        // Change city and update weather
        setCity: async function(city) {
            currentCity = city;
            await this.init();
        },

        // Get current weather data
        getCurrentWeather: async function() {
            return await weatherService.getCurrentWeather(currentCity);
        },

        // Get forecast data
        getForecast: async function() {
            return await weatherService.getForecast(currentCity);
        },

        // Search weather by city name
        searchCity: async function(cityName) {
            if (!cityName.trim()) {
                console.warn('City name cannot be empty');
                return;
            }
            await this.setCity(cityName);
        }
    };
})();

// ====================
// Initialize on DOM Ready
// ====================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌤️ Initializing weather module...');
    
    // Initialize weather when DOM is ready
    WeatherUI.init()
        .then(() => {
            console.log('✅ Weather module initialized successfully');
            console.log('📄 Weather will refresh only when you refresh the page');
        })
        .catch(error => {
            console.error('❌ Failed to initialize weather module:', error);
            console.warn('⚠️ Weather data will not be available');
        });
        
    // Allow enter key in search input
    const searchInput = document.getElementById('weatherSearchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                console.log('🔍 Search triggered via Enter key');
                handleWeatherSearch();
            }
        });
    }
});

// ====================
// Export for module usage
// ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { WeatherService, WeatherChart, WeatherUI };
}
