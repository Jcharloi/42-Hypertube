import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
  _id: String,
  mail: String,
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  picture: String
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
