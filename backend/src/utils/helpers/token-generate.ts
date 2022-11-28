import jwt from "jsonwebtoken";

export class GenerateToken {
  constructor(private secret: string) {
    this.secret = secret;
  }

  async generate(id: string) {
    return jwt.sign({ _id: id }, this.secret);
  }
}
