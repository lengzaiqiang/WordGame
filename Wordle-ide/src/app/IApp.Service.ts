//TODO:  what is the best way to share the types between front end and back end?

export enum LetterResult {
    NotExist = 0,
    LetterPositionCorrect, 
    LetterCorrectOnly,
}

export interface CheckResult
{
    //whether the candidate is the expected word.
    wordCorrect: boolean;

    //whether the word exists in database or not
    wordExist : boolean;

    //for each letter, what would be the result.
    letterResult : LetterResult[];
}

export interface GetWordResult
{
    //returned word
    word: string;
}

export interface IAppService {
    CheckWord(word : string) : Promise<CheckResult>;
    GetRandomWord() : Promise<GetWordResult>;
}