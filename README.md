# Katy Regal Beauty Salon App

A full-stack application for a beauty salon business featuring service browsing, online booking, and admin dashboard.

## Project Overview

Katy Regal Beauty Salon App is a comprehensive platform for a beauty salon business that allows customers to browse services, book appointments, and manage their profiles. It also provides an admin dashboard for salon staff to manage services, appointments, and other business operations.

## Repository Structure

- **frontend/** - Next.js client application with Material UI
  - **components/** - Reusable UI components
  - **pages/** - Next.js pages including Home, Services, About, and Contact
  - **public/images/** - SVG placeholder images with gradient designs
  - **store/** - Redux store with auth and services slices
  - **scripts/** - Utility scripts for development
- **backend/** - Express.js API with MongoDB
  - **controllers/** - Route handlers for authentication and services
  - **models/** - Mongoose schemas for User and Service
  - **middleware/** - JWT authentication and error handling
  - **routes/** - API endpoint definitions

## Features

- **User Authentication** - Secure login/registration with JWT
- **Service Management** - Browse and search beauty services
- **Role-Based Authorization** - Different access for customers and admins
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Admin Dashboard** - Manage services, appointments, and users
- **About Page** - Company story, mission, and team introduction
- **Enhanced SVG Placeholders** - Aesthetically pleasing gradient-based placeholders for development

## Tech Stack

### Frontend
- **Next.js** - React framework for server-side rendering
- **Redux Toolkit** - State management
- **Material UI** - Component library
- **Emotion** - CSS-in-JS styling
- **Next/Image** - Optimized image handling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on the provided `.env.example`:
   ```
   cp .env.example .env
   ```
   Then update the values in the `.env` file with your own configuration.

4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file based on the provided `.env.example`:
   ```
   cp .env.example .env.local
   ```
   Then update the values in the `.env.local` file with your own configuration.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and visit `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get a specific service
- `POST /api/services` - Create a service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

## Current Status and Roadmap

### Completed
- Backend API with authentication and service management
- Frontend responsive layout with Material UI
- Services listing and details pages
- User registration and login functionality
- About page with company information and team members
- Contact page with form and location details
- Enhanced SVG placeholders with gradient designs
- Redux integration for state management
- Comprehensive documentation for frontend and backend
- Complete rebranding to "Katy Regal Beauty Salon"

### Next Steps
- Complete frontend authentication integration
- Implement appointment booking system
- Develop stylist management
- Create admin dashboard
- Add payment integration
- Replace placeholders with actual salon photos

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Authors

Katy Regal Beauty Salon Team 