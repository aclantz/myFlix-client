import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"; 


export const MovieCard = ({ movie }) => {
  return (
    <Card className="my-3" bg="secondary">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} role="button">
          <Button type="button">
            Open
          </Button>
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

