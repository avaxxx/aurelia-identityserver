import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { customElement,inject, bindable, noView } from 'aurelia-framework';
import { HelloWorldComponent } from './HelloWorldComponent';





@noView()
@inject(Element)
@customElement('hello-world-element')
export class HelloWorldElement {
    constructor(private element: Element){
        this.element = element;
    }





    render() {
        ReactDOM.render(
           <HelloWorldComponent/>,
            this.element
        );
    }
    
    bind() {
        this.render();
    }
}