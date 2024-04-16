import React,{Component} from 'react';

class MountingExample extends Component{
    constructor(props){
        super(props);
        console.log('constructor is called');
    }
    componentDidMount(){
        console.log('Component did mount');
    }

    render(){
        console.log('Render called');
        return(
            <div><h1>Mounting Example</h1></div>
        );
    }
}

export default MountingExample;