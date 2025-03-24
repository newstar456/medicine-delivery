// const express = require ('express')
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
// app.use(cors())


app.use(cors({
  origin: ["http://localhost:3000", 'https://medicine-delivery-client.vercel.app'], 
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.options('*', cors()); 

import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://eyxccahssmwxluobjzyb.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5eGNjYWhzc213eGx1b2JqenliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MTE3NDYsImV4cCI6MjA1Nzk4Nzc0Nn0.EyAezK8taMRdmnGdvmQFSI2wtbEhFqlsBjE8n4NQIu4')

app.get('/', (req, res) => {
  async function fetchShops() { 
    try {
      const {data, error} = await supabase.from('Meds').select('id, name, price, available_qty, shop_id, img, favorite, Shops(id,name, adress, title)');
      res.status(200).json(JSON.stringify(data, null, 2));
      console.log('Connection to SUPABASE has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  } 
  fetchShops();
});

app.post('/', async (req, res) => {
  try {
    const {data, error} = await supabase.from('Carts').select();
    // res.status(200).json(JSON.stringify({hello:'hello'}, null, 2));
    const itemExists = await data.find((item) => item.name === req.body.name&&item.shop===req.body.shop_id);
    res.status(200).json(JSON.stringify(itemExists, null, 2));
    // if(itemExists.length !== 0) {
      // const newQty = Number(itemExists.quantity) + Number(req.body.quantity);
      // await supabase.from('Carts').update({ 'quantity': `${newQty}` }).eq('id', `${itemExists.id}`);
      // res.status(200).json(JSON.stringify(itemExists.length, null, 2));
    // } else {
      // res.status(200).json(JSON.stringify({1: 'item doesnt exist'}, null, 2));
      // const idInCart = `${Number(new Date().getTime())}`
      // const newItem =  { id:`${Number(new Date().getTime())}`, name:req.body.name, shop:req.body.shop_id, quantity:req.body.quantity, price:req.body.price};
      // await supabase.from('Carts').insert({'id': `${idInCart}`, 'name': `${req.body.name}`, 'shop':`${req.body.shop_id}`, 'quantity':`${req.body.quantity}`, 'price':`${req.body.price}`});
      // res.status(200).json(JSON.stringify(idInCart, null, 2));
    // }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// app.get('/home', (req, res) => {
//   res.status(200).json('Welcome, your app is working well');
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// app.listen(4000, console.log('Server has started on port 4000'))