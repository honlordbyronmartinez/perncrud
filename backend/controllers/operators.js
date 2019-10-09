// operators

const getTableData = (req, res, db) => {
    db.select('*').from('operators')
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
    const { operatorname, projectname, episodename, shotname, servicename, clientname, status, notes } = req.body
    const added = new Date()
    db('operators').insert({ operatorname, projectname, episodename, shotname, servicename, clientname, status, notes, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putTableData = (req, res, db) => {
    const { id_operators, projectname, episodename, shotname, servicename, operatorname, clientname, status, notes } = req.body
    db('operators').where({id_operators}).update({ operatorname, projectname, episodename, shotname, servicename, clientname, status, notes })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id_operators } = req.body
    db('operators').where({id_operators}).del()
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