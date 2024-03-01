import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; //no matter what line 3 comes back error in parcel build, even when changing the line


export const MovieCard = ({ movie }) => {
  return (
    <Card className="my-3" bg="secondary" border="Light">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="Dark">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};


MovieCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
    director: propTypes.shape({
      Name: propTypes.string
    }),
    image: propTypes.string,
  }).isRequired
};

// onClick={() => onMovieClick(movie)}