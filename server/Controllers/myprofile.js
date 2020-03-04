import UserModel from "../Schemas/User";

const getUserInfos = async (req, res) => {
  req.userId = "5deef4dc80a440152717dbcf";
  console.log("rerer");
  try {
    const userInfos = await UserModel.findById(req.userId);

    if (userInfos === null) {
      res.status(404).send();
    } else {
      const cleanUserInfos = {
        username: userInfos.username,
        firstName: userInfos.firstName,
        email: userInfos.email,
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

export default { getUserInfos };
