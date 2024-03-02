import propTypes from "prop-types";
import { Button, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, addFavMovie, removeFavMovie }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);


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
          <Col md={1} >
          <Link to="/">
            <Button variant="Primary" className="my-5">Back</Button>
          </Link>
          <Button onClick={addFavMovie}>Favorite</Button>
        </Col>
      </Row>
      <Row>
        Similar Movies
      </Row>
    </div>
  );
};

// MovieView.propTypes = {
//   movie: propTypes.shape({
//     imagePath: propTypes.string,
//     title: propTypes.string.isRequired,
//     description: propTypes.string.isRequired,
//     genre: propTypes.shape({
//       Name: propTypes.string.isRequired,
//       Description: propTypes.string,
//     }),
//     director: propTypes.shape({
//       Name: propTypes.string.isRequired,
//       Bio: propTypes.string,
//     }),
//   })
// 
// };
