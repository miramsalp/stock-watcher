const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { verifyLineToken } = require('../middleware/auth');

router.use(verifyLineToken);

router.post('/', stockController.addStockAlert); 
router.get('/', stockController.getStocks);       
router.delete('/:id', stockController.deleteStock); 

module.exports = router;