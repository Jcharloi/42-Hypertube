import mongoose from "../mongo";

const commentSchema = new mongoose.Schema({
  _id: String,
  movieId: {
    commentId: String,
    name: { type: String, required: true },
    month: { type: String, required: true },
    day: { type: String, required: true },
    year: { type: String, required: true },
    stars: { type: Number, minLength: 0, maxLength: 5, required: true },
    body: { type: String, maxLength: 250, required: true }
  }
});

const MovieCommentModel = mongoose.model("Comments", commentSchema);

export default MovieCommentModel;
