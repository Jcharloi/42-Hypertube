import bcrypt from "bcrypt";
import UserModel from "../Schemas/User";

const validatePassword = (password) => {
  const reg = /(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/;
  return reg.test(password);
};

const changePassword = async (req, res) => {
  const encodedNewPassword = bcrypt.hashSync(req.body.newPassword, 10);

  if (!(await validatePassword(req.body.newPassword))) {
    res.status(400).send();
  } else {
    try {
      const userInfos = await UserModel.findById(req.userId);
      if (userInfos === null) {
        res.status(404).send();
      } else if (
        !(await bcrypt.compareSync(req.body.oldPassword, userInfos.password))
      ) {
        res.status(401).send();
      } else {
        try {
          const userInfo = await UserModel.findByIdAndUpdate(
            req.userId,
            { password: encodedNewPassword },
            {
              runValidators: true
            }
          );
          if (userInfo !== null) res.status(200).send();
        } catch (e) {
          console.error(e);
          res.status(500);
        }
      }
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  }
};

export default changePassword;
