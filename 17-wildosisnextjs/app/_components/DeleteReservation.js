"use client"

import { TrashIcon } from '@heroicons/react/24/solid';

import { useTransition } from 'react';
import SpinnerMini from './SpinnerMini';

function DeleteReservation({ bookingId,onDeleteBooking }) {
  const [isPending, startTransition]=useTransition()
  function handelDelete() {
    if(!confirm("Are you sure you want to delete this booking?")){
      return;
  }
    startTransition(()=>onDeleteBooking(bookingId))
  }
  return (
    <button disabled={isPending} onClick={handelDelete} className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'>
      
     {!isPending? <><span className='mt-1'>Delete</span><TrashIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' /></>:<SpinnerMini />}
    </button>
  );
}

export default DeleteReservation;
