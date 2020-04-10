import "../dotenv.config";
import bcrypt from "bcrypt";
import mongoose from "../mongo";
import { createUser, sendValidateEmail } from "../Helpers/signUp";
import UserModel from "../Schemas/User";
import TokenModel from "../Schemas/Token";

describe("Sign Up", () => {
  let mockedUser;
  let resultUser;

  beforeAll(() => {
    mockedUser = {
      _id: new mongoose.Types.ObjectId(),
      email: "test@email.com",
      username: "test name",
      firstName: "test first",
      lastName: "test last",
      password: "TestPassword1",
      picture: "test/picture"
    };
    resultUser = {
      ...mockedUser,
      emailVerified: false,
      __v: 0
    };
  }, 10000);

  afterAll(async () => {
    await UserModel.findByIdAndDelete(mockedUser._id);
    await TokenModel.findOneAndDelete({ user: mockedUser._id });
  }, 10000);

  it("should insert user", async () => {
    const newUser = await createUser(mockedUser, true);

    if (await bcrypt.compare(mockedUser.password, newUser.password)) {
      resultUser.password = newUser.password;
    }
    expect(newUser.toJSON()).toEqual(resultUser);
  }, 50000);

  it("should be the same user", async () => {
    const findUser = await UserModel.findById(mockedUser._id);
    expect(findUser.toJSON()).toEqual(resultUser);
  }, 10000);

  it("should create a token for our user", async () => {
    await sendValidateEmail(resultUser, "en");
    const token = await TokenModel.findOne({ user: resultUser._id });

    expect(token).not.toBeNull();
  }, 10000);
});
