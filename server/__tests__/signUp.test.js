import "../dotenv.config";
import bcrypt from "bcrypt";
import mongoose from "../mongo";
import { createUser } from "../Helpers/signUp";
import UserModel from "../Schemas/User";

describe("Sign Up", () => {
  let mockedUser;
  let resultUser;

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
    resultUser = {
      ...mockedUser,
      emailVerified: false,
      __v: 0
    };
  });

  afterAll(async () => {
    await UserModel.findByIdAndDelete(mockedUser._id);
  });

  it("should insert user", async () => {
    const newUser = await createUser(mockedUser, false);

    if (await bcrypt.compare(mockedUser.password, newUser.password)) {
      resultUser.password = newUser.password;
    }
    expect(newUser.toJSON()).toEqual(resultUser);
  });

  it("should be the same user", async () => {
    const findUser = await UserModel.findById(mockedUser._id);
    expect(findUser.toJSON()).toEqual(resultUser);
  });
});
