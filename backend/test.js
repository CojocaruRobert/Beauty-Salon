const http = require('http');

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

// Test functions
async function testRoot() {
  console.log('\n🔍 Testing Root Endpoint...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/',
    method: 'GET'
  };
  
  await makeRequest(options);
}

async function testRegister() {
  console.log('\n🔍 Testing User Registration...');
  
  const userData = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    phone: '123-456-7890'
  };
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return await makeRequest(options, userData);
}

async function testLogin() {
  console.log('\n🔍 Testing User Login...');
  
  const loginData = {
    email: 'test@example.com',
    password: 'password123'
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

async function testGetServices() {
  console.log('\n🔍 Testing Get Services...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/services',
    method: 'GET'
  };
  
  await makeRequest(options);
}

async function testCreateService(token) {
  console.log('\n🔍 Testing Create Service (Admin)...');
  
  const serviceData = {
    name: 'Test Hair Cut',
    description: 'A premium hair cut service',
    price: 50,
    duration: 30,
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
  
  await makeRequest(options, serviceData);
}

// Run tests
async function runTests() {
  try {
    // Test root endpoint
    await testRoot();
    
    // Test user registration
    const registerResult = await testRegister();
    
    // Test user login
    const loginResult = await testLogin();
    const token = loginResult.data?.token;
    
    // Test get services
    await testGetServices();
    
    // Test create service (if we have a token)
    if (token) {
      await testCreateService(token);
    } else {
      console.log('\n⚠️ No token available. Skipping admin-only endpoints.');
    }
    
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

// Run all tests
runTests(); 