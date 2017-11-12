import { I18N } from 'aurelia-i18n';
import { Person } from './../../../resources/components/person/person';
import { IPerson } from './../../../resources/model/IPerson';
import { autoinject } from 'aurelia-framework';
import { BaseViewModel } from './../../../BaseViewModel';
import { UserManager } from 'oidc-client'
import * as $ from "jquery"
import { DialogController  } from "aurelia-dialog";


@autoinject
export class Home extends BaseViewModel {
    styleAsString : string;
    styleAsObject : object; 
    text: string;
    
    constructor(private dialogController: DialogController, private i18n: I18N){
        super();
        this.styleAsString = 'font-weight: bold; font-size: 5em;';
        this.styleAsObject = {
            'font-weight':'bold',
            'font-size':'5em'
        }
        console.log(this.i18n.getLocale());
        console.log(this.i18n.tr('Hello'));
    }

    async attached() {
        let user = await this.userPromise;
        this.logger.info(user.access_token);
        // $('#testUl').css('background-color', 'blue'); 
        // this.logger.info(this.user.toStorageString());   
    }


}
