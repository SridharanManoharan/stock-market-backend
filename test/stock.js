//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);
/*
* Test the /GET route
*/
describe('Stocks', () => {

    describe('/GET stock', () => {
        it('it should GET all the stock data', (done) => {
        chai.request(server)
            .get('/customer-api/browser/stock')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                done();
            });
        });
    });

    describe('/POST divident yield', () => {
        it('it should GET the divident yield', (done) => {
        let stock = {
            "stockSymbol": "TEA",
            "stockPrice": 10
        }
        chai.request(server)
            .post('/customer-api/browser/stock/yield')
            .send(stock)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('stockSymbol');
                    res.body.should.have.property('stockPrice');
                    res.body.should.have.property('value');
                done();
            });
        });
    });

    describe('/POST PE-Ratio', () => {
        it('it should GET the PE Ratio', (done) => {
        let stock = {
            "stockSymbol": "TEA",
            "stockPrice": 10
        }
        chai.request(server)
            .post('/customer-api/browser/stock/peratio')
            .send(stock)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('stockSymbol');
                    res.body.should.have.property('stockPrice');
                    res.body.should.have.property('value');
                done();
            });
        });
    });

    describe('/POST Volume weighted price', () => {
        it('it should GET the vwprice', (done) => {
        let stock = {
            "stockSymbol": "TEA"
        }
        chai.request(server)
            .post('/customer-api/browser/stock/vwprice')
            .send(stock)
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('stockSymbol');
                    res.body.should.have.property('vwprice');
                done();
            });
        });
    });

    describe('/GET GBCE All Share Index', () => {
        it('it should GET the gbce', (done) => {
        chai.request(server)
            .get('/customer-api/browser/stock/gbce')
            .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('gbce');
                done();
            });
        });
    });

    describe('/POST Record a treat', () => {
        it('it should ADD a trade to DB', (done) => {
        let stock = {
            "sharesQuantity": 10, 
            "symbol": "TEA", 
            "tradePrice": 10, 
            "tradeType": "buy"
        };
        chai.request(server)
            .post('/customer-api/browser/stock/trade')
            .send(stock)
            .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('sharesQuantity');
                    res.body.should.have.property('symbol');
                    res.body.should.have.property('tradePrice');
                    res.body.should.have.property('tradeType');
                    res.body.should.have.property('createdAt');
                done();
            });
        });
    });
});
