const mongoose = require('mongoose');
const User = require('../models/User');
const Trade = require('../models/Trade');
const Portfolio = require('../models/Portfolio');

async function clearData() {
  console.log('🧹 Clearing existing data...');
  await Trade.deleteMany({});
  await Portfolio.deleteMany({});
  await User.deleteMany({});
}

async function seedUsers() {
  console.log('👥 Creating demo users...');
  const users = [
    {
      name: 'Demo Trader',
      email: 'demo@tradex.com',
      password: 'password123',
      balance: 1000000
    }
  ];

  for (let userData of users) {
    const user = new User(userData);
    await user.save();
    console.log(`✅ Created user: ${user.name}`);
  }
}

async function seedData() {
  if (!process.env.MONGO_URI) {
    console.error('❌ MONGO_URI not set. Copy .env.example to .env and set MongoDB URI');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await clearData();
    await seedUsers();

    console.log('🎉 Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
}

seedData();
