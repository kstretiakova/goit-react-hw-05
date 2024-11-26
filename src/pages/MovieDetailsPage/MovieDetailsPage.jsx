import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg5ZWI1Y2FmNTFiY2UwZTNiODE5OTU1NjZhNmIxYyIsIm5iZiI6MTczMjU4MDE4OC41MDA0NTcsInN1YiI6IjY3NDUxMjAwZDhkYjdkZDFiYTQ1YTU1OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZBPIFaW8OQQguvP36TqfNMN-LkQEbPpX8V--wypQqN8";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Failed to fetch movie details.");
        console.error(err);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  // Створення посилання "Назад" з використанням useRef
  const goBackLink = useRef(location.state?.from ?? "/");

  if (error) return <p className={s.error}>{error}</p>;
  if (!movie) return <Loader />;

  return (
    <div className={s.container}>
      <Link to={goBackLink.current} className={s.backLink}>
        Go back
      </Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className={s.poster}
      />
      <div className={s.additional}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;