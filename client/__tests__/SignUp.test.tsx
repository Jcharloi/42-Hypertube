import {
  validateEmail,
  validatePassword
} from "../components/Authentication/SignUp.service";

describe("SignUp", () => {
  it("should validate email correctly", () => {
    expect(validateEmail("toto123@gmail.com")).toBeTruthy();
    expect(validateEmail("TOtO123@GmaIL.CoM")).toBeTruthy();
    expect(validateEmail("toto.tata123@gmail.com")).toBeTruthy();
    expect(validateEmail("toto@student.42.fr")).toBeTruthy();

    expect(validateEmail("")).toBeFalsy();
    expect(validateEmail("toto")).toBeFalsy();
    expect(validateEmail("toto@")).toBeFalsy();
    expect(validateEmail("toto@gmail")).toBeFalsy();
    expect(validateEmail("toto@gmail.c")).toBeFalsy();
    expect(validateEmail("toto[leigolo]@gmail.com")).toBeFalsy();
  });

  it("should validate password correctly", () => {
    expect(validatePassword("Password1")).toBeTruthy();
    expect(
      validatePassword("Qk2O5pZd9ChgdB01k2LEBpmrRsCo8t1GPIuXhUCz")
    ).toBeTruthy();

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
