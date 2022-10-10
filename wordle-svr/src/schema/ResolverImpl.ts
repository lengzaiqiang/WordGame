import { getFileDb } from "../database/Files/FileDbImpl";
import { IDatabase } from "../database/IDatabase";
import { CheckResult, GetWordResult, LetterResult } from "./CheckResult.schema";

export class ResolverImpl
{
    //last random word for checking.
    private _word : string = "";
    private _db! : IDatabase

    constructor() {
        //Initialize the database connection.
        this._db = getFileDb()
    }

    //implement the query "CheckWord"
    async CheckWord( word: string) : Promise<CheckResult> {

        if (word.length == 0 || this._word.length == 0)
        {
            var res : CheckResult = {
                wordCorrect: false,
                wordExist: false,
                letterResult: [],
            }
            return res;
        }

        word = word.toLowerCase()

        if (word == this._word)
        {
            //get the proper word.
            var res : CheckResult = {
                wordCorrect : true,
                wordExist: true,
                letterResult: [],
            };

            return res;
        }
        else if (await this._db.WordExist(word))
        {
            //word exists.
            var res : CheckResult = {
                wordCorrect: false,
                wordExist: true,
                letterResult: []
            };

            Array.from(word).forEach( (v, index) => {
                //1. check for the exact position first.
                if (this._word[index] == v)
                {
                    res.letterResult!.push(LetterResult.LetterPositionCorrect);
                }
                else if (this._word.indexOf(v) == -1)
                {
                    //not in the word
                    res.letterResult!.push(LetterResult.NotExist);
                }
                else
                {
                    //in the word, but position incorrect
                    res.letterResult!.push(LetterResult.LetterCorrectOnly);
                }

            });
            return res;

        }
        else
        {
            //word doesn't exist in database.
            var res : CheckResult = {
                wordCorrect: false,
                wordExist: false,
                letterResult: [],
            };
            return res;
        }
    }

    //implement the query "GetRandomWord"
    async GetRandomWord() : Promise<GetWordResult> {
        this._word = await this._db.GetRandomWord();
        console.log(`IDatabase.GetRandomWord: ${this._word}`);
        var res : GetWordResult = {
            word: this._word,
        }
        return res;
    }
}