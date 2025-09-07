// bulkOrderSimulation.js

const axios = require('axios');

// Configuration
const API_URL = 'http://localhost:3000/api/v1/transactions'; // replace with your endpoint
const TOTAL_ORDERS = 100000; // total orders to send
const CONCURRENCY = 100;    // number of simultaneous requests
const STOCK_ID = 'STOCKIDDD';
const PRICE = 100;
const QUANTITY = 100;

// Generate a random order type: 'BUY' or 'SELL'
function randomOrderType() {
    return Math.random() < 0.5 ? 'BUY' : 'SELL';
}

// Generate a random numeric user ID
function randomUserId() {
    return Math.floor(Math.random() * 10000) + 1; // numbers 1 to 10000
}

let failed = 0;

// Send a single order
async function sendOrder(orderType) {
    try {
        const response = await axios.post(API_URL, {
            orderType,
            stockId: STOCK_ID,
            price: PRICE,
            quantity: QUANTITY,
            userId: randomUserId() // numeric user ID
        });
        return response.data;
    } catch (err) {
        console.error('Order failed:', err.message);
        failed++;
        return null;
    }
}

// Simulate bulk orders
async function simulateBulkOrders() {
    console.log(`Simulating ${TOTAL_ORDERS} orders...`);

    const allOrders = Array.from({length: TOTAL_ORDERS}, () => randomOrderType());

    for (let i = 0; i < allOrders.length; i += CONCURRENCY) {
        const batch = allOrders.slice(i, i + CONCURRENCY);
        await Promise.all(batch.map(type => sendOrder(type)));
        console.log(`Sent ${Math.min(i + CONCURRENCY, TOTAL_ORDERS)} / ${TOTAL_ORDERS} orders`);
    }

    console.log('Bulk order simulation completed. ', 'Failed: ', failed);
}

// Run simulation
simulateBulkOrders();