// src/backend/server.js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const helmet = require('helmet');
const { sequelize } = require('./models');
const User = require('./models/user')(sequelize);
const asyncHandler = require('express-async-handler'); // For cleaner async routes
const { body, validationResult } = require('express-validator'); // For input validation

const app = express();

// Apply security headers early
app.use(helmet());

// CORS configuration
// In development, allow any localhost origin
const isDevelopment = process.env.NODE_ENV === 'development';
const corsOptions = {
  origin: function (origin, callback) {
    if (isDevelopment && (!origin || origin.startsWith('http://localhost:'))) {
      callback(null, true);
    } else if (!origin || origin === process.env.REACT_APP_URL) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin, 'Expected origin:', process.env.REACT_APP_URL);
      callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization, Accept, Origin, X-Requested-With',
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin}`);
  next();
});

// Helper function to get JWT secret
function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
      process.exit(1);
    }
    console.warn('Using development JWT secret. DO NOT use this in production!');
    return 'dev-jwt-secret-key-replace-in-production';
  }
  return secret;
}

// Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Access denied.' });
  }

  const jwtSecret = getJwtSecret();
  if (jwtSecret === 'unsafe_dev_secret_key_for_jwt_pls_change_in_env' && process.env.NODE_ENV !== 'test') {
      console.warn('Warning: Using insecure fallback JWT secret in development.');
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) {
      return next(err); // Pass to centralized error handler
    }
    req.user = user;
    next();
  });
};

// Auth Routes
app.post('/api/auth/register',
  // Input validation rules
  body('email').isEmail().withMessage('Please provide a valid email address.'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
  body('name').notEmpty().withMessage('Name is required.'),
  asyncHandler(async (req, res, next) => {
    // Handle validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email.' });
    }

    const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    const jwtSecret = getJwtSecret();
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, name: newUser.name, isAdmin: newUser.isAdmin },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isAdmin: newUser.isAdmin
      }
    });
  })
);

app.post('/api/auth/login',
  // Basic validation for login
  body('email').isEmail().withMessage('Valid email is required.'),
  body('password').notEmpty().withMessage('Password is required.'),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Login failed: User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      console.log('Login failed: Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const jwtSecret = getJwtSecret();
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin },
      jwtSecret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
      }
    });
  })
);

// Protected Routes
app.get('/api/profile', authenticateToken, asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ['password', 'verificationToken', 'resetPasswordToken', 'resetPasswordExpires'] }
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
  res.json(user);
}));

// Centralized Error Handling Middleware - MUST be defined last
app.use((err, req, res, next) => {
  console.error('Error caught by handler:', err.name, '-', err.message);
  if (err.stack && process.env.NODE_ENV !== 'production') { // Log stack in dev
    console.error(err.stack);
  }

  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    return res.status(401).json({ message: err.message || 'Token is invalid or expired.' });
  }

  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ message: err.message });
  }

  const statusCode = err.status || err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  res.status(statusCode).json({
    message: (isProduction && statusCode === 500) ? 'An unexpected internal server error occurred.' : err.message,
    // Optionally, provide an error code or more specific error type if available
    ...( !isProduction && err.stack && { stack: err.stack }),
  });
});


// Initialize database and start server
async function startServer() {
  try {
    await sequelize.sync(); // Consider { alter: true } for dev, migrations for prod
    console.log('Database synced successfully.');

    const adminEmail = process.env.INITIAL_ADMIN_EMAIL;
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;
    const adminName = process.env.INITIAL_ADMIN_NAME || 'Admin User';

    if (adminEmail && adminPassword) {
      const existingAdmin = await User.findOne({ where: { email: adminEmail } });
      if (!existingAdmin) {
        const saltRounds = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS) : 12;
        const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
        await User.create({
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          isAdmin: true,
          isVerified: true
        });
        console.log(`Initial admin user (${adminEmail}) created.`);
      } else {
        console.log(`Initial admin user (${adminEmail}) already exists.`);
      }
    } else {
      console.warn('INITIAL_ADMIN_EMAIL or INITIAL_ADMIN_PASSWORD not set in .env. Skipping initial admin user creation.');
    }

    // If you added 5002 to allowedOrigins because you intend to run the backend on this port:
    const PORT = process.env.PORT || 5002; // Changed default to 5002
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      if (process.env.NODE_ENV !== 'production' && getJwtSecret() === 'unsafe_dev_secret_key_for_jwt_pls_change_in_env') {
        console.warn('\n****************************************************************************');
        console.warn('WARNING: Server is using an UNSAFE DEFAULT JWT SECRET for development.');
        console.warn('Please set a strong JWT_SECRET in your .env file for proper security.');
        console.warn('****************************************************************************\n');
      }
    });
  } catch (error) {
    console.error('Failed to start server or sync database:', error);
    process.exit(1);
  }
}

startServer();