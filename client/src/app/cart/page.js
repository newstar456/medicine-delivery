'use client';
import React, { useState, useEffect, useMemo} from "react"
import axios from "axios"
import CartItem from "@/components/CartItem";


const Cart = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
            await axios.get("https://medicine-delivery-server.vercel.app/cart")
              .then((response) => {
                  const obj = JSON.parse(response.data)
                setData(obj);
                localStorage.setItem("cart", JSON.stringify(data));
              });
          } catch (error) {
            console.error(error);
          }
      };
      fetchData();
      
  }, []);

  
  // console.log(data);

  const contentCart = data.map(item => <CartItem item={item} key={item.id}/>)

  return (
    <div className='pt-[125px] p-10'>{contentCart}</div>
    // <p>Cart</p>
    //////to add from + Submit
  )
}

export default Cart