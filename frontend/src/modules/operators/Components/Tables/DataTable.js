import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

class DataTable extends Component {

  deleteItem = id_operators => {
    let confirmDelete = window.confirm('Delete item forever?')
    if(confirmDelete){
      fetch('http://localhost:3000/oper', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_operators
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id_operators)
      })
      .catch(err => console.log(err))
    }

  }

  render() {
    let items = this.props && this.props.items.length > 0 ?
      this.props.items.map(item => {
        return (
          <tr key={item.id_operators}>
            <th scope="row">{item.id_operators}</th>
            <td>{item.operatorname}</td>
            <td>{item.projectname}</td>
            <td>{item.episodename}</td>
            <td>{item.shotname}</td>
            <td>{item.servicename}</td>
            <td>{item.clientname}</td>
            <td>{item.status}</td>
            <td>{item.notes}</td>
            <td>
              <div style={{width:"110px"}}>
                <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
                {' '}
                <Button color="danger" onClick={() => this.deleteItem(item.id_operators)}>Del</Button>
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
              <th>Operator</th>
              <th>Project</th>
              <th>Episode</th>
              <th>Shot</th>
              <th>Service</th>
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