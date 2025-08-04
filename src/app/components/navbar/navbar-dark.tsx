'use client'
import React, { useState,useEffect } from 'react'
import { usePathname,useRouter } from 'next/navigation'

import { BsPersonCircle,BsBasket2,BsSearch, BsGeoAlt, BsSpeedometer, BsPersonLinesFill, BsJournalCheck, BsUiRadiosGrid, BsBookmarkStar, BsChatDots, BsYelp, BsWallet, BsPatchPlus, BsBoxArrowInRight, BsPersonPlus, BsQuestionCircle, BsShieldCheck, BsPersonVcard, BsCalendar2Check, BsPersonCheck, BsBlockquoteLeft, BsEnvelopeCheck, BsCoin, BsPatchQuestion, BsHourglassTop, BsInfoCircle, BsXOctagon, BsGear, BsGeoAltFill, BsX, } from "react-icons/bs";
import { FiX } from 'react-icons/fi';
import { BiSolidShoppingBagAlt } from 'react-icons/bi'
import Link from 'next/link';
import Image from 'next/image';

export default function NavbarDark() {
    const [scroll,setScroll] = useState(false);
    const [current , setCurrent] = useState('');
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState(false);

    const location = usePathname(); 

    const router = useRouter();
    
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

  return (
    <>
        <div className={`header header-light ${scroll ? 'header-fixed' : ''} `} data-sticky-element="">
            <div className="container-fluid">
                <nav id="navigation" className={windowWidth > 991 ? "navigation navigation-landscape" : " navigation navigation-portrait "}>
                    <div className="nav-header">
                        <Link className="nav-brand" href="/"><Image src='/logo.png' width={0} height={0} sizes='100vw' style={{width:'166px', height:'auto'}} className="logo" alt=""/></Link>
                        <div className="nav-toggle" onClick={()=>setIsToggle(!toggle)}></div>
                        {/* <div className="mobile_nav">
                            <ul>
                                <li>
                                    <Link href="#login" className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#login"><BsPersonCircle className="me-1"/></Link>
                                </li>
                                <li>
                                    <Link href="#cartSlider" className="cart-content" data-bs-toggle="offcanvas" role="button" aria-controls="cartSlider"><BsBasket2  className=""/><span className="head-cart-counter">3</span></Link>
                                </li>
                                <li>
                                    <Link href="#searchSlider" className="d-flex align-items-center" data-bs-toggle="offcanvas" role="button" aria-controls="searchSlider"><BsSearch className="me-1"/></Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                    <div className={`nav-menus-wrapper  ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{transitionProperty:toggle ? 'none' : 'left'}}>
                        <div className='mobLogos'>
                            <Image src='/logo.png' width={0} height={0} sizes='100vw' style={{width:'140px', height:'auto'}} className='img-fluid lightLogo' alt='Logo'/>
                        </div>
                        <span className='nav-menus-wrapper-close-button'  onClick={()=>setIsToggle(!toggle)}>✕</span>
                        <ul className="nav-menu">
                            <li className={`${['/'].includes(current)? 'active' : ''}`}><Link href="/">Home</Link></li>

                            <li className={`${['/listings'].includes(current) ? 'active' : ''}`}><Link href="/listings">Listings</Link></li>
                            <li className={`${['/professionals'].includes(current) ? 'active' : ''}`}><Link href="/professionals">Professionals</Link></li>
                            <li className={`${['/about-us'].includes(current) ? 'active' : ''}`}><Link href="/about-us">About Us</Link></li>
                            <li className={`${['/blog'].includes(current) ? 'active' : ''}`}><Link href="/blog">Blogs</Link></li>
                            <li className={`${['/contact-us'].includes(current) ? 'active' : ''}`}><Link href="/contact-us">Contact Us</Link></li>
                            <li className={`${['/faq'].includes(current) ? 'active' : ''}`}><Link href="/faq">FAQs</Link></li>
                            <li><Link href="/auth/register" className="mob-addlisting light" ><BsGeoAltFill className="me-1"/>Add Listing</Link></li>
                        </ul>

                        <ul className="nav-menu nav-menu-social align-to-right">
                            
                            <li className="list-buttons">
                                <Link href="/auth/register"><BsGeoAlt className="fs-6 me-1"/>Add Listing</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
        <div className="clearfix"></div>

        

        
        
    </>
  )
}
