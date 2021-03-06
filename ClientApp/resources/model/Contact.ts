import { ValidationRules} from 'aurelia-validation'
import 'resources/validation/rules'
export class Contact{

    constructor()
    {
        this.address = new Address();
        this.selectedPeople = new Array<string>();
        ValidationRules
        .ensure((p: Contact) => p.firstName).displayName('First Name').required()
        .ensure((p: Contact) => p.phoneNumber).required()
        .ensure((p: Contact) => p.selectedDate).required()
        .ensure((p: Contact) => p.selectedPeople).required().maxItems(2)
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
    public selectedDate: string;
    public address: Address;
    public selectedPeople: string[];
}

export class Address{
    public street: string;
    public number: string;
    public city: string;
    public country: string;
}