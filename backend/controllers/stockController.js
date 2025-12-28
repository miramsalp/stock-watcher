const stockModel = require('../models/stockModel');

exports.addStockAlert = async (req, res) => {
    try {
        const { symbol, target, condition, userId } = req.body;

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