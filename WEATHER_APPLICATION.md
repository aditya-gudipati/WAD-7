# Weather Application - ES6 Implementation Guide

## 📍 Overview

A complete weather application has been implemented using ES6 features and the OpenWeatherMap API, displaying real-time weather data and 5-day forecasts with interactive graphs.

## 🚀 ES6 Features Implemented

### 1. **Arrow Functions**
```javascript
// Arrow function in class
updateCurrentWeatherDisplay = (weather) => {
    // Updates DOM with weather data
}

// Arrow function for event handlers
handleWeatherSearch = () => {
    const searchInput = document.getElementById('weatherSearchInput');
    // Handle search
}
```

### 2. **Promises**
```javascript
// Promise chaining for multiple async operations
Promise.all([
    this.getCurrentWeather(city),
    this.getForecast(city)
]).then(([current, forecast]) => {
    // Handle results
}).catch(error => {
    // Handle errors
});
```

### 3. **Async/Await**
```javascript
// Modern async/await syntax
getCurrentWeather = async (city = 'Delhi') => {
    try {
        const response = await fetch(
            `${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        return this.handleError(error);
    }
}
```

### 4. **Callbacks**
```javascript
// Callback-based function for coordinate-based weather
getWeatherByCoordinates = (lat, lon, callback) => {
    fetch(`${this.baseURL}/weather?lat=${lat}&lon=${lon}...`)
        .then(response => response.json())
        .then(data => callback(null, data))
        .catch(error => callback(error, null));
}
```

### 5. **Classes & OOP**
```javascript
class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
    }
    
    // Methods...
}
```

### 6. **Template Literals**
```javascript
// Template literals for string interpolation
`${this.baseURL}/weather?q=${city}&appid=${this.apiKey}&units=metric`

// Multi-line strings
detailsElement.innerHTML = `
    <div class="weather-details-grid">
        <div class="detail-item">
            <span class="detail-label">Feels Like:</span>
            <span class="detail-value">${weather.feelsLike}°C</span>
        </div>
    </div>
`;
```

### 7. **Destructuring**
```javascript
// Array destructuring
const [current, forecast] = await Promise.all([...]);

// Object destructuring in parameters
const { main, weather, sys } = data;
```

### 8. **Spread Operator & Rest Parameters**
```javascript
// Spread in array method
forecastData
    .filter((item, index) => index % 8 === 0)
    .map((item) => ({ ...item, processed: true }))
```

### 9. **IIFE with Module Pattern**
```javascript
const WeatherUI = (() => {
    // Private variables
    let weatherService = new WeatherService();
    
    // Public methods
    return {
        init: async function() { },
        searchCity: async function(city) { }
    };
})();
```

---

## 📁 Files Created/Modified

### New Files
1. **`assets/js/weather.js`** (450+ lines)
   - WeatherService class for API calls
   - WeatherChart class for graph visualization
   - WeatherUI module for UI management
   - Auto-update functionality

2. **`assets/css/weather.css`** (350+ lines)
   - Weather widget styling
   - Chart container styling
   - Search bar styling
   - Responsive design
   - Loading and error states
   - Animations and transitions

### Modified Files
1. **`profile.html`**
   - Added Chart.js library
   - Added weather search input
   - Added chart canvas
   - Integrated weather.js script

2. **`login.html`**
   - Updated weather widget
   - Added Chart.js library
   - Added weather.js script

3. **`signup.html`**
   - Updated weather widget
   - Added Chart.js library
   - Added weather.js script

---

## 🌍 Weather API Integration

### OpenWeatherMap API
- **Base URL**: `https://api.openweathermap.org/data/2.5`
- **API Key**: Pre-configured for demo
- **Endpoints Used**:
  - `/weather` - Current weather
  - `/forecast` - 5-day forecast

### Data Retrieved
```javascript
{
    city: "Delhi",
    temp: 28,           // Current temperature
    humidity: 65,       // Humidity percentage
    pressure: 1013,     // Atmospheric pressure
    windSpeed: 3.5,     // Wind speed in m/s
    cloudiness: 20,     // Cloud coverage percentage
    description: "Partly cloudy",
    sunrise: Date object,
    sunset: Date object
}
```

