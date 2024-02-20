import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc.id,
            title: doc.Title,
            director: doc.Director.Name,
          };
        });
        setMovies(moviesFromApi);
      });
  }, []);

  //with bonus task 2 section 3.4
  if (selectedMovie) {
    let similarMovies = movies.filter(movie.genre)
    return (
      <>
       <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
      <hr />
      <h2>Similar Movies</h2>
      {similarMovies.map((movie) => {   
        return (
          <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        )

      })}
    </>
  )};

  //if array is empty
  if (movies.length === 0) {
    return <div>The list is empty.</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
