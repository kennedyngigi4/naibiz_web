"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DashboardLayout = ({ children}: { children: React.ReactNode}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/auth/login");
        } else {
            setIsReady(true);
        }

    }, [status, router]);

    // if(!isReady){
    //     return <div className='text-center'>Loading ...</div>
    // }

    return (
        <section>{children}</section>
    )
}

export default DashboardLayout