const {
    findQueryType
} = require("../helpers");
const {
    stockList,
    stockMapById,
    stockNames,
    stockTrie
} = require("../DB/init");
const {QUERY_TYPES} = require("../constants");
const {
    stockModel
} = require("../models");

async function getStocksV0(req, res) {
    const startTime = new Date();
    const {searchText} = req.query;
    const queryType = findQueryType(searchText);

    if (!queryType) {
        return res.status(404).json({
            success: false,
            data: null,
            timeTaken: Date.now() - startTime + ' ms',
            message: `No such query type ${searchText}`
        })
    }

    let stock;

    if (queryType === QUERY_TYPES.ID) {
        stock = stockMapById.get(searchText);
    }

    if (queryType === QUERY_TYPES.NAME) {
        stock = stockTrie.search(searchText);
    }

    if (!stock) {
        return res.status(404).json({
            success: false,
            data: null,
            timeTaken: Date.now() - startTime + ' ms',
            message: `No results for ${searchText}`
        })
    }

    return res.status(200).json({
        success: true,
        data: stock,
        timeTaken: Date.now() - startTime + ' ms',
        message: 'Stock found Successfully',
    })
}

async function getStocksV1(req, res) {
    const {searchText} = req.query;
    const startTime = new Date();
    const queryType = findQueryType(searchText);
    if (!queryType) {
        return res.status(404).json({
            success: false,
            data: null,
            timeTaken: Date.now() - startTime + ' ms',
        })
    }
    let stock;
    if (queryType === QUERY_TYPES.NAME) {
        stock = await stockModel.getStock({
            name: searchText,
        })
        console.log(stock);
    }
    if (queryType === QUERY_TYPES.ID) {
        stock = await stockModel.getStock({
            id: searchText,
        })
    }
    if (!stock) {
        return res.status(404).json({
            success: false,
            data: null,
            timeTaken: Date.now() - startTime + ' ms',
        })
    }

    return res.status(200).json({
        success: true,
        data: stock,
        timeTaken: Date.now() - startTime + ' ms',
    })
}


module.exports = {
    getStocksV0,
    getStocksV1,
}