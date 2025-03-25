'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import Joi from "joi";
import axios from "axios"

export async function addCustomerAction(prevState, formData) {

    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(6).required(),
        phone: Joi.number().integer().required(),
        address: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    });

    if (error) {
        return {
            errors: error.details,
            message: 'Database Error: Failed to Validate input data.',
        };
    } else {
      const { name, email, phone, address } =  value;

        try {
            const response = await axios.post(
              "https://medicine-delivery-server.vercel.app/cart", 
              { name:name, email:email, phone:phone, address:address }, 
              {
                headers: {
                  'Content-Type': 'application/json'
                },
                withCredentials: true 
              }
            );
        } catch (e) {
            return {
                errors: error.details,
                message: 'Database Error: Failed to Add Customer.',
            };
        }

        try {
            await axios.get("https://medicine-delivery-server.vercel.app/cart")
              .then((response) => {
                  const obj = JSON.parse(response.data)
                    console.log(obj);
              });
        } catch (e) {
            return {
                errors: error.details,
                message: 'Database Error: Failed to Add Customer.',
            };
        }


    }

  revalidatePath('/');
  redirect('/');
}
