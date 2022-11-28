import bcrypt from "bcrypt";

export class Encrypter {
  async compare(value: string, hash: string) {
    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }
}
