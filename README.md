# Best Bitcoin Price Tracker

## 🚀 Quick Start

### Backend Setup

```bash
cd backend
npm install
node src/index.js
```

Runs on: http://localhost:3000

### Web Frontend Setup

```bash
cd frontend
cd web
npm install
npm run dev
```

Runs on: http://localhost:5173

### Mobile App Setup (Expo)

```bash
cd frontend
cd mobile
npm install
npx start
```

Scan QR code with Expo Go app or run on simulator

## 📋 API Endpoints

- `GET /api/health` - Health check
- `GET /api/best?currency=GBP` - Best price
- `GET /api/exchanges?currency=GBP` - All exchanges

## ⚙️ Environment

- **Backend**: Node.js + Express (port 3000)
- **Web Frontend**: React + Vite (port 5173)
- **Mobile**: React Native + Expo
- **Default currency**: GBP (supports EUR, USD)

## 📱 Platform URLs

- **Web**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Expo DevTools**: http://localhost:8081

## 🎯 Features

- Real-time price updates
- Multi-currency support (GBP, EUR, USD)
- Best price identification
- Modern responsive UI
- Pull-to-refresh on mobile
- Auto-refresh toggle

## 📝 Notes

1. Start backend first (required for both web and mobile)
2. Mobile app requires Expo Go app on physical device
3. All platforms connect to same backend API
4. Environment variables pre-configured for local development

Start backend first, then run web or mobile frontend!
