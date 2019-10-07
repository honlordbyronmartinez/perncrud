const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
var db = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : '',
    password : '',
    database : 'pipeline'
  }
});

// Controllers - aka, the db queries
// const main = require('./controllers/main')
const crm = require('./controllers/crm')
const proj = require('./controllers/projects')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('Welcome to pipelineVFX'))

// crm
app.get('/crm', (req, res) => crm.getTableData(req, res, db))
app.post('/crm', (req, res) => crm.postTableData(req, res, db))
app.put('/crm', (req, res) => crm.putTableData(req, res, db))
app.delete('/crm', (req, res) => crm.deleteTableData(req, res, db))

// projects
app.get('/proj', (req, res) => proj.getTableData(req, res, db))
app.post('/proj', (req, res) => proj.postTableData(req, res, db))
app.put('/proj', (req, res) => proj.putTableData(req, res, db))
app.delete('/proj', (req, res) => proj.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})