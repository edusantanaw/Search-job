import bcrypt from "bcrypt";

export class Encrypter {
  async compare(value: string, hash: string) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }

  async genHash(value: string) {
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(value, salt);
    return hashPassword;
  }
}
