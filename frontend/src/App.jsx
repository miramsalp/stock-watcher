import { useState } from "react";
import { useLineAuth } from "./hooks/useLineAuth";
import UserProfile from "./components/UserProfile";
import StockForm from "./components/StockForm";
import StockList from "./components/StockList";
import LandingPage from "./components/LandingPage";
import "./App.css";

function App() {
  const { profile, isReady, error, login, logout } = useLineAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStockAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (error) return <div className="loading-container">Error: {error}</div>;
  if (!isReady) return <div className="loading-container">Loading...</div>;
  if (!profile) {
    return <LandingPage onLogin={login} />;
  }

  return (
    <div className="container">
      <div className="dashboard-layout">
        <div className="left-panel">
          <div className="card">
            <UserProfile profile={profile} onLogout={logout} />
          </div>

          <div className="card">
            <h3 className="form-header">🔔 สร้างการแจ้งเตือน</h3>
            <StockForm userId={profile.userId} onSuccess={handleStockAdded} />
          </div>
        </div>

        <div className="right-panel">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              My Watchlist
            </h2>
            <span
              style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}
            >
              Real-time Monitoring
            </span>
          </div>

          <StockList userId={profile.userId} refreshTrigger={refreshTrigger} />
        </div>
      </div>

      <div className="footer">
        Stock Watcher © 2025 | Developed by Plasmarim
      </div>
    </div>
  );
}

export default App;
