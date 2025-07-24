"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import AdminNavbar from '@/app/components/navbar/admin-navbar'
import AdminSidebar from '@/app/components/admin/admin-sidebar'
import BackToTop from '@/app/components/back-to-top'

import { bookingData } from '@/app/data/data'

import { BsCheck2Circle, BsEnvelopeDash, BsX } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa6'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import MerchantAPIServices from '../../../../lib/services/merchant_api_services';

export default function MyBookings() {

    const { data:session } = useSession();
    const [bookings, setBooking ] = useState([]);


    useEffect(() => {
        const fetchData = async() => {
            if(!session?.accessToken){
                throw new Error("You must be logged in.");
            }

            const res = await MerchantAPIServices.get("businesses/merchant/bookings/", session?.accessToken);
            console.log(res);
            setBooking(res);
        }
        fetchData();
    }, [session]);

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
                                                      {bookings.map((item: any, index: number) => {
                                                          return (
                                                              <li key={index}>
                                                                  <div className="bookingActivities">
                                                                      <div className="d-flex align-items-start justify-content-start gap-3 flex-wrap">
                                                                          <div className="bookingAvatar">
                                                                            <figure className="m-0">
                                                                                <Image src="/icons/user.png" width={80} height={80} className="img-fluid circle avatar-xl" alt="Avatar" />
                                                                            </figure>
                                                                          </div>

                                                                          <div className="bookingInfo">
                                                                              <div className="bookingTitle">
                                                                                  <h5 className="titlesName">{item.businessname}</h5>
                                                                                  
                                                                              </div>
                                                                              <div className="bookingDetails">
                                                                                  <div className="singledetailInfo"><span className="listTitle">Booking Date</span>{item?.booking_date}</div>
                                                                                  <div className="singledetailInfo"><span className="listTitle">Booking Time</span>{item?.booking_time}</div>
                                                                                  <div className="singledetailInfo"><span className="listTitle">Message</span>{item.booking_message}</div>
                                                                                  
                                                                              </div>
                                                                              
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </li>
                                                          )
                                                      })}
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
