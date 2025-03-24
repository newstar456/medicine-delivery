'use client'
import React, {useState} from 'react'
import axios from "axios"
import Image from 'next/image'


const Med = ({med}) => {
  
  let startingQty = 1;
  const [quantity, setQuantity] = useState(startingQty)
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
    // console.log(JSON.parse(response.config.data));
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


  console.log(med);
  return (
    <div>
      {/* <Image src={`${med.img}`} width={500} height={250} alt="Picture of meds" className="rounded-t" sizes="100vw"  style={{ objectFit: 'cover' }}/> */}
        <Image 
        src={med.img} 
        alt="Example Image"
        width={500} 
        height={300} 
      />
      <div>
        <div>{med.name}</div>
        <div >
          <div onClick={qtyDecrease}>{'<'}</div>
          <div sx={{fontStyle:`bold`}}>{quantity}</div>
          <div onClick={qtyIncrease}>{'>'}</div>
        </div>
        <div>{`price: ${med.price} грн`}</div>
      </div>
      <div ><button variant='outlined' onClick={addToCart}>add to Cart</button></div>
      </div>
    
  )
}

export default Med

