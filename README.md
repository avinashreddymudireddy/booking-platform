# Booking Platform

## Overview
The Booking Platform is a modern, scalable application designed for event discovery, booking, and user management. It aims to deliver a cohesive, responsive design system with robust backend integration and seamless user experience.

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/avinashreddymudireddy/booking-platform.git
   cd booking-platform
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd src/backend
   npm install
   ```

3. Create `.env` file in the root directory:
   ```bash
   # API Configuration
   REACT_APP_API_URL=http://localhost:5002/api
   REACT_APP_URL=http://localhost:5003

   # Database Configuration
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_NAME=booking_platform
   DB_HOST=localhost

   # Server Configuration
   PORT=5002
   NODE_ENV=development

   # Security
   JWT_SECRET=your-secret-key
   JWT_EXPIRES_IN=24h
   BCRYPT_SALT_ROUNDS=12
   ```

4. Start the development servers:
   ```bash
   # Start backend server (from src/backend directory)
   npm start

   # Start frontend server (from root directory)
   npm start
   ```

## Features
- **Event Discovery**: Browse events, movies, concerts, and offers.
- **User Authentication**: Secure login and profile management.
- **Booking Flow**: Multi-step booking wizard with payment integration.
- **Admin Dashboard**: Manage events, offers, and support tickets.
- **Support System**: Submit and track support requests.

## Project Structure
```
src/
  components/       # Reusable UI components
  context/          # Context for global state management
  data/             # API functions and JSON data
  hooks/            # Custom React hooks
  screens/          # Page components
  theme.js          # Theming and styling
  ToggleColorMode.js # Light/Dark mode toggle
public/
  data/             # JSON files for dummy data
  images/           # Static assets
build/              # Production build files
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/booking-platform.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Deployment
The application is designed for deployment on Azure Static Web Apps or App Service. CI/CD pipelines can be configured using GitHub Actions.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License.
