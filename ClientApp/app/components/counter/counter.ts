import { UserManager } from 'oidc-client'
import {OpenIdConnect} from 'aurelia-open-id-connect';
import { autoinject } from "aurelia-framework";


@autoinject
export class Counter {
    constructor(private openIdConnect: OpenIdConnect) { }

    public currentCount = 0;

    public incrementCounter() {
        this.openIdConnect.login();
        // var config = {
        //     authority: "http://localhost:5000",
        //     client_id: "aurelia-openiddict",
        //     redirect_uri: "http://localhost:5000/#home/",
        //     response_type: "id_token token",
        //     scope:"openid profile api1",
        //     post_logout_redirect_uri : "http://localhost:5003/index.html",
        // };
        
        // var mgr = new UserManager(config);
        // mgr.signinRedirect();
    }
}
