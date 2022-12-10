interface response {
  statusCode: number;
  body: any;
}

export interface Controller<T = any> {
  handle: (request: T) => Promise<response>;
}
