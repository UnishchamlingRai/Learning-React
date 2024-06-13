

import SubmitButton from "@/app/_components/SubmitButton";
import {  updateBooking } from "@/app/_lib/action";
import { getBooking, getCabin } from "@/app/_lib/data-service";


export default async function Page({ params }) {
  const {bookingId} = params;
  const guest=await getBooking(bookingId)
  // console.log("guest:", guest)
 
  // CHANGE
  
  const {numGuests,observations} = guest;
  const {maxCapacity}=await getCabin(guest.cabinId)
  // console.log(maxCapacity)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form action={updateBooking} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {/*  */}
         <SubmitButton padingLabel={"Updating..."}>Update Reservation</SubmitButton>
        </div>
        <input type="hidden" name="bookingId" value={bookingId} readOnly="" />
      </form>
    </div>
  );
}


