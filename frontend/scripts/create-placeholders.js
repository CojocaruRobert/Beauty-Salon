const fs = require('fs');
const path = require('path');

// Ensure the images directory exists
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a simple SVG for service placeholder
const servicePlaceholder = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f9fa"/>
  <rect x="50" y="50" width="700" height="500" fill="#e9ecef" rx="15" ry="15"/>
  <text x="400" y="250" font-family="Arial" font-size="48" text-anchor="middle" fill="#6c757d">Service Image</text>
  <text x="400" y="320" font-family="Arial" font-size="24" text-anchor="middle" fill="#6c757d">Placeholder</text>
  <path d="M340,380 C360,360 400,360 420,380 C440,400 480,400 500,380" stroke="#6c757d" stroke-width="5" fill="none"/>
</svg>
`;

// Create a simple SVG for person placeholder
const personPlaceholder = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f8f9fa"/>
  <rect x="50" y="50" width="700" height="500" fill="#e9ecef" rx="15" ry="15"/>
  <circle cx="400" cy="200" r="80" fill="#6c757d"/>
  <circle cx="400" cy="150" r="20" fill="#f8f9fa"/>
  <rect x="320" y="250" width="160" height="180" rx="80" ry="80" fill="#6c757d"/>
  <text x="400" y="500" font-family="Arial" font-size="24" text-anchor="middle" fill="#6c757d">Person Placeholder</text>
</svg>
`;

// Write the files
fs.writeFileSync(path.join(imagesDir, 'service-placeholder.svg'), servicePlaceholder);
fs.writeFileSync(path.join(imagesDir, 'placeholder-person.svg'), personPlaceholder);

console.log('Placeholder images created successfully!'); 