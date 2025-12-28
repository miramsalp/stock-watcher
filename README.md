# StockWatcher LINE Bot

A simple tool to track stock prices and send instant alerts to your LINE app.

---

## Features

* **Real-Time Tracking:** Monitor your favorite stocks 24/7.
* **Price Alerts:** Get notified instantly when a stock hits your target price.
* **Beautiful Notifications:** Clean LINE Flex Messages (Green for "Breakout" and Red for "Dip").
* **Web Dashboard:** Easily manage your watchlist and targets in one place.
* **One-Click Access:** Direct link from LINE messages back to your dashboard.

---

# Installation
## Environment Variables

Create .env in backend/
```bash
    LINE_CHANNEL_ACCESS_TOKEN=your_line_token
    LINE_CHANNEL_SECRET=your_line_secret
    LINE_LOGIN_CHANNEL_ID=your_line_login_channel
    SUPABASE_KEY=your_supabase_key
    SUPABASE_URL=your_supabase_url
    FRONTEND_URL=your_frontend_url
```
Create .env in frontend/
```bash
    VITE_API_URL=your_backend_url
    VITE_LIFF_ID=your_vite_liff_id
```
## Backend
```bash
    cd backend
    npm install
    npm run dev
```
## Frontend
```bash
    cd frontend
    npm install
    npm run dev
```
