# CleanCity - Environmental Cleanup Tracking System

A platform for tracking volunteer cleanup activities with multi-language support and simulated AI analysis for eco points calculation.

## Features

- **Multi-Language Support**: English, Hindi, Tamil, Telugu with real translations
- **Simulated AI Analysis**: Mock cleanup area calculation and eco points (demo purposes)
- **Volunteer Management**: Submit and track cleanup activities with image upload
- **Leaderboard**: Gamification with eco points system
- **Image Storage**: IndexedDB-based storage with compression
- **Language Toggle**: Instant language switching without page reload

## Tech Stack

### Frontend
- React 18
- React Router
- Custom hooks (useAITranslation)
- IndexedDB for image storage
- CSS-in-JS styling

### Backend
- Node.js
- Express.js
- CORS enabled
- Image compression with Sharp

### Storage
- IndexedDB for images (1GB+ capacity)
- localStorage for form data
- Automatic cleanup of old images

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   │   ├── Volunteer/
│   │   │   ├── AIAnalysis/
│   │   │   ├── Leaderboard/
│   │   │   └── Common/
│   │   ├── hooks/         # Custom hooks (useAITranslation)
│   │   ├── pages/         # Page components
│   │   └── utils/          # Utility functions (imageStorage)
├── server/                # Node.js backend
│   └── src/
│       ├── routes/         # API routes
│       ├── config/         # Database configuration
│       └── ...
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── README.md
```

## Environment Variables

Create `.env` file:
```
NODE_ENV=production
PORT=5000
DATABASE_URL=your_database_connection_string
```

## API Endpoints

- `GET /api/reports` - Get all cleanup reports
- `POST /api/reports` - Submit new cleanup report
- `GET /api/stats` - Get environmental statistics
- `GET /` - Health check

## Languages Supported

- 🇺🇸 English
- 🇮🇳 Hindi (हिन्दी)
- 🇱🇰 Tamil (தமிழ்)
- 🇮🇳 Telugu (తెలుగు)

## Usage

1. **Select Language**: Choose preferred language from toggle buttons
2. **Submit Cleanup**: Fill volunteer form with before/after photos
3. **AI Analysis**: Simulated area calculation and eco points
4. **Track Progress**: View leaderboard and environmental impact

## Vercel Deployment

### Automatic Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel dashboard
3. Vercel automatically detects Node.js and deploys

### Manual Configuration
- `vercel.json` - Deployment configuration
- `package.json` - Dependencies and build scripts
- `.gitignore` - Excludes node_modules and build files

## Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to fork
5. Create pull request

## License

MIT License - see LICENSE file for details

## Environmental Impact

Join us in making the world cleaner, one cleanup at a time! 🌱♻️
