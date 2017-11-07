import { IPerson } from './../../../resources/model/IPerson';
import { Person } from './../../../resources/components/person/person';

export class Template{
    person: IPerson;
    person2: IPerson;
    instanceOfComponent: Person;

    constructor()
    {
        this.person = {id:1, name: "Person name"};
        this.person2 = {id:2, name: "Second name"};
        this.instanceOfComponent = new Person();
        // this.instanceOfComponent.activationData = {id: 4, name: "Fourth name"};
    }
}