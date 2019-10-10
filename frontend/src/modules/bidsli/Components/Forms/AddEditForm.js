
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id_bidsli: 0,
    id_bids: '',
    itemname: '',
    qty: '',
    rate: '',
    notes: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/bidsli', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_bids: this.state.id_bids,
        itemname: this.state.itemname,
        qty: this.state.qty,
        rate: this.state.rate,
        notes: this.state.notes
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/bidsli', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_bidsli: this.state.id_bidsli,
        id_bids: this.state.id_bids,
        itemname: this.state.itemname,
        qty: this.state.qty,
        rate: this.state.rate,
        notes: this.state.notes
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id_bidsli, id_bids, itemname, qty, rate, notes } = this.props.item
      this.setState({ id_bidsli, id_bids, itemname, qty, rate, notes })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="id_bids">Bid #</Label>
          <Input type="text" name="id_bids" id="id_bids" onChange={this.onChange} value={this.state.id_bids === null ? '' : this.state.id_bids} />
        </FormGroup>
        <FormGroup>
          <Label for="itemname">Item Name</Label>
          <Input type="text" name="itemname" id="itemname" onChange={this.onChange} value={this.state.itemname === null ? '' : this.state.itemname}  />
        </FormGroup>
        <FormGroup>
          <Label for="qty">QTY</Label>
          <Input type="text" name="qty" id="qty" onChange={this.onChange} value={this.state.qty === null ? '' : this.state.qty}  />
        </FormGroup>
        <FormGroup>
          <Label for="rate">Rate</Label>
          <Input type="text" name="rate" id="rate" onChange={this.onChange} value={this.state.rate === null ? '' : this.state.rate}  />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input type="text" name="notes" id="notes" onChange={this.onChange} value={this.state.notes === null ? '' : this.state.notes}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm