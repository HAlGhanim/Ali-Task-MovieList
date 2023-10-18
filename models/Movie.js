const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
});

module.exports = model("Movie", MovieSchema);
