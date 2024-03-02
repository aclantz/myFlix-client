import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignUpView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [user, setUser] = useState(storedUser ? storedUser : null);

  let favMovies = movies.filter(m => user.favoriteMovies.includes(m._id));


  //Return Movies Array
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

  const addFavMovie = (movie) => {
    fetch(`https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies/${movie.id}`, {
      method: "PUT",
      headers: { Authentication: `Bearer ${token}`},
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("failed to add to favMovies");
      }
    }).then((user) => {
      if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.log(error)
    }) 
  };

  const removeFavMovie = (movie) => {
    fetch(`https://movie-api-project24-2fb853d4fde0.herokuapp.com/movies/${movie.id}`, {
      method: "DELETE",
      headers: { Authentication: `Bearer ${token}`},
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("failed to add to favMovies");
      }
    }).then((user) => {
      if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    }).catch(error => {
      console.log(error)
    }) 
  }


  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          storageClear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUpView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      user={user}
                      token={token}
                      setUser={setUser}
                      favMovies={favMovies}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
//old code for reference
// if (!user) {
//   console.log("User:", user);
//   console.log("Token:", token);
//   return (
//     <Row className="justify-content-md-center">
//       <Col md={5}>
//         <LoginView
//           onLoggedIn={(user, token) => {
//             setUser(user);
//             setToken(token);
//           }}
//         />
//         <br />
//         <SignUpView />
//       </Col>
//     </Row>
//   );
// }

// if (selectedMovie) {
//   let similarMovies = movies.filter((movie) => {
//     return (
//       selectedMovie.genre.Name === movie.genre.Name &&
//       selectedMovie.id !== movie.id
//     );
//   });
//   return (
//     <>
//       <Row className="justify-content-md-center">
//         <Col md={10}>
//           <MovieView
//             movie={selectedMovie}
//             onBackClick={() => setSelectedMovie(null)}
//           />
//         </Col>
//       </Row>
//       <hr className="my-3" />
//       <h2>Similar Movies</h2>
//       <Row>
//         {similarMovies.map((movie) => {
//           return (
//             <Col md={3} lg={4} key={movie.id}>
//               <MovieCard
//                 key={movie.id}
//                 movie={movie}
//                 onMovieClick={(newSelectedMovie) => {
//                   setSelectedMovie(newSelectedMovie);
//                 }}
//               />
//             </Col>
//           );
//         })}
//       </Row>
//     </>
//   );
// }

// if (movies.length === 0) {
//   return (
//     <Row>
//       <Col md={8}>
//         The list is empty.
//         <hr />
//         <Button
//           onClick={() => {
//             setUser(null);
//             setToken(null);
//             localStorage.clear();
//           }}>
//           Log-out
//         </Button>
//       </Col>
//     </Row>
//   );
// }

// return (
//   <Row className="justify-content-md-center">
//     {movies.map((movie) => (
//       <Col md={6} lg={4} key={movie.id}>
//         <MovieCard
//           movie={movie}
//           onMovieClick={(newSelectedMovie) => {
//             setSelectedMovie(newSelectedMovie);
//           }}
//         />
//       </Col>
//     ))}
//     <hr className="my-3" />
//     <Button
//       className="my-5 w-25"
//       md={1}
//       onClick={() => {
//         setUser(null);
//         setToken(null);
//         localStorage.clear();
//       }}>
//       Logout
//     </Button>
//   </Row>
// );
// };
