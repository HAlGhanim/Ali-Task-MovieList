const User = require("../../models/User");
const Movie = require("../../models/Movie");

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
    return next(error);
  }
};
exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    await Movie.deleteOne(movieId);
    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
};
