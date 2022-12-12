export interface signinUseCase {
  sender: (email: string) => Promise<void>;
}
