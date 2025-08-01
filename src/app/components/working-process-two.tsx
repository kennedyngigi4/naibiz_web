import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { BsCheck, BsPhone, BsPlayFill } from 'react-icons/bs'

export default function WorkingProcessTwo() {
  return (
    <section className="pt-0">
        <div className="container">
            <div className="row align-items-center justify-content-between g-4">
                
                <div className="col-xl-5 col-lg-5 col-md-6">
                    <Image src="/img/app.svg" width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid" alt="Image"/>
                </div>
                
                <div className="col-xl-6 col-lg-6 col-md-6">
                    <div className="workingCaption">
                        <div className="workingDescribe mb-4">
                            <h3 className="fw-semibold lh-base">Explore ListingHub Working Process Step By Step with Easy Way.</h3>
                            <p className="lead">In a professional context it often happens that private or corporate clients corder a publication to be made and presented.</p>
                        </div>
                        
                        <div className="d-block availableFeatures mb-4">
                            <div className="row align-items-center justify-content-start g-3">
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                        <span className="square--30 circle bg-light-success text-success"><BsCheck/> </span>
                                        <span className="text-dark">Featured Listing Available</span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                        <span className="square--30 circle bg-light-success text-success"><BsCheck/></span>
                                        <span className="text-dark">Cicero famously orated against</span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                        <span className="square--30 circle bg-light-success text-success"><BsCheck/></span>
                                        <span className="text-dark">The wise man therefore always</span>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-6">
                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                        <span className="square--30 circle bg-light-success text-success"><BsCheck/></span>
                                        <span className="text-dark">Usually, we prefer the real thing</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="workingDemo mb-4">
                            <div className="row align-items-center justify-content-center g-3">
                                <div className="col-xl-8 col-lg-8 col-md-8">
                                    <div className="form-group form-border position-relative m-0">
                                        <input type="tel" className="form-control fw-medium ps-5" placeholder="41 256 524 5485"/>
                                        <span className="position-absolute top-50 start-0 translate-middle-y fs-5 ms-3 text-primary"><BsPhone /></span>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4">
                                    <div className="form-group m-0">
                                        <button type="button" className="btn btn-dark fw-medium w-100">Get Free Demo</button>	
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="workingVideo">
                            <div className="workingVideobox">
                                <Link href="#" className="d-inline-flex align-items-center justify-content-start gap-3">
                                    <span className="square--50 circle bg-light-primary text-primary shadow-sm"><BsPlayFill className="fs-4"/></span>
                                    <span className="fw-semibold text-dark">See how ListingHub work online</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </section>
  )
}
