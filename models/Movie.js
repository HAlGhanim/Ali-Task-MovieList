const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  title: { type: String },
  realeaseDate: { type: Date },
});

module.exports = model("Movie", MovieSchema);
