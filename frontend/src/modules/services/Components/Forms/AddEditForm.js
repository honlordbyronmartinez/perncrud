
import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddEditForm extends React.Component {
  state = {
    id_services: 0,
    servicename: '',
    projectname: '',
    episodename: '',
    shotname: '',
    clientname: '',
    status: '',
    notes: '',
    keywords: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/serv', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        servicename: this.state.servicename,
        projectname: this.state.projectname,
        episodename: this.state.episodename,
        shotname: this.state.shotname,
        clientname: this.state.clientname,
        status: this.state.status,
        notes: this.state.notes,
        keywords: this.state.keywords
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
    fetch('http://localhost:3000/serv', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id_services: this.state.id_services,
        servicename: this.state.servicename,
        projectname: this.state.projectname,
        episodename: this.state.episodename,
        shotname: this.state.shotname,
        clientname: this.state.clientname,
        status: this.state.status,
        notes: this.state.notes,
        keywords: this.state.keywords
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
      const { id_services, servicename, projectname, episodename, shotname, clientname, status, notes, keywords } = this.props.item
      this.setState({ id_services, servicename, projectname, episodename, shotname, clientname, status, notes, keywords })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="servicename">Service</Label>
          <Input type="text" name="servicename" id="servicename" onChange={this.onChange} value={this.state.servicename === null ? '' : this.state.servicename} />
        </FormGroup>
        <FormGroup>
          <Label for="projectname">Project</Label>
          <Input type="text" name="projectname" id="projectname" onChange={this.onChange} value={this.state.projectname === null ? '' : this.state.projectname}  />
        </FormGroup>
        <FormGroup>
          <Label for="episodename">Episode</Label>
          <Input type="text" name="episodename" id="episodename" onChange={this.onChange} value={this.state.episodename === null ? '' : this.state.episodename} />
        </FormGroup>
        <FormGroup>
          <Label for="shotname">Shot</Label>
          <Input type="text" name="shotname" id="shotname" onChange={this.onChange} value={this.state.shotname === null ? '' : this.state.shotname}  />
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
        <FormGroup>
          <Label for="keywords">Keywords</Label>
          <Input type="text" name="keywords" id="keywords" onChange={this.onChange} value={this.state.keywords === null ? '' : this.state.keywords}  />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditForm