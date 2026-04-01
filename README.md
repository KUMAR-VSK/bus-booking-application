
# Bus Booking System - Frontend

A comprehensive, enterprise-grade bus booking application built with React.js that provides separate interfaces for users, bus managers, and administrators. Features real-time tracking, advanced analytics, and complete fleet management - inspired by platforms like Redbus.

## Features

### 🎯 Multi-Role System
- **User Portal**: Search buses, select seats, book tickets, track journeys
- **Bus Manager Portal**: Manage buses, view bookings, track revenue
- **Admin Portal**: System oversight, analytics, user management

### 👤 User Features
- **Authentication**: Secure login/registration with role-based access
- **Bus Search**: Advanced search with filters (price, type, time)
- **Seat Selection**: Interactive seat grid with VIP options
- **Booking System**: Complete booking flow with confirmation
- **Real-time Tracking**: Live journey tracking with milestones
- **User Dashboard**: Booking history and management

### 🚌 Bus Manager Features
- **Dashboard**: Revenue, bookings, and fleet overview
- **Bus Management**: Add, edit, delete buses
- **Booking Management**: View and manage all bookings
- **Driver Management**: Assign and manage drivers
- **Schedule Management**: Route and timing management

### 📊 Admin Features
- **System Dashboard**: Complete system overview
- **Analytics**: Revenue, bookings, and utilization analytics
- **User Management**: Manage all users and roles
- **Fleet Management**: Oversee entire bus fleet
- **Reports**: Comprehensive reporting system

### 🚀 Advanced Features
- **Real-time Tracking**: Live bus tracking with GPS simulation
- **Double Booking Prevention**: Seat holding mechanism
- **Role-based Access Control**: Secure permission system
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, intuitive interface

## Technology Stack

- **Frontend**: React 18 with Hooks
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Icons**: Heroicons React
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **UI Components**: Custom component library

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── axios.js          # HTTP client configuration
│   │   ├── authApi.js        # Authentication API
│   │   └── busApi.js         # Bus & booking API
│   ├── components/
│   │   ├── Admin/
│   │   │   └── AdminDashboard.js
│   │   ├── BusManager/
│   │   │   └── BusManagerDashboard.js
│   │   ├── User/
│   │   │   └── UserDashboard.js
│   │   ├── Login.js          # Authentication component
│   │   └── BusList.js        # Bus listing component
│   ├── context/
│   │   ├── AuthContext.js    # Authentication state
│   │   └── BusContext.js     # Booking state
│   ├── pages/
│   │   ├── BusSearch.js      # Bus search page
│   │   ├── SeatSelection.js  # Seat selection page
│   │   ├── BookingConfirmation.js # Booking confirmation
│   │   ├── TrackingProgress.js # Real-time tracking
│   │   ├── BusManagement.js # Bus management
│   │   └── AdminAnalytics.js # Analytics dashboard
│   ├── App.js                # Main application
│   ├── index.css             # Global styles
│   └── index.js              # Entry point
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bus-booking-system/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Role-Based Access

### User Login
- **Regular User**: Use any email (e.g., user@example.com)
- **Bus Manager**: Use email containing "manager" (e.g., manager@company.com)
- **Admin**: Use email containing "admin" (e.g., admin@company.com)

### Route Access
- **Users**: `/search`, `/buses`, `/seat-selection`, `/booking-confirmation`, `/tracking`, `/dashboard`
- **Bus Managers**: `/manager/dashboard`, `/manager/buses`
- **Admins**: `/admin/dashboard`, `/admin/analytics`

## Key Features Implementation

### Real-time Tracking System
- Live bus position simulation
- Journey milestones with timestamps
- Estimated arrival calculations
- Driver contact information

### Double Booking Prevention
- Seat holding mechanism with expiration
- Real-time seat status synchronization
- Conflict resolution on concurrent bookings

### Advanced Analytics
- Revenue tracking and growth metrics
- Bus utilization analysis
- Route performance analytics
- User behavior insights

### Bus Management
- Complete CRUD operations for buses
- Driver assignment and management
- Maintenance scheduling
- Route optimization

## API Integration

The application is designed to work with a REST API backend. Key endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - User profile

### Bus Operations
- `POST /api/buses/search` - Search buses
- `GET /api/buses/:id/seats` - Get seat layout
- `POST /api/buses/:id/hold-seats` - Hold seats
- `POST /api/bookings` - Create booking

### Tracking
- `GET /api/tracking/:bookingId` - Get tracking data
- `GET /api/buses/:id/location` - Get current location

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MAP_API_KEY=your_map_api_key
```

## Demo Features

### Tracking Simulation
- Real-time position updates
- Progress bar visualization
- Milestone achievements
- ETA calculations

### Analytics Dashboard
- Interactive charts and graphs
- Time-based filtering
- Performance metrics
- Growth indicators

## Future Enhancements

- **Payment Gateway Integration**: Stripe, PayPal integration
- **Mobile App**: React Native mobile application
- **Notifications**: SMS and email notifications
- **Advanced Analytics**: Machine learning predictions
- **Multi-language Support**: Internationalization
- **Offline Mode**: PWA capabilities
- **API Rate Limiting**: Enhanced security
- **Real-time Chat**: Customer support integration

## Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure password hashing

## Performance Optimizations

- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization
- Service worker implementation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
=======
# bus-booking-app