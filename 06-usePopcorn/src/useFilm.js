import { useState, useEffect } from "react";
const key = "ee82d78";
export function useFilm(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(
    function () {
      const controller = new AbortController();
      async function dataFetch() {
        try {
          setIsLoading(true);
          let data = await fetch(
            `http://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );
          data = await data.json();
          setMovies(data.Search);
        } catch (error) {
          console.log("ERrRo on Fetching");
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        return;
      }
      dataFetch();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { isLoading, movies };
}
