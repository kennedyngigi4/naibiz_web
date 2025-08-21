"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const DashboardLayout = ({ children}: { children: React.ReactNode}) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (session?.user?.role == "professional") {
            window.location.href = "/professional/";
        }
        
        if (status === "loading") return;

        if (status === "unauthenticated") {
            router.push("/auth/login");
        } else {
            
            setIsReady(true);
        }

    }, [status, router]);

    

    return (
        <div>{children}</div>
    )
}

export default DashboardLayout