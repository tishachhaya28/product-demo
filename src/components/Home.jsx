import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "./dataTable";
import "../CSS/dataTable.css"
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    // console.log(posts);
    useEffect(() => {
        getData();
    }, [])
    const handleEdit = (id) => {
        console.log(id, "id here");
        navigate(`/data/${id}`)
    }
    const getData = async () => {
        let response = await axios.get(`https://dummyjson.com/posts`);
        let { posts } = response.data
        console.log(posts);
        setPosts(posts);
    }
    return(
        <>
            <h1>Home</h1>
            <DataTable posts={posts} handleEdit={handleEdit}/>
        </>
    )
}

export default Home;