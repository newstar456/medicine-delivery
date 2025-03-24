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

app.get('/', async (req, res) => {
  try {
    const {data, error} = await supabase.from('Meds').select('id, name, price, available_qty, shop_id, img, favorite, Shops(id,name, adress, title)');
    res.status(200).json(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.post('/', async (req, res) => {
  try {
    const {data, error} = await supabase.from('Carts').select();
    const itemExists = await data.find((item) => item.name === req.body.name&&item.shop===req.body.shop_id);
    if(itemExists) {
      const newQty = Number(itemExists.quantity) + Number(req.body.quantity);
      await supabase.from('Carts').update({ 'quantity': `${newQty}` }).eq('id', `${itemExists.id}`);
      res.status(200).json(JSON.stringify({itemExists:itemExists, newQty:newQty}, null, 2));
    } else {
      res.status(200).json(JSON.stringify({1: 'item doesnt exist'}, null, 2));
      const idInCart = `${Number(new Date().getTime())}`
      await supabase.from('Carts').insert({'id': `${idInCart}`, 'name': `${req.body.name}`, 'shop':`${req.body.shop_id}`, 'quantity':`${req.body.quantity}`, 'price':`${req.body.price}`});
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cart', async (req, res) => {
  try {
    const {data, error} = await supabase.from('Carts').select('id, name, shop, quantity, price, Meds(id,name, price, available_qty, shop_id, img, favorite)');
    res.status(200).json(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

app.post('/cart', async (req, res) => {
  try {
    await supabase.from('Carts').delete().eq('id', req.body.id);
    res.status(200).json(JSON.stringify({1:'item removed'}, null, 2));

  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
