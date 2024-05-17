import '../CSS/dataTable.css'
import EditData from './EditData';

function DataTable(props) {
    console.log(props.posts, "hello");
    return(
        <>
            <h1>Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>BODY</th>
                        <th>USER ID</th>
                        <th>TAGS</th>
                        <th>REACTION</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    { props.posts.map((post, index) => {
                        return(
                            <tr key={index}>
                                <td>{post?.id}</td>
                                <td>{post?.title}</td>
                                <td>{post?.body}</td>
                                <td>{post?.userId}</td>
                                <td>{post?.tags}</td>
                                <td>{post?.reactions}</td>
                                <td>
                                    <div>
                                        <button onClick={() => props.handleEdit(post?.id)}>Edit</button>
                                    </div>
                                    <div>
                                        <button>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default DataTable;