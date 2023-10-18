const User = require("../../models/User");
const Movie = require("../../models/Movie");
const generateToken = require("../../utils/auth/generateToken");

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = generateToken(req.user);
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

exports.MarkAsWatched = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const user = await User.findById(req.user._id);
    const movieIndex = user.watchlist.findIndex((item) =>
      item.movie.equals(movieId)
    );
    user.watchlist[movieIndex].watched = !user.watchlist[movieIndex].watched;
    await user.save();
    return res.status(200).json(user.watchlist);
  } catch (error) {
    return next(error);
  }
};

exports.searchMoviesInList = async (req, res, next) => {
  try {
    const { query } = req.query;
    const user = await User.findById(req.user._id);
    const matchingMovies = user.watchlist.filter((item) =>
      item.movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return res.status(200).json(matchingMovies);
  } catch (error) {
    return next(error);
  }
};

exports.getWatchedMovies = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const watchedMovies = user.watchlist.filter((item) => item.watched);
    return res.status(200).json(watchedMovies);
  } catch (error) {
    return next(error);
  }
};

exports.getCountOfMoviesInList = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const movieCount = user.watchlist.length;
    return res.status(200).json({ count: movieCount });
  } catch (error) {
    return next(error);
  }
};
