import {
  UserInfo,
  checkRequiredField,
  requiredErrorKey,
  requiredPictureErrorKey,
  validateEmail,
  validatePassword,
  UserError
} from "../components/Authentication/SignUp.service";

describe("SignUp", () => {
  it("should return error when a field is empty", () => {
    const mockUserInfo: UserInfo = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      picture: null
    };
    const mockUserError: UserError = {
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      picture: ""
    };

    // all empty
    expect(checkRequiredField(mockUserInfo, mockUserError)).toEqual({
      username: requiredErrorKey,
      password: requiredErrorKey,
      email: requiredErrorKey,
      firstName: requiredErrorKey,
      lastName: requiredErrorKey,
      picture: requiredPictureErrorKey
    });

    // Some empty, some complete
    mockUserInfo.username = "Xx_toto_xX";
    mockUserInfo.password = "mySuperSecretPassword1";
    mockUserInfo.email = "toto@gmail.com";
    expect(checkRequiredField(mockUserInfo, mockUserError)).toEqual({
      username: "",
      password: "",
      email: "",
      firstName: requiredErrorKey,
      lastName: requiredErrorKey,
      picture: requiredPictureErrorKey
    });

    // All field are complete
    mockUserInfo.firstName = "Toto";
    mockUserInfo.lastName = "Mountbatten";
    mockUserInfo.picture = new File([""], "maTeteDeBG.png", {
      type: "image/png"
    });
    expect(checkRequiredField(mockUserInfo, mockUserError)).toEqual({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      picture: ""
    });
  });

  it("should validate email correctly", () => {
    // Valid email
    expect(validateEmail("toto123@gmail.com")).toBeTruthy();
    expect(validateEmail("TOtO123@GmaIL.CoM")).toBeTruthy();
    expect(validateEmail("toto.tata123@gmail.com")).toBeTruthy();
    expect(validateEmail("toto@student.42.fr")).toBeTruthy();
    // Invalid email
    expect(validateEmail("")).toBeFalsy();
    expect(validateEmail("toto")).toBeFalsy();
    expect(validateEmail("toto@")).toBeFalsy();
    expect(validateEmail("toto@gmail")).toBeFalsy();
    expect(validateEmail("toto@gmail.c")).toBeFalsy();
    expect(validateEmail("toto[leigolo]@gmail.com")).toBeFalsy();
  });

  it("should validate password correctly", () => {
    // Valid password
    expect(validatePassword("Password1")).toBeTruthy();
    expect(
      validatePassword("Qk2O5pZd9ChgdB01k2LEBpmrRsCo8t1GPIuXhUCz")
    ).toBeTruthy();
    // Invalid password
    expect(validatePassword("")).toBeFalsy();
    expect(validatePassword("toto")).toBeFalsy();
    expect(validatePassword("tototata")).toBeFalsy();
    expect(validatePassword("TOTOTATA")).toBeFalsy();
    expect(validatePassword("12345678")).toBeFalsy();
    expect(validatePassword("TOTOtata")).toBeFalsy();
    expect(validatePassword("toto5679")).toBeFalsy();
    expect(validatePassword("TOTO5679")).toBeFalsy();
    expect(validatePassword("Toto12")).toBeFalsy();
  });
});
