import { autoinject } from 'aurelia-framework';
import { BaseViewModel } from './../../../BaseViewModel';
import { UserManager } from 'oidc-client'
import * as $ from "jquery"

@autoinject
export class Home extends BaseViewModel {
    constructor(userManager: UserManager){
        super(userManager);


        this.logger.error("from home");
        // var config = {
        //     authority: "http://localhost:5000",
        //     client_id: "js",
        //     redirect_uri: "http://localhost:5000/#home/",
        //     response_type: "id_token token",
        //     scope:"openid profile api1",
        //     post_logout_redirect_uri : "http://localhost:5003/index.html",
        // };


        // var mgr = new UserManager(config);

        // mgr.signinRedirectCallback().then(function () {
        //     console.log('daco');
        //     mgr.getUser().then(function(user) {
        //         console.log(user);
        //     });
        // }).catch(function (e) {
        //     console.error(e);
        // });

        // mgr.getUser().then(function(user) {
        //     console.log(user);
        // });
        
    }

    attached() {
        // $('#testUl').css('background-color', 'blue');    
        console.log(this.user);    
    }
}
