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

// App Routes - Auth
app.get('/', (req, res) => res.send('Welcome to pipelineVFX'))

// crm
const crm = require('./controllers/crm')
app.get('/crm', (req, res) => crm.getTableData(req, res, db))
app.post('/crm', (req, res) => crm.postTableData(req, res, db))
app.put('/crm', (req, res) => crm.putTableData(req, res, db))
app.delete('/crm', (req, res) => crm.deleteTableData(req, res, db))

// bids
const bids = require('./controllers/bids')
app.get('/bids', (req, res) => bids.getTableData(req, res, db))
app.post('/bids', (req, res) => bids.postTableData(req, res, db))
app.put('/bids', (req, res) => bids.putTableData(req, res, db))
app.delete('/bids', (req, res) => bids.deleteTableData(req, res, db))

// bidsli
const bidsli = require('./controllers/bidsli')
app.get('/bidsli', (req, res) => bidsli.getTableData(req, res, db))
app.post('/bidsli', (req, res) => bidsli.postTableData(req, res, db))
app.put('/bidsli', (req, res) => bidsli.putTableData(req, res, db))
app.delete('/bidsli', (req, res) => bidsli.deleteTableData(req, res, db))

// projects
const proj = require('./controllers/projects')
app.get('/proj', (req, res) => proj.getTableData(req, res, db))
app.post('/proj', (req, res) => proj.postTableData(req, res, db))
app.put('/proj', (req, res) => proj.putTableData(req, res, db))
app.delete('/proj', (req, res) => proj.deleteTableData(req, res, db))

// episodes
const epis = require('./controllers/episodes')
app.get('/epis', (req, res) => epis.getTableData(req, res, db))
app.post('/epis', (req, res) => epis.postTableData(req, res, db))
app.put('/epis', (req, res) => epis.putTableData(req, res, db))
app.delete('/epis', (req, res) => epis.deleteTableData(req, res, db))

// shots
const shot = require('./controllers/shots')
app.get('/shots', (req, res) => shot.getTableData(req, res, db))
app.post('/shots', (req, res) => shot.postTableData(req, res, db))
app.put('/shots', (req, res) => shot.putTableData(req, res, db))
app.delete('/shots', (req, res) => shot.deleteTableData(req, res, db))

// services
const serv = require('./controllers/services')
app.get('/serv', (req, res) => serv.getTableData(req, res, db))
app.post('/serv', (req, res) => serv.postTableData(req, res, db))
app.put('/serv', (req, res) => serv.putTableData(req, res, db))
app.delete('/serv', (req, res) => serv.deleteTableData(req, res, db))

// operators
const oper = require('./controllers/operators')
app.get('/oper', (req, res) => oper.getTableData(req, res, db))
app.post('/oper', (req, res) => oper.postTableData(req, res, db))
app.put('/oper', (req, res) => oper.putTableData(req, res, db))
app.delete('/oper', (req, res) => oper.deleteTableData(req, res, db))

// tasks
const task = require('./controllers/tasks')
app.get('/task', (req, res) => task.getTableData(req, res, db))
app.post('/task', (req, res) => task.postTableData(req, res, db))
app.put('/task', (req, res) => task.putTableData(req, res, db))
app.delete('/task', (req, res) => task.deleteTableData(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})