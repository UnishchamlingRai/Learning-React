import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service"

export async function GET(response,{params}){
  
    const {cabinId}=params

    try {
        const [cabin,bookedDates]=await Promise.all([getCabin(cabinId),getBookedDatesByCabinId(cabinId)])
        console.log(cabin)
        return Response.json({cabin,bookedDates})
    
    } catch (error) {
        return Response.json({message:error.message})
    }
  
}