import { useState } from "react";
import toast from "react-hot-toast";
import { createStockAlert } from "../services/api";
import "../App.css";

const StockForm = ({ idToken, stocks, onSuccess }) => {
  const [form, setForm] = useState({
    symbol: "",
    target: "",
    condition: "above",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idToken) {
      toast.error("Authentication token not found");
      return;
    }

    if (stocks.length >= 20) {
      toast.error("You cannot add more than 20 symbols.");
      return;
    }

    const sanitizedSymbol = form.symbol.replace(/[^a-zA-Z0-9-.]/g, "");
    if (sanitizedSymbol !== form.symbol) {
      toast.error("Symbol contains invalid characters.");
      return;
    }

    if (parseFloat(form.target) <= 0) {
      toast.error("Target price must be a positive number.");
      return;
    }

    const isDuplicate = stocks.some(
      (stock) =>
        stock.symbol === sanitizedSymbol &&
        stock.target_price === parseFloat(form.target) &&
        stock.condition_type === form.condition
    );

    if (isDuplicate) {
      toast.error("This symbol with this condition already exists in your watchlist.");
      return;
    }

    setIsLoading(true);

    try {
      const newStock = await createStockAlert(
        { ...form, symbol: sanitizedSymbol },
        idToken
      );
      toast.success(`Added ${sanitizedSymbol} to your watchlist!`);
      setForm({ symbol: "", target: "", condition: "above" });
      if (onSuccess) onSuccess(newStock);
    } catch (error) {
      console.error("Error creating stock alert:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to create alert.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const progress = (stocks.length / 20) * 100;

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label className="input-label">ชื่อหุ้น (Symbol)</label>
        <input
          type="text"
          className="custom-input"
          placeholder="Ex. NVDA, BTC, TSLA"
          value={form.symbol}
          onChange={(e) =>
            setForm({ ...form, symbol: e.target.value.toUpperCase() })
          }
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label">ราคาเป้าหมาย ($)</label>
        <input
          type="number"
          className="custom-input"
          placeholder="0.00"
          value={form.target}
          onChange={(e) => setForm({ ...form, target: e.target.value })}
          required
        />
      </div>

      <div className="input-group">
        <label className="input-label">เงื่อนไข</label>
        <select
          className="custom-select"
          value={form.condition}
          onChange={(e) => setForm({ ...form, condition: e.target.value })}
        >
          <option value="above">🚀 แจ้งเมื่อราคา "สูงกว่า" (Breakout)</option>
          <option value="below">🔻 แจ้งเมื่อราคา "ต่ำกว่า" (Buy Dip)</option>
        </select>
      </div>
      <div className="form-footer">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="progress-label">{stocks.length}/20</span>
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? "กำลังบันทึก..." : "บันทึกการแจ้งเตือน"}
      </button>
    </form>
  );
};

export default StockForm;
