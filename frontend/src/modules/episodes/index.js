import React, { Component } from 'react' ;
import { Container, Row, Col } from 'reactstrap' ;
import ModalForm from './Components/Modals/Modal' ;
import DataTable from './Components/Tables/DataTable' ;
import { CSVLink } from "react-csv" ;
import 'bootstrap/dist/css/bootstrap.min.css' ;

console.log("INS - 01 Let's get started")

class episodes extends Component {
    state = {
        items: []
      }
    
      getItems(){
        fetch('http://localhost:3000/epis')
          .then(response => response.json())
          .then(items => {
            console.log("INS - AA Pre Fetch getItems")
            console.log(this.state)
            this.setState({items})
            console.log("INS - BB Post Fetch getItems")
            console.log(this.state)
          })
          .catch(err => console.log(err))
      }
    
      addItemToState = (item) => {
        this.setState(prevState => ({
          items: [...prevState.items, item]
        }))
      }
    
      updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id_episodes === item.id_episodes)
        const newArray = [
        // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
        // add the updated item to the array
          item,
        // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray })
      }
    
      deleteItemFromState = (id_episodes) => {
        const updatedItems = this.state.items.filter(item => item.id_episodes !== id_episodes)
        this.setState({ items: updatedItems })
      }
    
      componentDidMount(){
        console.log("INS - 03 Pre this.getItems cDM")
        console.log(this.state)
        this.getItems()
        console.log("INS - 04 Post this.getItems cDM")
        console.log(this.state)
      }
    
      render() {
        console.log("INS - 02 Enter render")
        console.log(this.state)
        return (
          <Container className="App">
            <Row>
              <Col>
                <h1 style={{margin: "20px 0"}}>Episodes</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
              </Col>
            </Row>
            <Row>
              <Col>
                <CSVLink
                  filename={"pipelinevfx_episodes.csv"}
                  color="primary"
                  style={{float: "left", marginRight: "10px"}}
                  className="btn btn-primary"
                  data={this.state.items}>
                  Download CSV
                </CSVLink>
                <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
              </Col>
            </Row>
          </Container>
        )
      }
  }

export default {
    routeProps: {
        path: '/episodes',
        component: episodes
    },
    name: 'Episodes',
}