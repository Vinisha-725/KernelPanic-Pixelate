# Garbage Reporting System

A full-stack web application for reporting and tracking garbage issues in communities using React, Node.js, and Supabase with PostGIS.

## Tech Stack

- **Frontend**: React (Vite), React Router, MapLibre GL JS
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL with PostGIS)
- **Styling**: CSS (ready for Tailwind CSS integration)

## Project Structure

```
garbage-reporting-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   │   ├── Map/        # Map-related components
│   │   │   ├── Report/     # Report form components
│   │   │   ├── Dashboard/  # Dashboard components
│   │   │   └── Common/     # Shared components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env.example
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Express middleware
│   │   ├── models/         # Data models
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env.example
├── docs/                   # Documentation
├── README.md
└── .gitignore
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database setup)

### Installation

1. **Clone and setup the project:**
   ```bash
   cd garbage-reporting-app
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cp .env.example .env
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   cp .env.example .env
   ```

### Environment Configuration

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPLIBRE_ACCESS_TOKEN=your_maplibre_access_token
VITE_MAP_STYLE_URL=https://demotiles.maplibre.org/style.json
```

#### Backend (.env)
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
DATABASE_URL=your_database_connection_string
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key
JWT_SECRET=your_super_secret_jwt_key_here
```

### Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health check: http://localhost:5000/health

## API Endpoints

### Reports
- `GET /api/reports` - Get all reports
- `GET /api/reports/:id` - Get single report
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### Statistics
- `GET /api/stats/overall` - Get overall statistics
- `GET /api/stats/location` - Get location-based statistics
- `GET /api/stats/trends` - Get trend data

## Features

### Current Implementation
- ✅ Project structure and boilerplate
- ✅ React Router setup
- ✅ Express.js API structure
- ✅ Component organization
- ✅ Environment configuration
- ✅ Error handling middleware
- ✅ Validation middleware
- ✅ Placeholder API services

### Future Development
- 🔄 MapLibre GL JS integration
- 🔄 Supabase database connection
- 🔄 PostGIS spatial queries
- 🔄 User authentication
- 🔄 Image upload functionality
- 🔄 Real-time updates
- 🔄 Email notifications
- 🔄 Advanced filtering and search

## Development Guidelines

### Code Organization
- Follow the existing folder structure
- Keep components small and focused
- Use descriptive naming conventions
- Add comments for complex logic

### API Design
- RESTful endpoints
- Consistent response format
- Proper error handling
- Input validation

### Database Design
- Use PostgreSQL with PostGIS for spatial data
- Implement proper indexing
- Use UUIDs for primary keys
- Include timestamps (created_at, updated_at)

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Use meaningful commit messages

## License

This project is licensed under the MIT License.
