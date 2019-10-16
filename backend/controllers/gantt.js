// gantt

  const getTableData = (req, res, db) => {
    db.select('*').from('gantttasks')
      .then(data => {
        if(data.length){
          res.json(data)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const postTableData = (req, res, db) => {
    const { text, startdate, duration, progress  } = req.body
    db('gantttasks').insert({ text, startdate, duration, progress })
      .returning('*')
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putTableData = (req, res, db) => {
    const { id, text, startdate, duration, progress  } = req.body
    db('gantttasks').where({id}).update({ text, startdate, duration, progress })
      .returning('*')
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('gantttasks').where({id}).del()
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