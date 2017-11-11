import { DialogController } from 'aurelia-dialog';
import { ValidationController, ValidationControllerFactory, validateTrigger } from 'aurelia-validation';
import { autoinject } from 'aurelia-framework';
import { Contact } from 'resources/model/Contact';

@autoinject
export class ContactDialog{

    private contact: Contact;
    private validationController: ValidationController;
    
    constructor(private validationControllerFactory: ValidationControllerFactory, private dialogController: DialogController)
    {
        this.validationController = validationControllerFactory.createForCurrentScope();
        //this.validationController.addRenderer(new BootstrapFormRenderer());
        this.validationController.validateTrigger = validateTrigger.changeOrBlur;
    }
    
    activate(model:Contact)
    {
        this.contact = model;
    }

    ok(){
        this.validationController.validate().then(result => {
            if (result.valid)
            {
                this.dialogController.ok(this.contact);
            }
            else
            {
                console.log("Not valid");
            }
        })
    }
    cancel(){
        this.dialogController.cancel();
    }
}