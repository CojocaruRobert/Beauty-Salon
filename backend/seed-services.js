const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config();

// Sample services data
const services = [
  {
    name: 'Classic Haircut',
    description: 'A traditional haircut service performed by our expert stylists. Includes consultation, wash, cut, and style.',
    price: 35,
    duration: 30,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035',
    active: true
  },
  {
    name: 'Hair Coloring',
    description: 'Professional hair coloring service. Choose from a variety of colors or bring your inspiration.',
    price: 85,
    duration: 120,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df',
    active: true
  },
  {
    name: 'Blowout & Styling',
    description: 'Get a perfect blowout and styling for any occasion. Includes wash and professional styling.',
    price: 50,
    duration: 45,
    category: 'Hair',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1',
    active: true
  },
  {
    name: 'Manicure',
    description: 'Classic manicure including nail shaping, cuticle care, hand massage, and polish application.',
    price: 25,
    duration: 30,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371',
    active: true
  },
  {
    name: 'Pedicure',
    description: 'Relaxing pedicure treatment including foot soak, exfoliation, nail care, massage, and polish.',
    price: 35,
    duration: 45,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b',
    active: true
  },
  {
    name: 'Gel Nails',
    description: 'Long-lasting gel nail application that protects your natural nails and keeps them looking perfect for weeks.',
    price: 45,
    duration: 60,
    category: 'Nails',
    image: 'https://images.unsplash.com/photo-1632344499752-c6b7a30fecc2',
    active: true
  },
  {
    name: 'Basic Facial',
    description: 'Rejuvenating facial treatment including cleansing, exfoliation, mask, and moisturizing.',
    price: 60,
    duration: 45,
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881',
    active: true
  },
  {
    name: 'Deep Cleansing Facial',
    description: 'Intensive facial treatment targeting deep cleansing, extraction, and pore refinement.',
    price: 85,
    duration: 60,
    category: 'Facial',
    image: 'https://images.unsplash.com/photo-1594125894897-9ce2c452224a',
    active: true
  },
  {
    name: 'Swedish Massage',
    description: 'Classic massage technique that uses long, flowing strokes to promote relaxation and wellbeing.',
    price: 75,
    duration: 60,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874',
    active: true
  },
  {
    name: 'Deep Tissue Massage',
    description: 'Therapeutic massage targeting deeper layers of muscle and connective tissue to relieve chronic tension.',
    price: 90,
    duration: 60,
    category: 'Massage',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1',
    active: true
  },
  {
    name: 'Makeup Application',
    description: 'Professional makeup application for any occasion, from natural daytime looks to glamorous evening styles.',
    price: 65,
    duration: 45,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e',
    active: true
  },
  {
    name: 'Bridal Makeup',
    description: 'Complete bridal makeup service including consultation and trial run to ensure your perfect look on your special day.',
    price: 120,
    duration: 90,
    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1503324280674-50695c3ae35f',
    active: true
  }
];

// Connect to MongoDB
async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Delete existing services except the one we already created
    // You can remove this condition to delete all services if needed
    console.log('Removing existing services...');
    await Service.deleteMany({ name: { $ne: 'Luxury Hair Cut' } });
    
    // Insert new services
    console.log('Inserting sample services...');
    const result = await Service.insertMany(services);
    
    console.log(`Successfully added ${result.length} services to the database`);
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase(); 