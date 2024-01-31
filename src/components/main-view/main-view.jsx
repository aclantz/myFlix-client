import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Dark Knight",
      description:
        "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice..",
      genre: {
        name: "Action",
        description:
          "Action films are a film genre where the protagonist or protagonists find themselves in a series of challenges that typically include violence, extended fighting, physical feats, and frantic chases.",
      },
      director: {
        name: "Christopher Nolan",
        bio: "Christopher Edward Nolan is a British-American film director, producer, and screenwriter.",
        birth: "1970",
      },
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      actors: ["Christian Bale", "Heath Ledger"],
      featured: true,
    },
    {
      id: 2,
      title: "Pulp Fiction",
      description:
        "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      genre: {
        name: "Crime",
        description:
          "Crime films are films that focus on the lives of criminals.",
      },
      director: {
        name: "Quentin Tarantino",
        bio: "Quentin Jerome Tarantino is an American film director, producer, screenwriter, and actor.",
        birth: "1963",
      },
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      actors: ["John Travolta", "Samuel L. Jackson"],
      featured: true,
    },
    {
      id: 3,
      title: "Forrest Gump",
      description:
        "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
      genre: {
        name: "Drama",
        description:
          "Drama films are a genre of narrative fiction intended to be more serious than humorous in tone, focusing on in-depth development of realistic characters who must deal with realistic emotional struggles.",
      },
      director: {
        name: "Robert Zemeckis",
        bio: "Robert Lee Zemeckis is an American film director, producer, and screenwriter.",
        birth: "1951",
      },
      imagePath:
        "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      actors: ["Tom Hanks", "Robin Wright"],
      featured: true,
    },
  ]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

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
