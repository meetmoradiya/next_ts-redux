import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import ProductComponent from "./ProductComponent";

const HotProducts = (props) => {
  // const BlogData =useSelector(state=>{ state.blogDataReducer})
  // const BlogData: any = useSelector((state: any) => state)
  // const dispatch = useDispatch()
  const [postData, setPostData] = React.useState([1, 2, 3, 4, 5]);
  useEffect(async () => {
    const data: any = await axios.get("https://fakestoreapi.com/products?limit=5");
    setPostData(data.data);
  }, []);
  return (
    <div className="mt-20">
      <div className="container mx-auto bg-white space-y-3">
        <h1 className="text-3xl font-bold">Hot Products</h1>
        <div className="grid grid-cols-5 gap-10">{postData && postData.map((data) => <ProductComponent data={data} />)}</div>
        <div className="text-right text-black font-semibold">
          <Link href={"/products"}> View More</Link>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return state;
}

export default HotProducts;
