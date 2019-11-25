import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
  _id: String,
  email: { type: String, maxlength: 100, required: true },
  username: { type: String, maxlength: 30, required: true },
  firstName: { type: String, maxlength: 30, required: true },
  lastName: { type: String, maxlength: 30, required: true },
  password: { type: String, maxlength: 1028, required: true },
  picture: { type: String, required: true }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
