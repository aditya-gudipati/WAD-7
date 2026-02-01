// ====================
// Application State
// ====================
let currentUser = null;
let userSubscription = 'basic';
let trips = [];
let bookings = [];

// ====================
// Authentication Helper
// ====================
function isAuthenticated() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        userSubscription = localStorage.getItem('userSubscription') || 'basic';
        return true;
    }
    return false;
}

function checkProtectedPage() {
    if (!isAuthenticated()) {
        alert('Please sign in to access this page');
        window.location.href = 'login.html';
    }
}

// ====================
// Page Navigation
// ====================
function showPage(pageId) {
    // Check authentication for protected pages
    const protectedPages = ['profile-page', 'trips-page', 'bookings-page', 'subscription-page'];
    
    if (protectedPages.includes(pageId) && !currentUser) {
        alert('Please sign in to access this page');
        showPage('login-page');
        return;
    }

    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
        
        // Load page-specific data
        if (pageId === 'profile-page') {
            loadProfileData();
        } else if (pageId === 'trips-page') {
            loadTripsData();
        } else if (pageId === 'bookings-page') {
            loadBookingsData();
        } else if (pageId === 'subscription-page') {
            loadSubscriptionData();
        }

        window.scrollTo(0, 0);
    }

    // Update navbar active state
    updateNavbarActive();
}

function updateNavbarActive() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));

    const currentPage = document.querySelector('.page.active').id;
    
    if (currentPage === 'profile-page') {
        navItems[0].classList.add('active');
    } else if (currentPage === 'trips-page') {
        navItems[1].classList.add('active');
    } else if (currentPage === 'bookings-page') {
        navItems[2].classList.add('active');
    } else if (currentPage === 'subscription-page') {
        navItems[3].classList.add('active');
    }
}

// ====================
// Authentication
// ====================
function handleLogin(event) {
    event.preventDefault();
    
    // Validate form inputs first
    if (!validateLoginForm()) {
        return;
    }
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Simulate login (in real app, this would call backend API)
    currentUser = {
        email: email,
        name: 'John Doe',
        phone: '+91 9876543210',
        age: 25,
        gender: 'Male',
        transport: 'Bus'
    };

    userSubscription = 'basic';
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userSubscription', userSubscription);
    
    // Clear form
    document.getElementById('loginForm').reset();
    clearAllValidationMessages();
    
    // Show success message
    alert('Login successful!');
    
    // Navigate to profile
    window.location.href = 'profile.html';
}

function handleSignup(event) {
    event.preventDefault();
    
    // Validate form inputs first
    if (!validateSignupForm()) {
        return;
    }
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const transport = document.getElementById('transport').value;

    // All validations passed, save the user
    addRegisteredUser(email);
    
    // Create user object
    currentUser = {
        name: fullName,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        transport: transport
    };

    userSubscription = 'basic';
    
    // Save to localStorage
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('userSubscription', userSubscription);
    
    // Clear form
    document.getElementById('signupForm').reset();
    clearAllValidationMessages();
    
    // Show success message
    alert('Account created successfully!');
    
    // Navigate to profile
    window.location.href = 'profile.html';
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        // Clear localStorage
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userSubscription');
        
        alert('Logged out successfully');
        window.location.href = 'index.html'
        bookings = [];
        
        alert('Logged out successfully');
        showPage('home-page');
    }
}

// ====================
// Profile Page
// ====================
function loadProfileData() {
    if (!currentUser) return;

    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profilePhone').textContent = currentUser.phone;
    document.getElementById('profileAge').textContent = currentUser.age;
    document.getElementById('profileGender').textContent = currentUser.gender;
    document.getElementById('profileTransport').textContent = currentUser.transport;
    
    // Update subscription badge
    const subscriptionMap = {
        'basic': 'Basic Plan',
        'gold': 'Gold Plan',
        'premium': 'Premium Plan'
    };
    document.getElementById('subscriptionBadge').textContent = subscriptionMap[userSubscription];
}

