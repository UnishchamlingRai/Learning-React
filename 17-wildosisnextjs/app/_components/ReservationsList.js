"use client";
import React from 'react';
import { useOptimistic } from 'react'
import ReservationCard from "@/app/_components/ReservationCard";
import { deleteReservation } from '@/app/_lib/action';
const ReservationsList = ({ bookings }) => {
    const [optimisticBookings,deleteBookingOptimistic]=useOptimistic(bookings,(currBookings,bookingId)=>{
        return currBookings.filter((booking)=>booking.id!==bookingId)
    })


  async  function handelDelete(bookingId) {
        deleteBookingOptimistic(bookingId)
        await deleteReservation(bookingId)

    }

    return  <ul className="space-y-6">
    {optimisticBookings.map((booking) => (
      <ReservationCard booking={booking} onDeleteBooking={handelDelete} key={booking.id}  />
    ))}
  </ul>
}

export default ReservationsList;
