# Quick Reference Guide - Validation System

## What's New

A complete client-side validation system has been integrated into the Manzil application.

## Key File: `assets/js/validation.js`

This is the **SINGLE** JavaScript file containing ALL validation logic as requested.

### Validation Rules Summary

| Field | Rule | Error Message |
|-------|------|---|
| **Email** | Must contain `@` and domain extension | "Please enter a valid email with @ and domain extension" |
| **Password** | Minimum 6 characters | "Password must be at least 6 characters" |
| **Confirm Password** | Must match initial password | "Passwords do not match" |
| **Phone** | Exactly 10 digits | "Phone number must be exactly 10 digits" |
| **Duplicate Email** | Email cannot be registered twice | "This email is already registered..." |
| **Other Fields** | All required | "[Field name] is required" |

## How to Test

### Signup Page Test
1. Go to `signup.html`
2. Try entering invalid data:
   - Email: `usergmail.com` → Shows error
   - Password: `pass` → Shows error (less than 6 chars)
   - Confirm: `wrongpass` → Shows error (doesn't match)
   - Phone: `98765432` → Shows error (not 10 digits)
3. Fix errors - green checkmarks appear
4. Submit with valid data - success!

### Login Page Test
1. Go to `login.html`
2. Try invalid email/password combinations
3. Errors display in real-time
4. Submit with valid data - redirects to profile

## Real-Time Validation

These fields validate **as you type**:
- Email fields (both pages)
- Password fields (both pages)
- Confirm password (signup only)
- Phone number (signup only)

## Visual Feedback

### ✅ Valid Input
- Green border
- Green checkmark icon
- No error message

### ❌ Invalid Input
- Red border
- Red X icon
- Red error message below field

## Email Format Examples

**✅ Valid:**
- john@gmail.com
- user@example.co.in
- test.email@domain.org
- my-email@company.net

**❌ Invalid:**
- usergmail.com (missing @)
- user@domain (missing extension)
- @domain.com (no local part)
- user name@domain.com (space not allowed)

## Password Rules

**✅ Valid:**
- password123
- MyP@ssword
- abc@123456
- pass_word

**❌ Invalid:**
- pass (5 chars)
- 12345 (5 chars)
- abc (3 chars)

## Phone Number Rules

**✅ Valid:**
- 9876543210
- 98-765-43210
- (987) 654-3210
- 987 654 3210

**❌ Invalid:**
- 987654321 (9 digits)
- 98765432101 (11 digits)
- 987654321a (contains letter)

## Duplicate Account Prevention

Once a user signs up with an email:
- That email is stored in localStorage under `registeredUsers`
- If same email is used again for signup → Error message shown
- User must use different email to sign up again

## Files Changed

1. **NEW**: `assets/js/validation.js` - Complete validation system
2. **MODIFIED**: `assets/js/app.js` - Updated login/signup handlers
3. **MODIFIED**: `login.html` - Added validation script
4. **MODIFIED**: `signup.html` - Added validation script
5. **MODIFIED**: `assets/css/auth.css` - Added validation styling

## Functions Available (if needed)

```javascript
// Email
isValidEmail(email)

// Password
isValidPassword(password)
passwordsMatch(password, confirm)

// Phone
isValidPhoneNumber(phone)

// User registration
userProfileExists(email)
addRegisteredUser(email)

// Form validation
validateSignupForm()
validateLoginForm()

// UI
showValidationError(fieldId, message)
showValidationSuccess(fieldId)
clearAllValidationMessages()
```

## Storage

Registered users are stored in:
```javascript
localStorage.registeredUsers // Array of emails
```

## Browser Support

Works on all modern browsers:
- Chrome/Chromium ✅
- Firefox ✅
- Safari ✅
- Edge ✅
- Mobile browsers ✅

## Responsive Design

- Validation works on mobile, tablet, desktop
- Error messages adapt to screen size
- Touch-friendly on mobile devices
- Full width on mobile, contained on desktop

## Future Enhancements (Optional)

- Add server-side validation
- Implement "Forgot Password" feature
- Add email verification
- Enhanced password strength meter
- Two-factor authentication
- Rate limiting on signup attempts

---

**Status**: ✅ Ready to use
**Last Updated**: February 1, 2026
