import UserModel from "../Schemas/User";

const getUserInfos = async (req, res) => {
  const { userId } = req.params;
  console.log("rerer");
  console.log(userId);
  try {
    const userInfos = await UserModel.findById("5deef70c35ecc315cb9018d2");

    if (userInfos === null) {
      console.log("test");
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
