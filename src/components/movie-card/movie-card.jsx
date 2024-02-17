import propTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}>
      {movie.title}
    </div>
  );
};


MovieCard.propTypes = {
  movies: propTypes.shape({
    title: propTypes.string.isRequired,
  }).isRequired,
  onMoviesClick: propTypes.func.isRequired
};