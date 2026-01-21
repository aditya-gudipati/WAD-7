# Manzil - API Integration Guide

This guide explains how to integrate real APIs with the Manzil application.

---

## 🌤️ Weather API Integration

### Current Implementation:
Mock data with random weather updates.

### Integration Option 1: OpenWeatherMap API

**Sign Up**:
1. Go to [openweathermap.org](https://openweathermap.org)
2. Create free account
3. Get API key from dashboard
4. Free tier: 1000 calls/day

**Implementation**:
```javascript
const WEATHER_API_KEY = 'YOUR_API_KEY';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function updateWeatherReal(lat = 28.7041, lon = 77.1025) {
    try {
        const response = await fetch(
            `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const data = await response.json();
        
        document.getElementById('weatherTemp').textContent = 
            Math.round(data.main.temp) + '°C';
        document.getElementById('weatherCondition').textContent = 
            data.weather[0].main;
            
    } catch (error) {
        console.error('Weather API Error:', error);
    }
}
```

**Add to `app.js`**:
```javascript
// Replace current updateWeather() function
function updateWeather() {
    updateWeatherReal();
}

// Call on initialization
initializeApp() {
    updateWeather();
    setInterval(updateWeather, 600000); // Update every 10 minutes
}
```

**HTML Addition** (optional):
```html
<script src="https://openweathermap.org/find/city"></script>
```

---

### Integration Option 2: Weather API (Alternative)

**Free Tier**: 
- weatherapi.com
- 1M calls/month free
- No credit card needed

**Implementation**:
```javascript
async function getWeatherFromWeatherAPI(city = 'Delhi') {
    const API_KEY = 'YOUR_API_KEY';
    const URL = `https://api.weatherapi.com/v1/current.json`;
    
    try {
        const response = await fetch(
            `${URL}?key=${API_KEY}&q=${city}`
        );
        const data = await response.json();
        
        return {
            temp: data.current.temp_c + '°C',
            condition: data.current.condition.text
        };
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 🚌 Booking Operators API

### Option 1: Red Bus API

**Requirements**:
- Partner account with Red Bus
- API credentials

**Implementation**:
```javascript
const REDBUS_API = 'https://api.redbus.in/api/v1';
const REDBUS_KEY = 'YOUR_API_KEY';

async function searchRedBusBookings(from, to, date) {
    try {
        const response = await fetch(`${REDBUS_API}/search`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${REDBUS_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source: from,
                destination: to,
                date: date
            })
        });
        
        const data = await response.json();
        return data.results; // Array of bus bookings
        
    } catch (error) {
        console.error('Red Bus API Error:', error);
    }
}
```

---

### Option 2: Skyscanner API (Multi-transport)

**Sign Up**: [skyscanner.com/api](https://skyscanner.com/api)

**Features**:
- Flights, Hotels, Car Rentals
- Cheap API with good data
- Free tier available

**Implementation**:
```javascript
const SKYSCANNER_KEY = 'YOUR_API_KEY';
const SKYSCANNER_URL = 'https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';

async function searchSkyscanner(origin, destination, date) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': SKYSCANNER_KEY,
            'x-rapidapi-host': 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(
            `${SKYSCANNER_URL}/apiservices/browseroutes/v1.0/US/USD/en-US/${origin}/${destination}/${date}`,
            options
        );
        const data = await response.json();
        return data.Quotes;
        
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

### Option 3: MakeMyTrip Unofficial API

```javascript
async function searchMakeMyTrip(from, to, date, mode = 'bus') {
    // Note: Official API requires partnership
    // Alternative: Web scraping (not recommended)
    
    const endpoints = {
        'bus': 'https://www.makemytrip.com/api/bus',
        'train': 'https://www.makemytrip.com/api/train',
        'flight': 'https://www.makemytrip.com/api/flight'
    };
    
    try {
        const response = await fetch(endpoints[mode], {
            method: 'POST',
            body: JSON.stringify({ from, to, date })
        });
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
```

---

## 🗺️ Maps Integration

### Google Maps API

**Sign Up**: [cloud.google.com/maps-platform](https://cloud.google.com/maps-platform)

**Add to HTML**:
```html
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>
```

**Replace Map Placeholder**:
```javascript
function initMap() {
    const map = new google.maps.Map(
        document.querySelector('.map-placeholder'),
        {
            center: { lat: 28.7041, lng: 77.1025 },
            zoom: 12
        }
    );
    
    // Add route visualization
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    
    // Calculate route
    directionsService.route(
        {
            origin: 'Delhi, India',
            destination: 'Gurgaon, India',
            travelMode: 'TRANSIT'
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
            }
        }
    );
}

// Call on page load
document.addEventListener('DOMContentLoaded', initMap);
```

---

### Mapbox Alternative

**Sign Up**: [mapbox.com](https://mapbox.com)

**HTML**:
```html
<link href='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css' rel='stylesheet' />
<script src='https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js'></script>
```

**JavaScript**:
```javascript
mapboxgl.accessToken = 'YOUR_ACCESS_TOKEN';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [77.1025, 28.7041],
    zoom: 12
});

// Add route
map.on('load', () => {
    map.addSource('route', {
        type: 'geojson',
        data: {
            type: 'Feature',
            geometry: routeCoordinates
        }
    });
});
```

---

## 📍 Geolocation API

**Built-in Browser API** (No signup needed):

```javascript
function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                console.log(`Location: ${lat}, ${lon}`);
                updateWeatherForLocation(lat, lon);
            },
            (error) => {
                console.error('Error:', error);
            }
        );
    }
}

