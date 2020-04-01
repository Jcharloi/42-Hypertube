import UserModel from "../Schemas/User";

const editUserInfo = async (req, res) => {
  // todo
  // const id = req.userId;

  try {
    const userInfo = await UserModel.findByIdAndUpdate(req.userId, req.body, {
      runValidators: true
    });
    if (userInfo !== null) res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { editUserInfo };
