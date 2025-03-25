'use client';
import React from "react"
import { useFormStatus } from 'react-dom';

function SubmitButton({total}) {
  const { pending } = useFormStatus();

  return (
    <div className='flex flex-row justify-between align-middle'>
        <p>Total cost: {total} uah</p>
        <button type="submit" className="bg-orange-900 hover:bg-orange-950 text-white w-30 px-6 py-3 rounded-md" aria-disabled={pending} >
            {pending ? 'Loading...' : 'Add'}
        </button>
    </div>

  );
}

export default SubmitButton;