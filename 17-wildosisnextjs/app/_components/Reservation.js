import { getBookedDatesByCabinId, getSettings } from "@/app/_lib/data-service";
import DateSelector from './DateSelector';
import ReservationForm from './ReservationForm';
import { auth } from "../_lib/Auth";
import LoginMessage from "./LoginMessage";
const Reservation = async ({cabin}) => {
    const [settings,bookedDates]=await Promise.all([getSettings(),getBookedDatesByCabinId(cabin.id)])
    const session=await auth()
    return (
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector settings={settings} cabin={cabin} bookedDates={bookedDates}/>
          {session?.user?<ReservationForm cabin={cabin} user={session.user}/>:<LoginMessage />}
        </div>
    );
}

export default Reservation;
