const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const filename = '../data/stockMarketData.json';
let data = require(filename);
const helpers = require('../helpers/helper');

describe('Test Helpers', () => {
    it('Should return array if symbol exist', async () => {
        const res = await helpers.mustBeInArray(data.stockMarketData, 'TEA');
        expect(res.stockSymbol).to.equal('TEA');
    });

    it('Should reject if symbol not exist', () => {
        return helpers.mustBeInArray(data.stockMarketData, 'TEAA').then(
            () => Promise.reject(new Error({
                message: 'Symbol not found',
                status: 404
            })),
            err => expect(err.message).to.equal('Symbol not found')
          );
    });
});
