'use client'
import React, {useState} from 'react'
import axios from "axios"
import Image from 'next/image'
import { StarSolid, StarEmpty } from './Icons'

const Med = ({med}) => {
  
  let startingQty = 1;
  const [quantity, setQuantity] = useState(startingQty);
  const [favorite, setFavorite] = useState(med.favorite)
  const qtyDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1)
  }
  const qtyIncrease = () => setQuantity(quantity + 1)

  const addToCart = async () => {
    const medToAdd = {...med, quantity:quantity}
    try {
      const response = await axios.post(
        "https://medicine-delivery-server.vercel.app", 
        medToAdd, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true 
        }
      );
      // console.log(response.config.data);
      console.log(response.data);
      return response.config.data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFav = async () => {
    setFavorite(!favorite);
    try {
      const response = await axios.update(
        "https://medicine-delivery-server.vercel.app", 
        favorite, 
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true 
        }
      );
      // console.log(response.config.data);
      console.log(response.data);
      return response.config.data;
    } catch (error) {
      console.error(error);
    }
  };  


  return (
    <div className='p-10 relative'>
      <div className='absolute top-15 left-15 z-10' onClick={toggleFav}>{favorite ? <StarSolid /> : <StarEmpty />}</div>
      <div className="relative h-80 w-100 bg-center">
        <Image src={med.img} alt={med.name} fill={true} className="rounded-xl" sizes="fill" style={{ objectFit: 'cover' }} />
      </div>
      <div className='flex flex-row justify-evenly items-center pt-6'>
        <div className='font-bold uppercase'>{med.name}</div>
        <div className='flex flex-row justify-between items-center gap-1'>
          <div onClick={qtyDecrease} className='w-6 cursor-pointer hover:font-bold'>{'<'}</div>
          <div className='font-bold'>{quantity}</div>
          <div onClick={qtyIncrease} className='w-6 text-right cursor-pointer hover:font-bold'>{'>'}</div>
        </div>
        <div>{`price: ${med.price} uah`}</div>
      </div>
      <div className='flex flex-row justify-between pt-6'>
      <p>shop: {med['Shops'].name}</p>
      <button variant='outlined' onClick={addToCart} className='text-sm uppercase border border-inherit px-3 py-1 rounded-sm hover:outline-1 hover:bg-[#333C45] cursor-pointer'>add to Cart</button>
      </div>
      </div>
  )
}

export default Med

