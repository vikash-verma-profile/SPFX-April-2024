import React,{Component} from 'react';

class UpdatingExample extends Component{
    constructor(props){
        super(props);
        this.state={count:0};
    }
    componentDidMount(){
        console.log('Component did mount');
    }
    componentDidUpdate(prevProps,prevState){
        console.log('Component did update');
    }
    handleClick=()=>{
        this.setState({count:this.state.count+1});
    }
    render(){
        console.log('Render called');
        return(
            <div><h1>Updating Example</h1>
            <p>Count : {this.state.count}</p>
            <button onClick={this.handleClick}>Increment Count</button>
            </div>
        );
    }
}

export default UpdatingExample;