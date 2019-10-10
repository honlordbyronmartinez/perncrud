// bidsli

const getTableData = (req, res, db) => {
  db.select('*').from('bidsli')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const postTableData = (req, res, db) => {
  const { id_bids, itemname, qty, rate, notes } = req.body
  // const added = new Date()
  db('bidsli').insert({ id_bids, itemname, qty, rate, notes })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id_bidsli, id_bids, itemname, qty, rate, notes } = req.body
  db('bidsli').where({id_bidsli}).update({ id_bids, itemname, qty, rate, notes })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id_bidsli } = req.body
  db('bidsli').where({id_bidsli}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}