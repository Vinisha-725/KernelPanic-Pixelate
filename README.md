# Pixelate - Garbage Reporting System

A web application for reporting and tracking garbage issues in communities using React, Node.js, and Supabase with PostGIS.

## Tech Stack

- **Frontend**: React (Vite), React Router, MapLibre GL JS
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL with PostGIS)

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env.example
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── .env.example
└── README.md
```

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm 
- Supabase account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vinisha-725/KernelPanic-Pixelate.git
   cd KernelPanic-Pixelate
   ```

2. **Install backend dependencies:**
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../client
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

1. **Configure environment variables:**
   - Set up your Supabase URL and Service Key in `server/.env`
   - Set up frontend environment variables in `client/.env`

2. **Seed the database (optional):**
   ```bash
   cd server
   npm run seed
   ```

3. **Start the backend server:**
   ```bash
   npm run dev
   ```

4. **Start the frontend development server:**
   ```bash
   cd ../client
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health check: http://localhost:5000/

## API Endpoints

### Reports
- `GET /api/reports` - Get all reports (supports filters: status, severity, limit, offset)
- `GET /api/reports/:id` - Get single report by ID
- `POST /api/reports` - Create new report (requires: latitude, longitude, severity, description)
- `PUT /api/reports/:id/claim` - Volunteer claims a report (requires: volunteer_id)
- `PUT /api/reports/:id/complete` - Mark report as cleaned
- `DELETE /api/reports/:id` - Delete report

### Statistics
- `GET /api/stats/overall` - Get dashboard counts (total_reported, in_progress, cleaned)

### Data Model
Each report includes:
- `id` - Unique identifier
- `latitude` - Location latitude
- `longitude` - Location longitude  
- `severity` - Low, Medium, or High
- `status` - Reported, In Progress, or Cleaned
- `description` - Report description
- `photo_url` - Optional photo URL
- `volunteer_id` - ID of volunteer who claimed the report
- `created_at` - Timestamp when created
- `updated_at` - Last update timestamp

## Features

### Current Implementation
- ✅ Complete backend API with Supabase integration
- ✅ Report CRUD operations (Create, Read, Update, Delete)
- ✅ Volunteer claiming system
- ✅ Status management (Reported, In Progress, Cleaned)
- ✅ Severity levels (Low, Medium, High)
- ✅ Location-based reporting (latitude, longitude)
- ✅ Dashboard statistics
- ✅ Database seeding with 5 dummy reports
- ✅ Photo URL support
- ✅ Proper validation and error handling

### Frontend Status
- 🔄 React scaffold created
- 🔄 Basic component structure
- 🔄 MapLibre GL JS integration pending

### Next Steps
- 🔄 Complete MapLibre GL JS map implementation
- 🔄 Connect frontend to backend API
- 🔄 Implement real-time updates
- 🔄 Add image upload functionality
- 🔄 User authentication system

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Use meaningful commit messages

## License

This project is licensed under MIT License.
