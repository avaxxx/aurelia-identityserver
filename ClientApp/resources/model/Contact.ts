import { ValidationRules} from 'aurelia-validation'
import '../validation/rules'
export class Contact{

    constructor()
    {
        this.address = new Address();
        ValidationRules
        .ensure('firstName').required()
        .ensure('phoneNumber').required()
        //.ensure('lastName').satisfiesRule('between')
        .on(this);
    }

    public id: number;
    public firstName: string;
    public lastName: string;
    public age: number;
    public userName: number;
    public sendNewsletter: boolean;
    public email: string;
    public phoneNumber: string;

    public address: Address;

}

export class Address{
    public street: string;
    public number: string;
    public city: string;
    public country: string;
}