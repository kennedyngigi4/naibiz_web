import React from 'react'
import Link from 'next/link'

import AdminNavbar from '@/app/components/navbar/admin-navbar'
import AdminSidebar from '@/app/components/admin/admin-sidebar'
import BackToTop from '@/app/components/back-to-top'

import { bookingData } from '@/app/data/data'

import { BsCheck2Circle, BsEnvelopeDash, BsX } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa6'
import Image from 'next/image'

interface BookingData{
    image: string;
    title: string;
    tag: string;
    pending: boolean;
    unpaid: boolean;
    approved: boolean;
    cancelled: boolean;
    reject: boolean;
    approve: boolean;
    sendMsg: boolean;
    date: string;
    info: string;
    name: string;
    contact: string;
    price: string;
}

export default function MyBookings() {
  return (
    <>
        <AdminNavbar/>

        <section className="p-0">
            <div className="container-fluid p-0">
                <div className="row user-dashboard g-0">
                    
                    <AdminSidebar/>
                    
                    <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                        <div className="user-dashboard-box bg-light">
                            
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 py-lg-0 py-5">
                                <h2 className="fw-medium mb-0">Recent Bookings</h2>
                            </div>
                            
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header px-4 py-3">
                                                <h4 className="m-0">Recent Bookings</h4>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="dashboardListgroup">
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row align-items-start g-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                          <p className="text-muted m-0">© {new Date().getFullYear()} Nairobi Business. Develop with <FaHeart className="ms-1 text-danger"></FaHeart>  By <Link href="https://savannahsoftwaresolutions.co.ke/" target="_blank">Savannah Software Solutions</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>  
        <BackToTop/>  
    </>
  )
}
