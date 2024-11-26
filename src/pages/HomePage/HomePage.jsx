import { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/trending/movie/day";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg5ZWI1Y2FmNTFiY2UwZTNiODE5OTU1NjZhNmIxYyIsIm5iZiI6MTczMjU4MTA0NC45MDMxNDcyLCJzdWIiOiI2NzQ1MTIwMGQ4ZGI3ZGQxYmE0NWE1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Oi5Y2So8P2fVSM1c9srA04JCJx59AzvNbe5CWC0v8yE";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {movies.length > 0 ? <MovieList movies={movies} /> : <Loader />}
    </div>
  );
};

export default HomePage;