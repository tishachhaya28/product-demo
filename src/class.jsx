import React from "react";
import posts from "./data";

//static data

class Test extends React.Component{ //=> class cannot invoke without new keyword : so you have to extend React.componenet
    constructor(){
        super() //=> must use super keyword to call super class's or componenet class constructor (super class == React.Component)
        console.log("here constructor");
        this.state = {
            data : posts,
            test : "",
            status : false
        }
    }
    componentDidMount(){
        const { data } = this.state
        console.log(data, "here in did mount");
    }

    handleDelete = async (id) => {
        console.log(id);
        const { data } = this.state;
        let response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method : 'delete'
        })
        let res = await response.json()
        console.log(res);
        if(res){
            let index = data.findIndex((p) => id == p.id)
            data.splice(index, 1)
            this.setState({
                data : data
            })
        }
    } 

    render(){ //=> must use render method for return and HTML from class component
        console.log("render");
        const { data } = this.state
        return(
            <div className="App">
                <table> 
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>USERID</th>
                        <th>TITLE</th>
                        <th>BODY</th>
                        <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((post, index) => {
                        return(
                            //it is called props key={...}
                            <tr key={index}>
                            <td>{post?.id}</td>
                            <td>{post?.userId}</td>
                            <td>{post?.title}</td>
                            <td>{post?.body}</td>
                            <td>
                                {/* you must use callback function on event every time */}
                                <button onClick={ () => { this.handleDelete(post?.id) } }>Delete</button>
                            </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Test;