---

## 📊 Graph Visualization

### Chart.js Implementation
- **Chart Type**: Line chart with multiple datasets
- **Datasets**:
  1. **Temperature** - Current actual temperature (Red)
  2. **Feels Like** - Perceived temperature (Blue)
  3. **Humidity** - Percentage humidity (Cyan)

### Features
- ✅ Interactive hover tooltips
- ✅ Responsive design
- ✅ Legend with color indicators
- ✅ 5-day forecast data
- ✅ Smooth animations
- ✅ Mobile-friendly

---

## 🎯 Key Classes & Functions

### WeatherService Class

#### Constructor
```javascript
constructor(apiKey = 'your-api-key')
```

#### Methods

**getCurrentWeather(city)**
```javascript
// Returns: Promise<WeatherObject>
// Usage: const weather = await service.getCurrentWeather('London');
```

**getForecast(city)**
```javascript
// Returns: Promise<Array<ForecastDay>>
// Usage: const forecast = await service.getForecast('London');
```

**getCompleteWeatherData(city)**
```javascript
// Returns: Promise<{current, forecast}>
// Usage: const data = await service.getCompleteWeatherData('London');
```

**getWeatherByCoordinates(lat, lon, callback)**
```javascript
// Uses callback pattern
// Usage: service.getWeatherByCoordinates(28.7041, 77.1025, (err, weather) => {});
```

### WeatherChart Class

#### Constructor
```javascript
constructor(canvasId = 'weatherChart')
```

#### Methods

**prepareChartData(forecastData)**
```javascript
// Formats forecast data for Chart.js
// Returns: {labels, datasets}
```

**renderChart(forecastData)**
```javascript
// Creates/updates the chart
// Usage: chart.renderChart(forecastData);
```

### WeatherUI Module

#### Public Methods

**init()**
```javascript
// Initialize weather module
// Usage: await WeatherUI.init();
```

**setCity(city)**
```javascript
// Change city and update weather
// Usage: await WeatherUI.setCity('Mumbai');
```

**searchCity(cityName)**
```javascript
// Search and display weather for a city
// Usage: await WeatherUI.searchCity('New York');
```

**getCurrentWeather()**
```javascript
// Get current weather data
// Returns: Promise<WeatherObject>
```

**getForecast()**
```javascript
// Get forecast data
// Returns: Promise<Array<ForecastDay>>
```

---

## 💻 Usage Examples

### Example 1: Get Current Weather
```javascript
// Using async/await
const weather = await WeatherUI.getCurrentWeather();
console.log(`${weather.city}: ${weather.temp}°C`);
```

### Example 2: Search City
```javascript
// Search for weather
const city = 'Paris';
await WeatherUI.searchCity(city);
```

### Example 3: Update Weather Every 30 Minutes
```javascript
// Already implemented in weather.js
scheduleWeatherUpdates();
// Updates every 30 minutes using Promise chaining
```

### Example 4: Use Callback Pattern
```javascript
// Using callbacks
const service = new WeatherService();
service.getWeatherByCoordinates(28.7041, 77.1025, (error, weather) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(`Weather at coordinates: ${weather.condition}`);
    }
});
```

### Example 5: Promises with Promise.all()
```javascript
// Get both current and forecast data
const service = new WeatherService();
const data = await service.getCompleteWeatherData('London');
console.log('Current:', data.current);
console.log('Forecast:', data.forecast);
```

---

## 🎨 UI Components

### Weather Widget
- Real-time temperature display
- Weather condition description
- Detailed weather metrics:
  - Feels Like temperature
  - Humidity percentage
  - Wind speed
  - Atmospheric pressure

### Search Bar
- City search input
- Search button with icon
- Enter key support
- Error handling

### Forecast Chart
- 5-day line chart
- Three data series (Temp, Feels Like, Humidity)
- Interactive tooltips
- Responsive canvas
- Legend with color coding

---

## 🔄 Data Flow

