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
      console.error("Validation Error:", error.details);
    } else {
      const { name, email, phone, address } =  value;

        try {
            const response = await axios.post(
              "https://medicine-delivery-server.vercel.app/cart", 
              value, 
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









        } catch (e) {
            return {
                type: 'error',
                message: 'Database Error: Failed to Add Customer.',
            };
        }
    }

  revalidatePath('/');
  redirect('/');
}
