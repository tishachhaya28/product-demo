import React from "react";
import loading from "../images/loader.gif"
 
class Apiclass extends React.Component{
    constructor(){
        super()
        console.log("Constructor");
        this.state = {
            loading : false,
            users : null,
            formData : {
                email : "",
                password : "",
                name : "", 
                role : "", 
                avatar : ""
            },
            errorData : {
                email : "",
                password : "",
                name : "", 
                role : "", 
                avatar : ""
            }
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData = async () => {
        let response = await fetch("https://api.escuelajs.co/api/v1/users", {
            method : 'GET'
        })
        let data = await response.json()
        this.setState({
            loading : true
        })
        // console.log(data);
        if(data.length > 0){
            this.setState({
                users : data,
                loading : false
            })
        }else{
            this.setState({
                users : null,
                loading : false
            })
        }      
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        let isSuccess = this.validation()
        const { formData, users } = this.state
        if(isSuccess){
            let response = await fetch(`https://api.escuelajs.co/api/v1/users`).then(data => data.json(), {
                method :"post",
                body : JSON.stringify(formData)
            })
            console.log(response);
            let U = users;
            formData.id = U.length + 1;
            U.push(formData);
            this.setState({
                users : U
            })
        }
    }
    handleEdit = async (id) => {
        console.log(id);
        let res = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
        let response = await res.json();
        console.log(response);
    }
    validation = () => {
        const {formData, errorData} = this.state;
        let newErrorFormData = errorData
        let isSuccess = true;
        if(!formData.email){
            newErrorFormData.email = "please enter your email!"
            isSuccess = false;
        }else{
            newErrorFormData.email = ""
            isSuccess = true;
        }
        if(!formData.password){
            newErrorFormData.password = "please enter your password!"
            isSuccess = false;
        }else{
            newErrorFormData.password = ""
            isSuccess = true;
        }
        if(!formData.name){
            newErrorFormData.name = "please enter your name!"
            isSuccess = false;
        }else{
            newErrorFormData.name = ""
            isSuccess = true;
        }
        if(!formData.role){
            newErrorFormData.role = "please enter your role!"
            isSuccess = false;
        }else{
            newErrorFormData.role = ""
            isSuccess = true;
        }
        if(!formData.avatar){
            newErrorFormData.avatar = "please enter your avatar!"
            isSuccess = false;
        }else{
            newErrorFormData.avatar = ""
            isSuccess = true;
        }
        this.setState({
            errorData : newErrorFormData
        })
        return isSuccess;
    }
    handleSearch = (event) => {
        let search = event.target.value;
        search = search.toLowerCase().split(" ").join("")
        let newData = this.state.users
        if(search == ""){
            this.getData();
        }else{
            let filterData = newData.filter((u) => 
                u.email.toLowerCase().split(" ").join("").includes(search) 
                || u.password.toLowerCase().split(" ").join("").includes(search) 
                || u.name.toLowerCase().split(" ").join("").includes(search) 
                || u.role.toLowerCase().split(" ").join("").includes(search) 
                || u.avatar.toLowerCase().split(" ").join("").includes(search)
            )
            newData = filterData
            this.setState({
                users : newData
            })
        }
        // console.log(filterData , "====");
    }
    handleSort = (event) => {
        let userNew = this.state.users;
        let val = event.target.value;
        let sortedData = val == "des" ? userNew?.sort((a, b) => b.id - a.id) : userNew?.sort((a, b) => a.id - b.id);
        userNew = sortedData;
        console.log(userNew);
        // this.setState({
        //     users : userNew
        // })
    }
    handleDelete = (id) => {
        // console.log(id);
        let newUsers = this.state.users
        // console.log(newUsers);
        let uIndex =newUsers.findIndex((u) => u.id == id)
        newUsers.splice(uIndex, 1);
        this.setState({
            users : newUsers
        })
    }
    handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        this.setState({
            formData : {
                ...this.state.formData,
                [event.target.name] : event.target.value
            }
        })
    }
    render(){
        const { users, formData, errorData } = this.state
        console.log(formData, "hello");
        const tableStyle = {
            width : '100%'
        }
        const img = {
            width : '50px',
            height : '50px'
        }
        const loader = {
            width : '100px',
            height : '100px',
            left : '50%',
            top : '50%',
            position : 'absolute',
            transform : 'translate(-50%)'
        }
        const input = {
            width : '30%',
            padding : '5px 0',
            margin : '5px 0'
        }
        const error = {
            color : "red",
            margin : "3px 0",
            padding : "0"
        }
        const search = {
            width : "95%",
            padding : "5px 0",
            margin : "0 5px"
        }
        return(
            <>
                <h1>"API calling fetch"</h1>
                <input 
                    type="search"
                    name="search"
                    onChange={this.handleSearch}
                    placeholder="Search here..."
                    style={search}
                />
                <form onSubmit={this.handleSubmit} method="post">
                    <div>
                        <input type="hidden" name="id" value={this.state.formData.id}/>
                        <input type="text" name="email" value={this.state.formData.email} placeholder="Email..." style={input} onChange={this.handleChange}/>
                        {errorData?.email && <p style={error}>{errorData?.email}</p>}
                    </div>
                    <div>
                        <input type="password" name="password" value={this.state.formData.password} placeholder="Password..." style={input} onChange={this.handleChange}/>
                        {errorData?.password && <p style={error}>{errorData?.password}</p>}
                    </div>
                    <div>
                        <input type="text" name="name" value={this.state.formData.name} placeholder="Name..." style={input} onChange={this.handleChange}/>
                        {errorData?.name && <p style={error}>{errorData?.name}</p>}
                    </div>
                    <div>
                        <input type="text" name="role" value={this.state.formData.role} placeholder="Role..." style={input} onChange={this.handleChange}/>
                        {errorData?.role && <p style={error}>{errorData?.role}</p>}
                    </div>
                    <div>
                        <input type="text" name="avatar" value={formData.avatar} placeholder="avatar..." style={input} onChange={this.handleChange}/>
                        {errorData?.avatar && <p style={error}>{errorData?.avatar}</p>}
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
                <select onChange={this.handleSort}>
                    <option value={""}>Default</option>
                    <option value={"asc"}>Ascending</option>
                    <option value={"dsc"}>Descending</option>
                </select>
                {/* {this.state.loading && <img src={loading} style={loader}/>} */}
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>EMAIL</th>
                            <th>NAME</th>
                            <th>PASSWORD</th>
                            <th>ROLE</th>
                            <th>AVATAR</th>
                            <th>DELET</th>
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            (this.state.loading) ? 
                                <tr><td><img src={loading} style={loader}/></td></tr>
                                    :
                                users ? 
                                    users?.map((user, index) => 
                                        (
                                            <tr key={index}>
                                                <td>{user?.id}</td>
                                                <td>{user?.email}</td>
                                                <td>{user?.name}</td>
                                                <td>{user?.password}</td>
                                                <td>{user?.role}</td>
                                                <td><img src={user?.avatar} style={img}/></td>
                                                <td><button onClick={() => this.handleDelete(user?.id)}>Delete</button></td>
                                                <td><button onClick={() => this.handleEdit(user?.id)}>Edit</button></td>
                                            </tr>
                                        )
                                    ) 
                                    :
                            <tr>
                                <td>"No data Found! :("</td>
                            </tr>
                        }         
                    </tbody>
                </table>
            </>
        )
    }
}

export default Apiclass;