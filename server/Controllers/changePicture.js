import UserModel from "../Schemas/User";

const createRandomId = (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const changePicture = async (req, res) => {
  if (!req.files) {
    console.log("error files");
  } else {
    try {
      const hashedPT = `${req.files.image.name.split(".")[0] +
        createRandomId(5)}.${req.files.image.mimetype.split("/")[1]}`;
      req.files.image.mv(`./server/data/avatar/${hashedPT}`, (e) => {
        if (e) console.error(e);
      });
      try {
        const userInfo = await UserModel.findByIdAndUpdate(
          req.userId,
          { picture: hashedPT },
          {
            runValidators: true
          }
        );
        if (userInfo !== null) res.status(200).send();
      } catch (e) {
        console.error(e);
        res.status(500);
      }
    } catch (e) {
      console.error(e.message);
      res.status(500);
    }
  }
};

export default changePicture;
