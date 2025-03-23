const http = require('http');

// Make a request to fetch all services
const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/services',
  method: 'GET'
}, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log('Response structure:');
      console.log(JSON.stringify({
        success: parsedData.success,
        data: Array.isArray(parsedData.data) ? `Array with ${parsedData.data.length} items` : typeof parsedData.data,
        message: parsedData.message
      }, null, 2));
      
      if (parsedData.data && parsedData.data.length > 0) {
        console.log('\nSample service object structure:');
        const sampleKeys = Object.keys(parsedData.data[0]);
        console.log(sampleKeys);
      }
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();

console.log('Checking API response format...'); 