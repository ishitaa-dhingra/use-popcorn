import { useState, useEffect } from "react";

const KEY = "e7c6ce1b";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const Controller = new AbortController();
      async function fetchMovies() {
        try {
          setisLoading(true);

          setError(""); // before fetching data error should always be reset

          const res = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
            { signal: Controller.signal } //Browser Api used to abort fetching data when a new key pressed or new character added to prevent race condition
          );
          if (!res.ok)
            throw new Error("Something went wrong when fetching movies"); // when the the api key is wrong  then this prints

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movies not found");

          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err.message);
            setError(err.message);
          }
        } finally {
          setisLoading(false);
        }
        // .then((res) => res.json())
        // .then((data) => setMovies(data.Search || []));
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      // handleCloseMovie();
      fetchMovies();

      return function () {
        Controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
