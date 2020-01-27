import UserModel from "../Schemas/User";
import MovieCommentModel from "../Schemas/Movie";

const getUserComments = async (req, res) => {
  console.log("etestset");
  const name = req.params.username;
  try {
    const userComments = await MovieCommentModel.find({ name });
    if (userComments.length === 0) {
      res.status(404).send();
    } else {
      console.log("test");
      console.log(userComments);
      res.status(200).send({ ...userComments });
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

const getProfile = async (req, res) => {
  const { userff } = req.params;
  try {
    console.log(userff);
    const userInfos = await UserModel.findOne({ userff });
    if (userInfos === null) {
      res.status(404).send();
    } else {
      const cleanUserInfos = {
        username: userInfos.username,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        picture: userInfos.picture
      };
      res.status(200).send({ ...cleanUserInfos });
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { getProfile, getUserComments };
