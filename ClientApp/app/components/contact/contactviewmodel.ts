import { BaseViewModel } from './../../../BaseViewModel';
import { Contact } from './../../../resources/model/Contact';
import { ValidationControllerFactory, ValidationController, validateTrigger } from 'aurelia-validation'
import { autoinject } from 'aurelia-framework';
import { BootstrapFormRenderer } from '../../../resources/validation/bootstrap-form-renderer';

import '../../../../kendo/js/kendo.combobox.min';
import '../../../../kendo/js/kendo.datepicker.min';

@autoinject
export class ContactViewModel extends BaseViewModel{
    private isNew: boolean;
    private contact: Contact;
    private validationController: ValidationController;

    constructor(private validationControllerFactory: ValidationControllerFactory)
    {
        super();
        this.validationController = validationControllerFactory.createForCurrentScope();
        //this.validationController.addRenderer(new BootstrapFormRenderer());
        this.validationController.validateTrigger = validateTrigger.changeOrBlur;
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