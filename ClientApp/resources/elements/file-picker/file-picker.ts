import {bindable, bindingMode, inject, DOM, useView, useShadowDOM, Dom, autoinject} from 'aurelia-framework';

@inject(DOM.Element)
@useView('./file-picker.html')
@useShadowDOM
export class FilePickerCustomElement {

  input:HTMLInputElement;
  element:any;
  @bindable inputId = '';
  @bindable accept = '';
  @bindable multiple = false;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) files;

  constructor(element) {
    this.element = element;
    element.focus = () => this.input.click();
  }

  filesChanged() {
    this.element.dispatchEvent(DOM.createCustomEvent('blur', {}));
  }
}