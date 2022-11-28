
const validator = require("validator");

export class EmailValidator {
  isValid(email: string) {
    return validator.isEmail(email);
  }
}
