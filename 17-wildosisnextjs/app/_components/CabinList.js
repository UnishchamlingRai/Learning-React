import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import { getCabins } from '@/app/_lib/data-service';

import CabinCard from "@/app/_components/CabinCard";
export default async function CabinList({filter}) {
  
  let filteredCabins;
  noStore()
    const cabins = await getCabins();
    if(filter==="All") filteredCabins=cabins
    if(filter==="small") filteredCabins=cabins.filter((cabin)=>cabin.maxCapacity>=1 && cabin.maxCapacity<=3)
    if(filter==="medium") filteredCabins=cabins.filter((cabin)=>cabin.maxCapacity>=4 && cabin.maxCapacity<=7)
    if(filter==="large") filteredCabins=cabins.filter((cabin)=>cabin.maxCapacity>=8 && cabin.maxCapacity<=12)
     
   
    // console.log(filteredCabins)
    return <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
    {filteredCabins.map((cabin) => (
      <CabinCard cabin={cabin} key={cabin.id} />
    ))}
  </div>
}


