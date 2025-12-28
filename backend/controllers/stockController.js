const stockModel = require("../models/stockModel");

exports.addStockAlert = async (req, res) => {
  try {
    const { symbol, target, condition } = req.body;
    const { userId } = req.user;

    if (!symbol || !target || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStock = await stockModel.createStock({
      user_id: userId,
      symbol: symbol.toUpperCase(),
      target_price: parseFloat(target),
      condition_type: condition || "above",
    });

    res.status(201).json(newStock);
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({ message: error.message });
    }
    if (error.message.includes("You cannot add more than")) {
      return res.status(403).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getStocks = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const stocks = await stockModel.getUserStocks(userId);
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;
    await stockModel.deleteStock(id, userId);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
