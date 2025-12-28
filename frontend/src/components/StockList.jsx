import { useEffect, useState } from 'react';
import { getUserStocks, deleteStock } from '../services/api';
import '../App.css';

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
    if (!confirm('ต้องการลบรายการนี้ใช่ไหม?')) return;
    await deleteStock(id);
    setStocks(stocks.filter(s => s.id !== id)); 
  };

  const getLogoUrl = (symbol) => {
    return `https://logo.clearbit.com/${symbol}.com`;
  };

  if (loading) return <div style={{textAlign:'center', marginTop:20}}>Loading list...</div>;
  if (stocks.length === 0) return <div style={{textAlign:'center', marginTop:20, color:'#999'}}>ยังไม่มีรายการแจ้งเตือน</div>;

  return (
    <div className="stock-list-container">
      <h3 style={{marginBottom: 15}}>📋 รายการที่รอแจ้งเตือน ({stocks.length}/20)</h3>
      
      <div className="stock-grid">
        {stocks.map((stock) => (
          <div key={stock.id} className="stock-card">
            
            <div className="stock-header">
              <div className="stock-logo-wrapper">
                <img 
                  src={getLogoUrl(stock.symbol)} 
                  alt={stock.symbol}
                  className="stock-logo"
                  onError={(e) => {
                    e.target.style.display = 'none'; 
                    e.target.nextSibling.style.display = 'flex'; 
                  }} 
                />
                <div className="stock-fallback-logo">{stock.symbol.substring(0, 2)}</div>
              </div>
              <div className="stock-info">
                <span className="stock-symbol">{stock.symbol}</span>
                <span className={`stock-condition ${stock.condition_type}`}>
                   {stock.condition_type === 'above' ? '🚀 Breakout' : '🔻 Buy Dip'}
                </span>
              </div>
            </div>

            <div className="stock-price-target">
              🎯 เป้าหมาย: <strong>${stock.target_price}</strong>
            </div>

            <button onClick={() => handleDelete(stock.id)} className="delete-btn">
              ลบ
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockList;