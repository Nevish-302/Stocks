const express = require("express");

const searchController = require("../controllers/SearchController");

const router = express.Router();

// using memory
router.get('/v0', searchController.getStocksV0)

// db
router.get('/v1', searchController.getStocksV1)

module.exports = router;