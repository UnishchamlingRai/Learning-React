import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovie } from "./useMovie";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

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

const key = "ee82d78";
// http://www.omdbapi.com/?i=tt3896198&apikey=ee82d78&s=abc

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setselectedMovieId] = useState("");
  const { movies, isLoading, iserror } = useMovie(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handelSelectedMovieId(movieId) {
    setselectedMovieId((id) => (movieId === id ? null : movieId));
  }

  function handelCloseMovie() {
    setselectedMovieId(null);
  }
  function handelSetWatchedMovie(movie) {
    setWatched((WatchedMovie) => [...WatchedMovie, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handelDeleteWatched(watchedMovieId) {
    setWatched((movies) =>
      movies.filter((movie) => movie.imdbID !== watchedMovieId)
    );
  }

  return (
    <>
      <Navbar>
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading ? (
            <Loading />
          ) : iserror ? (
            <ErrorMessage err={iserror} />
          ) : (
            <MoviesList
              movies={movies}
              onSelectedMovieId={handelSelectedMovieId}
            />
          )}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetails
              selectedMovieId={selectedMovieId}
              onCloseMovie={handelCloseMovie}
              onSetWatchedMovie={handelSetWatchedMovie}
              watched={watched}
              key={selectedMovieId}
            />
          ) : (
            <>
              {" "}
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handelDeleteWatched}
              />
            </>
          )}
        </Box>

        {/* <WatchedBox /> */}
      </Main>
    </>
  );
}
function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onSetWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);
  const watchedMovieRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  // console.log("isWatched:", isWatched);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  //why we shold not use hooks in conditional statement
  // if (imdbRating > 8) {
  //   const [isTop, setIsTop] = useState(true);
  // }
  // if (imdbRating > 8) return <p>Hello hooks</p>;

  // const [isTop, setIsTop] = useState(imdbRating > 8);
  // console.log(isTop);
  // useEffect(
  //   function () {
  //     setIsTop(imdbRating > 8);
  //   },
  //   [imdbRating]
  // );
  // const isTop = imdbRating > 8;
  // console.log(isTop);
  // const [calAverage, setCalAverage] = useState(0);

  function handelAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      userRatingDesition: countRef.current,
    };
    onSetWatchedMovie(newWatchedMovie);
    // setCalAverage(Number(imdbRating));
    // setCalAverage((a) => (a + userRating) / 2);
    // alert(calAverage);
    onCloseMovie();
  }
  useEffect(
    function () {
      if (userRating) {
        countRef.current = countRef.current + 1;
      }
    },
    [userRating]
  );
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setIsLoading(false);
        setMovie(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [selectedMovieId]); // Empty dependency array to run the effect only once when the component mounts

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie:${title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log(`Clean up Effect for movie: ${movie.imdbRating}`);
      };
    },

    [title]
  );
  useKey("keydown", "Escape", onCloseMovie);
  // OR
  // THIS
  /*useEffect(function () {
    function callBack(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, []);
  console.log("Render ho");
  */
  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="yellow"
                    onhandelRating={setUserRating}
                  />
                  {userRating > 0 ? (
                    <button className="btn-add" onClick={handelAddMovie}>
                      Add to List
                    </button>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <p>You Rated this movie with {watchedMovieRating} ⭐️</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function Loading() {
  return <p className="loader">Loading....</p>;
}
function ErrorMessage({ err }) {
  return <p className="error">{err}</p>;
}

function Box({ children }) {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      {isOpen1 && children}
    </div>
  );
}

function Navbar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />

        {children}
      </nav>
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search({ query, onSetQuery }) {
  const inputEl = useRef(null);
  useKey("keydown", "Enter", function () {
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    onSetQuery("");
  });
  // useEffect(function () {
  //   document.querySelector(".search").focus();
  // }, []);
  /*
  useEffect(function () {
    function callBack(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        inputEl.current.focus();
        onSetQuery("");
        console.log("hello");
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, []);
  */

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ movies }) {
  return (
    <nav className="nav-bar">
      <p className="num-results">
        Found <strong>{movies.length}</strong> results
      </p>
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MoviesList({ movies, onSelectedMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovieId={onSelectedMovieId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovieId }) {
  // console.log(selectedMovieId);
  return (
    <li onClick={() => onSelectedMovieId(movie.imdbID)}>
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

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
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
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
