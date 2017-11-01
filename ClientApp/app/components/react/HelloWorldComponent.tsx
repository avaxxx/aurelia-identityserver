import * as React from 'react';
import * as DOM from 'react-dom';
import * as Select from 'react-select';
import "../../../../node_modules/react-select/dist/react-select.css"

class ToggleState {
    selectValue:string
}

class HelloWorldComponent extends React.Component<any, ToggleState> {
    options: any;
    state: any;
    constructor(props: any) {
        super(props);
        this.options = [
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' }
        ];
        this.state = {
			selectValue: 'one',
		};
    }



    public logChange = (newValue) => {
    console.log("Selected: " + JSON.stringify(newValue));
    //this.state.selectValue = newValue;
    this.setState({
			selectValue: newValue
		});
    }

    public render() {
        return (
             <Select 
                name="form-field-name"
                value={this.state.selectValue}                
                options={this.options}
                onChange={this.logChange} 
            />
        );
    }
}

export{
    HelloWorldComponent
}