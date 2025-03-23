const http = require('http');

// Function to make HTTP requests
function makeRequest(options) {
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
          console.log(`Total Services: ${parsedData.count}`);
          
          // Log each service with basic info
          console.log("\nServices:");
          parsedData.data.forEach((service, index) => {
            console.log(`${index + 1}. ${service.name} - ${service.category} - $${service.price} - ${service.duration} mins`);
          });
          
          // Log categories
          const categories = [...new Set(parsedData.data.map(service => service.category))];
          console.log("\nCategories:");
          categories.forEach(category => {
            console.log(`- ${category}`);
          });
          
          resolve(parsedData);
        } catch (e) {
          console.log('Error parsing response:', e);
          console.log('Response:', responseData);
          resolve(responseData);
        }
      });
    });
    
    req.on('error', (error) => {
      console.error(`Error: ${error.message}`);
      reject(error);
    });
    
    req.end();
  });
}

// Check services
async function checkServices() {
  console.log('Fetching services from API...');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/services',
    method: 'GET'
  };
  
  await makeRequest(options);
}

// Run the check
checkServices(); 