const express = require('express');
const transactionController = require("../controllers/transactionController");
const {asyncHandler} = require("../middlewares");
const router = express.Router();

router.get('/', asyncHandler(transactionController.getTransactionHistory))

router.post('/', asyncHandler(transactionController.addTransaction))

module.exports = router;