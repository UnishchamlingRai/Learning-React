"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./Auth";
import { getBookings, updateGuest } from "./data-service";
import { supabase } from "@/app/_lib/supabase";
import { redirect } from "next/navigation";

export async function UpdateGuestProfile(formData){
    const session=await auth()
    
    if(!session){
        throw new Error("Please sign in")
    }
    const nationalID=formData.get("nationalID")
    const [nationality,countryFlag]=formData.get("nationality").split("%s")
    const regex = /^[A-Za-z]{6,12}$/;
     
    if(!regex.test(nationalID)){
        throw new Error("Please enter a valid National ID")
    }
    
    const updatedFields={
        nationality,
        countryFlag,
        nationalID
    }
    

   await updateGuest(session.user.guestId,updatedFields)
   revalidatePath("/account/profile")
}

export async function deleteReservation(bookingId){
    const session=await auth()
    if(!session){
        throw new Error("Please sign in")
    }
   
    
    const bookings=await getBookings(session.user.guestId)
    const guestBookingIds=bookings.map(booking=>booking.id)
    if(!guestBookingIds.includes(bookingId)){
        throw new Error("You are not allowed to delete this booking")
    }

    const {  error } = await supabase.from('bookings').delete().eq('id', bookingId);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  revalidatePath("/account/reservations")
  
}

export async function updateBooking(formData){
    const bookingId=Number(formData.get("bookingId"))
    const observations=formData.get("observations").slice(0,500)
    const numGuests=formData.get("numGuests")

    const session=await auth()
    if(!session){
        throw new Error("Please sign in")
    }
    const bookings=await getBookings(session.user.guestId)
    const guestBookingIds=bookings.map(booking=>booking.id)
    if(!guestBookingIds.includes(bookingId)){
        throw new Error("You are not allowed to delete this booking")
    }

   

    const updatedFields={
        observations,
        numGuests
    }
    const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', bookingId)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  revalidatePath("/account/reservations/edit/[bookingId]")
    redirect(`/account/reservations`)
}

export async function createBooking(bookingData,formData){
    const session=await auth()
    if(!session){
        throw new Error("Please sign in")
    }
    console.log("bookingData:",bookingData)
    console.log(formData)
    const newBooking={
        ...bookingData,
        observations:formData.get("observations").slice(0,500),
        numGuests:Number(formData.get("numGuests")),
        guestId:session.user.guestId,
        status:"unconfirmed",
        extrasPrice:0,
        totalPrice:bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
    }

    const { error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // So that the newly created object gets returned!
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
   revalidatePath(`/cabins/${bookingData.cabinId}`)
   redirect("/cabins/thankyou")



    
}


export async function signInAction(){
    await signIn("google",{redirectTo:"/account"})
}

export async function signOutAction(){
    await signOut({redirectTo:'/'})
}