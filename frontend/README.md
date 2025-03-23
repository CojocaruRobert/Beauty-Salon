# Katy Regal Beauty Salon Frontend

The client-side application for Katy Regal Beauty Salon, built with Next.js and Material UI.

## Project Overview

This frontend application provides a beautiful and responsive interface for customers to browse services, create accounts, and book appointments at Katy Regal Beauty Salon. It connects to the backend API to fetch and store data.

## Recent Updates

### Authentication Improvements
- Fixed login and registration redirect issues
- Enhanced token handling and local storage management
- Improved error handling for authentication processes
- Added robust authentication state restoration
- Better protection for authenticated routes

### UI Enhancements
- Fixed profile menu positioning and styling
- Improved menu item layout and appearance
- Enhanced Navbar responsiveness and interaction
- Fixed mobile menu display

## Features

- **Responsive Design** - Looks great on mobile, tablet, and desktop
- **Service Browsing** - View all salon services with filtering by category
- **Service Details** - Detailed view of each service with pricing and duration
- **User Authentication** - Register and login functionality
- **Material UI Integration** - Modern and consistent UI components
- **Redux State Management** - Centralized application state
- **About Page** - Company story, mission statement, and team member profiles
- **Contact Page** - Contact form and salon location information
- **Enhanced SVG Placeholders** - Visually appealing gradient-based placeholder images for development

## Tech Stack

- **Next.js** - React framework for server-side rendering
- **Redux Toolkit** - State management library
- **Material UI** - Component library
- **Emotion** - CSS-in-JS styling
- **Axios** - HTTP client for API requests
- **Next/Image** - Optimized image component for responsive images

## Components

### Layout Components
- `Layout` - Main layout wrapper with Navbar and Footer
- `Navbar` - Navigation bar with responsive mobile menu
- `Footer` - Page footer with contact information and links

### Page Components
- `Home` - Landing page with featured services
- `Services` - Browse all salon services
- `ServiceDetail` - Individual service information
- `About` - Company information and team member profiles
- `Contact` - Contact form and location details
- `Login/Register` - User authentication forms

### UI Components
- `ServiceGrid` - Grid display of services with filtering
- `ServiceCard` - Card component for displaying service information

## State Management

The application uses Redux Toolkit for state management:

- `authSlice` - Manages user authentication state
- `servicesSlice` - Handles service data fetching and filtering

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Backend API running (see backend README)

### Installation
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and visit `http://localhost:3000`

## Folder Structure

```
/frontend
├── /components     # Reusable UI components
├── /pages          # Next.js pages
├── /public         # Static assets
│   └── /images     # SVG placeholder images
├── /store          # Redux store and slices
├── /styles         # Global styles
└── /utils          # Utility functions
```

## API Integration

The frontend connects to the backend API using Redux Toolkit's `createAsyncThunk` for asynchronous actions:

- Services are fetched from `/api/services`
- Authentication is handled via `/api/auth/login` and `/api/auth/register`
- Protected routes check for JWT token in localStorage

## Placeholder Images

The application uses enhanced SVG placeholder images for development:

- `service-placeholder.svg` - A pink/purple gradient with abstract salon-inspired shapes, used for service cards and hero backgrounds
- `placeholder-person.svg` - A professional silhouette on a subtle blue/gray gradient, used for team member profiles

These placeholders improve the visual appeal of the application during development and can be replaced with actual images in production.

## Styling

The application uses Material UI with a custom theme:

- Primary color: Pink (#E91E63)
- Secondary color: Purple (#9C27B0)
- Custom components and overrides in `utils/theme.js`

## Deployment

1. Build the application:
   ```
   npm run build
   ```
2. Start the production server:
   ```
   npm start
   ```

## Future Enhancements

- Implement appointment booking UI
- Add user profile management
- Create stylist browsing and selection
- Add online payment processing
- Replace placeholder images with actual salon photos

## License

This project is licensed under the MIT License.

## Authors

Katy Regal Beauty Salon Team 