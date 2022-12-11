export interface applyForJobUseCase {
  apply: (userId: string, vacancyId: string) => Promise<string>;
}
