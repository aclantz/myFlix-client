import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            description: movie.Description,
            director: movie.Director,
            genre: movie.Genre,
            actors: movie.Actors,
            image: movie.ImagePath,
            featured: movie.Featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    console.log("User:", user);
    console.log("Token:", token);
    return (
      <>
        <h2>Login</h2>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <hr />
        <h2>Sign Up</h2>
        <SignUpView />
      </>
    );
  }

  //Single movie view
  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        selectedMovie.genre.Name === movie,
        genre.Name && selectedMovie.id !== movie.id
      );
    });
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
          );
        })}
      </>
    );
  }

  //if array is empty
  if (movies.length === 0) {
    return (
      <div>
        The list is empty.
        <hr />
        <button
          onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}>
          Log-out
        </button>
      </div>
    );
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
      )})}
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </button>
    </div>
  );
};
