'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from "next/navigation";
import Image from 'next/image'

import { FaLocationDot } from 'react-icons/fa6'
import { BiBriefcase } from 'react-icons/bi'
import { BsSendCheck, BsStarFill, BsStarHalf, BsX } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'

import NavLightTwo from '@/app/components/navbar/nav-light-two'
import Descriptions from '@/app/components/list-detail/descriptions'
import Pricings from '@/app/components/list-detail/pricings'
import FeatureNav from '@/app/components/navbar/feature-nav'
import Products from '@/app/components/list-detail/products'
import Features from '@/app/components/list-detail/features'
import Galleries from '@/app/components/list-detail/galleries'
import Maps from '@/app/components/list-detail/maps'
import Statistics from '@/app/components/list-detail/statistics'
import Reviews from '@/app/components/list-detail/reviews'
import List from '@/app/components/list-detail/list'
import SingleSidebarOne from '@/app/components/single-sidebar-one'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top'
import { listData } from '@/app/data/data';
import NavbarDark from '@/app/components/navbar/navbar-dark';
import { ListingModel } from '../../../../lib/models/all_models';
import APIServices from '../../../../lib/services/api_services';
import { toast } from 'react-toastify';



export default function Page() {

    const params = useParams();
    const id: any = params.listingId;
    let data = listData.find((item) => item.id === parseInt(id))
    const [ businessData, setBusinessData] = useState<ListingModel>();
    const [ message, setMessage ] = useState("");
    

    useEffect(() => {
        const fetchData = async() => {
            const res = await APIServices.get(`businesses/business/${id}/`);
            console.log(res);
            setBusinessData(res);
        }
        fetchData();
    }, []);


    const handleMessage = async(e: any)=> {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", message);
        if(businessData){
            formData.append("business", businessData?.id);
        }

        try {
            const res = await APIServices.post("messages/send_message/", formData);
            if(res.success){
                toast.success(res.message);
                setMessage("");
                setTimeout(() => {
                    window.location.reload();
                }, 6000);
            } else {
                toast.error(res.message);
            }
        } catch(e){
            toast.error(e);
        } 
    }

    return (
        <>
            <NavbarDark />

            <section className="bg-cover position-relative ht-500 py-0" style={{ backgroundImage: `url(${businessData && businessData.main_banner}` }} data-overlay="4">
                <div className="container h-100">
                    <div className="row align-items-start">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                            <div className="mainlistingInfo">
                                <div className="d-flex align-items-end justify-content-between flex-wrap gap-3">
                                    <div className="firstColumn">
                                        <div className="listingFirstinfo d-flex align-items-center justify-content-start gap-3 flex-wrap">
                                            <div className="listingAvatar">
                                                {businessData?.profile_image  ? (
                                                    <Link href="#" className="d-block"><Image src={businessData && businessData?.profile_image} width={95} height={95} className="img-fluid rounded-3" alt={businessData?.name || "Nairobi Business Listing"} /></Link>
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                                        <Image src="/icons/user.png" width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt={businessData?.name || "Nairobi Business Listing"} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="listingCaptioninfo">
                                                <div className="propertyTitlename d-flex align-items-center gap-2 mb-1"><h2 className="fw-semibold text-light mb-0">{businessData && businessData?.name}</h2><span className="verified mt-1"><img src='/img/tick.svg' className="img-fluid" width="22" alt={businessData?.name} /></span></div>
                                                <div className="listingsbasicInfo">
                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                                                        <div className="flexItem me-2"><span className="text-md fw-medium text-light d-flex align-items-center"><FaLocationDot className="me-2" />{businessData && businessData.location}</span></div>
                                                        <div className="flexItem me-2"><span className="text-md fw-medium text-light d-flex align-items-center"><BiBriefcase className="me-2" />{data && data.tag}</span></div>
                                                        {/* <div className="flexItem me-2"><span className="text-md fw-medium text-light">$$$</span></div> */}
                                                        <div className="flexItem">
                                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                                <div className="d-flex align-items-center justify-content-start gap-1">
                                                                    <BsStarFill className="text-warning text-sm" /><BsStarFill className="text-warning text-sm" /><BsStarFill className="text-warning text-sm" /><BsStarFill className="text-warning text-sm" /><BsStarHalf className="text-warning text-sm" />
                                                                </div>
                                                                <span className="text-md fw-medium text-light">{`(${businessData && businessData?.reviews?.length})`}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lastColumn">
                                        <div className="d-flex align-items-center justify-content-md-end flex-wrap gap-3">
                                            
                                            <div className="flexlastButton"><button type="button" className="btn px-4 btn-whites text-primary fw-medium" data-bs-toggle="modal" data-bs-target="#messageModal"><BsSendCheck className="me-2" />Send Message</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FeatureNav />

            <section className="gray-simple pt-4 pt-xl-5">
                <div data-bs-spy="scroll" data-bs-target="#scrollphyNav" data-bs-smooth-scroll="true" className="scrollspy-example" tabIndex={0}>
                    <div className="container">
                        <div className="row align-items-start gx-xl-5 g-4">
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                {businessData && (
                                    <Descriptions business={businessData} />
                                )}

                                {/* <Pricings /> */}
                                {businessData?.products && (
                                    <Products business={businessData} />
                                )}
                                

                                {/* <Features /> */}

                                {businessData?.gallery && (
                                    <Galleries business={businessData} />
                                )}

                                
                                {(businessData?.latitude && businessData?.longitude)  && (
                                    <Maps latitude={businessData?.latitude} longitude={businessData?.longitude} label={businessData?.location} />
                                )}
                                

                                <Statistics />

                                {businessData && (
                                    <Reviews business={businessData} />
                                )}

                                {businessData && (
                                    <List business={businessData} />
                                )}
                                

                            </div>

                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                {businessData && (
                                    <SingleSidebarOne business={businessData} />
                                )}
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <FooterTop />
            <Footer />
            <BackToTop />
            <div className="modal modal-lg fade" id="messageModal" tabIndex={-1} aria-labelledby="messageModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light border-0 px-md-5 d-flex justify-content-between">
                            <h4 className="modal-title fw-medium" id="messageModalLabel">Send Message</h4>
                            <Link href="#" data-bs-dismiss="modal" aria-label="Close" className="square--40 circle bg-light-danger text-danger"><BsX className="bi bi-x" /></Link>
                        </div>
                        <div className="modal-body p-md-5">
                            <form onSubmit={handleMessage}>
                            <div className="messageForm">
                                <div className="form-group form-border">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="Type your Message To Dan"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary fw-medium px-md-5">Send message<FiArrowRight className="ms-2" /></button>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

