import React from 'react';
import Spinner from '@/app/_components/Spinner';

const Loading = () => {
    return <div className='grid justify-center items-center'>
        <Spinner/>
        <h2>Loading Cabins data.....</h2>
    </div>
}

export default Loading;
