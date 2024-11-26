import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./components/Navigation/Navigation";
import "./App.css";
import Loader from "./components/Loader/Loader";


const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/movies" element={<MoviesPage />}></Route>
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;