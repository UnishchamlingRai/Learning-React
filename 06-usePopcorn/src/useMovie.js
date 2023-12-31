import { useEffect, useState } from "react";

const key = "ee82d78";
export function useMovie(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iserror, setError] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchData() {
        try {
          setIsLoading(true);
          let data = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            {
              signal: controller.signal,
            }
          );

          if (!data.ok) throw new Error("Fetch Data fail!");

          data = await data.json();

          if (data.Response === "False") throw new Error("Movie Not Found");

          setMovies(data.Search);
          setError("");
        } catch (error) {
          console.log("Error:", error);
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setError("");
        setMovies([]);
        return;
      }
      fetchData();
      //   handelCloseMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, iserror };
}
