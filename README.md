# Manzil - Destination Alert Travel App

A responsive web application that helps passengers receive advance alerts before reaching their travel destination.

## 🎯 Project Overview

**Problem Statement**: Passengers traveling by buses or trains often miss their stop, especially during late-night or long journeys due to lack of advance alerts.

**Solution**: Manzil provides advance destination alerts, real-time tracking, and booking management to ensure safe and convenient travel.

## 📁 Project Structure

```
manzil/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── styles.css        # Main stylesheet
│   │   └── navbar.css        # Navigation bar styles
│   ├── js/
│   │   └── app.js            # Main application logic
│   └── images/               # Image assets (placeholder)
└── README.md                 # Documentation
```

## ✨ Features Implemented

### 1. **Authentication**
- ✅ Sign In Page (Email & Password)
- ✅ Sign Up Page (8 input fields: Name, Email, Password, Phone, Age, Gender, Transport Mode)
- ✅ Logout functionality

### 2. **Navigation**
- ✅ Bottom-fixed navigation bar with 4 main sections
- ✅ Responsive design for mobile and desktop
- ✅ Weather widget (top-right corner)

### 3. **Weather Display**
- ✅ Real-time weather widget
- ✅ Shows temperature and weather condition
- ✅ Updates every 30 seconds

### 4. **Profile Page**
- ✅ Display personal information
- ✅ Show active subscription plan (Basic/Gold/Premium)
- ✅ Account settings buttons
- ✅ Logout option

### 5. **Trips Section**
- ✅ Create custom trips with:
  - From/To locations
  - Date & Time
  - Alert time (minutes before arrival)
  - Mode of transport (Bus/Train/Flight)
- ✅ Default trips (Home → College, College → Home)
- ✅ Trip card display with all details
- ✅ Map placeholder for future integration

### 6. **My Bookings Section**
- ✅ Search rides with filters
- ✅ Mock data from 3 operators (AbhiBus, Goibibo, RedBus)
- ✅ Booking cards with:
  - Operator name & rating
  - Departure/Arrival times
  - Available seats
  - Price
  - Quick booking button
- ✅ Map placeholder for route visualization
- ✅ Subscription-gated (Gold/Premium only)

### 7. **Subscriptions Page**
- ✅ Three subscription plans:
  - **Basic** (Free) - Trips only
  - **Gold** (₹4.99/month) - Trips + Bookings
  - **Premium** (₹9.99/month) - All features + Flight alerts
- ✅ Feature comparison table
- ✅ Plan upgrade/downgrade functionality

### 8. **UI/UX**
- ✅ Modern, clean design
- ✅ Responsive layout (Mobile, Tablet, Desktop)
- ✅ Smooth animations and transitions
- ✅ Color-coded sections
- ✅ Font Awesome icons
- ✅ Card-based layout

## 🎨 Design Features

- **Color Scheme**:
  - Primary: `#6C63FF` (Purple)
  - Secondary: `#F55C5C` (Red)
  - Success: `#11A854` (Green)
  - Light Background: `#F8F9FA`

- **Responsive Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: Below 768px

- **Typography**:
  - Font Family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
  - Clear hierarchy with multiple font sizes

## 🔧 Technical Stack

- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Media Queries
- **Vanilla JavaScript**: No dependencies
- **Font Awesome**: Icon library (CDN)

## 📱 Mobile Responsiveness

The application is fully responsive with:
- Mobile-first design approach
- Touch-friendly button sizes
- Optimized layout for small screens
- Adaptive navigation

## 🚀 Getting Started

1. **Extract the files** to your desired location
2. **Open `index.html`** in a web browser
3. **No installation required** - runs in any modern browser

### Test Credentials (Demo)
- Email: Any email format (e.g., test@gmail.com)
- Password: Any password (minimum 6 characters)

## 📝 Usage Guide

### Authentication Flow
1. Start at Home page
2. Click "Sign Up" to create an account or "Sign In" if already registered
3. Fill in required information
4. Access all features after login

### Creating a Trip
1. Navigate to "Trips" from bottom navbar
2. Fill in travel details (From, To, Date, Time, Alert Time, Transport Mode)
3. Click "Create Trip"
4. View your trips in the trips list

### Booking a Ride
1. Navigate to "My Bookings"
2. Search for rides with your travel details
3. View available rides from different operators
4. Click "Book Now" to confirm booking
5. ⚠️ **Note**: Only available with Gold or Premium subscription

### Managing Subscriptions
1. Navigate to "Plans"
2. View all subscription options
3. Click "Upgrade" or "Downgrade" to change plans
4. Check feature comparison table

### Profile Management
1. Navigate to "Profile"
2. View your personal information
3. Check current subscription status
4. Access account settings

## 🎯 API Placeholders

The following are placeholder APIs ready for integration:

```javascript
// Weather API Integration Point
// Current: Mock data
// TODO: Integrate with OpenWeatherMap or similar

// Booking Operators Integration
// Current: Mock data from AbhiBus, Goibibo, RedBus
// TODO: Integrate with actual booking APIs

// Maps Integration
// Current: Placeholder divs
// TODO: Integrate Google Maps or Mapbox

// Geolocation
// TODO: Add GPS-based location detection
```

## 🔐 Security Notes

**Current Implementation**: 
- This is a frontend prototype with mock authentication
- No backend server or database
- All data is stored in browser memory

**For Production**:
- Implement secure backend authentication
- Use HTTPS for all communications
- Implement proper password hashing
- Add rate limiting and security headers
- Secure API keys

## 🎓 Educational Value

This project is ideal for:
- Learning responsive web design
- Understanding component-based UI architecture
- Practicing JavaScript state management
- Learning CSS Grid and Flexbox
- Understanding web application flow

## 📊 Performance Optimization Tips

- Assets are loaded efficiently
- Minimal external dependencies (only Font Awesome via CDN)
- CSS is organized and optimized
- JavaScript uses event delegation where possible
- Smooth animations with CSS transitions

## 🔄 Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📈 Future Enhancements

1. **Backend Integration**:
   - Node.js/Express server
   - MongoDB database
   - JWT authentication

2. **Features**:
   - Real-time GPS tracking
   - Actual weather API integration
   - Payment gateway integration
   - Push notifications
   - User reviews and ratings

3. **Mobile App**:
   - React Native conversion
   - Offline functionality
   - Battery optimization

4. **Analytics**:
   - User behavior tracking
   - Trip analytics
   - Performance metrics

## 📄 License

This project is created for educational purposes.

---

## 📞 Support

For questions or issues, refer to the inline code comments for detailed explanations.

**Project ID**: 24071A05M4@manzil

## ✅ Checklist of Implemented Features

- [x] Responsive website design
- [x] Bottom-fixed navigation bar
- [x] Weather widget
- [x] Sign In/Sign Up pages
- [x] Profile management
- [x] Trips creation and management
- [x] Bookings with mock data
- [x] Subscription plans
- [x] Mobile optimization
- [x] Clean, modern UI
- [x] Component-based structure
- [x] Smooth animations
- [x] Form validation
- [x] State management
- [x] Ready for API integration

---

**Version**: 1.0.0  
**Last Updated**: January 2026
