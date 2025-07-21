'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { BsGeoAlt, BsPatchCheckFill, BsStar, BsPerson, BsSuitHeart, BsTelephone } from 'react-icons/bs';
import { IconType } from 'react-icons';
import { ListingModel } from '../../../lib/models/all_models';
import APIServices from '../../../lib/services/api_services';


export default function PopularListingOne() {

    const [ popularListings, setPopularListings ] = useState<ListingModel[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await APIServices.get("businesses/home/?section=popular");
            
            setPopularListings(res);
        }
        fetchData();
    }, []);


  return (
    <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={15}
                    modules={[Autoplay,Pagination]}
                    pagination={true}
                    loop={true}
                    autoplay={{delay: 2000, disableOnInteraction: false,}}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 4 },
                    }}
                >
                {popularListings.map((item:ListingModel)=>{
                    // let Icon = item.tagIcon
                    return(
                        <SwiperSlide className="singleItem" key={item.id}>
                            <div className="listingitem-container">
                                <div className="singlelisting-item">
                                    <div className="listing-top-item">
                                        <Link href={`/${item.slug}`} className="topLink">
                                            <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                    {item.is_open ? (<span className="badge badge-xs text-uppercase listOpen">Open</span>) :(<span className="badge badge-xs text-uppercase listClose">Closed</span>)}

                                                    <span className="badge badge-xs badge-transparent">$$$</span>

                                                    {/* {item.featured === true && 
                                                        <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1"/>Featured</span>
                                                    } */}
                                                </div>
                                            </div>
                                            <Image src={item.main_banner} width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid" alt="Listing Image"/>
                                        </Link>
                                        <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                            <Link href={`/${item.slug}`} className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"/></Link>
                                        </div>
                                    </div>
                                    <div className="listing-middle-item">
                                        <div className="listing-avatar">
                                            <Link href={`/${item.slug}`} className="avatarImg">
                                                {item.created_by.profile_image ? (
                                                    <Image src={item.created_by.profile_image} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt={item.name} />
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                                        
                                                        <Image src="/icons/user.png" width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt={item.name} />
                                                    </div>
                                                )}       
                                                
                                            </Link>
                                        </div>
                                        <div className="listing-details">
                                            <h4 className="listingTitle"><Link href={`/${item.slug}`} className="titleLink">{item.name}<span className="verified"><BsPatchCheckFill className="bi bi-patch-check-fill m-0"/></span></Link></h4>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="listing-info-details">
                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                <div className="list-calls"><BsTelephone className="mb-0 me-2"/>{item.phone}</div>
                                                <div className="list-distance text-truncate d-inline-block" style={{ maxWidth: '60%' }}><BsGeoAlt className="mb-0 me-2"/>{item.location}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listing-footer-item">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <div className="catdWraps">
                                                <div className="flex-start">
                                                    <Link href="/single-listing-01" className="d-flex align-items-center justify-content-start gap-2">
                                                        <span className={`catIcon catIcon me-2 cats-1`}>
                                                            <div dangerouslySetInnerHTML={{ __html: item.category_icon }} />
                                                        </span>
                                                        <span className="catTitle">{item.category_name}</span>
                                                    </Link>
                                                </div>
                                                <div className="flex-end"><span className="moreCatcounter">+2</span></div>
                                            </div>
                                            <div className="listing-rates">
                                                <div className="d-flex align-items-center justify-content-start gap-1">
                                                    <span className={`ratingAvarage good`}>4.5</span>
                                                    <span className="overallrates">78</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}
            </Swiper> 
        </div>
    </div>
  )
}
