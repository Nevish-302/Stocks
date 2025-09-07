const postgres = require('../DB/postgres')

const STOCK_TABLE_NAME = 'stocks'

const bluebird = require('bluebird');

async function batchInsertStock(stockList) {
    let insertedCount = 0;

    await bluebird.map(
        stockList,
        async (stock) => {
            await postgres('stocks')
                .insert(stock)
                .onConflict('id')
                .ignore()
                .returning('id');
            insertedCount++;
        },
        {concurrency: 100}
    );

    return {success: true, insertedCount};
}

async function insertStock(stockProperties) {
    return postgres(STOCK_TABLE_NAME)
        .insert(stockProperties)
        .returning('*');
}

async function removeStock({id}) {
    const isDeleted = await postgres(STOCK_TABLE_NAME)
        .where({id})
        .delete()

    return Boolean(isDeleted)
}

async function getStock({
                            id,
                            name
                        }) {
    const whereClause = {}

    if (id) whereClause.id = id

    const query = postgres(STOCK_TABLE_NAME)
        .select('*')
        .where(whereClause)


    if (name) {
        query.whereILike('name', `%${name}%`);
    }

    return query
        .orderBy('price', 'asc')
        .first()
}

module.exports = {
    insertStock,
    removeStock,
    getStock,
    batchInsertStock,
}