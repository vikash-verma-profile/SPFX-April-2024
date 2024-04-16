import React,{Component} from 'react';

class UnMountingExample extends Component{
   
    componentWillUnmount(){
        console.log('Component did unmount');
    }

    render(){
        console.log('Render called');
        return(
            <div><h1>UnMounting Example</h1></div>
        );
    }
}
export default UnMountingExample;