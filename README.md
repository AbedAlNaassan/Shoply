# 🛒 React Native E-Commerce App

## 📱 Overview

This project is a feature-rich e-commerce mobile application built with **React Native CLI**. It supports user authentication, product listings, navigation, profile editing, and integrates with APIs using **Axios**. State is managed with **Zustand**, and form validation is handled with **react-hook-form** and **Zod**. The app also supports responsive layouts, dark mode, and native features like camera and location.

---

## 🚀 Features

### ✅ Authentication

- **Signup, Login, OTP Verification, Logout** using an API
- **Session persistence** with refresh token support
- Form validation using **react-hook-form** and **Zod**
- State management using **Zustand**

### 🧑‍💼 User Profile

- Tab navigation includes a **Profile tab**
- Profile edit screen with:
  - Editable name field
  - Image picker (Camera and Library access)

### 🛍️ Product Management

- Add new product with:

  - Name, description, price, images, location (select via map with search)
  - API integration and form validation

- Edit/Delete product:
  - Edit and delete options for the product owner
  - Full edit form for name, description, price, images, and location

### 📄 Product Listings

- Fetch product list from API with pagination
- Pull-to-refresh functionality
- Search products by name
- Sort products by price

### 🧾 Product Details

- Fetch detailed product data by ID via API
- Features:
  - Image swiper
  - Long press on images to save to device
  - Map view to show product location
  - Owner contact info with email functionality

### 🧭 Navigation

- Stack and Tab navigation using **React Navigation**
- Screen parameters and data passing supported

### 🎨 UI & Styling

- Custom fonts
- Responsive design using `Dimensions` and `PixelRatio`
- Dark mode support via Context API
- Styled using `StyleSheet` API

---

## ⚙️ Technologies Used

- **React Native CLI**
- **Axios** for API integration
- **Zustand** for state management
- **React Navigation**
- **react-hook-form** + **Zod** for form validation
- Native modules: Camera, Location, Storage

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
App.tsx

---

📌 Notes

-All APIs include loading and error state handling
-Fully responsive and optimized for mobile screens
-Designed with maintainable and modular architecture

---

## 💾 Installation

```bash
git clone <repo-url>
cd your-project-folder
npm install
npx react-native run-android # or run-ios
```

👨‍💻 Author
Abed El Rahman Al Naassan
