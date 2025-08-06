"use client";

import ProfessionalSidebar from '@/app/components/admin/professional-sidebar';
import BackToTop from '@/app/components/back-to-top';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import MerchantAPIServices from '../../../../lib/services/merchant_api_services';
import Link from 'next/link';

const Messages = () => {

    const {data:session, status} = useSession();
    const [ messages, setMessages ] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!session?.accessToken) {
                throw new Error("You must be logged in.")
            }
            const res = await MerchantAPIServices.get("professional/my-messages/", session?.accessToken);
            setMessages(res);
        }
        fetchMessages();
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
                                        
                                    </div>
                                    <div className="dashCaption p-xl-5 p-3 p-md-4">
                                        
                                        <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <div className="card rounded-3 shadow-sm">
                                                    
                                                <div className="card-body p-0">
                                                    <h6 className='px-4 py-2'>Messages</h6>
                                                    <ul className="dashboardListgroup nospace">
                                                        {messages.map((item: any) => {
                                                            return (
                                                                <li key={item?.id}>
                                                                    <Link href="#" className="singleMessageswrap" data-bs-toggle="modal" data-bs-target="#conversionModal">
                                                                        <div className="singleMessages">
                                                                            <div className="messagesAvatar">
                                                                                <figure className="m-0">
                                                                                    <img src="/icons/user.png" className="img-fluid circle avatar-xl" alt="Avatar" />
                                                                                    <span className="userStatus online"></span>
                                                                                </figure>
                                                                            </div>

                                                                            <div className="messagesInfo">
                                                                                <div className="messagesupper d-flex align-items-center justify-content-between gap-2 mb-1">
                                                                                    <div className="messagesupper d-flex align-items-center justify-content-start gap-2">
                                                                                        <h6 className="messageuserTitle">{item?.created_at}</h6>
                                                                                    </div>
                                                                                    <div className="flxLast"><span className="text-md text-muted"></span></div>
                                                                                </div>
                                                                                <div className="messagesBody">
                                                                                    <p className="m-0">
                                                                                        {item?.message}
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Link>
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
                                                <p className="text-muted m-0">© Nairobi Business {new Date().getFullYear()} Designed By Savannah Software Solutions</p>
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

export default Messages