import '../../../../kendo/js/kendo.dropdownlist.min';
// import '@types/kendo-ui'


export class Kendo {
  private dataSource : kendo.data.DataSource;

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
  }
  
}