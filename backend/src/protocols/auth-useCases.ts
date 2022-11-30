interface authUseCase{
    auth: (email: string, password: string) => Promise<string | null>
}