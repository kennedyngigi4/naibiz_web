'use client'
import React, { useState,useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import { BsGeoAlt, BsSpeedometer, BsPersonLinesFill, BsJournalCheck, BsUiRadiosGrid, BsBookmarkStar, BsChatDots, BsYelp, BsWallet, BsPatchPlus, BsGeoAltFill, BsBoxArrowRight } from "react-icons/bs";
import { FiX } from 'react-icons/fi';
import { FaXmark } from 'react-icons/fa6'
import { useSession, signOut } from 'next-auth/react';


export default function AdminNavbar() {
    const {data:session} = useSession();
    const [scroll,setScroll] = useState(false);
    const [current , setCurrent] = useState('');
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState(false);

    const location = usePathname(); 
    
    useEffect(()=>{
            if (typeof window === "undefined") return;
            window.scrollTo(0,0)
            setCurrent(location)
    
            const handlerScroll=()=>{
                if(window.scrollY > 50){
                    setScroll(true)
                }else{setScroll(false)}
            }
    
            if (typeof window !== "undefined") {
                setWindowWidth(window.innerWidth);
            }
    
            const handleResize = () => {
                setWindowWidth(window.innerWidth);
                };
    
            window.addEventListener('scroll',handlerScroll)
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('scroll',handlerScroll)
                window.removeEventListener('resize', handleResize);
                };
        },[windowWidth])

        const logUserOut = async() => {
            await signOut();
            window.location.href = "/auth/login";
        }

  return (
    <>
        <div className={`header header-dark navdark ${scroll ? 'header-fixed' : ''}`} data-sticky-element="">
            <div className="container-fluid">
                <nav id="navigation" className={windowWidth > 991 ? "navigation navigation-landscape" : "navigation navigation-portrait"}>
                    <div className="nav-header">
                        <Link className="nav-brand" href="/"><img src='/logo.png' className="logo" alt=""/></Link>
                        <Link data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" className="d-inline-flex py-0 pt-1 px-1">
                            <div className="nav-toggle"></div>
                        </Link>
                        
                    </div>
                    <div className={`nav-menus-wrapper  ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{transitionProperty:toggle ? 'none' : 'left'}}>
                        <div className='mobLogos'>
                            <img src='/img/logo.svg' className='img-fluid lightLogo' alt='Logo'/>
                        </div>
                        <span className='nav-menus-wrapper-close-button'  onClick={()=>setIsToggle(!toggle)}>✕</span>
                        <ul className="nav-menu">
                            <li className={`${['/'].includes(current)? 'active' : ''}`}><Link href="/">Home</Link>
                                
                            </li>

                            <li className={`${['/listings'].includes(current)? 'active' : ''}`}><Link href="/listings">Listings</Link></li>
                            <li className={`${['/professionals'].includes(current) ? 'active' : ''}`}><Link href="/professionals">Professionals</Link></li>
                            <li className={`${['/about-us'].includes(current) ? 'active' : ''}`}><Link href="/about-us">About Us</Link>

                            </li>
                            <li className={`${['/blogs'].includes(current) ? 'active' : ''}`}><Link href="/blogs">Blogs</Link></li>

                            <li className={`${['/contact-us'].includes(current) ? 'active' : ''}`}><Link href="/contact-us">Contact Us</Link></li>
                            <li className={`${['/affiliates'].includes(current) ? 'active' : ''}`}><Link href="/affiliates">Affiliates</Link></li>
                            <li className={`${['/faq'].includes(current) ? 'active' : ''}`}><Link href="/faq">FAQs</Link></li>
                            
                            
                            <li><Link className="mob-addlisting light" href="#"><BsGeoAltFill className="me-1"/>Add Listing</Link></li>
                        </ul>

                        
                    </div>
                </nav>
            </div>
        </div>
        <div className="clearfix"></div>

        

        <div className="offcanvas offcanvas-end offcanvas-menu" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
				<div className="offcanvas-header">
					<button type="button" className="btn-closes" data-bs-dismiss="offcanvas" aria-label="Close"><FaXmark className=""/></button>
				</div>
				<div className="offcanvas-body" id="offcanvasExampleLabel">
                    <ul>
                        <li><Link href="/dashboard"><BsSpeedometer className="me-2"/>Dashboard Area</Link></li>
                        <li><Link href="/dashboard/my-profile"><BsPersonLinesFill className="me-2"/>My Profile</Link></li>
                        <li><Link href="/dashboard/my-bookings"><BsJournalCheck className="me-2"/>My Bookings</Link></li>
                        <li><Link href="/dashboard/my-listings"><BsUiRadiosGrid className="me-2"/>My Listings</Link></li>
                        <li><Link href="/dashboard/bookmarks"><BsBookmarkStar className="me-2"/>Bookmarkes</Link></li>
                        <li><Link href="/dashboard/messages"><BsChatDots className="me-2"/>Messages</Link></li>
                        <li><Link href="/dashboard/reviews"><BsYelp className="me-2"/>Reviews</Link></li>
                        <li><Link href="/dashboard/affiliate"><BsWallet className="me-2" />Affiliates</Link></li>
                        <li><Link href="/dashboard/add-listing"><BsPatchPlus className="me-2"/>Add Listing</Link></li>
                        <li onClick={logUserOut}><Link href=""><BsBoxArrowRight className="me-2" /> Sign Out</Link></li>

                    </ul>
				</div>
			</div>
            {/* <div className="offcanvas offcanvas-top h-auto" tabIndex={-1} id="searchSlider" aria-labelledby="searchSliderLabel">
				<div className="offcanvas-body" id="searchSliderLabel">
					<div className="searchForm w-100 mb-3">
						<div className="p-2 ps-3 rounded border d-flex align-items-center justify-content-between gap-2">
							<div className="searchicons"><span><BsSearch className="fs-4 opacity-75"/></span></div>
							<div className="flex-fill"><input type="search" className="form-control border-0 ps-0" placeholder="What are you looking for?"/></div>
							<div className="closeSlides"><Link href="#" className="square--35 circle text-muted-2 border" data-bs-dismiss="offcanvas" aria-label="Close"><BsX /></Link></div>
						</div>
					</div>
					<div className="popularSearches d-flex align-items-center justify-content-center gap-2 flex-wrap">
						<div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Real Estate</Link></div>	
						<div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Eat & Drink</Link></div>	
						<div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Shopping</Link></div>	
						<div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Nightlife</Link></div>	
						<div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Services</Link></div>	
					</div>
				</div>
			</div> */}
    </>
  )
}
