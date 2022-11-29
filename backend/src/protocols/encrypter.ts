export interface encrypter {
    compare: (value: string, hash: string) => Promise<boolean>
}