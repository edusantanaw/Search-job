import jwt from "jsonwebtoken";

export class GenerateToken {
  constructor(private secret: string) {
    this.secret = secret;
  }

   generate(id: string) {
    const token = jwt.sign({ _id: id }, this.secret);
    return token
  }
}
