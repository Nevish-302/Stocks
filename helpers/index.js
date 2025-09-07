const {
    ID_REGEX,
    QUERY_TYPES
} = require("../constants");
const Trie = require("./trie");

function findQueryType(query) {
    // IS ID OR NAME OR STH ELSE
    if (!query) {
        return null;
    }

    if (ID_REGEX.test(query)) {
        return QUERY_TYPES.ID;
    }

    return QUERY_TYPES.NAME;
}

function getFirstRow(array) {
    if (!array || array.length === 0) {
        return null;
    }
    return array[0]
}

module.exports = {
    findQueryType,
    Trie,
    getFirstRow,
}