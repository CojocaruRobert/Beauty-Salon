# Beauty Salon App - Backend Design

## Backend Architecture

The backend for the Beauty Salon App will be built using Node.js with Express and MongoDB as the database. This document outlines the planned architecture, API endpoints, and data models.

## Technology Stack

- **Node.js**: JavaScript runtime for the backend
- **Express**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: ODM library for MongoDB
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing for security
- **Cors**: Cross-Origin Resource Sharing middleware
- **Dotenv**: Environment variable management
- **Helmet**: Security middleware for Express
- **Morgan**: HTTP request logger middleware

## Project Structure

```
backend/
├── config/             # Configuration files
├── controllers/        # Request handlers
├── middleware/         # Custom middleware
├── models/             # Mongoose schemas and models
├── routes/             # API routes
├── services/           # Business logic
├── utils/              # Utility functions
├── .env                # Environment variables (gitignored)
├── .gitignore          # Git ignore file
├── package.json        # Dependencies and scripts
├── server.js           # Main application entry point
└── README.md           # Backend documentation
```

## Data Models

### User Model

```javascript
{
  name: String,          // Full name of the user
  email: String,         // Unique email for authentication
  password: String,      // Hashed password
  role: String,          // "admin" or "customer"
  phone: String,         // Contact phone number
  createdAt: Date,       // Account creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

### Service Model

```javascript
{
  name: String,          // Name of the service
  description: String,   // Detailed description
  price: Number,         // Price in dollars
  duration: Number,      // Duration in minutes
  category: String,      // E.g., "Hair", "Nails", "Facial", "Massage"
  image: String,         // URL to service image
  active: Boolean,       // Whether the service is currently offered
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

### Appointment Model

```javascript
{
  user: ObjectId,        // Reference to User model
  service: ObjectId,     // Reference to Service model
  stylist: ObjectId,     // Reference to Stylist model
  date: Date,            // Appointment date and time
  status: String,        // "pending", "confirmed", "cancelled", "completed"
  notes: String,         // Any special requests or notes
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

### Stylist Model

```javascript
{
  name: String,          // Full name of the stylist
  specialties: [String], // List of specialties (e.g., "Hair", "Nails")
  bio: String,           // Short biography
  image: String,         // URL to stylist's profile image
  available: Boolean,    // Whether the stylist is currently available
  createdAt: Date,       // Creation timestamp
  updatedAt: Date        // Last update timestamp
}
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Authenticate user and return token
- `GET /api/auth/me` - Get current authenticated user info
- `POST /api/auth/password` - Change password

### Services

- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get single service by ID
- `POST /api/services` - Create new service (admin only)
- `PUT /api/services/:id` - Update service (admin only)
- `DELETE /api/services/:id` - Delete service (admin only)
- `GET /api/services/categories` - Get list of service categories

### Appointments

- `GET /api/appointments` - Get user's appointments
- `GET /api/appointments/:id` - Get single appointment details
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment
- `GET /api/appointments/admin` - Get all appointments (admin only)

### Stylists

- `GET /api/stylists` - Get all stylists
- `GET /api/stylists/:id` - Get single stylist by ID
- `POST /api/stylists` - Add new stylist (admin only)
- `PUT /api/stylists/:id` - Update stylist info (admin only)
- `DELETE /api/stylists/:id` - Remove stylist (admin only)

### Users (Admin Only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user by ID
- `PUT /api/users/:id` - Update user info
- `DELETE /api/users/:id` - Delete user

## Authentication & Authorization

The API will use JWT (JSON Web Tokens) for authentication. When a user logs in, they will receive a token that must be included in the Authorization header for subsequent requests.

Middleware will check the token and restrict access to endpoints based on the user's role:
- Public routes: Registration, login, service listing
- Customer routes: Appointment booking, profile management
- Admin routes: Service management, user management, appointment overview

## Error Handling

The API will implement consistent error handling:
- HTTP status codes to indicate the type of error
- JSON response with error message and code
- Validation errors with specific field errors

## Environment Variables

The following environment variables will be used:
- `PORT` - Server port
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `NODE_ENV` - Environment (development, production)
- `CORS_ORIGIN` - Allowed origins for CORS

## Development Roadmap

1. Set up project structure and dependencies
2. Create data models and database connection
3. Implement authentication endpoints
4. Develop service management endpoints
5. Create appointment booking system
6. Implement stylist management
7. Add admin functionality
8. Testing and documentation
9. Deployment configuration

## API Testing

Postman collection will be provided for testing the API endpoints.

## Security Considerations

- Password hashing using bcrypt
- JWT with expiration time
- HTTPS for all communications
- Input validation and sanitization
- Protection against common vulnerabilities (XSS, CSRF)
- Rate limiting for authentication endpoints 