# ISS Tracker React

A real-time International Space Station (ISS) tracking application built with React and Vite. Displays live ISS position, altitude, velocity, and trajectory on an interactive map with a futuristic HUD-style interface.

## 🌍 Overview

ISS Tracker provides a visually stunning and information-rich view of the International Space Station's current location and trajectory. The app updates every second with live data from the ISS API, displaying telemetry information alongside an interactive map with animated trail visualization.

### Key Features

- **📍 Real-time ISS Tracking**: Live position updates every second via the Where the ISS at? API
- **🗺️ Interactive Map**: Leaflet-based map with animated ISS trail and dark theme
- **📊 Telemetry Dashboard**: Shows latitude, longitude, velocity, and altitude
- **🎯 Speed Gauge**: Visual speedometer (0-30,000 km/h)
- **📈 Altitude Gauge**: Visual altimeter (0-500 km)
- **🎪 Animated Radar**: Futuristic rotating radar visualization
- **⚡ High Performance**: Built with Vite for rapid development and optimized production builds
- **🎨 Responsive Design**: Full-screen HUD layout optimized for various screen sizes

## 🛠️ Tech Stack

- **React 19**: Modern UI framework
- **Vite 8**: Lightning-fast build tool with Hot Module Replacement (HMR)
- **Leaflet 1.9.4**: Interactive mapping library
- **CSS3**: Custom styling with grid layouts and animations
- **ESLint**: Code quality and consistency

## 📦 Installation

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Setup Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd iss-tracker-react
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to `http://localhost:5173/` (Vite will display the URL in your terminal)

## 🚀 Usage

### Development Server

```bash
npm run dev
```

Starts Vite development server with Hot Module Replacement (HMR). Changes to source files will automatically refresh in the browser.

### Production Build

```bash
npm run build
```

Creates an optimized production bundle in the `dist/` directory, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

Previews the production build locally before deployment.

### Code Quality

```bash
npm run lint
```

Runs ESLint to check for code quality issues and style violations.

## 📂 Project Structure

```
iss-tracker-react/
├── src/
│   ├── components/               # React components
│   │   ├── Map.jsx              # Leaflet map with ISS marker and trail
│   │   ├── TelemetryPanel.jsx   # HUD-style telemetry display
│   │   ├── SpeedGauge.jsx       # Circular speedometer (0-30k km/h)
│   │   ├── AltitudeGauge.jsx    # Circular altimeter (0-500 km)
│   │   ├── Radar.jsx            # Animated radar visualization
│   │   ├── map/                 # Map-specific components
│   │   └── index.js             # Barrel file for clean imports
│   │
│   ├── hooks/
│   │   └── useISSData.js        # Custom hook for ISS API integration
│   │
│   ├── styles/
│   │   ├── hud.css              # HUD styling and animations
│   │   └── map.css              # Leaflet customizations
│   │
│   ├── constants/
│   │   ├── api.js               # API configuration
│   │   ├── gauges.js            # Gauge ranges and settings
│   │   └── map.js               # Map configuration
│   │
│   ├── utils/
│   │   ├── formatting.js        # Data formatting utilities
│   │   ├── gaugeCalculations.js # Gauge calculation logic
│   │   └── index.js             # Utility exports
│   │
│   ├── assets/                  # Images and static assets
│   ├── App.jsx                  # Main application component
│   ├── App.css                  # Global styles
│   ├── main.jsx                 # Vite entry point
│   ├── index.css                # Reset CSS
│   └── index.html               # HTML template
│
├── public/                      # Static files (served as-is)
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── eslint.config.js             # ESLint configuration
└── README.md                    # This file
```

## 🔧 Core Components

### `App.jsx` - Main Orchestrator
The root component that:
- Fetches ISS data via the custom `useISSData` hook
- Composes all UI components
- Manages the HUD overlay layout

