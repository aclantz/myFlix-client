import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  <Navbar expand="lg" bg="Dark">
    <Navbar.Brand as={Link} to="/">
      myFlix
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {!user && (
          <>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Signup
            </Nav.Link>
          </>
        )}
        {user && (
          <>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link onClick={onLoggedOut}>
              Logout
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>;
};
