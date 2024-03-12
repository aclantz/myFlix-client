import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import propTypes from "prop-types";
import { useState } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { apiURL } from "../config";

export const ProfileView = ({ user, setUser, token, setToken, movies }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const favMovies = movies.filter((m) => user.favoritemovies.includes(m.id));

  //update user
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };
    
    fetch(apiURL + `/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("update successful");
          window.location.reload();
        } else {
          console.log("Error response:", response.status, response.statusText);
          alert("update failed");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //delete user
  const handleDelete = (event) => {
    event.preventDefault();
    fetch(apiURL + `/users/${user.username}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        alert("User successfully deleted");
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        console.log("Error response:", response.status, response.statusText);
        alert("something went wrong");
      }
    });
  };

  return (
    <>
      <Card bg="secondary" className="my-3">
        <Card.Body>
          <Card.Title>Your Information</Card.Title>
          <Card.Text>
            <span>Username: {user.username}</span>
            <br />
            <span>Email: {user.email}</span>
            <br />
            <span>Birthday: {user.birthday}</span>
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
      <hr />
      <Row>
        <h4>Your Favorite Movies</h4>
        {favMovies.map((movie) => {
          return (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          );
        })}
      </Row>
      <hr />
      <Card bg="secondary" className="my-3">
        <Card.Body>
          <Card.Title>Update Information</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={5}
                placeholder="Enter a username with at least 5 characters"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter a password"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" className="my-3">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <hr />
      <Card bg="secondary">
        <Card.Body>
          <Card.Title>Delete Account</Card.Title>
          <Form onSubmit={handleDelete}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </Form.Group>
            <Button type="submit" className="my-3">
              Delete
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

ProfileView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string.isRequired,
    password: propTypes.string,
    email: propTypes.string,
    birthday: propTypes.string,
  }).isRequired,
  movies: propTypes.array.isRequired,
  token: propTypes.string.isRequired,
  setUser: propTypes.func,
  setToken: propTypes.func,
};
