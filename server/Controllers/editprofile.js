import UserModel from "../Schemas/User";
import MovieCommentModel from "../Schemas/Movie";

const editUserInfo = async (req, res) => {
  // todo
  // const id = req.userId;
  const id = "5deef4dc80a440152717dbcf";
  console.log(req.body);

  try {
    const userInfo = await UserModel.findByIdAndUpdate(id, req.body, {
      runValidators: true
    });
    if (userInfo !== null) res.status(200).send();
  } catch (e) {
    console.error(e);
    res.status(500);
  }
};

export default { editUserInfo };
