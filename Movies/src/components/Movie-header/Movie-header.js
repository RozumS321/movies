import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Button, Container } from "react-bootstrap";
import "./Movie-header.css";
export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Movies</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="respnsive-navbar-nav" />
        <Navbar.Collapse id="respnsive-navbar-nav">
          <Nav className="mr-auto nav-menu">
            <Nav.Link>
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/add">Add Movie</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/upload">Uploud</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
