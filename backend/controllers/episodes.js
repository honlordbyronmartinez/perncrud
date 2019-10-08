// episodes

const getTableData = (req, res, db) => {
    db.select('*').from('episodes')
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
    const { episodenum, episodename, clientname, status, notes } = req.body
    const added = new Date()
    db('episodes').insert({ episodenum, episodename, clientname, status, notes, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putTableData = (req, res, db) => {
    const { id_episodes,  episodenum, episodename, clientname, status, notes } = req.body
    db('episodes').where({id_episodes}).update({episodenum, episodename, clientname, status, notes})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteTableData = (req, res, db) => {
    const { id_episodes } = req.body
    db('episodes').where({id_episodes}).del()
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