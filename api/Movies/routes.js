const express = require("express");
const { getMovies, addMovie, deleteMovie } = require("./controllers");
const {
  imageConditional,
} = require("../../middlewares/Images/imageConditional");
const router = express.Router();
const passport = require("passport");
const upload = require("../../middlewares/Images/uploader");

router.get("/", getMovies);
router.post(
  "/add-movie",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  imageConditional,
  addMovie
);
router.post(
  "/:movieId/delete-movie",
  passport.authenticate("jwt", { session: false }),
  deleteMovie
);

module.exports = router;
