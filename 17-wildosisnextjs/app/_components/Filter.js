"use client"

import {  usePathname, useSearchParams,useRouter } from 'next/navigation';

import React from 'react';

const Filter = () => {
    const searchParams=useSearchParams()
    const router=useRouter()
    const pathname=usePathname()
    const filterUrl=searchParams.get("capacity")
    function handelFilter(filter){
        const params=new URLSearchParams(searchParams);
        params.set("capacity",filter)
        router.replace(`${pathname}?${params.toString()}`,{scroll:false})

    }
    
    
    
    
    return (
        <div className='border border-primary-900 py-1 px-2 flex gap-4'>
           <Button handelFilter={handelFilter} filterName={"All"} filterUrl={filterUrl}>All</Button>
           <Button handelFilter={handelFilter} filterName={"small"} filterUrl={filterUrl}>1 - 3</Button>
           <Button handelFilter={handelFilter} filterName={"medium"} filterUrl={filterUrl}>4 - 7</Button>
           <Button handelFilter={handelFilter} filterName={"large"} filterUrl={filterUrl}>8 - 12</Button>
           
        </div>
    );
}

function Button({handelFilter,filterName,filterUrl,children}){
    return  <button onClick={()=>handelFilter(filterName)} className={`hover:bg-primary-600 hover:text-primary-100 transition-colors px-3 rounded bg-primary-800 py-1 ${filterName===filterUrl?"bg-primary-600 text-primary-100":""}`}>{children}</button>
}

export default Filter;
