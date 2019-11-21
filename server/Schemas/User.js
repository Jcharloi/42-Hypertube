import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
  _id: String,
  mail: { type: String, maxlength: 100 },
  userName: { type: String, maxlength: 30 },
  firstName: { type: String, maxlength: 30 },
  lastName: { type: String, maxlength: 30 },
  password: { type: String, maxlength: 1028 },
  picture: String
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