```
User Action (Search/Load)
        ↓
WeatherUI.searchCity() / init()
        ↓
WeatherService.getCurrentWeather() [async/await]
        ↓
Fetch API call to OpenWeatherMap
        ↓
Parse JSON response
        ↓
Update UI with current weather
        ↓
WeatherService.getForecast() [async/await]
        ↓
Parse forecast data (5-day)
        ↓
WeatherChart.renderChart()
        ↓
Create/Update Chart.js graph
        ↓
Display on page
```

---

## 📱 Responsive Design

### Desktop (1920px+)
- Full weather widget with details
- Large chart display (400px height)
- Horizontal search bar
- Complete legend

### Tablet (768px)
- Compact widget
- Medium chart (300px height)
- Adjusted grid layout
- Stacked detail items

### Mobile (480px)
- Minimal widget
- Small chart (250px height)
- Vertical search bar
- Single column layout
- Touch-optimized buttons

---

## 🔒 Error Handling

### Network Errors
```javascript
try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }
} catch (error) {
    return handleError(error);
}
```

### Missing Elements
```javascript
const ctx = document.getElementById(canvasId);
if (!ctx) {
    console.error(`Canvas with id ${canvasId} not found`);
    return;
}
```

### Invalid Input
```javascript
searchCity = async function(cityName) {
    if (!cityName.trim()) {
        console.warn('City name cannot be empty');
        return;
    }
    // Proceed with search
}
```

---

## ⚙️ Configuration

### API Key
```javascript
// Default API key (free tier)
apiKey = 'e8d10e02e76c9f4a3f0cb47a92d78dab'

// Change API key
const service = new WeatherService('your-custom-api-key');
```

### Default City
```javascript
// Default city on load
const weatherService = new WeatherService();
await weatherService.getCurrentWeather('Delhi');
```

### Update Interval
```javascript
// Update weather every 30 minutes
setInterval(() => {
    WeatherUI.init();
}, 30 * 60 * 1000);
```

---

## 🎓 ES6 Learning Points

### 1. Arrow Functions
- Shorter syntax
- Lexical `this` binding
- Great for callbacks

### 2. Async/Await
- Cleaner than Promise chains
- Try/catch for error handling
- Better readability

### 3. Promises
- Handle asynchronous operations
- `Promise.all()` for parallel operations
- `.then()` and `.catch()` chaining

### 4. Classes
- Object-oriented programming
- Constructor for initialization
- Methods for functionality

### 5. Template Literals
- String interpolation
- Multi-line strings
- Expression evaluation

### 6. Destructuring
- Extract values from arrays/objects
- Cleaner variable assignments
- Parameter unpacking

### 7. IIFE & Module Pattern
- Private variables
- Public methods
- Encapsulation

### 8. Array Methods
- `.map()` - Transform elements
- `.filter()` - Filter elements
- `.find()` - Find element

---

## 🐛 Troubleshooting

### Chart Not Displaying
1. Check if Chart.js library is loaded
2. Verify canvas element exists with correct id
3. Check browser console for errors
4. Ensure forecast data is not empty

### Weather Data Not Loading
1. Check internet connection
2. Verify API key is valid
3. Check OpenWeatherMap API status
4. Check browser console for fetch errors

### Search Not Working
1. Verify city name is spelled correctly
2. Check that search input has value
3. Verify WeatherUI is initialized
4. Check console for errors

---

## 📚 Resources

- **Chart.js Documentation**: https://www.chartjs.org/docs/latest/
- **OpenWeatherMap API**: https://openweathermap.org/api
- **ES6 Guide**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
- **Async/Await**: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

---

## ✅ Features Summary

✅ Real-time weather data from OpenWeatherMap  
✅ 5-day forecast with interactive chart  
✅ City search functionality  
✅ Detailed weather metrics display  
✅ Responsive design (mobile-friendly)  
✅ Auto-update every 30 minutes  
✅ Error handling and validation  
✅ ES6 features (arrows, async/await, classes, promises)  
✅ Chart.js visualization  
✅ Clean, modular code  

---

**Weather Application Complete** ✅
**Status**: Ready for use
**Last Updated**: February 1, 2026

