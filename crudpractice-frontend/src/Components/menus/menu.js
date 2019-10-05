"use strict"
import React from 'react';
import {Nav, NavItem, Navbar, Badge, NavDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'react-bootstrap';

class Header extends React.Component{
    render(){
        return(
            <Navbar inverse="true" fixedtop="true" expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#">Pipeline</Navbar.Brand>
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