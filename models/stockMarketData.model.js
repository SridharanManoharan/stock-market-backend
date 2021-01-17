const filename = '../data/stockMarketData.json';
let data = require(filename);
const helper = require('../helpers/helper.js');

function getStock() {
    return new Promise((resolve, reject) => {
        let stockMarketData = [];
        if (data.stockMarketData.length === 0) {
            reject({
                message: 'no data available',
                status: 202
            });
        }
        stockMarketData.push(data.stockMarketData);
        resolve({'stockMarketData': data.stockMarketData});
    })
}

function getDividend(stockSymbol, stockPrice) {
    return new Promise(async (resolve, reject) => {
        const selectedStock = await helper.mustBeInArray(data.stockMarketData, stockSymbol);
        let calculatedValue = 0;
        if(selectedStock['type'].toLowerCase() === 'common') {
            calculatedValue = await selectedStock.lastDividend / stockPrice;
        } else if (selectedStock['type'].toLowerCase() === 'preferred') {
            calculatedValue = await selectedStock.fixedDividend * selectedStock.parValue / stockPrice;
        }        
        resolve({
            'stockSymbol': stockSymbol,
            'stockPrice': stockPrice,
            'value': calculatedValue
        });
    });
}

function getPERatio(stockSymbol, stockPrice) {
    return new Promise(async (resolve, reject) => {
        const dividend = await getDividend(stockSymbol, stockPrice);
        const calculatedValue = await (stockPrice / dividend.value);
        resolve({
            'stockSymbol': stockSymbol,
            'stockPrice': stockPrice,
            'value': calculatedValue});
        });
}

function recordTrade(newTrade) {
    return new Promise((resolve, reject) => {
        const date = {'createdAt': helper.newDate()};
        trade = { ...newTrade, ...date };
        data.tradeRecord.push(trade);
        helper.writeJSONFile(filename, data);
        resolve(trade);
    });
}

function getTrade() {
    return new Promise((resolve, reject) => {
        resolve({'trade': data.tradeRecord});
    });
}

function getTradeInLastMinutes(stockSymbol) {
    return new Promise((resolve, reject) => {
        const date = helper.newDate() - (15*60*1000);
        let obj = {};
        if(data.tradeRecord.length > 0){
            obj['trade'] = data.tradeRecord.filter(elem => elem.symbol === stockSymbol && Date.parse(elem.createdAt) <= date);
        }
        resolve(obj);
    });
}

function getVolWeighedPrice(stockSymbol) {
    return new Promise(async (resolve, reject) => {
        const obj = await getTradeInLastMinutes(stockSymbol);
        let volWeightedPrice = 0;
        let quantity = 0;
        if(obj.trade.length > 0) {
            obj.trade.map(elem => {
                quantity += elem.sharesQuantity;
                volWeightedPrice += elem.tradePrice * elem.sharesQuantity;
            });
            volWeightedPrice = volWeightedPrice/quantity;
        }
        resolve({
            'stockSymbol': stockSymbol,
            'vwprice': volWeightedPrice
        });
    });
}

function getGBCE() {
    return new Promise((resolve, reject) => {
        let productPrice = 1;
        let gbce = 0;
        const numberOfTrade = data.tradeRecord.length;
        data.tradeRecord.map(elem => {
            productPrice *= elem.tradePrice;
        });
        gbce = Math.pow(productPrice, 1/numberOfTrade);
        resolve({
            'gbce': gbce
        });
    });
}

module.exports = {
    getStock,
    recordTrade,
    getGBCE, 
    getPERatio,
    getDividend,
    getTrade,
    getVolWeighedPrice
}