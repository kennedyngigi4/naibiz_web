"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const AuthLayout = ({ children } : Readonly<{ children: React.ReactNode}>) => {

    

   

    return (
        <section>{children}</section>
    )
}

export default AuthLayout