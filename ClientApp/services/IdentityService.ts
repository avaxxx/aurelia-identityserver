import { MainLogger } from './../MainLogger';
import { BaseService } from './BaseService';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
export interface IIdentityService{
    get():any;
    getAwait():any;
}

export class IdentityService extends BaseService implements IIdentityService{
    constructor(user: Oidc.User){
        super(user);
        this.logger = MainLogger.getLogger('IdentityService');
    }
    async getAwait() {
        try
        {
          let response = await this.httpClient.fetch('identity');
          let data = await response.json();
          return data;
        }
        catch(e)
        {
          this.logger.error("And the error is - " + (<Error>e).message);
        }
        

      
    }

    get(){
        this.httpClient
        .fetch('identity')
        .then(response => response.json())
        .then(data => {
          return data;;
        })
        .catch(e => this.logger.error(e));
    }

}