### `useISSData` Hook
Custom React hook that:
- Fetches ISS position data every second
- Returns: `{ latitude, longitude, altitude, velocity, timestamp, error, loading }`
- API Source: [Where the ISS at?](https://api.wheretheiss.at/v1/satellites/25544) (satellite ID: 25544)

### `Map.jsx` - Interactive Map
- Leaflet-powered map with dark theme (CARTO Dark Matter)
- Real-time ISS marker position
- Animated trail showing recent positions with fade effect
- Optimized with useRef to prevent re-initialization

### `TelemetryPanel.jsx` - Data Display
Shows:
- Current latitude and longitude
- Current velocity (km/h)
- Current altitude (km)
- Live connection indicator with animated pulse

### `SpeedGauge.jsx` - Speedometer
- Circular gauge visualization
- Scale: 0-30,000 km/h
- Animated needle responding to velocity changes
- Glowing border effects

### `AltitudeGauge.jsx` - Altimeter
- Circular gauge visualization
- Scale: 0-500 km
- Animated needle responding to altitude changes
- Glowing border effects

### `Radar.jsx` - Radar Visualization
- Animated circular radar with rotating sweep
- Concentric rings for depth effect
- Military-style HUD aesthetic
- Continuous animation at 4-second rotation interval

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `src/styles/hud.css`:

```css
:root {
  --accent: #00eaff;           /* Primary accent color */
  --accent-secondary: #ff00ff; /* Secondary accent color */
  --bg-main: #050810;          /* Main background */
  --bg-secondary: #0a0f1a;     /* Secondary background */
  --warning: #ff3b3b;          /* Warning/alert color */
  --success: #00ff88;          /* Success indication */
}
```

### Change Font

In `src/App.css`, update the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');
```

Then update `font-family` declarations in `hud.css`.

### Adjust Update Frequency

In `src/hooks/useISSData.js`, modify the interval:

```javascript
const INTERVAL_MS = 1000; // Change from 1000ms to desired interval
```

### Modify Gauge Ranges

In `src/constants/gauges.js`:

```javascript
export const SPEED_MAX = 30000;   // Max speed in km/h
export const ALTITUDE_MAX = 500;  // Max altitude in km
```

## 📡 API Details

This application uses the **Where the ISS at?** API:

- **Endpoint**: `https://api.wheretheiss.at/v1/satellites/25544`
- **Update Frequency**: Every 1 second (configurable)
- **Data Returned**:
  - `latitude`: Current ISS latitude (-90 to 90)
  - `longitude`: Current ISS longitude (-180 to 180)
  - `altitude`: Altitude above Earth in km
  - `velocity`: Speed in km/h
  - `timestamp`: Unix timestamp of data

### API Rate Limits

The API is free and public with reasonable rate limits. The 1-second update interval should be well within limits for personal use.

## 🌐 Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Connect your git repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist/`

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to GitHub Pages

Update `vite.config.js` with your repository name:

```javascript
export default {
  base: '/your-repo-name/',
  // ... rest of config
}
```

Then build and push to `gh-pages` branch.

## 📋 Development

### Code Quality

This project uses ESLint to maintain consistent code style:

```bash
npm run lint  # Check for issues
```

### Adding New Components

1. Create component in `src/components/`
2. Add export to `src/components/index.js`
3. Import and use in `App.jsx`

### Adding New Styles

1. Create CSS file in `src/styles/`
2. Import in relevant component or `App.jsx`
3. Use CSS variables for theming consistency

## 🐛 Troubleshooting

### Map Not Displaying
- Check browser console for errors (F12)
- Verify internet connection to access map tiles
- Ensure Leaflet CSS is properly imported

### Data Not Updating
- Check network tab in DevTools to see API responses
- Verify the API endpoint is accessible
- Check browser console for JavaScript errors

### Build Errors
- Delete `node_modules/` and `package-lock.json`
- Run `npm install` again
- Clear Vite cache: `rm -rf dist/`

## 📄 License

This project is open source. Feel free to use, modify, and distribute as needed.

## 🙌 Contributing

Contributions are welcome! Please:

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description

## 📞 Support

For issues or questions:
- Check existing documentation files in the project root
- Review component JSDoc comments in source files
- Check browser console for error messages

## 🎯 Future Enhancements

Potential features for future versions:
- Ground track prediction (next pass over specific location)
- ISS crew information
- Visible passes for your location
- Historical trail data
- Multi-satellite tracking
- Dark/light theme toggle
- Mobile app version

---

**Last Updated**: April 2026 | **Version**: 0.0.0
