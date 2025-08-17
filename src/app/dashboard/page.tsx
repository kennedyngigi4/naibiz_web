'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import AdminNavbar from '../components/navbar/admin-navbar'
import AdminSidebar from '../components/admin/admin-sidebar'
import RecentActivity from '../components/admin/recent-activity'
import BackToTop from '../components/back-to-top'

import { adminCounter, chatData, invoiceData } from '../data/data'

import CountUp from 'react-countup';
import { IconType } from 'react-icons'
import { useSession } from 'next-auth/react'
import { ListingModel } from '../../../lib/models/all_models'
import MerchantAPIServices from '../../../lib/services/merchant_api_services'
import { BsBox2, BsCheck2Circle, BsStarFill, BsStarHalf, BsX } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface Counter{
    icon: IconType;
    iconStyle: string;
    number: number;
    symbol: string;
    title: string;
    bg: string;
}

interface ChatData{
    image: string;
    name: string;
    time: string;
    msg: string;
    pandding: boolean;
    message: number;
}

interface InvoiceData{
    name: string;
    id: string;
    status: string;
    date: string;
}

export default function Dashboarduser() {
    const {data:session, status} = useSession();
    const [listings, setListings] = useState<ListingModel[]>([]);
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === "loading") return <p>Loading...</p>;
            if (!session?.accessToken) {
                throw new Error("You must be logged in.")
            } else if(session?.user?.role == "professional") {
                window.location.href = "/professional/";
            }
            const res = await MerchantAPIServices.get("businesses/merchant/all_listings/", session?.accessToken);
            const statistics = await MerchantAPIServices.get("businesses/merchant/statistics/", session?.accessToken);
            setListings(res);
            setStatistics(statistics);
            console.log(statistics);
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
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 pt-lg-0 pt-5">
                                <h2 className="fw-medium mb-0 text-capitalize">Hello, {session?.user?.name}</h2>
                            </div>
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <div className="row align-items-start g-4 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                        {/* <div className="alert alert-primary alert-dismissible fade show" role="alert">
                                            Your listing <strong>Holy Guacamole!</strong> has been approved!.
                                            <button type="button" className="btn-close text-sm text-primary" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div> */}
                                    </div>
                                </div>
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    {statistics.map((item:any,index:number)=>{
                                        let Icon = item.icon.toString().replace('"', "")
                                        
                                        return(
                                            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6" key={index}>
                                                <div className="card rounded-3 position-relative p-4">
                                                    <div className={`position-absolute w-30 h-100 start-0 top-0 rounded-end-pill ${item.bg}`}><div className="position-absolute top-50 start-50 translate-middle"><Icon className={`fs-2 ${item.iconStyle}`}></Icon></div></div>
                                                    <div className="d-flex flex-column align-items-end justify-content-end ht-80">
                                                        <h2 className="mb-0"><CountUp className="ctr" end={item.count}/></h2>
                                                        <p className="text-muted-2 fw-medium mb-0">{item.title}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            
                                            
                                            <div className="card-body p-3">
                                                <h6>Latest Listings</h6>
                                               {listings.slice(0,3).map((item:ListingModel)=>{
                                                    return(
                                                        <li key={item.id}>
                                                            <div className="mngListings">
                                                                <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                                                    <div className="mngListinfirst">
                                                                        <div className="d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                                                            <div className="mngListings-thumb">
                                                                                <figure className="m-0"><Image src={item.profile_image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid rounded" alt="Avatar"/></figure>
                                                                            </div>
                                                                            
                                                                            <div className="mngListings-caps">
                                                                                {/* {item.expired && 
                                                                                    <div className="d-flex align-items-center justify-content-start mb-1">
                                                                                        <span className="badge badge-xs bg-danger">Expired</span>
                                                                                    </div>
                                                                                } */}
                                                                                <h5 className="mnglstTitle">{item.name}</h5>
                                                                                <span>{item.location}</span>
                                                                                <div className="d-flex align-items-center justify-content-start gap-2 mt-3">
                                                                                    <div className="ratingView" data-rating="5.0">
                                                                                        <BsStarFill className='text-warning me-1'/>
                                                                                        <BsStarFill className='text-warning me-1'/>
                                                                                        <BsStarFill className='text-warning me-1'/>
                                                                                        <BsStarFill className='text-warning me-1'/>
                                                                                        <BsStarHalf className='text-warning me-1'/>
                                                                                    </div>
                                                                                    {/* <div className="text-md">{item.review}</div> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="mngListinlast">
                                                                        <div className="d-flex align-items-center justify-content-start gap-3">
                                                                            <Link href={`/dashboard/edit/${item.slug}`} className="btn btn-sm btn-light-success fw-medium rounded-pill"><BsCheck2Circle className="me-1"/>Edit</Link>
                                                                            
                                                                            <Link href={`/dashboard/products/${item.slug}`} className="btn btn-sm btn-light-info fw-medium rounded-pill"><BsBox2 className="me-1" />Products</Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })}
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
