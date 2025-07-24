'use client'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import {BsBasket2Fill } from 'react-icons/bs'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay,Pagination } from 'swiper/modules';
import 'swiper/css';
import { ListingModel, ProductModel } from '../../../../lib/models/all_models';


interface ProductsProps {
    business: ListingModel;
}

export default function Products({ business }: ProductsProps) {
    console.log(business?.products);

  return (
        <div className="listingSingleblock mb-4" id="productss">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#products" data-bs-target="#products" aria-controls="products" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Browse Products</h4></Link>
            </div>
            
            <div id="products" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <Swiper
                    slidesPerView={3}
                    spaceBetween={15}
                    modules={[Autoplay,Pagination]}
                    pagination={true}
                    loop={true}
                    autoplay={{delay: 2000, disableOnInteraction: false,}}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 3 },
                    }}
                >
                {business?.products?.map((product:ProductModel)=>{
                    return(
                        <SwiperSlide className="singleItem" key={product?.id}>
                            <div className="catalogCard">
                                <div className="catalogThumb position-relative">
                                    {/* {product.status === "Sold" && 
                                        <div className="position-absolute top-0 start-0 mt-3 ms-3"><span className="badge badge-xs bg-dark text-uppercase">Sold</span></div>
                                    }
                                    {item.status === "Hot" && 
                                            <div className="position-absolute top-0 start-0 mt-3 ms-3"><span className="badge badge-xs bg-danger text-uppercase">Hot</span></div>
                                    }
                                    {item.status === "New" && 
                                        <div className="position-absolute top-0 start-0 mt-3 ms-3"><span className="badge badge-xs bg-seegreen text-uppercase">New</span></div>
                                    } */}
                                    <Link href="#">
                                        <figure>	
                                            <Image src={product?.main_image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid rounded-2" alt="Product Thumb"/>
                                        </figure>
                                    </Link>
                                </div>
                                
                                <div className="catalogCaps">
                                    <div className="d-flex align-items-start justify-content-between gap-2">
                                        <div className="catalogProducttitle">
                                            <h6 className="lh-base m-0">{product.name}</h6>
                                            <p className="text-md d-flex align-items-center gap-2 m-0"><span>KSh. {parseInt(product.price).toLocaleString()}</span></p>
                                        </div>
                                        <div className="addCart">
                                            {business?.whatsapp && (
                                                <Link href={`${business?.whatsapp}`} target='_blank' className="text-muted-2 square--40 circle bg-light" data-bs-toggle="tooltip" data-bs-title="Add To Cart"><BsBasket2Fill /></Link>
                                            )}
                                            
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
        </div>
  )
}
