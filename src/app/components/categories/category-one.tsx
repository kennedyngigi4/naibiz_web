'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link';
import { categoryData } from '../../data/data';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { IconType } from 'react-icons';
import APIServices from '../../../../lib/services/api_services';

interface CategoryData{
    id: string;
    icon: any;
    name: string;
    business_count: string;
}

export default function CategoryOne() {

    const [categoriesBusinessCount, setCategoriesBusinessCount] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            const res = await APIServices.get("businesses/categories_business_count/");
            
            setCategoriesBusinessCount(res);
        }
        fetchData();
        
    }, []);



  return (
    <div className="row align-items-center justify-content-center">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
             <Swiper
                      slidesPerView={6}
                      spaceBetween={30}
                      modules={[Autoplay]}
                      loop={true}
                      autoplay={{delay: 2100, disableOnInteraction: false,}}
                      breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                      }}
                    >
                {categoriesBusinessCount?.map((item:CategoryData,index:number)=>{
                    // let Icon = item.icon
                    return(
                        <SwiperSlide className="singleCategory" key={index}>
                            <div className="category-small-wrapper light">
                                <Link href={`/listings/?category=${item?.id}`} className="categoryBox">
                                    <div className="categoryCapstions">
                                        <div className="catsIcons"><div className="icoBoxx">
                                            <div dangerouslySetInnerHTML={{ __html: item.icon }} />   
                                        </div></div>
                                        
                                        <div className="catsTitle"><h5>{item.name}</h5></div>
                                        <div className="CatsLists"><span className="categorycounter">{item.business_count} Lists</span></div>
                                    </div>
                                </Link>
                            </div>	
                        </SwiperSlide>
                    )
                })}
                
            </Swiper>
        </div>
    </div>
  )
}
