'use client';
import React, {useState}  from 'react'
import Image from 'next/image'
import axios from "axios"

const CartItem = ({item}) => {

  const [quantity, setQuantity] = useState(item.quantity)

  const qtyDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1)
  }
  const qtyIncrease = () => setQuantity(quantity + 1)

  const removeFromCart = async () => {
    try {
      const response = await axios.delete(
        "https://medicine-delivery-server.vercel.app/cart", 
        item, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true 
        }
      );
      console.log(response.data);
      return response.config.data;
    } catch (error) {
      console.error(error);
    }
};

  return (
    <div className='flex flex-row p-10'>
        <div className="relative h-80 w-100 bg-center">
            <Image src={item['Meds'].img} alt={item['Meds'].name} fill={true} className="rounded-xl" sizes="fill" style={{ objectFit: 'cover' }} />
         </div>
         <div className='flex flex-col justify-evenly items-center pl-20'>
            <div>{item.name}</div>
            <div>{item.price}</div>
            <div className='flex flex-row justify-between items-center gap-1'>
              <div onClick={qtyDecrease} className='w-6 cursor-pointer hover:font-bold'>{'<'}</div>
              <div className='font-bold'>{quantity}</div>
              <div onClick={qtyIncrease} className='w-6 text-right cursor-pointer hover:font-bold'>{'>'}</div>
            </div>
            <button variant='outlined' onClick={removeFromCart} className='text-sm uppercase border border-inherit px-3 py-1 rounded-sm hover:outline-1 hover:bg-[#333C45] cursor-pointer'>Remove</button>
        </div>
    </div>
  )
}

export default CartItem