import { EmailValidator } from "./email-validator";

jest.mock("validator", () => ({
  isEmailValid: true,
  isEmail(email: string) {
    if (!email.includes("@")) return (this.isEmailValid = false);
    return this.isEmailValid;
  },
}));

const makeSut = () => {
  return new EmailValidator();
};

describe("Email validator", () => {
  test("Should return true if validator returns true", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("valid_email@email.com");
    expect(isEmailValid).toBe(true);
  });
  test("Should return false if validator returns false", () => {
    const sut = makeSut();
    const isEmailValid = sut.isValid("invalid_emaiemail.com");
    expect(isEmailValid).toBe(false);
  });
});
