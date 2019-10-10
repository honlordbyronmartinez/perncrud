import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id_bidsli => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/bidsli', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_bidsli
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id_bidsli)
      })
      .catch(err => console.log(err))
    }

  }

  render() {
    let items = this.props && this.props.items.length > 0 ?
      this.props.items.map(item => {
        return (
          <tr key={item.id_bidsli}>
            <th scope="row">{item.id_bidsli}</th>
            <td>{item.id_bids}</td>
            <td>{item.itemname}</td>
            <td>{item.qty}</td>
            <td>{item.rate}</td>
            <td>{item.total_s}</td>
            <td>{item.notes}</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id_bidsli)}>Del</Button>
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
              <th>Bid #</th>
              <th>Item Name</th>
              <th>QTY</th>
              <th>Rate</th>
              <th>Total</th>
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