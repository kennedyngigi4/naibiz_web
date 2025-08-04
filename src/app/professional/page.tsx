'use client';

import React, { useEffect, useState } from 'react'

import AdminNavbar from '../components/navbar/admin-navbar'
import BackToTop from '../components/back-to-top'
import { useSession } from 'next-auth/react'
import ProfessionalSidebar from '../components/admin/professional-sidebar';



export default function Professionaluser() {
    const {data:session, status} = useSession();

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
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            
                                            
                                            
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
