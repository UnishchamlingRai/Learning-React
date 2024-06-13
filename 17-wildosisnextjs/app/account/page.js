import React from 'react';
import { auth } from '../_lib/Auth';
export const metadata={
    title:"Account"
}
const Page =async () => {
    const session=await auth()
    console.log(session)
    return (
        <div>
            <h1 className='font-semibold text-2xl text-accent-500 mb-4'>Welcom {session.user.name}</h1>
        </div>
    );
}

export default Page;
