import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieList.module.css";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg5ZWI1Y2FmNTFiY2UwZTNiODE5OTU1NjZhNmIxYyIsIm5iZiI6MTczMjU4MTA0NC45MDMxNDcyLCJzdWIiOiI2NzQ1MTIwMGQ4ZGI3ZGQxYmE0NWE1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Oi5Y2So8P2fVSM1c9srA04JCJx59AzvNbe5CWC0v8yE";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}/credits`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });

        console.log(response);

        setCast(response.data.cast);
      } catch (err) {
        setError("Failed to fetch cast information.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);


  if (loading) return <Loader />;
  if (error) return <p className={s.error}>{error}</p>;
  if (cast.length === 0) return <p>No cast information available.</p>;

  return (
    <ul className={s.list}>
      {cast.map((actor) => (
        <li key={actor.id} className={s.item}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : "https://via.placeholder.com/200x300?text=No+Image"
            }
            alt={actor.name}
            className={s.image}
          />
          <p className={s.name}>{actor.name}</p>
          <p className={s.character}>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;