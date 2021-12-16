import React from "react";
import moment from "moment";
import { Router, useRouter } from "next/router";
import { Skeleton, Button } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "../store/actions/cart";
import Slider from "react-slick";
import { toast } from "react-toastify";
const ProductComponent = ({ data }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.cart);
  const userData = useSelector((state: any) => state.auth);

  const added = state.filter((x) => {
    return x.id === data.id;
  });
  console.log(added, "mmo");
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dotsClass: "slick-dots slick-thumb",
    cssEase: "linear",
    // vertical: true,

    appendDots: (dots) => (
      <div
        style={{
          marginBottom: 34,
          width: "100%",
          display: "flex",
          justifyContent: "center",
          height: 20,
          alignItems: "flex-start",
        }}
      >
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          style={{ cursor: "default" }}
        >
          <ul className="discover-dots-ul"> {dots} </ul>
        </div>
      </div>
    ),
    customPaging: (i) => <div className="dots-discover"></div>,
  };
  const cartHandler = () => {
    if (added.length !== 0) {
      dispatch(removeCart(data));
      toast.error("Item removed successfully.", {
        position: "bottom-left",
        autoClose: 10000,
        toastId: "removeitem",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      if (userData.user) {
        dispatch(addToCart(data));
        toast.success("Item added successfully.", {
          position: "bottom-left",
          autoClose: 10000,
          toastId: "additem",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("please sign in.", {
          position: "bottom-left",
          autoClose: 10000,
          toastId: "carterror",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };
  return (
    <div className="space-y-5 shadow-2xl">
      {/* <Image className="object-cover" src={data.image ? data.image : "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"} width={270} height={270} /> */}
      <Slider {...settings}>
        <div className="p-3 ">{data.image ? <Image className="object-contain" src={data.image} width={270} height={270} /> : <Skeleton variant="rectangular" width={"100%"} height={270} />}</div>
        <div className="p-3 ">{data.image ? <Image className="object-contain" src={data.image} width={270} height={270} /> : <Skeleton variant="rectangular" width={"100%"} height={270} />}</div>
      </Slider>

      <div className="p-3 space-y-2">
        {data.title ? <h1 className="text-xl">{data && data.title ? data.title.slice(0, 10) + "..." : data.title}</h1> : <Skeleton variant="text" />}
        {data.price ? <h6 className="text-xs">{data.price + "$"}</h6> : <Skeleton variant="text" />}
        {data.price ? (
          <Button variant="contained" className="bg-black text-white hover:bg-white hover:text-black" onClick={cartHandler}>
            {added.length !== 0 ? "Remove from cart" : "Add to cart"}
          </Button>
        ) : (
          <Skeleton variant="text" />
        )}
      </div>
    </div>
  );
};

export default ProductComponent;