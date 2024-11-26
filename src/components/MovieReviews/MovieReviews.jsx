import { useEffect, useState } from "react";
import axios from "axios";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const API_URL = "https://api.themoviedb.org/3/movie";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNDg5ZWI1Y2FmNTFiY2UwZTNiODE5OTU1NjZhNmIxYyIsIm5iZiI6MTczMjU4MTA0NC45MDMxNDcyLCJzdWIiOiI2NzQ1MTIwMGQ4ZGI3ZGQxYmE0NWE1NTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Oi5Y2So8P2fVSM1c9srA04JCJx59AzvNbe5CWC0v8yE";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${API_URL}/${movieId}/reviews`, {
          headers: { Authorization: `Bearer ${TOKEN}` },
        });
        setReviews(response.data.results);
      } catch (err) {
        setError("Failed to fetch reviews.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p className={s.error}>{error}</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={s.list}>
      {reviews.map((review) => (
        <li key={review.id} className={s.item}>
          <h3 className={s.author}>Author: {review.author}</h3>
          <p className={s.content}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;