import { useEffect, useState } from "react";
import StarRating from "./StarRating";

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
// `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}` For Search
//`http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}` For One

const key = "ee82d78";

function Loader() {
  return <p className="loader">Loading.....</p>;
}
function MessageError({ errMsg }) {
  return <p className="error">{errMsg}</p>;
}
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [query, setQuery] = useState("abc");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("tt8259022");
  function handelSelectMovieId(id) {
    setSelectedMovieId((oldId) => (oldId === id ? null : id));
  }
  function onCloseMovie() {
    setSelectedMovieId("");
  }

  function handelAddWatchedMovie(movie) {
    setWatched((watchedMovie) => [...watchedMovie, movie]);
  }
  function handelDeleteWatchedMovie(id) {
    setWatched((watchedMovies) =>
      watchedMovies.filter((movie) => movie.imdbID !== id)
    );
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          setErrorMessage("");
          setIsLoading(true);
          let res = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            {
              signal: controller.signal,
            }
          );
          res = await res.json();
          if (res.Response === "False") {
            throw new Error("Movie not found");
          }
          setIsLoading(false);
          setMovies(res.Search);
        } catch (error) {
          setIsLoading(false);
          setErrorMessage(error.message);
          setMovies([]);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchData();
      return function () {
        // controller.abort();
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Logo />
        <SearchInput onSetQuery={setQuery} query={query} />
        <NumResult movies={movies} />
      </Navbar>

      <Main movies={movies} watched={watched}>
        <Box movies={movies}>
          {/* {errorMessage ? <MessageError errMsg={errorMessage} /> : ""} */}
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <MessageError errMsg={errorMessage} />
          ) : (
            <MoviesList movies={movies} onSelectMovieId={handelSelectMovieId} />
          )}
        </Box>

        <Box watched={watched}>
          {selectedMovieId ? (
            <MovieDetails
              watched={watched}
              key={selectedMovieId}
              selectedMovieId={selectedMovieId}
              onCloseMovie={onCloseMovie}
              onAddWatchedMovie={handelAddWatchedMovie}
            />
          ) : (
            <>
              <SummeryOfWatchedMovie watched={watched} />
              <ListOfWatchedMovie
                watched={watched}
                onDeleteWatchedMovie={handelDeleteWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function MovieDetails({
  selectedMovieId,
  onCloseMovie,
  onAddWatchedMovie,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  const userWatchedRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  );

  function handelAddMovie() {
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  }

  //   console.log(movie);
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

  useEffect(
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);
          let res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
          );

          if (!res.ok) {
            throw new Error("Not Internte to Fetch data");
          }
          res = await res.json();
          setMovie(res);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    },
    [selectedMovieId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `usePopcorn: ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
        console.log("close");
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
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
              {isWatched ? (
                <p>You already rated with {userWatchedRating.userRating} ⭐️</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    color="yellow"
                    onhandelRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handelAddMovie}>
                      Add to List
                    </button>
                  )}
                </>
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

//Main
function Main({ children }) {
  return <main className="main">{children}</main>;
}
//Main

//\\\\\\\\\\MovieList\\\\\\\\\\\\\\\\\
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

function MoviesList({ movies, onSelectMovieId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onSelectMovieId={onSelectMovieId}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, onSelectMovieId }) {
  //   console.log(selectedMovieId);
  return (
    <li onClick={() => onSelectMovieId(movie.imdbID)}>
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

//\\\\\\\\\\MovieList\\\\\\\\\\\\\\\\\
//\\\\\\\\\\WatchedMovei\\\\\\\\\\\\\\\\\

function SummeryOfWatchedMovie({ watched }) {
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function ListOfWatchedMovie({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatchedMovie={onDeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatchedMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
//\\\\\\\\\\WatchedMovei\\\\\\\\\\\\\\\\\

////Navbar

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchInput({ onSetQuery, query }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onSetQuery(e.target.value)}
    />
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

////Navbar

/*

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
              
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>



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
*/
