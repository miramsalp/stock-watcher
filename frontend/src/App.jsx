import { useState } from 'react';
import { useLineAuth } from './hooks/useLineAuth';
import UserProfile from './components/UserProfile';
import StockForm from './components/StockForm';
import StockList from './components/StockList'; 
import './App.css';

function App() {
  const { profile, isReady, error } = useLineAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0); 

  const handleStockAdded = () => {
    setRefreshTrigger(prev => prev + 1); 
  };

  if (error) return <div className="error">Error: {error}</div>;
  if (!isReady || !profile) return <div className="loading">Connecting to LINE...</div>;

  return (
    <div className="container">
      <UserProfile profile={profile} />
      <StockForm userId={profile.userId} onSuccess={handleStockAdded} />
      <StockList userId={profile.userId} refreshTrigger={refreshTrigger} />
      
      <div className="footer">
        Stock Watcher © 2025 | Developed by Plasmarim
      </div>
    </div>
  );
}

export default App;