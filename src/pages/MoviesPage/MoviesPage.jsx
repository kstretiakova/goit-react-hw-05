import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg5ZWI1Y2FmNTFiY2UwZTNiODE5OTU1NjZhNmIxYyIsIm5iZiI6MTczMjU4MTA0NC45MDMxNDcyLCJzdWIiOiI2NzQ1MTIwMGQ4ZGI3ZGQxYmE0NWE1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Oi5Y2So8P2fVSM1c9srA04JCJx59AzvNbe5CWC0v8yE";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}`, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: {
            query,
          },
        });

        setMovies(response.data.results);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const inputValue = form.elements.query.value.trim();

    if (inputValue) {
      setSearchParams({ query: inputValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={s.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={s.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={s.input}
          placeholder="Enter movie title..."
        />
        <button type="submit" className={s.button} disabled={loading}>
          Search
        </button>
      </form>
      {loading && <Loader />}
      {error && <p className={s.error}>{error}</p>}
      {/* Список фільмів */}
      {movies.length > 0 && <MovieList movies={movies} query={query} />}
    </div>
  );
};

export default MoviesPage;