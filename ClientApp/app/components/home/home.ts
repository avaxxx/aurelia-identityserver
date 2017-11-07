import { Person } from './../../../resources/components/person/person';
import { IPerson } from './../../../resources/model/IPerson';
import { autoinject } from 'aurelia-framework';
import { BaseViewModel } from './../../../BaseViewModel';
import { UserManager } from 'oidc-client'
import * as $ from "jquery"



//@autoinject
export class Home extends BaseViewModel {
    styleAsString : string;
    styleAsObject : object; 
    text: string;
    
    constructor(){
        super();
        this.styleAsString = 'font-weight: bold; font-size: 5em;';
        this.styleAsObject = {
            'font-weight':'bold',
            'font-size':'5em'
        }
    }

    async attached() {
        let user = await this.userPromise;
        this.logger.info(user.access_token);
        // $('#testUl').css('background-color', 'blue'); 
        // this.logger.info(this.user.toStorageString());   
    }
}
