const express = require('express')
const routes = require('./routes/index')
const {
    requestLogger
} = require("./middlewares");
require('dotenv').config();
const app = express();

app.use(requestLogger);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/v1', routes);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})