import { IPerson } from './../../model/IPerson';
export class Person{
    activationData: IPerson

    constructor(){

    }

    activate(params, routeConfig, navigationInstruction) {
        this.activationData = params; 
    }
}