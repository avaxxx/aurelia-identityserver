import { Claim } from './../../../resources/model/Claim';
import { IIdentityService, IdentityService } from './../../../services/IdentityService';
import { User } from 'oidc-client';
import { UserManager } from 'oidc-client';
import { autoinject } from 'aurelia-framework';
import { BaseViewModel } from './../../../BaseViewModel';
import {HttpClient} from 'aurelia-fetch-client';


@autoinject(HttpClient)
export class Test extends BaseViewModel
{
    private identityService: IIdentityService;
    private claims: Claim[];
    constructor(private httpClient:HttpClient){
      super();
      this.identityService = new IdentityService(this.user);
    }

    callApi = async () =>  {
        this.claims = await this.identityService.getAwait();

        // this.identityService.get()
        // .then(data =>{
        //   this.claims = data.map(item => Claim.fromObject(item));
        // } )
        // .catch(e => this.logger.error(e));
    }
}