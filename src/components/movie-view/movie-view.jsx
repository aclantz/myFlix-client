import propTypes from "prop-types";

//do the connection points need to capitalized if they are on the api? yes?
export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} width="400" />
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
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Bio:</span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Genre:</span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Description:</span>
        <span>{movie.genre.description}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};


MovieView.prototype = {
  movie: propTypes.shape({
    imagePath: propTypes.string,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    genre: propTypes.shape({
      name: propTypes.string.isRequired,
      description: propTypes.string
    }),
    director: propTypes.shape({
      name: propTypes.string.isRequired,
      bio: propTypes.string
    }) 
  }),
  onBackClick: propTypes.func.isRequired
}