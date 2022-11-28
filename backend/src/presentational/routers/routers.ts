export default class LoginRouter {
  constructor(private email: string, private password: string) {
    this.email = email;
    this.password = password;
  }
}
