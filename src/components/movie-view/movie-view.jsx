import propTypes from "prop-types";

//do the connection points need to capitalized if they are on the api? yes?
export const MovieView = ({ movie, onBackClick }) => {


  
  return (
    <div>
      <div>
        <img src={movie.image} width="400" />
      </div>
      <div>
        <span>Title:</span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director:</span>
        <span>{movie.director.Name}</span>
      </div>
      <div>
        <span>Bio:</span>
        <span>{movie.director.Bio}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.Name}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.genre.Description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
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
