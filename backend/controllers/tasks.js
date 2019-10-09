// tasks

const getTableData = (req, res, db) => {
    db.select('*').from('tasks')
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
    const { taskname, projectname, episodename, shotname, servicename, operatorname, clientname, status, notes } = req.body
    const added = new Date()
    db('tasks').insert({ taskname, projectname, episodename, shotname, servicename, operatorname, clientname, status, notes, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putTableData = (req, res, db) => {
    const { id_tasks, taskname, projectname, episodename, shotname, servicename, operatorname, clientname, status, notes } = req.body
    db('tasks').where({id_tasks}).update({taskname, projectname, episodename, shotname, servicename, operatorname, clientname, status, notes })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id_tasks } = req.body
    db('tasks').where({id_tasks}).del()
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