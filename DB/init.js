const fs = require('fs');
const path = require('path');
const {
    Trie
} = require("../helpers");
const stockModel = require("../models/stockModel");
const orderModel = require("../models/orderModel");

const rawData = fs.readFileSync(path.join(__dirname, '../stock_data.json'));
const stockList = JSON.parse(rawData);
const stockListLength = stockList.length;
const stockMapById = new Map();
const stockTrie = new Trie()
// let orderList = []

stockList.forEach(async stock => {
    stockMapById.set(stock.id, stock);
    stockTrie.insert(stock.name, stock);
})

// async function initializeOrders() {
//     console.log("Initializing orders");
//     const orders = await orderModel.getOrders();
//     await orders.forEach(async order => {
//         orderList.push(order);
//     })
//     return orders;
// }

async function initializeDBStocks() {
    console.log('Starting inserting stocks to DB');
    const startTime = Date.now();

    const {
        success,
        insertedCount
    } = await stockModel.batchInsertStock(stockList);

    if (success) {
        console.log(`Initialized ${insertedCount} DBStocks in ${Date.now() - startTime}ms`);
        return
    }

    console.error('Error in initializing DBStocks');
}

initializeDBStocks();

// initializeOrders()
//     .then((orders) => {
//         console.log(`Finished initializing ${orders.length} orders`);
//     });

module.exports = {
    stockMapById,
    stockTrie,
    stockList,
    stockListLength,
    // orderList
}