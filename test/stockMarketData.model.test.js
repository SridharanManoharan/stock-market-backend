const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;

const filename = '../data/stockMarketData.json';
let data = require(filename);
const helper = require('../helpers/helper.js');

const stockModel = require('../models/stockMarketData.model');

describe('Test Stock Market Model', () => {
    beforeEach(() => {
        while (data.tradeRecord.length) {
            data.tradeRecord.pop();
        }
        helper.writeJSONFile(filename, data);
    });

    afterEach(() => {
        while (data.tradeRecord.length) {
            data.tradeRecord.pop();
        }
        helper.writeJSONFile(filename, data);
    })

    it('Should return all stock', async () => {
        const res = await stockModel.getStock();
        res.stockMarketData.should.be.not.empty;
        expect(res.stockMarketData).to.have.length(5);
    });

    it('Should return divident for selected stock', () => {
        return stockModel.getDividend('TEA', 10).then((res) => {
            res.should.have.property('stockSymbol', 'TEA');
            res.should.have.property('stockPrice', 10);
            res.should.have.property('value', 0);
        });
    });

    it('Should return peratio for selected stock', () => {
        return stockModel.getPERatio('TEA', 10).then((res) => {
            res.should.be.instanceof(Object);
            res.should.have.property('stockSymbol', 'TEA');
            res.should.have.property('stockPrice', 10);
            res.should.have.property('value', Infinity);
        })
    });

    it('Should return all trade', async () => {
        const res = await stockModel.getTrade();
        res.trade.should.be.instanceof(Array);
    });

    it('Should calculate getVolWeighedPrice for given trades', () => {
        stockModel.recordTrade({
            "sharesQuantity":10,"symbol":"ALE","tradePrice":10,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.recordTrade({
            "sharesQuantity":20,"symbol":"ALE","tradePrice":20,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.getVolWeighedPrice("ALE").then((res) => {
            res.should.be.instanceof(Object);
            res.should.have.property('vwprice', 16.666666666666668);
        })
    });

    it('Should calculate GBCE for given trades', () => {
        stockModel.recordTrade({
            "sharesQuantity":10,"symbol":"POP","tradePrice":10,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.recordTrade({
            "sharesQuantity":20,"symbol":"POP","tradePrice":20,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.recordTrade({
            "sharesQuantity":20,"symbol":"TEA","tradePrice":15,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.recordTrade({
            "sharesQuantity":20,"symbol":"GIN","tradePrice":12,"tradeType":"buy","createdAt":new Date()
        });
        stockModel.getGBCE().then((res) => {
            res.should.be.instanceof(Object);
            res.should.have.property('gbce', 13.774493079968597);
        })
    });
});