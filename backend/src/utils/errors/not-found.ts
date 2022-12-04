export class NotFoundError extends Error {
  constructor(paramName: string) {
    super(`${paramName} not found!`);
    this.name = "UnauthorizedError";
  }
}
