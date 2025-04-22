# FII Tracker - Real-Time Analysis

FII Tracker is a comprehensive application for tracking and analyzing Brazilian Real Estate Investment Trusts (FIIs) in real-time. The application provides investors with key financial metrics, future forecasts, and investment recommendations.

## Features

- Real-time FII data fetching
- Dashboard with key financial metrics
- Interactive charts for historical performance and forecasts
- Detailed FII analysis and profiles
- Investment recommendations based on data analysis
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Python, Flask
- **Data Analysis**: Pandas, NumPy
- **Visualization**: Chart.js, React Chart.js 2

## Getting Started

### Prerequisites

- Node.js (v16+)
- Python (v3.8+)

### Installation

1. Clone this repository
2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd api
pip install -r requirements.txt
```

### Running the Application

1. Start the frontend:

```bash
npm run dev
```

2. Start the backend (in a separate terminal):

```bash
npm run backend
```

## Project Structure

- `/src` - React application source code
- `/api` - Python backend API
- `/public` - Static assets

## Backend API

The Python backend provides the following endpoints:

- `GET /api/fiis` - Get list of all FIIs
- `GET /api/market` - Get market overview metrics
- `GET /api/recommendations` - Get investment recommendations
- `GET /api/fii/:symbol` - Get details for a specific FII
- `GET /api/fii/:symbol/history` - Get historical data for a specific FII
- `GET /api/forecasts` - Get market forecasts

## License

This project is licensed under the MIT License