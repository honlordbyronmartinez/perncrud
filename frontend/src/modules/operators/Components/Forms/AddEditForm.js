
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id_operators: 0,
    operatorname: '',
    projectname: '',
    episodename: '',
    shotname: '',
    servicename: '',
    clientname: '',
    status: '',
    notes: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/oper', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operatorname: this.state.operatorname,
        projectname: this.state.projectname,
        episodename: this.state.episodename,
        shotname: this.state.shotname,
        servicename: this.state.servicename,
        clientname: this.state.clientname,
        status: this.state.status,
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
    fetch('http://localhost:3000/oper', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_operators: this.state.id_operators,
        operatorname: this.state.operatorname,
        projectname: this.state.projectname,
        episodename: this.state.episodename,
        shotname: this.state.shotname,
        servicename: this.state.servicename,
        clientname: this.state.clientname,
        status: this.state.status,
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
      const { id_operators, operatorname, projectname, episodename, shotname, servicename, clientname, status, notes } = this.props.item
      this.setState({ id_operators, operatorname, projectname, episodename, shotname, servicename, clientname, status, notes })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="operatorname">Operator</Label>
          <Input type="text" name="operatorname" id="operatorname" onChange={this.onChange} value={this.state.operatorname === null ? '' : this.state.operatorname} />
        </FormGroup>
        <FormGroup>
          <Label for="projectname">Project</Label>
          <Input type="text" name="projectname" id="projectname" onChange={this.onChange} value={this.state.projectname === null ? '' : this.state.projectname}  />
        </FormGroup>
        <FormGroup>
          <Label for="episodename">Episode</Label>
          <Input type="text" name="episodename" id="episodename" onChange={this.onChange} value={this.state.episodename === null ? '' : this.state.episodename}  />
        </FormGroup>
        <FormGroup>
          <Label for="shotname">Shot</Label>
          <Input type="text" name="shotname" id="shotname" onChange={this.onChange} value={this.state.shotname === null ? '' : this.state.shotname}  />
        </FormGroup>
        <FormGroup>
          <Label for="servicename">Service</Label>
          <Input type="text" name="servicename" id="servicename" onChange={this.onChange} value={this.state.servicename === null ? '' : this.state.servicename}  />
        </FormGroup>
        <FormGroup>
          <Label for="clientname">Client Name</Label>
          <Input type="clientname" name="clientname" id="clientname" onChange={this.onChange} value={this.state.clientname === null ? '' : this.state.clientname}  />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input type="text" name="status" id="status" onChange={this.onChange} value={this.state.status === null ? '' : this.state.status}  />
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