import { useState } from 'react';
import { createStockAlert } from '../services/api';
import '../App.css';

const StockForm = ({ userId, onSuccess }) => {
  const [form, setForm] = useState({ symbol: '', target: '', condition: 'above' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert('User ID not found');
    
    setIsLoading(true);

    try {
      await createStockAlert({ 
        ...form, 
        userId
      });
      
      alert(`บันทึก ${form.symbol} เรียบร้อย!`);
      setForm({ symbol: '', target: '', condition: 'above' }); // Reset Form

      if (onSuccess) onSuccess();
    } catch (error) {
      alert('เกิดข้อผิดพลาด: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-card">
      <h2>🔔 สร้างการแจ้งเตือน</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>ชื่อหุ้น (Symbol)</label>
          <input 
            type="text" 
            placeholder="Ex. NVDA, BTC" 
            value={form.symbol}
            onChange={e => setForm({...form, symbol: e.target.value.toUpperCase()})}
            required
          />
        </div>

        <div className="form-group">
          <label>ราคาเป้าหมาย ($)</label>
          <input 
            type="number" 
            placeholder="0.00" 
            value={form.target}
            onChange={e => setForm({...form, target: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>เงื่อนไข</label>
          <select 
            value={form.condition}
            onChange={e => setForm({...form, condition: e.target.value})}
          >
            <option value="above">🚀 แจ้งเมื่อราคา "สูงกว่า" (Breakout)</option>
            <option value="below">🔻 แจ้งเมื่อราคา "ต่ำกว่า" (Buy Dip)</option>
          </select>
        </div>

        <button type="submit" disabled={isLoading} className="submit-btn">
          {isLoading ? 'กำลังบันทึก...' : 'บันทึกการแจ้งเตือน'}
        </button>

      </form>
    </div>
  );
};

export default StockForm;