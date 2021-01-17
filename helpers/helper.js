const fs = require('fs');
const path = require('path');

const newDate = () => new Date();

function mustBeInArray(array, stockSymbol) {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.stockSymbol == stockSymbol);
        if (!row) {
            reject({
                message: 'Symbol not found',
                status: 404
            });
        }
        resolve(row);
    })
}

function writeJSONFile(filename, content) {
    const file = path.join(__dirname, filename);
    fs.writeFileSync(file, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err);
        }
    });
}

module.exports = {
    newDate,
    mustBeInArray,
    writeJSONFile
}