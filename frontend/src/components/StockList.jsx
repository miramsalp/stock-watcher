import { useEffect, useState } from 'react';
import { getUserStocks, deleteStock } from '../services/api';

const getColorFromSymbol = (symbol) => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7B731', '#A3CB38'];
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const StockList = ({ userId, refreshTrigger }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchData = async () => {
      setLoading(true);
      const data = await getUserStocks(userId);
      setStocks(data);
      setLoading(false);
    };
    fetchData();
  }, [userId, refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm('ลบรายการนี้?')) return;
    await deleteStock(id);
    setStocks(stocks.filter(s => s.id !== id));
  };

  if (loading) return <div style={{textAlign:'center', padding: 20}}>Loading...</div>;
  if (stocks.length === 0) return (
    <div style={{ textAlign:'center', padding: '40px', background: 'white', borderRadius: '16px', color: '#999', border: '2px dashed #eee' }}>
      ยังไม่มีรายการแจ้งเตือน <br/> เพิ่มหุ้นตัวแรกทางซ้ายมือได้เลยครับ 👈
    </div>
  );

  return (
    <div className="list-grid">
      {stocks.map((stock) => (
        <div key={stock.id} className="stock-item-card">
          
          <div className="stock-left">
            
            <div className="logo-container">
              <img 
                src={`https://financialmodelingprep.com/image-stock/${stock.symbol}.png`}
                alt={stock.symbol}
                className="stock-real-logo"
                onError={(e) => {
                  e.target.style.display = 'none'; 
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              
              <div 
                className="stock-fallback-avatar" 
                style={{ backgroundColor: getColorFromSymbol(stock.symbol), display: 'none' }}
              >
                {stock.symbol.substring(0, 1)}
              </div>
            </div>

            <div className="stock-details">
              <span className="symbol-text">{stock.symbol}</span>
              <span className="condition-badge" style={{
                 color: stock.condition_type === 'above' ? '#047857' : '#c53030',
                 background: stock.condition_type === 'above' ? '#d1fae5' : '#fee2e2',
                 padding: '2px 8px', borderRadius: '4px'
              }}>
                {stock.condition_type === 'above' ? '🚀 Breakout' : '🔻 Buy Dip'}
              </span>
            </div>
          </div>

          <div className="stock-right">
            <span className="target-label">Target</span>
            <span className="target-price">${stock.target_price}</span>
            <button onClick={() => handleDelete(stock.id)} className="delete-icon-btn" title="Remove">
              🗑️
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default StockList;