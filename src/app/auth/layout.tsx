"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AuthLayout = ({ children } : Readonly<{ children: React.ReactNode}>) => {

    const {data:session, status} = useSession();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);
    
    useEffect(() => {
        if (status === "loading") return;

        if(status === "authenticated") {
            router.push("/dashboard");
        } else {
            setIsReady(true);
        }
    }, [status, router]);

    if(!isReady){
        return <div className='text-center'>Loading ...</div>
    }

    return (
        <div>{children}</div>
    )
}

export default AuthLayout