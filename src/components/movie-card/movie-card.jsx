import propTypes from "prop-types";
import Card  from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} className="my-3 bg-secondary">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
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
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};