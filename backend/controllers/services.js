// services

const getTableData = (req, res, db) => {
  db.select('*').from('services')
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
  const { servicename, projectname, episodename, shotname, clientname, status, notes, keywords } = req.body
  const added = new Date()
  db('services').insert({ servicename, projectname, episodename, shotname, clientname, status, notes, keywords, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id_services, servicename, projectname, episodename, shotname, clientname, status, notes, keywords } = req.body
  db('services').where({id_services}).update({servicename, projectname, episodename, shotname, clientname, status, notes, keywords })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id_services } = req.body
  db('services').where({id_services}).del()
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