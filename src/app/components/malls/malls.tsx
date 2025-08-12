'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { categoryData } from '../../data/data';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { IconType } from 'react-icons';
import APIServices from '../../../../lib/services/api_services';
import { MallModel } from '../../../../lib/models/all_models';
import { BsGeoAlt, BsPatchCheckFill, BsSuitHeart, BsTelephone, BsShop } from 'react-icons/bs';
import Image from 'next/image';

export default function Malls() {

    const [malls, setMalls] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await APIServices.get("malls/all/");
            console.log(res);
            setMalls(res);
        }
        fetchData();
    }, []);

  return (
    <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
             <Swiper
                      slidesPerView={3}
                      spaceBetween={30}
                      modules={[Autoplay]}
                      loop={true}
                      autoplay={{delay: 2100, disableOnInteraction: false,}}
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                    >
                {malls?.map((item: MallModel,index:number)=>{
                    // let Icon = item.icon
                    return(
                        <SwiperSlide className="singleItem" key={item.id}>
                            <div className="listingitem-container">
                                <div className="singlelisting-item">
                                    <div className="listing-top-item">
                                        <Link href="#" className="topLink">
                                            <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                <div className="d-flex align-items-center justify-content-start gap-2">
                                                    {/* {item.is_open ? (<span className="badge badge-xs text-uppercase listOpen">Open</span>) : (<span className="badge badge-xs text-uppercase listClose">Closed</span>)} */}

                                                    <span className="badge badge-xs badge-transparent">$$$</span>

                                                    {/* {item.featured === true && 
                                                        <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1"/>Featured</span>
                                                    } */}
                                                </div>
                                            </div>
                                            <Image src={item?.main_image} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid" alt={item?.name} />
                                        </Link>
                                        <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                            <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0" /></Link>
                                        </div>
                                    </div>
                                    <div className="listing-middle-item">
                                        
                                        <div className="listing-details">
                                            <h4 className="listingTitle"><Link href="#" className="titleLink">{item.name}<span className="verified"><BsPatchCheckFill className="bi bi-patch-check-fill m-0" /></span></Link></h4>
                                            
                                        </div>
                                        <div className="listing-info-details">
                                            <div className="d-flex align-items-center justify-content-between gap-2">
                                                <div className="list-calls"><BsTelephone className="mb-0 me-2" />{item.phone}</div>
                                                <div className="list-distance text-truncate d-inline-block" style={{ maxWidth: '60%' }}><BsShop className="mb-0 me-2" />{item.stalls}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="listing-footer-item">
                                        <div className="d-flex align-items-center justify-content-between gap-2">
                                            <div className="catdWraps">
                                                <div className="flex-start">
                                                    <div className="CatsLists"><span className="categorycounter">{item.listings_count} Listings</span></div>
                                                </div>
                                                
                                            </div>
                                            <div className="listing-rates">
                                                <div className="d-flex align-items-center justify-content-start gap-1">
                                                    <span className={`ratingAvarage good`}>4.2</span>
                                                    <span className="overallrates">321</span>
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
