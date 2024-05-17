// class lifecycle functions practice file 
import React from "react";

class PracticeClass extends React.Component{
    constructor(){
        super()
        console.log("constructor");
        this.state = {
            a : 10,
            b : 20
        }
    }
    componentDidMount(){
        this.setState({
            a : 100
        })
        console.log(this.state.a, "componentDidMount");
    }
    shouldComponentUpdate(newProps, newState){
        console.log(this.state, newState, "shouldComponentUpdate");   
        if(this.state != newState){
            console.log("me");
            return true;
        }
    }
    componentDidUpdate(newProps, newState){
        console.log(this.state, newState, "componentDidUpdate");
        if(this.state != newState){
            console.log("mee");
            return true;
        }
    }
    render(){
        console.log("render");
        return(
            <p>Hello{this.state.a}</p>
        )
    }
}

export default PracticeClass;