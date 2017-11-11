import { BaseViewModel } from './../../../BaseViewModel';
import { Contact } from './../../../resources/model/Contact';
import { ValidationControllerFactory, ValidationController, validateTrigger } from 'aurelia-validation'
import { autoinject, PLATFORM } from 'aurelia-framework';
import { BootstrapFormRenderer } from '../../../resources/validation/bootstrap-form-renderer';
import { DialogService  } from "aurelia-dialog";
import { ContactDialog } from "../../../resources/dialogs/contactdialog";
import { EventAggregator } from "aurelia-event-aggregator";

import '../../../../kendo/js/kendo.combobox.min';
import '../../../../kendo/js/kendo.datepicker.min';
import '../../../../kendo/js/kendo.multiselect.min';

@autoinject
export class ContactViewModel extends BaseViewModel{
    private isNew: boolean;
    private contact: Contact;
    private validationController: ValidationController;

    constructor(private validationControllerFactory: ValidationControllerFactory, 
                private dialogService: DialogService,
                private eventAggregator: EventAggregator)
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
            

            this.contact.selectedPeople.push('Robert Davolio');
            this.contact.selectedPeople.push('Steven White');
            this.contact.selectedPeople.push('Nancy King');
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
                this.eventAggregator.publish('contactvalidationfailed', this.contact);
            }
        })
    }

    addContact()
    {
            this.dialogService.open({
                viewModel: ContactDialog,
                // view: PLATFORM.moduleName('../../../resources/dialogs/contactdialog'),
                model: this.contact
            })
            .whenClosed(response => {
                if (!response.wasCancelled)
                {
                    this.logger.debug("OK")
                }
                else
                {
                    this.logger.debug("Cancel")
                }

                console.log(response.output);
            })
    }
   
}