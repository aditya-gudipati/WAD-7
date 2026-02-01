// ====================
// Validation Module
// ====================

// Store registered users in localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
}

function saveRegisteredUsers(users) {
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

function addRegisteredUser(email) {
    const users = getRegisteredUsers();
    if (!users.includes(email)) {
        users.push(email);
        saveRegisteredUsers(users);
    }
}

function userProfileExists(email) {
    const users = getRegisteredUsers();
    return users.includes(email);
}

// ====================
// Email Validation
// ====================
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateGmailFormat(email) {
    // Check for proper Gmail structure with @ and .com
    const gmailRegex = /^[a-zA-Z0-9._%-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    
    const trimmedEmail = email.trim();
    
    // Check if it matches proper email format (with @ and domain extension)
    if (!validateEmail(trimmedEmail)) {
        return false;
    }
    
    // Split to validate @ and domain parts
    const parts = trimmedEmail.split('@');
    if (parts.length !== 2) {
        return false;
    }
    
    const [localPart, domain] = parts;
    
    // Check if local part is not empty
    if (!localPart || localPart.length === 0) {
        return false;
    }
    
    // Check if domain has proper structure (domain.extension)
    const domainParts = domain.split('.');
    if (domainParts.length < 2) {
        return false;
    }
    
    // Check if domain extension exists
    const extension = domainParts[domainParts.length - 1];
    if (!extension || extension.length < 2) {
        return false;
    }
    
    return true;
}

// ====================
// Password Validation
// ====================
function isValidPassword(password) {
    if (!password || typeof password !== 'string') {
        return false;
    }
    
    // Password must be at least 6 characters
    return password.length >= 6;
}

function passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

// ====================
// Phone Number Validation
// ====================
function isValidPhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }
    
    // Remove any spaces, dashes, or special characters
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    
    // Phone number must be exactly 10 digits
    return /^\d{10}$/.test(cleanedPhone);
}

// ====================
// Form Field Validation with UI Display
// ====================
function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remove existing error message and styling
    removeValidationError(fieldId);
    
    // Add error styling to field
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Create and display error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback d-block';
    errorDiv.id = `${fieldId}-error`;
    errorDiv.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function showValidationSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    // Remove existing error message
    removeValidationError(fieldId);
    
    // Add success styling to field
    field.classList.add('is-valid');
    field.classList.remove('is-invalid');
}

function removeValidationError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.remove('is-invalid', 'is-valid');
    
    // Remove error message if it exists
    const errorDiv = document.getElementById(`${fieldId}-error`);
    if (errorDiv) {
        errorDiv.remove();
    }
}

function clearAllValidationMessages() {
    // Remove all validation styling and messages
    const allInputs = document.querySelectorAll('.form-control, .form-select');
    allInputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    
    const allErrors = document.querySelectorAll('.invalid-feedback');
    allErrors.forEach(error => {
        error.remove();
    });
}

// ====================
// Real-time Validation (On Input)
// ====================
function validateEmailOnInput(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.addEventListener('input', function() {
        const email = this.value.trim();
        
        if (!email) {
            removeValidationError(fieldId);
            return;
        }
        
        if (isValidEmail(email)) {
            showValidationSuccess(fieldId);
        } else {
            showValidationError(fieldId, 'Please enter a valid email with @ and domain extension (e.g., user@example.com)');
        }
    });
}

function validatePasswordOnInput(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.addEventListener('input', function() {
        const password = this.value;
        
        if (!password) {
            removeValidationError(fieldId);
            return;
        }
        
        if (isValidPassword(password)) {
            showValidationSuccess(fieldId);
        } else {
            showValidationError(fieldId, 'Password must be at least 6 characters');
        }
    });
}

function validateConfirmPasswordOnInput(passwordFieldId, confirmFieldId) {
    const confirmField = document.getElementById(confirmFieldId);
    const passwordField = document.getElementById(passwordFieldId);
    
    if (!confirmField || !passwordField) return;
    
    confirmField.addEventListener('input', function() {
        const password = passwordField.value;
        const confirmPassword = this.value;
        
        if (!confirmPassword) {
            removeValidationError(confirmFieldId);
            return;
        }
        
        if (passwordsMatch(password, confirmPassword)) {
            showValidationSuccess(confirmFieldId);
        } else {
            showValidationError(confirmFieldId, 'Passwords do not match');
        }
    });
}

