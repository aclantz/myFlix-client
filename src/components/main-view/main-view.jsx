import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies", {
      header: { Authorization: "Bearer ${token}" },
    })
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
  }, [token]);

  if (!user) {
    return (
     <>
     <h2>Login</h2>
      <loginView
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
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

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
