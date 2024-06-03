/* eslint-disable */
import { useEffect, useState, useRef } from "react";
import { useFilm } from "./useFilm";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function NavSearch({ onSetQuery, query }) {
  const elRef = useRef(null);
  useEffect(function () {
    elRef.current.focus();
    function callBack(e) {
      if (e.code === "Enter") {
        elRef.current.focus();
        onSetQuery("");
      }
    }
    document.addEventListener("keydown", callBack);
    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, []);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={elRef}
    />
  );
}
function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies?.length || "0"}</strong> results
    </p>
  );
}
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}
function ListOfMovie({ movie, onHandelSelectMovie }) {
  return (
    <li
      key={movie.imdbID}
      onClick={() => onHandelSelectMovie(movie.imdbID)}
      style={{ cursor: "pointer" }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
function MovieLists({ onHandelSelectMovie, movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <ListOfMovie
          movie={movie}
          key={movie.imdbID}
          onHandelSelectMovie={onHandelSelectMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  );
}

function AlistOfWatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button onClick={() => onDeleteWatchedMovie(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}

function WatchedMovieLists({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <AlistOfWatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovies({ watched, onDeleteWatchedMovie }) {
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <WatchedMovieSummary watched={watched} />
      </div>
      <WatchedMovieLists
        watched={watched}
        onDeleteWatchedMovie={onDeleteWatchedMovie}
      />
    </>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

//  `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
export default function App() {
  const [selectMovieImdbID, setSelectMovieImdbID] = useState(0);
  const [query, setQuery] = useState("");
  const { isLoading, movies } = useFilm(query);

  const [watched, setWatched] = useState(function () {
    const getStoredWatched = localStorage.getItem("watched");
    return getStoredWatched ? JSON.parse(getStoredWatched) : [];
  });

  const isInWatchedList = watched.some(
    (mov) => mov.imdbID === selectMovieImdbID
  );

  function handelSelectMovie(imdbID) {
    setSelectMovieImdbID(imdbID);
  }

  function AddToWatchedList(movie) {
    setWatched((watchedMovies) => [
      ...watchedMovies,
      { ...movie, runtime: 140, imdbRating: 5, userRating: 10 },
    ]);
    setSelectMovieImdbID(0);
  }

  function deleteWatchedMovie(imdbID) {
    setWatched((watchedMovies) =>
      watchedMovies.filter((mov) => mov.imdbID !== imdbID)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <NavSearch onSetQuery={setQuery} query={query} />
        <NumResult movies={movies} />
      </Navbar>
      <main className="main">
        <Box>
          {isLoading ? (
            <h1>Loading....</h1>
          ) : (
            <MovieLists
              onHandelSelectMovie={handelSelectMovie}
              movies={movies}
            />
          )}
        </Box>

        <Box>
          {selectMovieImdbID ? (
            <button onClick={() => setSelectMovieImdbID(0)}>Close</button>
          ) : (
            ""
          )}
          {selectMovieImdbID ? (
            <SelectedMovieDetails
              imdbID={selectMovieImdbID}
              movies={movies}
              onAddToWatchedList={AddToWatchedList}
              isInWatchedList={isInWatchedList}
              onSetSelectMovieImdbID={setSelectMovieImdbID}
            />
          ) : (
            <WatchedMovies
              watched={watched}
              onDeleteWatchedMovie={deleteWatchedMovie}
            />
          )}
        </Box>
      </main>
    </>
  );
}

function SelectedMovieDetails({
  imdbID,
  movies,
  onAddToWatchedList,
  isInWatchedList,
  onSetSelectMovieImdbID,
}) {
  const selectedMovie = movies.find((movie) => movie.imdbID === imdbID);
  useEffect(
    function () {
      document.title = `Movie | ${selectedMovie.Title}`;
      console.log("Hello");
      return function () {
        document.title = "usePopcorn";
        console.log(
          `This function will be called when ${selectedMovie.Title} is unmount`
        );
        console.log(selectedMovie);
      };
    },
    [selectedMovie.Title]
  );

  useEffect(
    function () {
      console.log("ESCPAED OUTSide");
      function callBack(e) {
        if (e.code === "Escape") {
          onSetSelectMovieImdbID(0);
        }
        console.log("ESCPAED");
      }
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [onSetSelectMovieImdbID]
  );

  return (
    <div>
      {`${selectedMovie.imdbID}: ${selectedMovie.Title}`}
      {isInWatchedList ? (
        "Already In List"
      ) : (
        <button onClick={() => onAddToWatchedList(selectedMovie)}>
          Add List
        </button>
      )}
    </div>
  );
}
