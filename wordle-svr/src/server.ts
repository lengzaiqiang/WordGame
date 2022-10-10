import "reflect-metadata";      //this is required by "type-graphql, it must be ahead of first import of type-graphql"
import express, { Application } from 'express'
import * as cors from 'cors'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'type-graphql';
import { MyResolver } from './schema/CheckResult.schema';
import { ResolverImpl } from "./schema/ResolverImpl";

export class GraphqlServer
{
    private static PORT = 3000;
    private static GRAPHQL_PATH = "/graphql";
    private static _graphqlServer : GraphqlServer | null = null;

    private expApp: Application = express();
    private _resolver : ResolverImpl | null = null;

    //actual implementation of resolvers.
    public get ResolverInst()
    {
        if (this._resolver == null)
            this._resolver = new ResolverImpl();

        return this._resolver;
    }

    public static get Server() {
        if (this._graphqlServer == null)
            this._graphqlServer = new GraphqlServer();

        return this._graphqlServer;
    }

    //secure the constructor, only Server getter can instantiate it.
    private constructor() {
    }


    // start the graphql server
    public async StartServer() 
    {
        const schema = await buildSchema({
            resolvers: [MyResolver],
            emitSchemaFile: true,
        });
        
        const corsOptions : cors.CorsOptions = {
            origin: '*',
            credentials: true,
            optionsSuccessStatus: 200,
        }

        this.expApp.use(cors.default(corsOptions))

        this.expApp.use(express.json());
    
        this.expApp.use(
            GraphqlServer.GRAPHQL_PATH,
            graphqlHTTP({
                schema,
                //rootValue: resolver,
                //rootValue: CheckResultResolver,
                graphiql: true,
                customFormatErrorFn : (err: any) => {
                    if (!err.originalError)
                        return err;
                    const data = err.originalError.data;
                    const message = err.Message || 'Unknow error!';
                    const code = err.originalError.code || 500;
                    return {
                        message : message,
                        status: code,
                        data: data,
                    };
                },
    
            })
        );
    
        this.expApp.listen(GraphqlServer.PORT, ()=> {
            console.log(`server is running at localhost:${GraphqlServer.PORT}${GraphqlServer.GRAPHQL_PATH}`)
    
        });
    }
}

//  start the server
const server = GraphqlServer.Server
server.StartServer();

