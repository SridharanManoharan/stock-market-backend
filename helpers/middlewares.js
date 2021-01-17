const filename = '../data/stockMarketData.json';
let data = require(filename);
const helper = require('./helper.js');

function checkStockSymbol(req, res, next) {
    const { stockSymbol } = req.body;
    const foundSymbol = helper.mustBeInArray(data.stockMarketData, stockSymbol);
    if(stockSymbol === undefined) {
        res.status(400).json({ message: 'stockSymbol not found' });
    } else if(foundSymbol.length <= 0) {
        res.status(400).json({ message: 'stockSymbol not found' });
    } else {
        next();
    }
}

function checkFieldsPriceSymbol(req, res, next) {
    const { stockPrice, stockSymbol } = req.body;
    if(!Number.isInteger(parseInt(stockPrice))) {
        res.status(400).json({ message: 'Stock price must be an integer' });
    } else if (stockPrice && stockSymbol) {
        next();
    } else {
        res.status(400).json({ message: 'Fields are not good' });
    }
}

function checkFieldsTrade(req, res, next) {
    const { sharesQuantity, symbol, tradePrice, tradeType } = req.body;

    if(!Number.isInteger(parseInt(tradePrice)) || 
        !Number.isInteger(parseInt(sharesQuantity))) {
            res.status(400).json({ message: 'tradePrice and sharesQuantity must be an integer' });
    } else if(tradeType.toLowerCase() !== 'buy' && tradeType.toLowerCase() !== 'sell' ) {
        res.status(400).json({ message: 'tradeType can only be buy or sell' });
    } else if (sharesQuantity && symbol && tradePrice && tradeType) {
        next();
    } else {
        res.status(400).json({ message: 'Fields are not good' });
    }
}

module.exports = {
    checkStockSymbol,
    checkFieldsPriceSymbol,
    checkFieldsTrade
}