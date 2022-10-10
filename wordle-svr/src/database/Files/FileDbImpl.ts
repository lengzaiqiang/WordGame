import { IDatabase } from "../IDatabase";

import * as fs from 'fs';
import * as path from 'path';


class FileDbImpl implements IDatabase
{
    private static readonly assetDir = "assets"
    private static readonly assetFile = "wordlist.txt"

    private static _fileImpl : FileDbImpl | null = null;

    private constructor() {

    }

    // public interface for external to get reference to FileImpl
    public static  getFileDb() : FileDbImpl
    {
        if (FileDbImpl._fileImpl == null)
            FileDbImpl._fileImpl = new FileDbImpl();
        
        return FileDbImpl._fileImpl;
    }

    private async getContent() 
    {
        let dirs = __dirname.split(path.sep)
        dirs.pop();
        dirs.pop();
        dirs.pop();
        let filePath = path.join(dirs.join(path.sep), FileDbImpl.assetDir, FileDbImpl.assetFile);
        const content  = await fs.promises.readFile(filePath, "ascii");
        return content;
    }

    //Implement the interface method
    async WordExist(word: string): Promise<Boolean> {
        const content = await this.getContent();

        if (content.search(word) >= 0)
            return true;
        else
            return false;
    }

    // get a random word.
    async GetRandomWord() : Promise<string>
    {
        const content = await this.getContent();
        const words = content.split('\n');
        var index = Math.floor(Math.random() * words.length);
        let word = words[index];
        if (word.length == 0)
        {
            //get it again.
            return await this.GetRandomWord();
        }

        if (word[word.length - 1] == '\r')
            word = word.substring(0, word.length - 1);

        return word;
    }
}

export function getFileDb() : IDatabase {
    return FileDbImpl.getFileDb();
}