// ====================
// Trips Page
// ====================
function handleCreateTrip(event) {
    event.preventDefault();
    
    const from = document.getElementById('tripFrom').value;
    const to = document.getElementById('tripTo').value;
    const date = document.getElementById('tripDate').value;
    const time = document.getElementById('tripTime').value;
    const alertTime = document.getElementById('alertTime').value;
    const mode = document.getElementById('tripMode').value;

    if (!from || !to || !date || !time || !mode) {
        alert('Please fill in all fields');
        return;
    }

    // Create trip object
    const trip = {
        id: Date.now(),
        from: from,
        to: to,
        date: new Date(date).toLocaleDateString(),
        time: time,
        alertTime: alertTime,
        mode: mode.charAt(0).toUpperCase() + mode.slice(1)
    };

    // Add to trips array
    trips.unshift(trip);

    // Clear form
    document.getElementById('tripForm').reset();

    // Reload trips
    loadTripsData();

    alert('Trip created successfully!');
}

function loadTripsData() {
    const tripsGrid = document.getElementById('tripsGrid');
    
    // Add default trips if empty
    if (trips.length === 0) {
        trips = [
            {
                id: 1,
                from: 'Home',
                to: 'College',
                date: '2024-01-22',
                time: '08:30',
                alertTime: '10',
                mode: 'Bus'
            },
            {
                id: 2,
                from: 'College',
                to: 'Home',
                date: '2024-01-22',
                time: '18:00',
                alertTime: '15',
                mode: 'Bus'
            }
        ];
    }

    // Generate HTML for trips
    tripsGrid.innerHTML = trips.map(trip => `
        <div class="trip-card">
            <div class="trip-route">
                <div class="trip-location">${trip.from}</div>
                <div class="trip-arrow"><i class="fas fa-arrow-right"></i></div>
                <div class="trip-location">${trip.to}</div>
            </div>
            <div class="trip-details">
                <div class="trip-detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${trip.date}</span>
                </div>
                <div class="trip-detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${trip.time}</span>
                </div>
                <div class="trip-detail-item">
                    <i class="fas fa-bell"></i>
                    <span>Alert in ${trip.alertTime} mins</span>
                </div>
                <div class="trip-detail-item">
                    <i class="fas fa-bus"></i>
                    <span>${trip.mode}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ====================
// Bookings Page
// ====================
function handleSearchBookings(event) {
    event.preventDefault();

    // Check subscription
    if (userSubscription === 'basic') {
        alert('Upgrade to Gold or Premium plan to access My Bookings');
        showPage('subscription-page');
        return;
    }

    const from = document.getElementById('bookFrom').value;
    const to = document.getElementById('bookTo').value;
    const date = document.getElementById('bookDate').value;
    const mode = document.getElementById('bookMode').value;

    if (!from || !to || !date || !mode) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate API call to fetch bookings
    generateMockBookings(from, to, mode);

    // Load bookings
    loadBookingsData();
}

function generateMockBookings(from, to, mode) {
    // Mock booking data from different operators
    const operators = ['AbhiBus', 'Goibibo', 'RedBus'];
    const mockPrices = [450, 520, 480, 650, 550, 600];
    
    bookings = [];
    
    for (let i = 0; i < 6; i++) {
        bookings.push({
            id: i + 1,
            operator: operators[i % 3],
            from: from,
            to: to,
            departTime: `${8 + i}:00 AM`,
            arriveTime: `${12 + i}:30 PM`,
            duration: '4h 30m',
            seats: Math.floor(Math.random() * 30) + 5,
            rating: (4 + Math.random()).toFixed(1),
            price: mockPrices[i],
            mode: mode.charAt(0).toUpperCase() + mode.slice(1)
        });
    }
}

function loadBookingsData() {
    const bookingsGrid = document.getElementById('bookingsGrid');

    if (bookings.length === 0) {
        bookingsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--light-text);">Search for bookings to see available rides</p>';
        return;
    }

    bookingsGrid.innerHTML = bookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <div class="booking-operator">${booking.operator}</div>
                <div class="booking-rating">
                    <i class="fas fa-star" style="color: #FFD700;"></i> ${booking.rating} (${Math.floor(Math.random() * 500) + 100} reviews)
                </div>
            </div>
            <div class="booking-body">
                <div class="booking-route">
                    <div>
                        <div class="booking-time">
                            <div class="booking-time-value">${booking.departTime}</div>
                            <div class="booking-time-label">Depart</div>
                        </div>
                    </div>
                    <div style="text-align: center; color: var(--light-text);">
                        <i class="fas fa-arrow-right"></i>
                        <div style="font-size: 12px; margin-top: 5px;">${booking.duration}</div>
                    </div>
                    <div>
                        <div class="booking-time">
                            <div class="booking-time-value">${booking.arriveTime}</div>
                            <div class="booking-time-label">Arrive</div>
                        </div>
                    </div>
                </div>
                <div class="booking-info-grid">
                    <div class="booking-info-row">
                        <span class="booking-info-label">Seats Available:</span>
                        <span class="booking-info-value">${booking.seats}</span>
                    </div>
                    <div class="booking-info-row">
                        <span class="booking-info-label">Transport:</span>
                        <span class="booking-info-value">${booking.mode}</span>
                    </div>
                </div>
                <div class="booking-price">₹${booking.price}</div>
                <button class="btn btn-primary booking-button" onclick="handleBooking(${booking.id})">Book Now</button>
            </div>
        </div>
    `).join('');
}

function handleBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`Booking confirmed for ${booking.operator}!\n\nDeparture: ${booking.departTime}\nPrice: ₹${booking.price}`);
    }
}

// ====================
// Subscription Page
// ====================
function loadSubscriptionData() {
    // Update current plan button
    const basicBtn = document.getElementById('basicPlanBtn');
    if (userSubscription === 'basic') {
        basicBtn.classList.add('active');
        basicBtn.textContent = 'Current Plan';
        basicBtn.disabled = true;
    } else {
        basicBtn.classList.remove('active');
        basicBtn.textContent = 'Downgrade to Basic';
        basicBtn.disabled = false;
    }
}

function handlePlanSelect(plan) {
    if (plan === userSubscription) {
        alert(`You are already on the ${plan.charAt(0).toUpperCase() + plan.slice(1)} plan`);
        return;
    }

    const planNames = {
        'basic': 'Basic',
        'gold': 'Gold',
        'premium': 'Premium'
    };

    const prices = {
        'basic': 'Free',
        'gold': '₹4.99/month',
        'premium': '₹9.99/month'
    };

    const confirmed = confirm(`Upgrade to ${planNames[plan]} plan (${prices[plan]})?\n\nYou will gain access to new features.`);

    if (confirmed) {
        userSubscription = plan;
        alert(`Successfully upgraded to ${planNames[plan]} plan!`);
        loadSubscriptionData();
        loadProfileData();
    }
}

// ====================
// Weather Widget (Now handled by weather.js)
// ====================
// Real weather data is now fetched from OpenWeatherMap API via weather.js module
// The updateWeather() function below is DEPRECATED - use WeatherUI from weather.js instead

/*
function updateWeather() {
    // Mock weather data - DEPRECATED, use weather.js instead
    const weatherData = [
        { temp: '28°C', condition: 'Partly Cloudy' },
        { temp: '32°C', condition: 'Sunny' },
        { temp: '22°C', condition: 'Rainy' },
        { temp: '25°C', condition: 'Cloudy' }
    ];

    const randomWeather = weatherData[Math.floor(Math.random() * weatherData.length)];
    
    document.getElementById('weatherTemp').textContent = randomWeather.temp;
    document.getElementById('weatherCondition').textContent = randomWeather.condition;
}
*/

// ====================
// Initialize App
// ====================
function initializeApp() {
    // Weather is now initialized by weather.js module
    // No need to call updateWeather() here
    console.log('🚀 Initializing Manzil application...');

    // Check if user is logged in
    if (!currentUser) {
        showPage('home-page');
    } else {
        showPage('profile-page');
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Could add modal close functionality
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// ====================
// Utility Functions
// ====================
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'success') {
    // Could be enhanced with a toast notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
}
