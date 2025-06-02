# 🎫 Booking Platform

A modern, scalable booking platform for events, movies, and concerts with a clean, consistent design system and maintainable architecture.

## ✨ Features

- **Event Management**: Create, modify, and manage events with rich media support
- **User Management**: Role-based access control and profile management
- **Booking System**: Real-time availability and secure payment processing
- **Administrative Tools**: Comprehensive dashboard for analytics and management
- **Support System**: Integrated ticket management for customer support

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
```

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

## 📚 Documentation
For more detailed information, check out the [project wiki](./docs/Home.md):
- [System Architecture](./docs/architecture.md)
- [Database Schema](./docs/database-schema.md)
- [API Documentation](./docs/api-docs.md)
- [Authentication Flow](./docs/auth-flow.md)

## 🤝 Contributing
Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
