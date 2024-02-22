import propTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.Title}
    </div>
  );
};


MovieCard.propTypes = {
  movie: propTypes.shape({
    title: propTypes.string.isRequired,
  }).isRequired,
  onMovieClick: propTypes.func.isRequired
};