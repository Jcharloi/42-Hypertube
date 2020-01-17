import mongoose from "../mongo";

const commentSchema = new mongoose.Schema({
  _id: String,
  movieId: { type: String, required: true },
  movieName: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Number, required: true },
  stars: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  body: { type: String, required: true }
});

const userHistory = new mongoose.Schema({
  _id: String,
  userId: { type: String, required: true },
  movieId: { type: String, required: true },
  movieName: { type: String, required: true },
  date: { type: Number, required: true }
});

const MovieCommentModel = mongoose.model("movieComments", commentSchema);
const UserHistoryModel = mongoose.model("userHistory", userHistory);

export default { MovieCommentModel, UserHistoryModel };
