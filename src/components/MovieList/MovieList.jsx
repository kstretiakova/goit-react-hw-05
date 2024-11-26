import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList = ({ movies }) => {
  const location = useLocation(); 

  if (movies.length === 0) {
    return (
      <p className={s.noMovies}>No movies found. Try a different search!</p>
    );
  }

  return (
    <ul className={s.list}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={s.listItem}>
          <Link
            to={`/movies/${id}`}
            state={{ from: location }} 
            className={s.movieLink}
          >
            {poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${poster_path}`}
                alt={title}
                className={s.poster}
              />
            ) : (
              <div className={s.noPoster}>No Image</div>
            )}
            <h2 className={s.title}>{title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;