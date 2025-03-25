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
    const [state, formAction] = useActionState(addCustomerAction, initialState);

  useEffect(() => {
      const fetchData = async () => {
          try {
            await axios.get("https://medicine-delivery-server.vercel.app/cart")
              .then((response) => {
                  const obj = JSON.parse(response.data)
                setData(obj);
                localStorage.setItem("cart", JSON.stringify(obj));
              });
          } catch (error) {
            console.error(error);
          }
      };
      fetchData();
  }, []);

  const contentCart = data.map(item => <CartItem item={item} key={item.id}/>)

  console.log(state);

  return (

      <form className="flex flex-row gap-8 pt-[125px] p-10" action={formAction}>
        <div className="p-10 border border-inherit rounded-sm fixed w-1/3">
          <div className="mb-6">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input type="text" id="name" name="name" className="border border-inherit rounded-sm w-full"/>
            {state?.errors?.name && (
              <span id="name-error" className="text-red-600 text-sm">
                {state.errors.name.join(',')}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input type="email" id="email" name="email" className="border border-inherit rounded-sm w-full"/>
            {state?.errors?.email && (
              <span id="email-error" className="text-red-600 text-sm">
                {state.errors.email.join(',')}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block mb-2">
              Phone
            </label>
            <input type="number" id="phone" name="phone" className="border border-inherit rounded-sm w-full"/>
            {state?.errors?.phone && (
              <span id="phone-error" className="text-red-600 text-sm">
                {state.errors.phone.join(',')}
              </span>
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2">
              Address
            </label>
            <textarea id="address" name="address" className="border border-inherit rounded-sm w-full"></textarea>
            {state?.errors?.address && (
              <span id="address-error" className="text-red-600 text-sm">
                {state.errors.address.join(',')}
              </span>
            )}
          </div>
        </div>
        <div className="border border-inherit rounded-sm overflow-y-scroll h-lvh ml-100">
          <div className=""> {contentCart}</div>
          <SubmitButton />
        </div>
      </form>



///shv - ; h-screen?; h-min-; h-lvh-
   
    
    

  )
}

export default Cart