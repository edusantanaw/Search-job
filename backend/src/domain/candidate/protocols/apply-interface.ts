export interface applyForJobUseCase {
  apply: (userId: string, vacancyId: string) => Promise<string>;
  removeApply: (userId: string, vacancyId: string) => Promise<boolean>;
}
