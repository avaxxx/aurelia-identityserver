import { BaseViewModel } from './../../../BaseViewModel';
import { Contact } from './../../../resources/model/Contact';
import {ValidationController} from 'aurelia-validation'
import { autoinject } from 'aurelia-framework';

@autoinject
export class ContactViewModel extends BaseViewModel{
    private isNew: boolean;
    private contact: Contact;

    constructor(private validationController: ValidationController)
    {
        super();
    }

    activate(params: any, routeConfig, navigationInstruction) {
        if (params.id == undefined)
        {
            this.isNew = true;
            this.contact = new Contact();
        }
        else
        {
            this.isNew = false;
        }
    }

    save()
    {
        this.validationController.validate().then(result => {
            if (result.valid)
            {
                console.log(this.contact);
            }
            else
            {
                console.log("Not valid");
            }

            
            
        })
    }
}