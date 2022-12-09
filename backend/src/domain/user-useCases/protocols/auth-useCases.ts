export interface authUseCase {
  auth: (
    email: string,
    password: string
  ) => Promise<
    | string
    | {
        statusCode: number;
        body: {
          error: string;
        };
      }
    | null
  >;
}
