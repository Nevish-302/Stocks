const fs = require('fs');

const numStocks = 1_000_000;
const stockList = [];
const sectors = ['Tech', 'Finance', 'Healthcare', 'Energy', 'Retail', 'Aerospace'];
const namePrefixes = ['Nova', 'Quantum', 'Blue', 'Green', 'Hyper', 'Neo', 'Zenith', 'Alpha', 'Mega'];
const nameSuffixes = ['Tech', 'Corp', 'Systems', 'Solutions', 'Industries', 'Inc.', 'Ltd.'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 1; i <= numStocks; i++) {
    const id = `STK${i.toString().padStart(6, '0')}`;

    const name = `${getRandomItem(namePrefixes)}${getRandomItem(nameSuffixes)} ${i}`;
    const price = +(Math.random() * 1000).toFixed(2); // price between 0 and 1000

    stockList.push({id, name, price});
}

fs.writeFileSync('stock_data.json', JSON.stringify(stockList));
console.log('✅ Generated 1M stock records in stock_data.json');
