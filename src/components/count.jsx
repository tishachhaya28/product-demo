import React from "react";

class CountClass extends React.Component{
    constructor(){
        super();
        this.state = {
            count : 0
        }
    }
    componentDidMount(){

    }
    counting = (event) => {
        if(event.target.value == "inc"){
            this.setState(prevState => ({
                count : prevState.count + 1
            }))
        }else{
            this.setState(prevState => ({
                count : prevState.count - 1
            }))
        }
    }
    render = () =>{
        return(
            <>
                <button value="inc" onClick={this.counting}>Increase {this.state.count}</button>
                <button value="dec" onClick={this.counting}>Decrease {this.state.count}</button>    
            </>
        )
    }
}

export default CountClass;