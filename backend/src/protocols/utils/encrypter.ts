export interface encrypter {
  compare: (value: string, hash: string) => Promise<boolean>;
  genHash: (value: string) => Promise<string>;
}
