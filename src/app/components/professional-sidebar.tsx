'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'

const Select = dynamic(()=>import('react-select'),{ssr:false})


import { BsBrowserChrome, BsCalendar, BsEnvelope, BsFacebook, BsInstagram, BsSuitHeart, BsTwitterX, BsWhatsapp, BsYoutube } from 'react-icons/bs'

import { BiPhone } from 'react-icons/bi'
import { FaMinus, FaPlus } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import { HoursModel, ListingModel } from '../../../lib/models/all_models'
import { toast } from 'react-toastify'
import APIServices from '../../../lib/services/api_services'

interface Personal{
    icon: IconType;
    title: string;
    desc: string;
}

interface Social{
    icon: IconType;
    style: string;
    link: string;
}

interface TimeTable{
    day: string;
    time: string;
}

interface ProfessionalSidebarProps  {
    professional: any;
}

export default function ProfessionalSidebar({ professional }: ProfessionalSidebarProps) {
    const [selectedOptions, setSelectedOptions] = useState<object>([]);
    
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState(null);
    const [bookingMessage, setBookingMessage] = useState("");
    const [loadingBooking, setLoadingBooking ] = useState(false);

    const social = [
        {
            icon:BsFacebook,
            style:'color--facebook',
            link: professional?.facebook,
        },
        {
            icon:BsTwitterX,
            style:'color--twitter',
            link: professional?.twitter,
        },
        {
            icon:BsInstagram,
            style:'color--instagram',
            link: professional?.instagram,
        },
        {
            icon:BsYoutube,
            style:'color--pinterest',
            link: professional?.youtube,
        },
        {
            icon:BsWhatsapp,
            style:'color--whatsapp',
            link: professional?.whatsapp,
        },
    ]
    
  

    const option2 = [
        { value: '07:00:00', label: '07:00 AM' },
        { value: '07:30:00', label: '07:30 AM' },
        { value: '08:00:00', label: '08:00 AM' },
        { value: '08:30:00', label: '08:30 AM' },
        { value: '09:00:00', label: '09:00 AM' },
        { value: '09:30:00', label: '09:30 AM' },
        { value: '10:30:00', label: '10:30 AM' },
        { value: '11:30:00', label: '11:30 AM' },
        { value: '12:30:00', label: '12:30 PM' }, // Fixed from AM to PM
    ];

  

  const handleChange = (selected:any) => {
    setBookingTime(selected);
  };


  const handleBooking = async(e: any) => {
    e.preventDefault();

    setLoadingBooking(true);

    const formData = new FormData();
    formData.append("date_booked", bookingDate);
    formData.append("time_booked", bookingTime?.value);
    formData.append("message", bookingMessage);
    formData.append("professional", professional?.id);

    try {
        const res = await APIServices.post("professional/booking/", formData);
        if(res.success){
            toast.success(res.message);
            setBookingTime("");
            setBookingDate("");
            setBookingMessage("");
        } else {
            toast.error(res.message);
        }
    } catch(e){
        toast.error("An error occurred.");
    } finally {
        setLoadingBooking(false);
    }

  }


  return (
        <div className="sidebarGroups d-flex flex-column gap-4">
            
            <div className="card">
                <div className="bg-cover card-header ht-150" style={{backgroundImage:`url('/images/bg/avatar.jpg')`}}></div>
                <div className="card-body mt-n3 p-0">
                    <div className="avatarBox position-relative mb-4">
                        <div className="square--100 circle bg-transparents mx-auto p-2 z-2">
                            {professional?.profile_image ? (
                              <Image src={professional?.profile_image} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt={professional?.fullname || "Nairobi professional Listing"} />
                            ) : (
                                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                    <Image src="/icons/user.png" width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt={professional?.fullname || "Nairobi professional Listing"} />
                                </div>
                            )}
                            {/* {professional?.created_by} */}
                        </div>
                        <div className="listingInfo text-center">
                            <p className="text-md text-muted mb-0">Added By</p>
                            <h6 className="mb-0 capitalize">{ professional?.fullname}</h6>
                        </div>
                    </div>
                    <div className="avatarInfo mb-2">
                      {[
                          {
                              icon: BsEnvelope,
                              title: 'Email',
                              desc: professional?.email,
                          },
                          {
                              icon: BiPhone,
                              title: 'Phone No.',
                              desc: professional?.phone
                          },
                          {
                              icon: BsBrowserChrome,
                              title: 'Website',
                              desc: professional?.website
                          },
                      ].map((item:any,index:number)=>{
                            let Icon = item.icon
                            return(
                                <div className="py-3 px-3 border-top" key={index}>
                                    <div className="infoFlexio d-flex align-items-center justify-content-start gap-2">
                                        <div className="square--40 rounded bg-light-primary"><Icon className="text-primary"/></div>
                                        <div className="infoDetails">
                                            <p className="text-muted lh-base mb-0">{item.title}</p>
                                            <p className="text-dark lh-base fw-medium fs-6 mb-0">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="card-footer bg-white border-top">
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        {social.map((item:Social,index:number)=>{
                            let Icon = item.icon
                            return(
                                <div className="flexSocial" key={index}><a href={item.link} target="_blank" rel="noopener noreferrer" className="square--40 circle border"><Icon className={item.style}/></a></div>
                            )
                        })}
                    </div>
                </div>
            </div>
            
            <div className="card p-0">
                <div className="card-header bg-cover ht-150" style={{backgroundImage:`url('/images/bg/avatar2.jpg')`}} data-overlay="4"></div>
                <div className="card-body px-4">
                    <div className="text-center d-block py-xl-4">
                        <div className="offerTitles d-block mb-4">
                            <h2 className="fw-semibold lh-base m-0">40% Off</h2>
                            <p className="text-md text-dark">On purchase worth more than <span className="fw-medium">$300</span> offer valid till <span className="fw-medium">20 August 2024</span></p>
                        </div>
                        <div className="couponCodes d-block">
                            <div className="couponCode">
                                <div className="couponcodeText border-opacity-25">PLAUG1758</div>
                                <div className="copyCoupon"><Link href="#" className="fw-medium text-sm text-muted text-uppercase">Copy Code</Link></div>
                            </div>
                        </div>
                    </div>
                </div>										
            </div>
            
            <div className="card overflow-visible">
                <div className="card-header py-3">
                    <div className="headerFirst"><h6><BsCalendar className="me-2"/>Book A Visit</h6></div>
                </div>
                <div className="p-xl-4 p-3">
                    <div className="contactForm position-relative">
                        <form onSubmit={handleBooking}>
                        <div className="form-group form-border">
                            <input 
                                type="date" 
                                className="form-control fw-medium" 
                                id="input" 
                                name="bookingDate" 
                                placeholder="Choose A Date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </div>
                        <div className="form-group form-border">
                            <div className="position-relative fw-medium">
                                  <Select
                                      className="choosetime form-control"
                                      options={option2}
                                      value={bookingTime}
                                      onChange={handleChange}
                                      placeholder="Select a time"
                                      required
                                  />
                            </div>
                        </div>
                        
                        <div className="form-group form-border">
                            <div className="position-relative fw-medium">
                                <textarea 
                                    className='form-control' 
                                    placeholder="Enter message"
                                    name="bookingMessage"
                                    value={bookingMessage}
                                    onChange={(e) => setBookingMessage(e.target.value)}    
                                >
                                    
                                    </textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary rounded-pill fw-medium w-100">
                                {loadingBooking ? "Sending ..." : "Booking Request"}
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
                
            </div>
            
            
            <div className="card">
                <div className="card-body px-3">
                    <div className="form-group mb-1">
                        <button type="button" className="btn btn-whites border rounded-pill fw-medium w-100"><BsSuitHeart className="me-2"/>Bookmark {professional?.fullname}</button>
                    </div>
                    <div className="form-group text-center mb-4">
                        <p className="text-md">45 People Bookmark This Place</p>
                    </div>
                    <div className="form-group m-0">
                        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <button type="button" className="btn btn-md btn-whites border rounded-pill color--facebook flex-fill"><BsSuitHeart className="me-1"/>Facebook</button>
                            <button type="button" className="btn btn-md btn-whites border rounded-pill color--twitter flex-fill"><BsSuitHeart className="me-1"/>Twitter</button>
                            <button type="button" className="btn btn-md btn-whites border rounded-pill color--instagram flex-fill"><BsSuitHeart className="me-1"/>Instagram</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
