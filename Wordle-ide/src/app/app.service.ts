import { GraphqlClient } from './graphql/GraphqlClient';
import { CheckResult, GetWordResult, IAppService} from './IApp.Service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService implements IAppService {
  
  private _gqlClient: GraphqlClient;

  constructor() { 
    this._gqlClient  = GraphqlClient.Initialize("http://localhost:3000/graphql");
  }

  async GetRandomWord(): Promise<GetWordResult> {
    return await this._gqlClient.GetRandomWord();
  }

  //check and return information for the submitted array.
  public async CheckWord(word : string) : Promise<CheckResult>
  {
    return await this._gqlClient.CheckWord(word);
  }
}
