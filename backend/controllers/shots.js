// shots

const getTableData = (req, res, db) => {
  db.select('*').from('shots')
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
  const { shotname, projectname, episodename, clientname, status, notes, keywords } = req.body
  const added = new Date()
  db('shots').insert({ shotname, projectname, episodename, clientname, status, notes, keywords, added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const putTableData = (req, res, db) => {
  const { id_shots,  shotname, projectname, episodename, clientname, status, notes, keywords } = req.body
  db('shots').where({id_shots}).update({shotname, projectname, episodename, clientname, status, notes, keywords})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const deleteTableData = (req, res, db) => {
  const { id_shots } = req.body
  db('shots').where({id_shots}).del()
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