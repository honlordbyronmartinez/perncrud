const express = require('express')

// App
const app = express()

// crm
const crm = require('../../controllers/crm')
app.get('/crm', (req, res) => crm.getTableData(req, res, db))
app.post('/crm', (req, res) => crm.postTableData(req, res, db))
app.put('/crm', (req, res) => crm.putTableData(req, res, db))
app.delete('/crm', (req, res) => crm.deleteTableData(req, res, db))

module.exports = app;