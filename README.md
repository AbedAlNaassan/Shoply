# 🛒 React Native E-Commerce App

## 📱 Overview

This project is a feature-rich e-commerce mobile application built with **React Native CLI**. It supports user authentication, product listings, navigation, profile editing, and integrates with APIs using **Axios**. State is managed with **Zustand**, and form validation is handled with **react-hook-form** and **Zod**. The app also supports responsive layouts, dark mode, and native features like camera and location.

---

## 🚀 Features

### ✅ Authentication & Security

- **Signup, Login, OTP Verification, Logout** using an API
- **Session persistence** with refresh token support
- Form validation using **react-hook-form** and **Zod**
- Secure authentication and sensitive data storage
- Environment variables for different stages (dev, staging, prod)

### � Advanced UI/UX

- **Skeleton loading** for product lists
- **Animations** for screen transitions and photo interactions
- Custom splash screen and app icon (branding)
- Dark mode support via Context API
- Responsive design using `Dimensions` and `PixelRatio`

### 🛒 Cart Management

- Add/remove products with quantity adjustment
- Dedicated shopping cart screen
- Swipe-to-delete functionality
- Local storage for cart persistence

### 🔗 Deep Linking & Sharing

- Share products via native share modal
- Deep links that open app directly to specific products
- Push notifications with product links
- Notification handling to open product details

### 📄 Product Management

- Fetch product list from API with pagination
- Pull-to-refresh functionality
- Search and sort products
- Add/edit/delete products with:
  - Name, description, price, images
  - Location selection via map
  - API integration and validation

### 📊 Performance Optimization

- **useMemo** and **useCallback** for optimized rendering
- Performance profiling tools integration
- **Firebase Crashlytics** for real-time crash monitoring
- Unit testing with Jest for key components

### 🚀 Deployment

- APK generation for Android
- CI/CD setup for automated releases
- App submission process documentation for App Store/Google Play

---

## ⚙️ Technologies Used

- **React Native CLI**
- **Axios** for API integration
- **Zustand** for state management
- **React Navigation** (Stack + Tab)
- **react-hook-form** + **Zod** for form validation
- **Firebase** (Crashlytics, Push Notifications)
- Native modules: Camera, Location, Storage, Deep Linking

---

## 📁 Project Structure

/src
/components
/screens
/context
/navigation
/data
/assets
/styles
/types
/tests # Jest unit tests
App.tsx

---

## 💾 Installation

```bash
git clone <repo-url>
cd your-project-folder
npm install
npx react-native run-android # or run-ios

🧪 Testing
npm test     # Run Jest unit tests

🏗️ Building
cd android && ./gradlew assembleRelease  # Generate APK

📌 Notes

All APIs include loading and error state handling

Fully responsive and optimized for mobile screens

Designed with maintainable and modular architecture

CI/CD pipeline configured for automated deployments

Comprehensive crash reporting via Firebase Crashlytics

👨‍💻 Author
Abed El Rahman Al Naassan
```
