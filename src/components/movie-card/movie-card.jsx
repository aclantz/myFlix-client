import propTypes from "prop-types";
import Card  from "react-bootstrap/Card";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card onClick={() => onMovieClick(movie)} className="my-3">
      <Card.Img variant="top" src={movie.ImagePath} />
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
    director: propTypes.string,
    ImagePath: propTypes.string,
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};