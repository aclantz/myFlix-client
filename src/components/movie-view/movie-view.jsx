import propTypes from "prop-types";
import { Button, Row, Col } from "react-bootstrap";

//do the connection points need to capitalized if they are on the api? yes?
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <Row>
        <Col md={5}>
          <div>
            <img src={movie.image} width="400" />
          </div>
        </Col>
        <Col md={6}>
          <div>
            <h5>
              Title: <span>{movie.title}</span>
            </h5>
          </div>
          <br />
          <div>
            <h6>Description:</h6>
            <span>{movie.description}</span>
          </div>
          <br />
          <div>
            <h5>
              Director: <span>{movie.director.Name}</span>
            </h5>
          </div>
          <br />
          <div>
            <h6>Bio:</h6>
            <span>{movie.director.Bio}</span>
          </div>
          <br />
          <div>
            <h5>
              Genre: <span>{movie.genre.Name}</span>
            </h5>
          </div>
          <br />
          <div>
            <h6>Description:</h6>
            <span>{movie.genre.Description}</span>
          </div>
          <br />
          <Button onClick={onBackClick}>Back</Button>
        </Col>
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
  }),
  onBackClick: propTypes.func.isRequired,
};
