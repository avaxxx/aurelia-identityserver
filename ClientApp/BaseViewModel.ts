import { autoinject } from 'aurelia-framework';
import { UserManager } from "oidc-client";
import { addAppender, setLevel, getLogger, logLevel } from 'aurelia-logging'
import { ColorAppender } from 'aurelia-logging-color'



export class BaseViewModel{

    public user : Oidc.User;
    public logger = getLogger('baseviewmodel');
    

    constructor(private userManager: UserManager)
    {
        // addAppender(new ColorAppender());        
        setLevel(logLevel.info);
        
        this.logger.warn('Pretty Color');
        this.logger.info("Test info");

        this.userManager.getUser().then((user) => {
            this.user = user;
        });
    }
}