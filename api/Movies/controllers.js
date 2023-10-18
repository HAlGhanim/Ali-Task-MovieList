const User = require("../../models/User");
const Movie = require("../../models/Movie");

exports.fetchMovie = async (movieId, next) => {
  try {
    const foundMovie = await Movie.findById(movieId);
    return foundMovie;
  } catch (error) {
    return next(error);
  }
};

exports.addMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return next(error);
  }
};
exports.getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find().select("-__v");
    return res.status(200).json(movies);
  } catch (error) {
    return next();
  }
};
exports.deleteMovie = async (req, res, next) => {
  try {
    await req.movie.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

exports.addMovieToWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.user._id);
    const movie = await Movie.findById(movieId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    const alreadyAdded = user.watchlist.some((item) =>
      item.movie.equals(movieId)
    );
    if (alreadyAdded) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }
    user.watchlist.push({ movie: movieId, watched: false });
    await user.save();
    return res.status(201).json(user.watchlist);
  } catch (error) {
    return next(error);
  }
};
