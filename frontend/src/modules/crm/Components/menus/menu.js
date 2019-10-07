import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Nav, Badge, Navbar, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'react-bootstrap';
// import logo from './logo.svg';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends React.Component{
    render(){
        return(
          /*  <Router>
                <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <ul className="App-nav">
                    {modules.map(module => ( // with a name, and routes
                        <li key={module.name} className={currentTab === module.name ? 'active' : ''}>
                            <Link to={module.routeProps.path} onClick={() => setCurrentTab(module.name)}>{module.name}</Link>
                        </li>
                    ))}
                    </ul>
                </header>
                <div className="App-content">
                    {modules.map(module => (
                    <Route {...module.routeProps} key={module.name} />
                    ))}
                </div>
                </div>
            </Router>
        */

            <Navbar inverse="true" fixedtop="true" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#">pipelineVFX</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#">CRM</Nav.Link>
                    <Nav.Link href="#">Budget</Nav.Link>
                    <Nav.Link href="#">Projects</Nav.Link>
                    <Nav.Link href="#">Episodes</Nav.Link>
                    <Nav.Link href="#">Shots</Nav.Link>
                    <Nav.Link href="#">Tasks</Nav.Link>
                    <Nav.Link href="#">Assignments</Nav.Link>
                     <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#">Add</NavDropdown.Item>
                        <NavDropdown.Item href="#">Edit</NavDropdown.Item>
                        <NavDropdown.Item href="#">Delete</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#">More deets</Nav.Link>
                    <Nav.Link eventKey={2} href="#">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header