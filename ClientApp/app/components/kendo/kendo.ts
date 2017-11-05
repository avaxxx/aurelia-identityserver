import { autoinject } from 'aurelia-framework';
import '../../../../kendo/js/kendo.dropdownlist.min';
// import '@types/kendo-ui'

@autoinject
export class Kendo {
  private dataSource : kendo.data.DataSource;
  private kendoDropdownRef: kendo.ui.DropDownList;
  constructor(){
    this.dataSource = new kendo.data.DataSource({
    transport: {
      read: {
        dataType: 'jsonp',
        url: '//demos.telerik.com/kendo-ui/service/Products'
      }
    }
  });
  }

  onChange(){
    console.log('Change');
    console.log(this.kendoDropdownRef.value);
  }
  
}