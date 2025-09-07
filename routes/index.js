const express = require("express");
const searchRouter = require("./searchRouter");
const transactionRouter = require("./transactionRouter");

const router = express.Router();

router.use("/search", searchRouter);
router.use("/transactions", transactionRouter);

module.exports = router;