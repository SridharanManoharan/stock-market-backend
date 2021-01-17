// Import packages
const express = require('express');
const cors = require('cors')
const morgan = require('morgan');
const routes = require('./routes/index.routes');

// App
const app = express()
// Allow cross origin request
app.use(cors())

// Morgan
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/customer-api/browser/stock', routes);

// First route
app.get('/', (req, res) => {
    res.json({ message: 'Hello world' })
})

// Starting server
app.listen('9000')