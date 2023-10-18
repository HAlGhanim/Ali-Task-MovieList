const express = require("express");
const {
  getMovies,
  addMovie,
  deleteMovie,
  fetchMovie,
  addMovieToWatchlist,
} = require("./controllers");
const {
  imageConditional,
} = require("../../middlewares/Images/imageConditional");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/Images/uploader");

router.param("movieId", async (req, res, next, movieId) => {
  try {
    const foundMovie = await fetchMovie(movieId);
    if (!foundMovie) return next({ status: 404, message: "Movie not found" });
    req.movie = foundMovie;
    next();
  } catch (error) {
    return next(error);
  }
});

router.get("/", getMovies);
router.post(
  "/add-movie",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  addMovie
);
router.post(
  "/:movieId",
  passport.authenticate("jwt", { session: false }),
  deleteMovie
);

router.post(
  "/:movieId/add-to-watchlist",
  passport.authenticate("jwt", { session: false }),
  addMovieToWatchlist
);

module.exports = router;
