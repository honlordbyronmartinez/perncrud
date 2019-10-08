import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id_bids => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/bids', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_bids
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id_bids)
      })
      .catch(err => console.log(err))
    }

  }

  render() {
    let items = this.props && this.props.items.length > 0 ?
      this.props.items.map(item => {
        return (
          <tr key={item.id_bids}>
            <th scope="row">{item.id_bids}</th>
            <td>{item.code}</td>
            <td>{item.bidname}</td>
            <td>{item.clientname}</td>
            <td>{item.status}</td>
            <td>{item.notes}</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id_bids)}>Del</Button>
              </div>
            </td>
          </tr>
          )
        }): <span></span>;

      return (
        <Table responsive hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Code</th>
              <th>Bid Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </Table>
      )
  }
}

export default DataTable