'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { BsBookmarkStar, BsBoxArrowDownRight, BsBoxArrowRight, BsChatDots, BsJournalCheck, BsPatchPlus, BsPersonLinesFill, BsSpeedometer, BsUiRadiosGrid, BsWallet, BsYelp } from 'react-icons/bs'
import { useSession, signOut } from 'next-auth/react';

export default function ProfessionalSidebar() {
    const [current , setCurrent] = useState('');
    const location = usePathname(); 
    const {data:session} = useSession();

    useEffect(()=>{
        setCurrent(location)
    });

    const logUserOut = async() => {
        await signOut();
        window.location.href = "/auth/login";
    }

  return (
    <div className="col-xl-2 col-lg-3 col-md-12">
        <div className="user-dashboard-inner h-100 border-end border-2 py-5 p-3 d-lg-block d-none">
            <div className="dashboard_users mb-4">
                <div className="square--80 circle mx-auto mb-1"><Image src='/icons/user.png' width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid circle" alt="User Image"/></div>
                <div className="user-nameTitle text-center">
                    <h4 className="lh-base fw-semibold text-light mb-0">Welcome Back</h4>
                    <h6 className="text-light text-capitalize fw-medium opacity-75 mb-0">{session?.user?.name}</h6>
                </div>
            </div>
            <div className="dashboard_Menu">
                <ul>
                    <li><Link href="/professional/" className={`${current === '/professional' ? 'active' : ''}`}><BsSpeedometer className="me-2"/>Dashboard Area</Link></li>
                    <li><Link href="/professional/my-profile" className={`${current === '/professional/my-profile' ? 'active' : ''}`}><BsPersonLinesFill className="me-2"/>My Profile</Link></li>
                    <li><Link href="/professional/bookings" className={`${current === '/professional/bookings' ? 'active' : ''}`}><BsWallet className="me-2"/>Bookings</Link></li>
                    <li><Link href="/professional/messages" className={`${current === '/professional/messages' ? 'active' : ''}`}><BsYelp className="me-2" />Messages</Link></li> 
                    <li><Link href="/professional/affiliate" className={`${current === '/professional/affiliate' ? 'active' : ''}`}><BsYelp className="me-2" />Affiliate</Link></li> 
                    <li onClick={logUserOut}><Link href="" className={`${current === '/dashboard-add-listing' ? 'active' : ''}`}><BsBoxArrowRight className="me-2"  /> Sign Out</Link></li>
                </ul>
            </div>
        </div>
    </div>
  )
}
