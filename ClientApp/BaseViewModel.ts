import { autoinject } from 'aurelia-framework';
import { UserManager } from "oidc-client";

export class BaseViewModel{

    public user : Oidc.User;

    constructor(private userManager: UserManager)
    {
        this.userManager.getUser().then((user) => {
            this.user = user;
        });
    }
}