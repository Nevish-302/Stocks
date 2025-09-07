const {orderModel} = require("../models");

async function getTransactionHistory(req, res) {
    const {
        userId
    } = req.query;


    await orderModel.getOrders({
        userId,
    }).then(
        (orders) => {
            res.status(200).json({
                success: true,
                data: {
                    orders
                },
                message: 'Successfully retrieved orders'
            });
        })
        .catch((e) => {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: e,
            })
        })


}

async function addTransaction(req, res) {
    const {
        userId,
        stockId,
        orderType,
        price,
        quantity,
        remainingQuantity,
    } = req.body;

    await orderModel.addOrder({
        userId,
        stockId,
        orderType,
        price,
        quantity,
        remainingQuantity,
    })
        .then((order) => {

            orderModel.matchOrders({
                newOrder: order,
            });

            res.status(200).json({
                success: true,
                data: {
                    order,
                },
                message: 'Successfully added order'
            })

        })
        .catch((e) => {
            res.status(500).json({
                success: false,
                message: 'Something went wrong',
                error: e,
            })
        })

}


module.exports = {
    getTransactionHistory,
    addTransaction,
}