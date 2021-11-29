const requests = require('requests');

async function fetchData(cb) {
    requests('https://api.wazirx.com/api/v2/tickers')
        .on('data', async function (chunk) {
            let data = JSON.parse(chunk);
            let size = 10;
            let firstTen = firstTenResults(data, size);
            let objValue = getObjValues(firstTen, (returnData)=>{
                cb(returnData);
            });
        })
        .on('end', function (err) {
            if (err) return console.log('connection closed due to errors', err);
            console.log('end');
        });
}

function firstTenResults(data, size) {
    return Object.keys(data) //get the keys out
        .sort()
        .slice(0, size) //get the first N
        .reduce(function (memo, current) { //generate a new object out of them
            memo[current] = data[current]
            return memo;
        }, {})
}

function getObjValues(value, returnData){
    let newData = [];
    for (const [key, val] of Object.entries(value)) {
        const objValue = {
            name: val.name,
            last: val.last,
            buy: val.buy,
            sell: val.sell,
            volume: val.volume,
            base_unit: val.base_unit
        } 
        newData.push(objValue)
    }
    return returnData(newData)
}

module.exports = fetchData;