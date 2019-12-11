import mongoose from "../mongo";

const commentSchema = new mongoose.Schema({
  _id: String,
  movieId: { type: String, required: true },
  name: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  year: { type: String, required: true },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  body: { type: String, required: true }
});

const MovieCommentModel = mongoose.model("movieComments", commentSchema);

export default MovieCommentModel;
