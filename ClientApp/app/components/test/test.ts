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
    constructor(private httpClient:HttpClient){
      super();
      this.identityService = new IdentityService(this.user);
    }

    callApi = async () =>  {
        let result = await this.identityService.getAwait();
        this.logger.info("data getAwait");
        this.logger.info(result);

        let res = this.identityService.get();
        this.logger.info("data get");
        this.logger.info(res);
    }
}