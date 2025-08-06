'use client';

import React, { useEffect, useState } from 'react'

import AdminNavbar from '../components/navbar/admin-navbar'
import BackToTop from '../components/back-to-top'
import { useSession } from 'next-auth/react'
import ProfessionalSidebar from '../components/admin/professional-sidebar';
import MerchantAPIServices from '../../../lib/services/merchant_api_services';
import CountUp from 'react-countup';
import { BsCalendar, BsMessenger } from 'react-icons/bs';



export default function Professionaluser() {
    const {data:session, status} = useSession();
    const [ statistics, setStatistics ] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (status === "loading") return <p>Loading...</p>;
            if (!session?.accessToken) {
                throw new Error("You must be logged in.")
            } else if (session?.user?.role == "merchant") {
                window.location.href = "/dashboard/";
            }
            
        }
        fetchData();
    }, [session]);


    useEffect(() => {
        const getStatistics = async() => {
            if (!session?.accessToken) {
                throw new Error("You must be logged in.")
            }
            const res = await MerchantAPIServices.get("professional/statistics", session?.accessToken);
            setStatistics(res);
        }
        getStatistics();
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
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5">
                                <h2 className="fw-medium mb-0 text-capitalize">Hello, {session?.user?.name}</h2>
                            </div>
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    
                                </div>

                                  <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                        <div className="card rounded-3 position-relative p-4">
                                            <div className={`position-absolute w-30 h-100 start-0 top-0 rounded-end-pill bg-info`}><div className="position-absolute top-50 start-50 translate-middle"><BsMessenger /></div></div>
                                            <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                                                <h2 className="mb-0"><CountUp className="ctr" end={statistics?.message_count} /></h2>
                                                <p className="text-muted-2 fw-medium mb-0">Messages</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                                        <div className="card rounded-3 position-relative p-4">
                                            <div className={`position-absolute w-30 h-100 start-0 top-0 rounded-end-pill bg-success`}><div className="position-absolute top-50 start-50 translate-middle"><BsCalendar /></div></div>
                                            <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                                                <h2 className="mb-0"><CountUp className="ctr" end={statistics?.bookings_count} /></h2>
                                                <p className="text-muted-2 fw-medium mb-0">Bookings</p>
                                            </div>
                                        </div>
                                    </div>
                                  </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        
                                        <div className="card rounded-3 shadow-sm">
                                            <div className='card-body'>
                                                  <h6>Recent Bookings</h6>
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
