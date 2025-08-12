"use client";

import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const ReferralTracker = () => {
    const searchParams = useSearchParams();
    const ref = searchParams.get('ref');

    useEffect(() => {
        
        if(ref){
            fetch(`${process.env.NEXT_PUBLIC_APIURL}/affiliate/click/${ref}/`, {
                method: 'GET',
                credentials: 'include',
            }).catch(console.error);
        }
    }, [ref]);

    return null;
}

export default ReferralTracker