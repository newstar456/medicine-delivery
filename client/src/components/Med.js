'use client'
import React, {useState} from 'react'
// import {Box, Typography, Stack, Grid2, Button} from '@mui/material'
// import { useTheme } from '@mui/material/styles'
// import styled from "styled-components"
// import {Buffer} from "buffer" 
import axios from "axios"

// const MedBox = styled(Box) (function () {
//   const theme = useTheme();
//   return {
//     color:`${theme.palette.text.secondary}`,
//     textAlign:"start",
//    [theme.breakpoints.up("mobile")]: {
//       // paddingBottom:'16px',
//       fontSize:'12px'
//     },
//     [theme.breakpoints.up("laptop")]: {
//       // margin:'15px',
//       fontSize:'16px'
//     }
//   }
// })
// const ImageBox = styled(Box) (function () {
//   const theme = useTheme();
//   return {
//     [theme.breakpoints.up("mobile")]: {
//       height:'90px',
//       width:'auto',
//     },
//     [theme.breakpoints.up("laptop")]: {
//       height:'120px',
//       width:'auto',
//     },
//     [theme.breakpoints.up("desktop")]: {
//       height:'150px',
//       width:'auto',
//     }
//   }
// })
// const QtyButtons = styled(Button) (function () {
//   const theme = useTheme();
//   return {
//       color:`${theme.palette.text.secondary}`,
//       fontSize:'16px',
//       '&:hover': {
//           fontWeight: 'bold',
//           backgroundColor: 'transparent',
//       }
//   }
// })
// const QtyStack = styled(Stack) (function () {
//   const theme = useTheme();
//   return {
//     color:`${theme.palette.text.secondary}`,
//     fontSize:'16px',
//     [theme.breakpoints.up("phone")]: {
//       display:'none'
//     },
//     [theme.breakpoints.up("tablet")]: {
//       display:'block'
//     },
//   }
// })

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


  // console.log(med);
  return (
    <div size={5} sx={{ border: ` 1px solid #EEEEEE`, borderRadius:'4px'}}>
      <div justifyContent="center" alignItems='center'> <div component="img" src={`${med.img}`}/></div>
      <div direction='row' sx={{justifyContent: "space-between", alignItems: "center"}}>
        <div>{med.name}</div>
        <div direction='row' justifyContent='center' alignItems='center'>
          <div onClick={qtyDecrease}>{'<'}</div>
          <div sx={{fontStyle:`bold`}}>{quantity}</div>
          <div onClick={qtyIncrease}>{'>'}</div>
        </div>
        <div>{`price: ${med.price} грн`}</div>
      </div>
      <div container spacing={0} justifyContent="right" alignItems='center'><button variant='outlined' onClick={addToCart}>add to Cart</button></div>
      </div>
    
  )
}

export default Med

