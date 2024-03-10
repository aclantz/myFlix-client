import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieSearch } from "../movie-search/movie-search";
import propTypes from "prop-types";


export const NavigationBar = ({ user, onLoggedOut, movies }) => {

  return (
    <Navbar expand="lg" bg="secondary" data-bs-theme="dark" className="nav-bar">
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
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
            <Nav.Link onClick={onLoggedOut}>
              Logout
            </Nav.Link>
          </>
        )}
      </Nav>
      <MovieSearch 
        movies={movies}
      />
    </Navbar.Collapse>
  </Navbar>
  );
};

NavigationBar.propTypes = {
  user: propTypes.object,
  onLoggedOut: propTypes.func.isRequired,
  movies: propTypes.array.isRequired
};