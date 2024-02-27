import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            director: movie.Director,
            genre: movie.Genre,
            actors: movie.Actors,
            image: movie.ImagePath,
            featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    console.log("User:", user);
    console.log("Token:", token);
    return (
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <br />
          <SignUpView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        selectedMovie.genre.Name === movie.genre.Name &&
        selectedMovie.id !== movie.id
      );
    });
    return (
      <Row className="justify-content-md-center">
        <Col md={10}>
          <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>
        <hr className="my-3" />
        <Col md={3}>
          <h2>Similar Movies</h2>
          {similarMovies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
               
              />
            );
          })}
        </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
    return (
      <Row>
        <Col md={8}>
          The list is empty.
          <hr />
          <Button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}>
            Log-out
          </Button>
        </Col>
      </Row>
    );
  }

  return (
    <Row className="justify-content-md-center">
      {movies.map((movie) => (
        <Col md={6} lg={4} key={movie.id}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </Col>
      ))}
      <hr className="my-3" />
      <Button
        className="my-5 w-25" 
        md={1} 
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </Button>
    </Row>
  );
};
