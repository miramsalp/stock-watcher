import { useLineAuth } from './hooks/useLineAuth';
import UserProfile from './components/UserProfile';
import StockForm from './components/StockForm';
import './App.css';

function App() {
  const { profile, isReady, error } = useLineAuth();

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!isReady || !profile) {
    return <div className="loading">Connecting to LINE...</div>;
  }

  return (
    <div className="container">
      <UserProfile profile={profile} />
      <StockForm userId={profile.userId} />
      
      <div className="footer">
        Stock Watcher © 2025 | Developed by Plasmarim
      </div>
    </div>
  );
}

export default App;