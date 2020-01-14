import UserModel from "../Schemas/User";

const getProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const userInfos = await UserModel.findOne({ username });
    if (userInfos === null) {
      res.status(404).send();
    } else {
      const cleanUserInfos = {
        username: userInfos.username,
        firstName: userInfos.firstName,
        lastName: userInfos.lastName,
        picture: userInfos.picture
      };
      await res.status(200).send({ ...cleanUserInfos });
    }
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { getProfile };
