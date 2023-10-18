const { model, Schema, Types } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  watchlist: [
    {
      movie: { type: Schema.Types.ObjectId, ref: "Movie" },
      watched: { type: Boolean, default: false },
    },
  ],
  password: { type: String, required: true },
});

module.exports = model("User", UserSchema);
