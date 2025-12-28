import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserStocks, deleteStock } from "../services/api";
import Modal from "./Modal";
import "./Modal.css";

const getColorFromSymbol = (symbol) => {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7B731",
    "#A3CB38",
  ];
  let hash = 0;
  for (let i = 0; i < symbol.length; i++)
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
};

const StockList = ({ idToken, stocks, setStocks }) => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stockToDelete, setStockToDelete] = useState(null);

  useEffect(() => {
    if (!idToken) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getUserStocks(idToken);
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
        toast.error("Failed to fetch watchlist.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idToken, setStocks]);

  const handleDeleteClick = (stock) => {
    setStockToDelete(stock);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!stockToDelete) return;
    try {
      await deleteStock(stockToDelete.id, idToken);
      setStocks(stocks.filter((s) => s.id !== stockToDelete.id));
      toast.success(
        `Symbol ${stockToDelete.symbol} removed from your watchlist.`
      );
    } catch (error) {
      toast.error("Failed to remove symbol.");
    } finally {
      setIsModalOpen(false);
      setStockToDelete(null);
    }
  };

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: 20, color: "#aaa" }}>
        Loading portfolio...
      </div>
    );
  if (stocks.length === 0)
    return (
      <div
        style={{
          textAlign: "center",
          padding: "50px",
          background: "white",
          borderRadius: "20px",
          color: "#999",
          border: "2px dashed #e2e8f0",
        }}
      >
        ยังไม่มีรายการแจ้งเตือน <br /> เพิ่มหุ้นตัวแรกทางซ้ายมือได้เลยครับ
      </div>
    );

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
      >
        Are you sure you want to remove{" "}
        <strong>{stockToDelete?.symbol}</strong> from your watchlist?
      </Modal>
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
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div
                  className="stock-fallback-avatar"
                  style={{
                    backgroundColor: getColorFromSymbol(stock.symbol),
                    display: "none",
                  }}
                >
                  {stock.symbol.substring(0, 1)}
                </div>
              </div>

              <div className="stock-details">
                <span className="symbol-text">{stock.symbol}</span>
                <span
                  className="condition-badge"
                  style={{
                    color:
                      stock.condition_type === "above" ? "#047857" : "#c53030",
                    background:
                      stock.condition_type === "above" ? "#d1fae5" : "#fee2e2",
                  }}
                >
                  {stock.condition_type === "above"
                    ? "🚀 Breakout"
                    : "🔻 Buy Dip"}
                </span>
              </div>
            </div>

            <div className="stock-right">
              <span className="target-label">Target</span>
              <span className="target-price">${stock.target_price}</span>
              <button
                onClick={() => handleDeleteClick(stock)}
                className="delete-icon-btn"
                title="Remove"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StockList;
