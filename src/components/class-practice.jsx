// class component practice api
import React from "react";

class ClassPractice extends React.Component{
    constructor(){
        super()
        console.log("Class Constructor");
        this.state = {
            users : null,
            formData : {
                name : "",
                username : "",
                email : "",
                address : {
                    street : "",
                    suite : "",
                    city : "",
                },
                phone : "",
                website : "",
                company : {
                    name : ""
                }
            }
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData = async () => {
        let apiData = await fetch(`https://jsonplaceholder.typicode.com/users`, {
            method : 'GET'
        });
        let response = await apiData.json()
        console.log(response);
        this.setState({
            users : response
        })
    }
    handlDelete = (id) => {
        const deletedUser = this.state.users
        // console.log(id);
        let uIndex = deletedUser.findIndex((u) => u.id == id)
        deletedUser.splice(uIndex, 1);
        this.setState({
            users : deletedUser
        })
    }
    handleData = (event) => {
        console.log(event.target.name);
        // const formValue = this.state
        let address = this.state.formData.address
        let comapny = this.state.formData.company
        if(event.target.name == "street" || event.target.name == "suite" || event.target.name == "city"){
            address[event.target.name] = event.target.value
            this.setState({
                ...this.state.formData,
                formData : {
                    address : address
                }
            })
        }else if (event.target.name == "company"){
            comapny[event.target.name] = event.target.value
            this.setState({
                ...this.state.formData,
                formData : {
                    comapny : comapny
                }
            })
        }else {
            this.setState({
                ...this.state.formData,
                formData : {
                    [event.target.name] : event.target.value
                }
            })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();

    }
    validation = () => {
        
    }
    render(){
        const { users, formData } = this.state
        console.log(users);
        const input = {
            width : '30%' ,
            padding : '5px 0'
        }
        return(
            <>
                <form method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="name"
                            value={formData?.name}
                            onChange={this.handleData} 
                            placeholder="name.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="username"
                            value={formData?.username} 
                            onChange={this.handleData}
                            placeholder="username.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="email"
                            style={input}
                            name="email"
                            value={formData?.email} 
                            onChange={this.handleData}
                            placeholder="email.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="street"
                            value={formData?.address?.street}
                            onChange={this.handleData} 
                            placeholder="street.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="suite"
                            value={formData?.address?.suite} 
                            onChange={this.handleData}
                            placeholder="suite.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="city"
                            value={formData?.address?.city} 
                            onChange={this.handleData}
                            placeholder="city.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="phone"
                            value={formData?.phone} 
                            onChange={this.handleData}
                            placeholder="phone.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="website"
                            value={formData?.website}
                            onChange={this.handleData} 
                            placeholder="website.."   
                        />
                    </div>
                    <div>
                        <input 
                            type="text"
                            style={input}
                            name="company"
                            value={formData?.company?.name}
                            onChange={this.handleData} 
                            placeholder="company.."   
                        />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <h3 style={{textAlign : 'center'}}>API PRACTICE</h3>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>STREET</th>
                            <th>SUITE</th>
                            <th>CITY</th>
                            <th>PHONE</th>
                            <th>WEBSITE</th>
                            <th>COMPANY-NAME</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => 
                                <tr key={index}>
                                    <td>{user?.id}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.username}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.address?.street}</td>
                                    <td>{user?.address?.suite}</td>
                                    <td>{user?.address?.city}</td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.website}</td>
                                    <td>{user?.company?.name}</td>
                                    <td><button onClick={() => this.handlDelete(user?.id)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }
}

export default ClassPractice;