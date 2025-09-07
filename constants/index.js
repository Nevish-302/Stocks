const QUERY_TYPES = {
    NAME: 'Name',
    ID: 'Id'
}

const QUERY_TYPES_ENUM = [QUERY_TYPES.NAME, QUERY_TYPES.ID]

const ID_REGEX = /^STK\d{6,7}$/;


module.exports = {
    ID_REGEX,
    QUERY_TYPES,
    QUERY_TYPES_ENUM,
}