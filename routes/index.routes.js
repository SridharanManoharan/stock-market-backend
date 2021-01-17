const express = require('express');
const router = express.Router();
const stockMarketData = require('../models/stockMarketData.model');
const m = require('../helpers/middlewares');

/* All stock data */
router.get('/', async (req, res) => {
    await stockMarketData.getStock()
    .then(stocks => {
        let json = {'stockMarketData': stocks.stockMarketData};
        return res.status(200).json(json);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

/* Calculate dividend yield */
router.post('/yield', m.checkStockSymbol, m.checkFieldsPriceSymbol, async (req, res) => {
    await stockMarketData.getDividend(req.body.stockSymbol, req.body.stockPrice)
    .then(yield => {
        return res.status(200).json(yield);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

/* Calculate pe - ratio */
router.post('/peratio', m.checkStockSymbol, m.checkFieldsPriceSymbol, async (req, res) => {
    await stockMarketData.getPERatio(req.body.stockSymbol, req.body.stockPrice)
    .then(peratio => {
        return res.status(200).json(peratio);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

/* Calculate volume weighted price */
router.post('/vwprice', m.checkStockSymbol, async (req, res) => {
    await stockMarketData.getVolWeighedPrice(req.body.stockSymbol)
    .then(vwprice => {
        return res.status(200).json(vwprice);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

/* Calculate GBCE All Share Index */
router.get('/gbce', async (req, res) => {
    await stockMarketData.getGBCE()
    .then(gbce => {
        return res.status(200).json(gbce);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

/* Record a trade with timestamp */
router.post('/trade', m.checkFieldsTrade, async (req, res) => {
    await stockMarketData.recordTrade(req.body)
    .then(trade => {
        return res.status(201).json(trade);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

router.get('/trade', async (req, res) => {
    await stockMarketData.getTrade()
    .then(trade => {
        return res.status(200).json(trade);
    })
    .catch(err => {
        if (err.status) {
            res.status(err.status).json({ message: err.message })
        } else {
            res.status(500).json({ message: err.message })
        }
    })
});

module.exports = router;