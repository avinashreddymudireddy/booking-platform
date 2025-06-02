# 🎫 Booking Platform

## Overview
The Booking Platform is a modern, full-stack application for event discovery, booking, and management. Built with React and Node.js, it offers a seamless experience for discovering and booking events, movies, and concerts. The platform features secure authentication, real-time notifications, and a responsive design system.

## 🏗️ Architecture
```
┌─────────────────┐     ┌──────────────────┐      ┌─────────────────┐
│    Frontend     │     │     Backend      │      │    Database     │
│    (React)     │────▶│    (Node.js)     │────▶│  (PostgreSQL)   │
└─────────────────┘     └──────────────────┘      └─────────────────┘
        │                       │                         │
        │                       │                         │
    React Router          Express.js API          Sequelize ORM
    Material UI          JWT Auth & CORS         Data Persistence
    Context API          Input Validation        User Management
        │                       │                         │
        │                       │                         │
┌─────────────────┐     ┌──────────────────┐      ┌─────────────────┐
│  Client State   │     │   Server State   │      │   Data Model    │
│    Management   │     │    & Caching     │      │  & Relations    │
└─────────────────┘     └──────────────────┘      └─────────────────┘

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

## ✨ Features

### User Features
- 🎭 **Event Discovery**
  - Browse curated events, movies, and concerts
  - Advanced search and filtering
  - Real-time availability updates
  - Location-based recommendations

- 🔐 **Authentication & Security**
  - JWT-based secure authentication
  - Role-based access control
  - Password encryption with bcrypt
  - Protected routes and API endpoints

- 📱 **Responsive Interface**
  - Material UI components
  - Dark/Light mode support
  - Mobile-first design
  - Smooth animations and transitions

- 🎫 **Booking Management**
  - Multi-step booking wizard
  - Real-time seat selection
  - Booking history tracking
  - E-ticket generation

### Admin Features
- 📊 **Dashboard**
  - Event management
  - User management
  - Booking analytics
  - Sales reports

- 🎯 **Marketing Tools**
  - Promotional offers
  - Featured events
  - Email notifications
  - Customer engagement metrics

- 🔧 **Support System**
  - Ticket management
  - Customer support portal
  - Issue tracking
  - Resolution management

## 🛠️ Technical Stack

### Frontend
- **Core**: React 18, React Router v6
- **UI Framework**: Material UI v5
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **API Client**: Axios
- **Date Handling**: date-fns
- **Types**: TypeScript (planned)

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Database ORM**: Sequelize
- **Security**: helmet, cors
- **Testing**: Jest (planned)

### Database
- **RDBMS**: PostgreSQL 14+
- **Schema**: Managed via Sequelize
- **Backups**: Automated daily

### DevOps
- **Version Control**: Git
- **CI/CD**: GitHub Actions
- **Hosting**: Azure App Service
- **Monitoring**: Azure Application Insights

## 📁 Project Structure
```bash
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements
│   └── forms/           # Form components
├── context/             # Global state management
├── hooks/               # Custom React hooks
├── screens/             # Page components
├── theme/              # Styling and theming
└── backend/            # Server implementation
    ├── config/         # Server configuration
    ├── models/         # Database models
    ├── routes/         # API routes
    └── services/       # Business logic

public/                 # Static assets
├── images/            # Image assets
└── data/             # Static data files
```

## 🚀 Installation

### Prerequisites
- Node.js 16.x or higher
- PostgreSQL 14.x or higher
- npm 8.x or higher

### Required Global Packages
```bash
npm install -g nodemon sequelize-cli
```

### Frontend Dependencies
```bash
# Core dependencies
npm install react react-dom react-router-dom @mui/material @mui/icons-material @emotion/react @emotion/styled

# Form handling and validation
npm install react-hook-form yup @hookform/resolvers

# Utilities and helpers
npm install axios date-fns lodash
```

### Backend Dependencies
```bash
# Core dependencies
npm install express cors helmet dotenv

# Authentication and security
npm install jsonwebtoken bcryptjs express-validator

# Database
npm install pg pg-hstore sequelize
```

## 🌐 Deployment

### Local Development
1. Start PostgreSQL server
2. Create and configure `.env` files
3. Run database migrations:
   ```bash
   cd src/backend
   npx sequelize-cli db:migrate
   ```
4. Seed initial data:
   ```bash
   npx sequelize-cli db:seed:all
   ```

### Production Deployment
The application is optimized for deployment on Azure:

1. **Frontend**: Azure Static Web Apps
   - Automatic builds via GitHub Actions
   - Global CDN distribution
   - Free SSL certificates

2. **Backend**: Azure App Service
   - Node.js runtime
   - Auto-scaling enabled
   - Application monitoring

3. **Database**: Azure Database for PostgreSQL
   - Managed PostgreSQL service
   - Automated backups
   - High availability

### CI/CD Pipeline
Includes GitHub Actions workflows for:
- Code quality checks
- Unit and integration tests
- Automated deployments
- Security scanning

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
