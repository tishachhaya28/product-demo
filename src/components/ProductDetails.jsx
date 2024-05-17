import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    // let para = useParams();
    // console.log(para);
    let { productId } = useParams()
    console.log(productId);
    useEffect(() => {
        if(productId){
            geteData();
        }
    }, [productId])    
    const geteData = async () => {
        let response = await fetch(`https://dummyjson.com/products/${productId}`);
        let data = await response.json();
        console.log(data);
    }
    return(
        <h1>ProductDetails</h1>
    )
}

export default ProductDetails;