import { GraphqlServer } from './../server';
import { Field, ObjectType, registerEnumType } from "type-graphql";
import { Arg, Query, Resolver } from "type-graphql";

export enum LetterResult {
    NotExist = 0,
    LetterPositionCorrect, 
    LetterCorrectOnly,
}

registerEnumType(LetterResult, {
    name: "LetterResult",
    description: "All posssible Letter searching result"
});

@ObjectType({description: "The return result for GetRandomWord"})
export class GetWordResult
{
    @Field(type=>String, {nullable: false, description: "The random word picked from database"})
    word! : string;
}

@ObjectType({description: "The return result for every check"})
export class CheckResult  
{
    @Field(type=>Boolean, {nullable: false, description: "whether the candidate is the expected word"})
    wordCorrect! : boolean;

    //whether the word exists or not.
    @Field(type=>Boolean, {nullable: false, description: "whether the word exists in the database or not"})
    wordExist! : boolean;

    //for each letter, what would be the result.
    @Field(type=>[LetterResult],  {nullable: true, description: "each letter's result status"})
    letterResult : LetterResult[] | undefined;
}

@Resolver(()=>CheckResult)
export class MyResolver {

    @Query( ()=>CheckResult )
    async CheckWord(@Arg("word") word: string) : Promise<CheckResult> {

        return GraphqlServer.Server.ResolverInst.CheckWord(word);
    }
    
    @Query(()=>GetWordResult)
    async GetRandomWord() : Promise<GetWordResult> {
        return GraphqlServer.Server.ResolverInst.GetRandomWord();
    }
}