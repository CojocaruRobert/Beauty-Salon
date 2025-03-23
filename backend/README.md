# Katy Regal Beauty Salon API

The backend API for the Katy Regal Beauty Salon application, built with Node.js, Express, and MongoDB.

## Project Overview

This RESTful API provides data and business logic for the Katy Regal Beauty Salon application. It handles user authentication, service management, appointment scheduling, and more. The API has been fully developed with comprehensive role-based authentication and service management endpoints.

## Recent Updates

### Authentication Improvements
- Enhanced token generation and delivery
- Improved authentication response format
- Better error handling for login and registration
- More consistent response structure
- Performance optimizations for authentication routes

## Features

- **User Authentication** - JWT-based auth with role-based permissions
- **Service Management** - CRUD operations for salon services
- **Role-Based Authorization** - Admin and customer role separation
- **Security** - Password hashing, JWT validation, and input sanitization
- **Error Handling** - Consistent error responses and logging
- **MongoDB Integration** - Mongoose models and validation
- **Consistent Response Format** - All endpoints follow a standardized response structure

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

### Future Endpoints (Planned)
- **Stylists** - Manage salon stylists
- **Appointments** - Schedule and manage appointments
- **Users** - Admin user management

## Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

## Data Models

### User
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String (enum: ['customer', 'admin']),
  createdAt: Date,
  updatedAt: Date
}
```

### Service
```javascript
{
  name: String,
  description: String,
  price: Number,
  duration: Number,
  category: String,
  image: String (URL),
  active: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Stylist (Planned)
```javascript
{
  name: String,
  specialization: String,
  bio: String,
  image: String (URL),
  services: [ServiceID],
  available: Boolean
}
```

### Appointment (Planned)
```javascript
{
  user: UserID,
  service: ServiceID,
  stylist: StylistID,
  date: Date,
  time: String,
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed']),
  createdAt: Date,
  updatedAt: Date
}
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation
1. Clone the repository
2. Navigate to the backend directory:
   ```
   cd backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file with:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/beauty-salon
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```
5. Start the development server:
   ```
   npm run dev
   ```

## Environment Variables

| Variable      | Description                  | Default     |
|---------------|------------------------------|-------------|
| PORT          | API server port              | 5000        |
| MONGO_URI     | MongoDB connection string    | Required    |
| JWT_SECRET    | Secret for signing JWT       | Required    |
| JWT_EXPIRE    | JWT expiration time          | 30d         |

## Testing

The API includes several test scripts to verify functionality:

```
npm run test           # Run all tests
npm run test-admin     # Test admin-specific endpoints
```

## API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": [Object or Array]
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. To access protected routes:

1. Login to receive a token
2. Include the token in the Authorization header:
   ```
   Authorization: Bearer [token]
   ```

## Error Handling

The API implements centralized error handling with appropriate HTTP status codes and descriptive messages. All errors are processed through a middleware that maintains a consistent response format.

## License

This project is licensed under the MIT License.

## Authors

Katy Regal Beauty Salon Team 