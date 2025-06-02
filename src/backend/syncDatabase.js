const { sequelize } = require('./models');
const User = require('./models/user')(sequelize);
const bcrypt = require('bcryptjs');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // This will drop existing tables
    
    // Create initial admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'Admin User',
      isAdmin: true,
      isVerified: true
    });
    
    console.log('Database synced successfully');
    console.log('Initial admin user created:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error syncing database:', error);
    process.exit(1);
  }
}

syncDatabase();
