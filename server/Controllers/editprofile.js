import UserModel from "../Schemas/User";
import MovieCommentModel from "../Schemas/Movie";

const editUserInfo = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  try {
    // findByIdAndUpdate(id, req.body, {runValidators: true})
    const userInfo = await UserModel.findById(id);
    if (userInfo === null) {
      res.status(404).send();
    } else {
      console.log(userInfo);
      console.log("Ok Userinfo");
      if (req.body.firstName) userInfo.firstName = req.body.firstName;
      if (req.body.lastName) userInfo.lastName = req.body.lastName;
      if (req.body.userame) userInfo.username = req.body.userame;
      if (req.body.email) userInfo.email = req.body.email;
      await userInfo.save();
      res.status(200).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { editUserInfo };
