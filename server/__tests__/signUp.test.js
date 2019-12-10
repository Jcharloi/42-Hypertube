import "../dotenv.config";
import bcrypt from "bcrypt";
import mongoose from "../mongo";
import signUpHelpers from "../Helpers/signUp";
import UserModel from "../Schemas/User";

describe("Sign Up", () => {
  let mockedUser;
  beforeAll(() => {
    mockedUser = {
      _id: new mongoose.Types.ObjectId(),
      email: "test email",
      username: "test name",
      firstName: "test first",
      lastName: "test last",
      password: "test password",
      picture: "test picture"
    };
  });

  afterAll(async () => {
    await UserModel.findByIdAndDelete(mockedUser._id);
  });

  it("should insert user", async () => {
    const res = await signUpHelpers.createUser(mockedUser, false);
    expect(res).toBe(true);
  });

  it("should be the same user", async () => {
    const findUser = await UserModel.findById(mockedUser._id);
    const res = await bcrypt.compare(mockedUser.password, findUser.password);
    findUser.password = res ? "test password" : findUser.password;
    expect(findUser.toJSON()).toEqual({
      ...mockedUser,
      emailVerified: false,
      __v: 0
    });
  });
});
