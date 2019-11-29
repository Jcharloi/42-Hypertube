import mongoose from "../mongo";

const userSchema = new mongoose.Schema({
  _id: String,
  googleId: { type: String, required: false },
  mail: { type: String, maxlength: 100, required: true },
  verifiedMail: { type: Boolean, required: true },
  userName: { type: String, maxlength: 30, required: true },
  firstName: { type: String, maxlength: 30, required: true },
  lastName: { type: String, maxlength: 30, required: true },
  password: { type: String, maxlength: 1028 },
  picture: String
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
