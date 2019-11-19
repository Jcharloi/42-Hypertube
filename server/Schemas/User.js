import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
  mail: String,
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
  picturePath: String
});
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
