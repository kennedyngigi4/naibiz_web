"use client"
import React from 'react'
import Link from 'next/link'

import CountUp from 'react-countup'

import { counterData, workData } from '@/app/data/data'

import { MdArrowForwardIos } from 'react-icons/md'
import { BsCaretRight, BsPlayCircleFill } from 'react-icons/bs'

import NavbarDark from '@/app/components/navbar/navbar-dark'
import ClientOne from '@/app/components/client-one'
import TeamOne from '@/app/components/team-one'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top'
import Image from 'next/image'
import { IconType } from 'react-icons'

interface CounterData{
    number: number;
    symbol: string;
    title: string;
}

interface WorkData{
    icon: IconType;
    title: string;
    desc: string;
}

export default function AboutUs() {
  return (
    <>
        <NavbarDark/>

        <section className="bg-cover position-relative" style={{backgroundImage:`url('/images/bg/2.jpg')`}} data-overlay="6">
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                        <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                            <h1 className="text-light xl-heading">About Page</h1>
                            <nav id="breadcrumbs" className="breadcrumbs light">
                                <ul>
                                    <li><Link href="#">Home</Link></li><MdArrowForwardIos className='ms-2'/>
                                    <li><Link href="#">Pages</Link></li><MdArrowForwardIos className='ms-2'/>
                                    <li >About Us</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>  

        <section className="pb-5">
            <div className="container">
                <div className="row"> 
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">How We Start <span className="text-primary">Work</span></h3>
                                <p>Explore our work process step by step and our mission</p>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-between align-items-center g-4 mb-5">
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="missionImg">
                                <Image src="/img/side-img.png" width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid" alt=""/>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="missioncaps">
                                <div className="d-block mb-4">
                                    <div className="d-flex align-items-start mb-2"><span className="badge badge-xs badge-success rounded-pill">About Mission</span></div>
                                    <h2>Explore Our Aim & Mission</h2>
                                </div>
                                <p>Nairobi Business is Kenya’s premier business listing and marketing platform dedicated to showcasing malls, shops, and businesses across Nairobi and beyond. We connect local entrepreneurs, retailers, and service providers with potential customers through a reliable, searchable online presence.</p>
                                <p>Whether you're a small shop in the city, a large mall, or a growing brand, Nairobi Business gives you the visibility you need to attract more clients and boost your sales. Our platform empowers business owners.</p>
                                <p>Our mission is to help Kenyan businesses grow by making them easier to find, easier to trust, and easier to support.</p>
                                <div className="d-flex align-items-start justify-content-md-start justify-content-center mt-4">
                                    <Link href="#" className="btn btn-light-primary rounded-pill px-5">Meet Our Team</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-between align-items-center g-4 border-top">
                        {counterData.map((item:CounterData,index:number)=>{
                            return(
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6" key={index}>
                                    <div className="counter-wrap text-center">
                                        <h2 className="mb-0"><CountUp className="ctr text-primary me-1" end={item.number}/>{item.symbol}</h2>
                                        <p className="m-0">{item.title}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>

        <section className="bg-cover" style={{backgroundImage:`url('/images/bg/2.jpg')`, backgroundColor:'#ffffff'}} data-overlay="5">
            <div className="container">
                <div className="row">
                    <div className="row justify-content-center align-items-center mb-5">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div className="position-relative text-center py-5">
                                <div className="promoTitle d-flex align-items-center justify-content-center">
                                    <span className="badge badge-xs badge-transparent rounded-pill">Get Help with Promo Videos</span>
                                </div>
                                <div className="promoHeading mb-5 mt-4">
                                    <h2 className="text-light">Embark on your thrilling adventure with us.</h2>
                                    <h3 className="text-light">Our agency will guide you through the captivating realm of digital innovation.</h3>
                                </div>
                                <div className="promoButtons">
                                    <button type="button" className="btn btn-whites fw-medium rounded-pill px-4"><BsPlayCircleFill className="me-2"/>Watch Promo Video</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-10 col-lg-11 col-md-12 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Our Working <span className="text-primary">Process</span></h3>
                            <p>Explore our work process step by step and our mission</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center g-md-5 g-4">
                    {workData.map((item:WorkData,index:number)=>{
                        let Icon = item.icon
                        return(
                            <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                                <div className="processWrap px-xl-4">
                                    <div className="text-center">
                                        <div className="processIcons d-block">
                                            <div className="Icons">
                                                <Icon className=""/>
                                            </div>
                                        </div>
                                        <div className="processCaps">
                                            <h4 className="fw-medium">{item.title}</h4>
                                            <p className="m-0">{item.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    
                    <div className="col-xl-12 col-lg-12 col-md-12">
                        <div className="d-flex align-items-center justify-content-center mt-4">
                            <Link href="#" className="btn btn-light-primary rounded-pill px-5">View More Details<BsCaretRight className="ms-2"/></Link>
                        </div>
                    </div>
                </div>				
            </div>
        </section>

        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Our Great <span className="text-primary">Reviews</span></h3>
                            <p>Our cliens love our services and give great & positive reviews</p>
                        </div>
                    </div>
                </div>
                <ClientOne/>
            </div>
        </section>

        {/* <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Meet Our Great <span className="text-primary">Experts</span></h3>
                            <p>Explore our team and contact for any types of help if you needs.</p>
                        </div>
                    </div>
                </div>
                <TeamOne/>
            </div>
        </section> */}

        <FooterTop/>
        <Footer/>
        <BackToTop/>
    </>
  )
}
