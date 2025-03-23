const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Import the User model
const User = require('./models/User');

// Function to make HTTP requests
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        try {
          const parsedData = JSON.parse(responseData);
          console.log('Response:', JSON.stringify(parsedData, null, 2));
          resolve(parsedData);
        } catch (e) {
          console.log('Response:', responseData);
          resolve(responseData);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

// Create admin user directly in the database
async function createAdminUser() {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create new admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'adminpass123',
      role: 'admin',
      phone: '987-654-3210'
    });
    
    await admin.save();
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Test functions
async function testAdminLogin() {
  console.log('\n🔍 Testing Admin Login...');
  
  const loginData = {
    email: 'admin@example.com',
    password: 'adminpass123'
  };
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return await makeRequest(options, loginData);
}

async function testCreateService(token) {
  console.log('\n🔍 Testing Create Service (Admin)...');
  
  const serviceData = {
    name: 'Luxury Hair Cut',
    description: 'A premium hair cut service with styling',
    price: 50,
    duration: 45,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    active: true
  };
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/services',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  
  return await makeRequest(options, serviceData);
}

async function testGetServices() {
  console.log('\n🔍 Testing Get Services...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/services',
    method: 'GET'
  };
  
  return await makeRequest(options);
}

// Run tests
async function runTests() {
  try {
    // Create admin user
    await createAdminUser();
    
    // Test admin login
    const loginResult = await testAdminLogin();
    const token = loginResult.data?.token;
    
    if (!token) {
      console.log('\n⚠️ No admin token available. Stopping tests.');
      return;
    }
    
    // Test create service with admin privileges
    await testCreateService(token);
    
    // Test get services to verify creation
    await testGetServices();
    
    console.log('\n✅ All admin tests completed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run all tests
runTests(); 