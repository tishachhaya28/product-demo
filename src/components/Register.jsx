import { useFormik } from 'formik';
import '../App.css';
import axios from 'axios';

const Register = () => {
    const formik = useFormik({
        initialValues : {
            name : '',
            email : '',
            password : ''
        },
        validate : (values) => {
            let error = {}
            if(!values.name){
                error.name = 'Please enter your name';
            }
            if(!values.email){
                error.email = 'Please enter your email';
            }
            if(!values.password){
                error.password = 'Please enter your password';
            }
            return error;
        }, 
        onSubmit : async (values) => {
            console.log(values);
            let response = await axios.get(`https://dummyjson.com/products`, values);
            console.log(response);
        }
    })
    console.log(process.env.REACT_APP_ENDPOINT);
    return(
        <>  
            <h1>Register</h1>
            <form onSubmit={formik?.handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        name='name' 
                        value={formik?.values.name}
                        placeholder='enter your name'
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                    />
                    {formik?.errors?.name && <p className="error">{formik?.errors?.name}</p>}
                </div>
                <div>
                    <input 
                        type='email'
                        name='email'
                        value={formik?.values?.email}
                        placeholder='enter your email'
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                    />
                    {formik?.errors?.email && <p className="error">{formik?.errors?.email}</p>}
                </div>
                <div>
                    <input 
                        type='password'
                        name='password'
                        value={formik?.values?.password}
                        placeholder='enter your password'
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                    />
                    {formik?.errors?.password && <p className="error">{formik?.errors?.password}</p>}
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Register;