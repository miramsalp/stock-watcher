const stockModel = require('../models/stockModel');

exports.addStockAlert = async (req, res) => {
    try {
        const { symbol, target, condition } = req.body;
        const { userId } = req.user;

        if (!symbol || !target || !userId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        await stockModel.createStock({
            user_id: userId,
            symbol: symbol.toUpperCase(),
            target_price: parseFloat(target),
            condition_type: condition || 'above'
        });

        res.status(201).json({ message: 'Success', symbol });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStocks = async (req, res) => {
    try {
        const { userId } = req.user;
        if (!userId) return res.status(400).json({ error: 'User ID is required' });

        const stocks = await stockModel.getUserStocks(userId);
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        await stockModel.deleteStock(id);
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};