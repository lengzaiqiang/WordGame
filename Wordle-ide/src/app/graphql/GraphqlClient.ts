import { ApolloClient, gql, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { CheckResult, GetWordResult, LetterResult } from '../IApp.Service';
import { CheckWordQuery, GetRandomWordQuery } from "./queries";

export class GraphqlClient
{
    private static _instance: GraphqlClient = new GraphqlClient();

    private _apolloClient! : ApolloClient<NormalizedCacheObject>;
    
    private constructor() {

    }

    public static Initialize(url : string) : GraphqlClient
    {
        this._instance._apolloClient = new ApolloClient({
            uri : url,
            cache : new InMemoryCache(),
        });

        return this._instance;
    }

    public async GetRandomWord() : Promise<GetWordResult>
    {
        const ret = await this._apolloClient.query({
            query: GetRandomWordQuery,
        });

        return ret.data.GetRandomWord;
    }

    public async CheckWord(word : string) : Promise<CheckResult>
    {
        const ret = await this._apolloClient.query({
            query: CheckWordQuery,
            variables: {
                "input1": word
            },
            fetchPolicy: 'no-cache',
        });

        return ret.data.CheckWord;
    }

}