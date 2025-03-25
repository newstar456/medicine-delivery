'use client';
import React, { useState, useEffect} from "react"
import axios from "axios"
import CartItem from "@/components/CartItem";
import SubmitButton from "@/components/Submit-button";
import { useActionState } from 'react';
import { addCustomerAction } from "../../../actions";

const initialState = {
  message: '',
  errors: null,
};

const Cart = () => {

  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [state, formAction] = useActionState(addCustomerAction, initialState);

  useEffect(() => {
      const fetchData = async () => {
          try {
            await axios.get("https://medicine-delivery-server.vercel.app/cart")
              .then((response) => {
                  const obj = JSON.parse(response.data)
                setData(obj);
                function total(){
                  let temp = obj.map(function(item){
                    return item.price*item.quantity
                  })
                  let sum = temp.reduce(function(prev, next){
                    return prev+next
                  }, 0)
                  return sum
                }
                let totalCart = total();
                setTotal(totalCart);
                localStorage.setItem("cart", JSON.stringify(obj));
              });
          } catch (error) {
            console.error(error);
          }
      };
      fetchData();
  }, []);

  const contentCart = data.map(item => <CartItem item={item} key={item.id}/>)

  return (
    <div className="flex flex-row gap-8 pt-[125px] p-10 justify-evenly" >

      <form className="min-w-[450px]" action={formAction}>
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input type="text" id="name" name="name" className="border border-inherit rounded-sm w-full"/>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" className="border border-inherit rounded-sm w-full"/>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input type="number" id="phone" name="phone" className="border border-inherit rounded-sm w-full"/>
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <textarea id="address" name="address" className="border border-inherit rounded-sm w-full"></textarea>
          </div>
          
          <SubmitButton total={total} />
      </form>

      <div className=" overflow-y-scroll h-[100vh]"> {contentCart}</div>
    </div>

  )
}

export default Cart