import UserModel from "../Schemas/User";
import MovieCommentModel from "../Schemas/Movie";

const editUserInfo = async (req, res) => {
  const id = req.body.userId;
  console.log(id);
  try {
    const userInfo = await UserModel.findById(id);
    if (userInfo === null) {
      res.status(404).send();
    } else {
      console.log(userInfo);
      console.log("Ok Userinfo");
      userInfo.firstName = "Abdel";
      await userInfo.save();
      res.status(200).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { editUserInfo };
