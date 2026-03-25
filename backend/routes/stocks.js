const express = require('express');
const { getStocks, getStock } = require('../controllers/stockController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getStocks);
router.get('/:symbol', auth, getStock);

module.exports = router;
