
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id_projects: 0,
    code: '',
    projectname: '',
    clientname: '',
    status: '',
    notes: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/proj', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: this.state.code,
        projectname: this.state.projectname,
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
    fetch('http://localhost:3000/proj', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_projects: this.state.id_projects,
        code: this.state.code,
        projectname: this.state.projectname,
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
      const { id_projects, code, projectname, clientname, status, notes } = this.props.item
      this.setState({ id_projects, code, projectname, clientname, status, notes })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="code">Code</Label>
          <Input type="text" name="code" id="code" onChange={this.onChange} value={this.state.code === null ? '' : this.state.code} />
        </FormGroup>
        <FormGroup>
          <Label for="projectname">Project Name</Label>
          <Input type="text" name="projectname" id="projectname" onChange={this.onChange} value={this.state.projectname === null ? '' : this.state.projectname}  />
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