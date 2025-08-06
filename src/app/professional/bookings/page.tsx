"use client";

import ProfessionalSidebar from '@/app/components/admin/professional-sidebar';
import BackToTop from '@/app/components/back-to-top';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import MerchantAPIServices from '../../../../lib/services/merchant_api_services';

const BookingsPage = () => {

    const {data:session, status} = useSession();
    const [bookings, setBookings] = useState([]);
    
    useEffect(() => {
        const fetchBookings = async () => {
            if (!session?.accessToken) {
                throw new Error("You must be logged in.")
            }
            const res = await MerchantAPIServices.get("professional/my-bookings/", session?.accessToken);
            setBookings(res);
        }
        fetchBookings();
    }, [session]);

  return (
    <>
            <AdminNavbar/>
    
            <section className="p-0">
                <div className="container-fluid p-0">
                    <div className="row user-dashboard g-0">
                        <ProfessionalSidebar />
                        <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                            <div className="user-dashboard-box bg-light">
                                <div className="dashCaption p-xl-5 p-3 p-md-4">
                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        
                                    </div>
                                    
                                    <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="card rounded-3 shadow-sm">
                                                
                                                <div className='card-body'>
                                                  <h6>Bookings</h6>
                                                  <table className='table table-bordered table-striped'>
                                                    <thead>
                                                        <tr>
                                                            <th>Sent on</th>
                                                            <th>Date - Time</th>
                                                            <th>Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {bookings.map((item: any) => (
                                                            <tr key={item.id}>
                                                                <td>{new Date(item?.created_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"})}</td>
                                                                <td>{item?.date_booked} - {item?.time_booked}</td>
                                                                <td>{item?.message}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                  </table>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row align-items-start g-4">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <p className="text-muted m-0">© Nairobi Business {new Date().getFullYear()} Design By Savannah Software Solutions</p>
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

export default BookingsPage