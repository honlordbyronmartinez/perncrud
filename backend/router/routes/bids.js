const express = require('express')

// App
const app = express()

// bids
const bids = require('../../controllers/bids')
app.get('/bids', (req, res) => bids.getTableData(req, res, db))
app.post('/bids', (req, res) => bids.postTableData(req, res, db))
app.put('/bids', (req, res) => bids.putTableData(req, res, db))
app.delete('/bids', (req, res) => bids.deleteTableData(req, res, db))

module.exports = app;