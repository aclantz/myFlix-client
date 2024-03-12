import propTypes from "prop-types";
import { Button,  Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  const selectedMovie = movies.find((movie) => movie.id === movieId);
  const similarMovie = movies.filter((movie) => {
    return (
      movie.id !== movieId && movie.genre.Name === selectedMovie.genre.Name
    );
  });

  const addFavMovie = () => {
    fetch(
      `https://movie-api-project24-2fb853d4fde0.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("failed to add to favMovies");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          console.log("Movie added to user.favoritemovies");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFavMovie = () => {
    fetch(
      `https://movie-api-project24-2fb853d4fde0.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("failed to add to favMovies");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          console.log("Movie removed from user.favoritemovies");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let handleToggle = (movie) => {
    if (user.favoritemovies.includes(movieId)) {
      removeFavMovie(movie);
      alert("Movie Removed");
    } else {
      addFavMovie(movie);
      alert("Movie Added");
    }
  };

  return (
    <div>
      <Row>
        <Col md={5} className="my-5">
          <div>
            <img src={movie.image} width="400" />
          </div>
        </Col>
        <Col md={6}>
          <Card bg="secondary" className="my-5">
            <Card.Title>{movie.title}</Card.Title>
            <Card.Body>
              <div>
                <h6>Description:</h6>
                <span>{movie.description}</span>
              </div>
              <br />
              <div>
                <h6>
                  Director: <span>{movie.director.Name}</span>
                </h6>
                <span>{movie.director.Bio}</span>
              </div>
              <br />
              <div>
                <h6>
                  Genre: <span>{movie.genre.Name}</span>
                </h6>
                <span>{movie.genre.Description}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={1}>
          <Link to="/" role="button">
            <Button type="button" className="my-5">
              Back
            </Button>
          </Link>
          <Button onClick={handleToggle} className="" >
            Favorite
          </Button>
        </Col>
      </Row>
      <Row>
        Similar Movies
        {similarMovie.map((movie) => (
          <Col className="mb-4" key={movie.id} md={3}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

MovieView.propTypes = {
  movie: propTypes.shape({
    imagePath: propTypes.string,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string,
    }),
    director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string,
    }),
    user: propTypes.shape({
      favoritemovies: propTypes.array,
    }),
    token: propTypes.string,
  }),
};
