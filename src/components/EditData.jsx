import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { useEffect } from "react";
import axios from "axios";

const EditData = () => {
    let {id} = useParams();
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues : {
            title : '',
            body : '',
            userId : '',
            tags : '',
            reactions : ''
        },
        validate : (values) => {
            let error = {};
            if(!values?.title){
                error.title = "Please enter your title";
            }
            if(!values?.body){
                error.body = "Please enter your body-description";
            }
            if(!values?.userId){
                error.userId = "Please enter your user-id";
            }
            if(!values?.tags){
                error.tags = "Please enter your tags";
            }
            if(!values?.reactions){
                error.reactions = "Please enter your reactions";
            }
            return error;
        },
        onSubmit : async (values) => {
            console.log(values);
            let response = await axios.get(`https://dummyjson.com/posts`);
            let { data } = response; 
            console.log(data, "here tisha");
            let { posts } = data
            let pIndex = posts.findIndex((p) => p.id == values.id)
            console.log(pIndex, "here index");
            posts[pIndex] = values
            console.log(data, "here new data");
            navigate('/', { state: { updatedPost: { ...values, id } } });
        }
    })
    // console.log(id, "me");
    useEffect(() => {
        getData(id);
    }, [])

    const getData = async (id) => {
        let response = await axios.get(`https://dummyjson.com/posts/${id}`);
        const { data } = response;
        formik.setValues({
            title: data.title,
            body: data.body,
            userId: data.userId,
            tags: data.tags,
            reactions: data.reactions,
            id : id
        });
    }

    return (
        <>
            <h1>Edit Data {id}</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input 
                        type="text"
                        name="title"
                        value={formik?.values?.title}
                        onChange={formik?.handleChange}
                        placeholder="enter your title"
                        className={formik?.errors?.title && "error-field"}
                    />
                    {formik?.errors?.title && <p className="error">{formik?.errors?.title}</p>}
                </div>
                <div>
                    <input 
                        type="text"
                        name="body"
                        value={formik?.values?.body}
                        onChange={formik?.handleChange}
                        placeholder="enter your body"
                        className={formik?.errors?.body && "error-field"}
                    />
                    {formik?.errors?.body && <p className="error">{formik?.errors?.body}</p>}
                </div>
                <div>
                    <input 
                        type="text"
                        name="userId"
                        value={formik?.values?.userId}
                        onChange={formik?.handleChange}
                        placeholder="enter your userId"
                        className={formik?.errors?.userId && "error-field"}
                    />
                    {formik?.errors?.userId && <p className="error">{formik?.errors?.userId}</p>}
                </div>
                <div>
                    <input 
                        type="text"
                        name="tags"
                        value={formik?.values?.tags}
                        onChange={formik?.handleChange}
                        placeholder="enter your tags"
                        className={formik?.errors?.tags && "error-field"}
                    />
                    {formik?.errors?.tags && <p className="error">{formik?.errors?.tags}</p>}
                </div>
                <div>
                    <input 
                        type="text"
                        name="reactions"
                        value={formik?.values?.reactions}
                        onChange={formik?.handleChange}
                        placeholder="enter your reactions"
                        className={formik?.errors?.reactions && "error-field"}
                    />
                    {formik?.errors?.reactions && <p className="error">{formik?.errors?.reactions}</p>}
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>    
    )
}

export default EditData;