function validatePhoneOnInput(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.addEventListener('input', function() {
        const phone = this.value;
        
        if (!phone) {
            removeValidationError(fieldId);
            return;
        }
        
        if (isValidPhoneNumber(phone)) {
            showValidationSuccess(fieldId);
        } else {
            showValidationError(fieldId, 'Phone number must be exactly 10 digits');
        }
    });
}

// ====================
// Signup Form Validation
// ====================
function validateSignupForm() {
    clearAllValidationMessages();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const transport = document.getElementById('transport').value;
    
    let isValid = true;
    
    // Validate Full Name
    if (!fullName) {
        showValidationError('fullName', 'Full name is required');
        isValid = false;
    } else {
        showValidationSuccess('fullName');
    }
    
    // Validate Email
    if (!email) {
        showValidationError('signupEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showValidationError('signupEmail', 'Please enter a valid email with @ and domain extension (e.g., user@gmail.com)');
        isValid = false;
    } else if (userProfileExists(email)) {
        showValidationError('signupEmail', 'This email is already registered. Please sign in or use a different email.');
        isValid = false;
    } else {
        showValidationSuccess('signupEmail');
    }
    
    // Validate Password
    if (!password) {
        showValidationError('signupPassword', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showValidationError('signupPassword', 'Password must be at least 6 characters');
        isValid = false;
    } else {
        showValidationSuccess('signupPassword');
    }
    
    // Validate Confirm Password
    if (!confirmPassword) {
        showValidationError('confirmPassword', 'Confirm password is required');
        isValid = false;
    } else if (!passwordsMatch(password, confirmPassword)) {
        showValidationError('confirmPassword', 'Passwords do not match');
        isValid = false;
    } else {
        showValidationSuccess('confirmPassword');
    }
    
    // Validate Phone Number
    if (!phone) {
        showValidationError('phone', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhoneNumber(phone)) {
        showValidationError('phone', 'Phone number must be exactly 10 digits');
        isValid = false;
    } else {
        showValidationSuccess('phone');
    }
    
    // Validate Age
    if (!age) {
        showValidationError('age', 'Age is required');
        isValid = false;
    } else {
        showValidationSuccess('age');
    }
    
    // Validate Gender
    if (!gender) {
        showValidationError('gender', 'Please select a gender');
        isValid = false;
    } else {
        showValidationSuccess('gender');
    }
    
    // Validate Transport
    if (!transport) {
        showValidationError('transport', 'Please select a preferred transport mode');
        isValid = false;
    } else {
        showValidationSuccess('transport');
    }
    
    return isValid;
}

// ====================
// Login Form Validation
// ====================
function validateLoginForm() {
    clearAllValidationMessages();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    let isValid = true;
    
    // Validate Email
    if (!email) {
        showValidationError('loginEmail', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showValidationError('loginEmail', 'Please enter a valid email with @ and domain extension');
        isValid = false;
    } else {
        showValidationSuccess('loginEmail');
    }
    
    // Validate Password
    if (!password) {
        showValidationError('loginPassword', 'Password is required');
        isValid = false;
    } else if (!isValidPassword(password)) {
        showValidationError('loginPassword', 'Password must be at least 6 characters');
        isValid = false;
    } else {
        showValidationSuccess('loginPassword');
    }
    
    return isValid;
}

// ====================
// Initialize Validation Listeners
// ====================
function initializeValidationListeners() {
    // Signup form listeners
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        validateEmailOnInput('signupEmail');
        validatePasswordOnInput('signupPassword');
        validateConfirmPasswordOnInput('signupPassword', 'confirmPassword');
        validatePhoneOnInput('phone');
    }
    
    // Login form listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        validateEmailOnInput('loginEmail');
        validatePasswordOnInput('loginPassword');
    }
}

// Initialize validation on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initializeValidationListeners();
});
