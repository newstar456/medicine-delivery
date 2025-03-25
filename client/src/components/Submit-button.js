'use client';
import React, { useState, useEffect} from "react"
import { useFormStatus } from 'react-dom';

function SubmitButton({total, finalState}) {
  const { pending } = useFormStatus();


  //   useEffect(() => {
  //     createOrder();

  // }, [finalState, createOrder]);

    const createOrder = () => { console.log(finalState); }

  // console.log(finalState);

  return (
    <div className='flex flex-row justify-between align-middle'>
        <p>Total cost: {total} uah</p>
        <button type="submit" className="bg-orange-900 hover:bg-orange-950 text-white w-50 px-6 py-3 rounded-md" aria-disabled={pending} onClick={createOrder}>
            {pending ? 'Loading...' : 'Add'}
        </button>
    </div>

  );
}

export default SubmitButton;