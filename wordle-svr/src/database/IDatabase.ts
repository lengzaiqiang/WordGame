export interface IDatabase {
    WordExist(word: string) : Promise<Boolean>
    GetRandomWord() : Promise<string>
}

