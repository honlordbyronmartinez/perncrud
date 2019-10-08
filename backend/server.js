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
    database : 'pipelinevfx'
  }
});

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

// Controllers - aka, the db queries
const crm = require('./controllers/crm')
const bids = require('./controllers/bids')
const proj = require('./controllers/projects')
const epis = require('./controllers/episodes')
const shots = require('./controllers/shots')
const serv = require('./controllers/services')

// App Routes - Auth
app.get('/', (req, res) => res.send('Welcome to pipelineVFX'))

// crm
app.get('/crm', (req, res) => crm.getTableData(req, res, db))
app.post('/crm', (req, res) => crm.postTableData(req, res, db))
app.put('/crm', (req, res) => crm.putTableData(req, res, db))
app.delete('/crm', (req, res) => crm.deleteTableData(req, res, db))

// bids
app.get('/bids', (req, res) => bids.getTableData(req, res, db))
app.post('/bids', (req, res) => bids.postTableData(req, res, db))
app.put('/bids', (req, res) => bids.putTableData(req, res, db))
app.delete('/bids', (req, res) => bids.deleteTableData(req, res, db))

// projects
app.get('/proj', (req, res) => proj.getTableData(req, res, db))
app.post('/proj', (req, res) => proj.postTableData(req, res, db))
app.put('/proj', (req, res) => proj.putTableData(req, res, db))
app.delete('/proj', (req, res) => proj.deleteTableData(req, res, db))

// episodes
app.get('/epis', (req, res) => epis.getTableData(req, res, db))
app.post('/epis', (req, res) => epis.postTableData(req, res, db))
app.put('/epis', (req, res) => epis.putTableData(req, res, db))
app.delete('/epis', (req, res) => epis.deleteTableData(req, res, db))

// shots
app.get('/shots', (req, res) => shots.getTableData(req, res, db))
app.post('/shots', (req, res) => shots.postTableData(req, res, db))
app.put('/shots', (req, res) => shots.putTableData(req, res, db))
app.delete('/shots', (req, res) => shots.deleteTableData(req, res, db))

// services
app.get('/serv', (req, res) => serv.getTableData(req, res, db))
app.post('/serv', (req, res) => serv.postTableData(req, res, db))
app.put('/serv', (req, res) => serv.putTableData(req, res, db))
app.delete('/serv', (req, res) => serv.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})