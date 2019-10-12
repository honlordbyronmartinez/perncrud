import React, { Component } from 'react' ;
import { Container, Row, Col } from 'reactstrap' ;
import ModalForm from './Components/Modals/Modal' ;
import { CSVLink } from "react-csv" ;
import 'bootstrap/dist/css/bootstrap.min.css' ;
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';

class bidsli extends Component {
    state = {
        items: [],
        columnDefs: [{
          headerName: "ID", field: "id_bidsli", sortable: true, filter: true, checkboxSelection: true
        }, {
          headerName: "Bid #", field: "id_bids", sortable: true, filter: true, rowGroup: true 
        }, {
          headerName: "Item Name", field: "itemname", sortable: true, filter: true
        },{
          headerName: "QTY", field: "qty", sortable: true, filter: true 
        },{
          headerName: "Rate", field: "rate", sortable: true, filter: true 
        },{
          headerName: "Total", field: "total_s", sortable: true, filter: true 
        },{
          headerName: "Notes", field: "notes", sortable: true, filter: true 
        }],
        autoGroupColumnDef: {
          headerName: "Item Name",
          field: "itemname",
          cellRenderer:'agGroupCellRenderer',
          cellRendererParams: {
            checkbox: true
          }
        }
      }
    
      getItems(){
        fetch('http://localhost:3000/bidsli')
          .then(response => response.json())
          .then(items => this.setState({items}))
          .catch(err => console.log(err))
      }
    
      addItemToState = (item) => {
        this.setState(prevState => ({
          // items: [...prevState.items, item],
          rowData: [...prevState.rowData, item]
        }))
      }
    
      updateState = (item) => {
        const itemIndex = this.state.items.findIndex(data => data.id_bidsli === item.id_bidsli)
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
    
      deleteItemFromState = (id_bidsli) => {
        const updatedItems = this.state.items.filter(item => item.id_bidsli !== id_bidsli )
        this.setState({ items: updatedItems })
      }

      componentDidMount(){
        this.getItems();
        fetch('http://localhost:3000/bidsli')
          .then(result => result.json())
          .then(rowData => this.setState({rowData}))
          .catch(err => console.log(err))
      }

      onButtonClick = e => {
        const selectedNodes = this.gridApi.getSelectedNodes()
        const selectedData = selectedNodes.map( node => node.data )
        const selectedDataStringPresentation = selectedData.map( node => node.id_bidsli + ' ' + node.itemname).join(', ')
        alert(`Selected nodes: ${selectedDataStringPresentation}`)
      }
    
      render() {
        return (
          <Container className="App">
            <Row>
              <Col>
                <h1 style={{margin: "20px 0"}}>BIDS LI</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="ag-theme-balham" style={{ height: '500px', width: '80vw' }} >
                  <button onClick={this.onButtonClick}>Get selected rows</button>
                  <AgGridReact 
                    columnDefs={this.state.columnDefs} 
                    groupSelectsChildren={true}
                    autoGroupColumnDef={this.state.autoGroupColumnDef}
                    rowData={this.state.rowData} 
                    rowSelection="multiple"
                    onGridReady={ params => this.gridApi = params.api }
                  >
                  </AgGridReact>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                
                    <CSVLink
                      filename={"pipelinevfx_bidsli.csv"}
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
        path: '/bidsli',
        component: bidsli
    },
    name: 'Bids LI',
}