// Add permission request
function requestLocationPermission() {
    if ('geolocation' in navigator) {
        getMyLocation();
    } else {
        alert('Geolocation not supported');
    }
}
```

**Add to HTML** (bottom navbar):
```html
<button class="nav-item" onclick="requestLocationPermission()">
    <i class="fas fa-location-dot"></i>
    <span>Location</span>
</button>
```

---

## 💳 Payment Gateway Integration

### Razorpay (Recommended for India)

**Sign Up**: [razorpay.com](https://razorpay.com)

**HTML**:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

**JavaScript**:
```javascript
async function initializePayment(plan, price) {
    const options = {
        key: 'YOUR_RAZORPAY_KEY',
        amount: price * 100, // Amount in paise
        currency: 'INR',
        name: 'Manzil',
        description: `${plan} Plan Subscription`,
        handler: async function(response) {
            // Verify payment and update subscription
            await verifyPayment(response.razorpay_payment_id, plan);
            alert('Payment successful!');
            userSubscription = plan;
        },
        prefill: {
            email: currentUser.email,
            contact: currentUser.phone
        }
    };
    
    const rzp1 = new Razorpay(options);
    rzp1.open();
}

function handlePlanSelect(plan) {
    const prices = {
        'gold': 499,
        'premium': 999
    };
    
    if (prices[plan]) {
        initializePayment(plan, prices[plan]);
    }
}
```

---

### Stripe (International)

**Sign Up**: [stripe.com](https://stripe.com)

**HTML**:
```html
<script src="https://js.stripe.com/v3/"></script>
```

**JavaScript**:
```javascript
const stripe = Stripe('YOUR_PUBLISHABLE_KEY');
const elements = stripe.elements();
const cardElement = elements.create('card');

cardElement.mount('#card-element');

async function handleStripePayment(plan, amount) {
    const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
    });
    
    if (error) {
        console.error(error);
    } else {
        // Send to backend for processing
        await processPayment(paymentMethod.id, plan, amount);
    }
}
```

---

## 🔐 Authentication API Integration

### Firebase Authentication

**Sign Up**: [firebase.google.com](https://firebase.google.com)

**HTML**:
```html
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js"></script>
```

**JavaScript**:
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'your-app.firebaseapp.com',
    projectId: 'your-project-id'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function firebaseSignup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Signup error:', error.message);
    }
}

async function firebaseLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error('Login error:', error.message);
    }
}
```

---

### Auth0 Alternative

**Sign Up**: [auth0.com](https://auth0.com)

```javascript
const auth0Domain = 'YOUR_DOMAIN.auth0.com';
const auth0ClientId = 'YOUR_CLIENT_ID';

async function loginWithAuth0() {
    await auth0.loginWithPopup({
        audience: 'https://api.manzil.com',
        scope: 'profile email'
    });
}
```

---

## 📨 Email Notifications

### SendGrid API

**Sign Up**: [sendgrid.com](https://sendgrid.com)

```javascript
async function sendNotificationEmail(to, subject, message) {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            personalizations: [{ to: [{ email: to }] }],
            from: { email: 'noreply@manzil.com' },
            subject: subject,
            content: [{ type: 'text/html', value: message }]
        })
    });
    
    return response.json();
}

// Send alert when user approaches destination
function sendDestinationAlert(user, destination) {
    sendNotificationEmail(
        user.email,
        'Destination Alert!',
        `<h2>You are approaching ${destination}</h2><p>Prepare to disembark!</p>`
    );
}
```

---

## 🔔 Push Notifications

### Firebase Cloud Messaging

```javascript
const messaging = firebase.messaging();

// Request permission
Notification.requestPermission().then(() => {
    return messaging.getToken();
}).then(token => {
    console.log('FCM Token:', token);
    // Save token to database
});

// Handle incoming messages
messaging.onMessage((payload) => {
    console.log('Notification:', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/assets/images/icon.png'
    });
});
```

---

## 🗄️ Database Integration

### Firebase Firestore

```javascript
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

// Save trip
async function saveTrip(tripData) {
    try {
        const docRef = await addDoc(collection(db, 'trips'), {
            ...tripData,
            userId: currentUser.uid,
            timestamp: new Date()
        });
        return docRef.id;
    } catch (e) {
        console.error('Error adding trip:', e);
    }
}

// Get user trips
async function getUserTrips(userId) {
    const querySnapshot = await getDocs(
        query(collection(db, 'trips'), where('userId', '==', userId))
    );
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

### MongoDB + Node.js Backend

```javascript
// Backend API call from frontend
async function saveToDatabase(data) {
    const response = await fetch('/api/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(data)
    });
    return response.json();
}
```

---

## 🔍 Error Handling

```javascript
async function safeAPICall(apiFunction, fallbackData) {
    try {
        return await apiFunction();
    } catch (error) {
        console.error('API Error:', error);
        return fallbackData; // Use mock data
    }
}

// Usage
function updateWeather() {
    safeAPICall(
        () => updateWeatherReal(),
        { temp: '25°C', condition: 'Sunny' }
    );
}
```

---

## 🚀 Best Practices

1. **API Keys**: Store in environment variables, not in code
2. **Rate Limiting**: Implement to avoid quota issues
3. **Caching**: Cache API responses to reduce calls
4. **Error Handling**: Always have fallback mock data
5. **CORS**: Use backend proxy if needed
6. **Security**: Never expose sensitive keys on frontend

---

## Testing APIs

### Postman Collection Example

```json
{
  "requests": [
    {
      "name": "Get Weather",
      "request": {
        "method": "GET",
        "url": "https://api.openweathermap.org/data/2.5/weather?lat=28.7041&lon=77.1025&appid={{API_KEY}}"
      }
    }
  ]
}
```

---

**Ready to integrate! 🎉**
