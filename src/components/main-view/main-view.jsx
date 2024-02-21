import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
<<<<<<< Updated upstream
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const storedToken = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem("user"));
=======
  const [user, setUser] = useState(null);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    return (
      <loginView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }}
      />
    );
  }

  //Single movie view
  if (selectedMovie) {
    return (
=======
    return <LoginView onLoggedIn={(user) => setUser(user)} />
  }
  

  if (selectedMovie) {
    return (
>>>>>>> Stashed changes
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }
<<<<<<< Updated upstream
=======

  //bonus task 2 section 3.4
  // if (selectedMovie) {
  //   let similarMovies = movies.filter(movie.genre)
  //   return (
  //     <>
  //      <MovieView
  //       movie={selectedMovie}
  //       onBackClick={() => setSelectedMovie(null)}
  //     />
  //     <hr />
  //     <h2>Similar Movies</h2>
  //     {similarMovies.map((movie) => {   
  //       return (
  //         <MovieCard
  //         key={movie.id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //       )

  //     })}
  //   </>
  // )};
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      <button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}>
        Logout
      </button>
=======
      <button onClick={() => { setUser(null); }}>Logout</button>
>>>>>>> Stashed changes
    </div>
  );
};
