## 📱 Overview

This project is a basic e-commerce mobile application built with **React Native CLI**. It includes authentication screens, product listings, navigation between screens, and state management using **Context API**. Form validation is handled using **react-hook-form** and **Zod**. The UI also supports responsive layouts and dark mode.

## 🚀 Features

### ✅ Authentication

- **Sign-up screen** with inputs: name, email, password, and phone number
- **Login screen** (email and password)
- **OTP verification screen** with 4-digit input
- Form validation using `react-hook-form` and `Zod`
- Login credentials:

Username: eurisko
Password: academy2025
VerificationCode : Any Numbers

- Login state management via **Context API**

### 🛍️ Product Listings

- Product list shown using **FlatList**
- Each item displays an image, name, and price
- Tapping a product opens a **details screen** with:
- Image, name, description, and price
- Share button (no action yet)
- "Add to Cart" button (no action yet)

### 🧭 Navigation

- Navigation handled via **React Navigation**
- Stack navigation between screens
- Parameters passed between screens

### 🎨 UI & Styling

- Custom fonts used across the app
- Responsive design using `Dimensions` and `PixelRatio`
- Basic **Dark Mode** toggle using Context API
- Styled with `StyleSheet` API

## 📁 Project Structure

/src
/components
/screens
/context
/navigation
/data
/assets
App.tsx

## 💾 Installation

```bash
git clone <repo-url>
cd your-project-folder
npm install
npx react-native run-android # or run-ios
```

🧑‍💻 Author
Abed El Rahman Al Naassan
