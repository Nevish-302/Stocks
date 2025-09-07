const postgres = require('../DB/postgres');
const {getFirstRow} = require("../helpers");
const ORDERS_TABLE = 'orders';

async function addOrder({
                            userId,
                            stockId,
                            orderType,
                            price,
                            quantity,
                            remainingQuantity = quantity,
                        }) {
    return postgres(ORDERS_TABLE)
        .insert({
            userId,
            stockId,
            orderType,
            price,
            quantity,
            remainingQuantity,
        })
        .returning('*')
        .then(getFirstRow)

}

async function updateOrder({
                               orderId,
                               remainingQuantity
                           }) {
    return postgres(ORDERS_TABLE)
        .where({id: orderId})
        .returning('*')
        .update({remainingQuantity})
        .then(getFirstRow)
}

async function deleteOrder({
                               orderId,
                           }) {
    return postgres(ORDERS_TABLE)
        .where({id: orderId})
        .returning('*')
        .delete()
}

async function getOrders({
                             userId,
                         } = {}) {
    const whereClause = {}

    if (userId) {
        whereClause.userId = userId
    }

    return postgres(ORDERS_TABLE)
        .select('*')
        .where(whereClause)
}

let isMatching = false;

async function matchOrders({
                               newOrder
                           }) {

    if (isMatching) {
        return;
    }
    isMatching = true;
    try {
        await postgres.transaction(async trx => {

            if (!newOrder) return;

            const isBuy = newOrder.orderType === 'SELL' ? 'BUY' : 'SELL';

            const oppositeOrders = await trx('orders')
                .select('*')
                .where({
                    orderType: isBuy,
                    stockId: newOrder.stockId
                })
                .andWhere('remainingQuantity', '>', 0)
                .orderBy('price', isBuy ? 'asc' : 'desc') // price priority
                .orderBy('createdAt', 'asc');             // timestamp priority

            let remaining = newOrder.remainingQuantity;
            const modifiedOpposites = [];

            for (const order of oppositeOrders) {
                if (remaining <= 0) break;

                const matchedQty = Math.min(remaining, order.remainingQuantity);
                remaining -= matchedQty;
                order.remainingQuantity -= matchedQty;

                modifiedOpposites.push(order);
            }

            await trx('orders')
                .where('id', newOrder.id)
                .update({remainingQuantity: remaining});

            await Promise.all(modifiedOpposites.map(order =>
                trx('orders')
                    .where({id: order.id})
                    .update({
                        remainingQuantity: order.remainingQuantity,
                        status: order.remainingQuantity ? 'PARTIAL' : 'FILLED'
                    })
            ));
        })
    } catch (e) {
        console.error(e);
    } finally {
        isMatching = false;
    }

}


module.exports = {
    addOrder,
    updateOrder,
    deleteOrder,
    getOrders,
    matchOrders,
}