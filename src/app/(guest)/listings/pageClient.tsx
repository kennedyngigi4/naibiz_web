"use client";

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import FilterOne from '@/app/components/filter-one'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top';

import { listData } from '@/app/data/data'

import { FaArrowLeft, FaArrowRight, FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6'
import { BsCoin, BsLightningChargeFill, BsPatchCheckFill, BsTelephone } from 'react-icons/bs'
import { IconType } from 'react-icons'
import NavbarDark from '@/app/components/navbar/navbar-dark'
import { ListingModel } from '../../../../lib/models/all_models'
import APIServices from '../../../../lib/services/api_services'
import { useSearchParams } from 'next/navigation';


export default function ListLayoutTwo() {
    const searchParams = useSearchParams();
    const categoryFromURL = searchParams.get('category');
    const [ listings, setListings ] = useState<ListingModel[]>([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [filters, setFilters] = useState<{ category?: string; rating?: number }>({});


    const fetchData = async (page = 1, newFilters = filters) => {
        const queryParams = new URLSearchParams();
        queryParams.append("page", page.toString());

        if (newFilters.category) queryParams.append("category", newFilters.category);
        if (newFilters.rating) queryParams.append("rating", newFilters.rating.toString());

        const res = await APIServices.get(`businesses/all/?${queryParams.toString()}`);
        
        setListings(res.results);
        setTotalPages(Math.ceil(res.count / 20));
        setCurrentPage(page);
        setFilters(newFilters);
    }

    useEffect(() => {
        const categoryFromURL = searchParams.get('category');
        const ratingFromURL = searchParams.get('rating');

        const initialFilters: typeof filters = {};
        if (categoryFromURL) initialFilters.category = categoryFromURL;
        if (ratingFromURL) initialFilters.rating = parseFloat(ratingFromURL);

        fetchData(1, initialFilters);
    }, []);

    

    return (
        <>
            <NavbarDark/>
            <div className="bg-white py-3 sticky-lg-top z-3">
                <FilterOne list={true} onFilterChange={(newFilters) => fetchData(1, newFilters)} />
            </div>

            <section className="bg-light">
                <div className="container">

                    <div className="row align-items-center justify-content-between mb-4">
                        <div className="col-xl- 5 col-lg-5 col-md-5 col-sm-6 col-6">
                            <div className="totalListingshow">
                                <h6 className="fw-medium mb-0">{listings.length} Listings Found</h6>
                            </div>
                        </div>

                        
                    </div>

                    <div className="row align-items-center justify-content-center g-xl-4 g-3">
                        {listings.map((item: ListingModel, index: number) => {
                            // let Icon = item.tagIcon
                            return (
                                <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12" key={index}>
                                    <div className="listingCard listLayouts card rounded-3 border-0">
                                        <div className="row align-items-center justify-content-start g-3">

                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                                                <div className="listThumb overflow-hidden position-relative">
                                                    {item.is_open ? (
                                                        <div className="position-absolute start-0 top-0 ms-3 mt-3"><span className="badge badge-xs text-uppercase listOpen rounded-pill">Open</span></div>
                                                    ) : (
                                                        <div className="position-absolute start-0 top-0 ms-3 mt-3"><span className="badge badge-xs text-uppercase listClose rounded-pill">Close</span></div>
                                                    )
                                                    }

                                                    {item.section &&
                                                        <div className="position-absolute end-0 bottom-0 me-3 mb-3 text-capitalize"><span className="badge badge-xs featuredList rounded-pill d-flex align-items-center"><FaStar className="me-1" />{item.section}</span></div>
                                                    }
                                                    <Link href={`/${item.id}`} className="d-block"><Image src={item?.main_banner} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid list-thumb object-fit" alt="Listing Img" /></Link>
                                                </div>
                                            </div>

                                            <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-12">
                                                <div className="listCaption px-3 py-4">
                                                    <div className="listTitle d-block mb-4">
                                                        <div className="d-flex align-items-start justify-content-between gap-2">
                                                            <div className="flex-first">
                                                                
                                                                <h5 className="listItemtitle mb-3"><Link href={`/${item.slug}`}>{item.name}<span className="verified"><BsPatchCheckFill className="m-0" /></span></Link></h5>
                                                                <div className="d-flex align-items-center justify-content-start flex-wrap gap-3">
                                                                    <div className="flex-start"><div className="list-location text-muted"><span><FaLocationDot className="me-2" />{item.location}</span></div></div>
                                                                    <div className="flex-last">
                                                                        <div className=" d-flex align-items-center justify-content-start">
                                                                            <FaStar className="fa-solid fa-star text-warning"></FaStar><span className="mx-1 text-dark fw-bold">{item?.rating}</span><span className="text-muted text-md">({item?.reviews?.length} Reviews)</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-last">
                                                                <Link href={`/single-listing-02/${item.id}`} className="bookmarkList"><FaHeart className=""></FaHeart></Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="list-features d-flex align-items-center justify-content-start row-gap-2 column-gap-3 flex-wrap text-dark">
                                                        <div className="d-flex align-items-center fw-medium">
                                                            <span className={`catIcon catIcon me-2 cats-1`}>
                                                                <div  dangerouslySetInnerHTML={{ __html: item.category_icon}} />
                                                            </span> {item.category_name}
                                                        </div>
                                                        <div className="d-flex align-items-center fw-medium">
                                                            <span className="listCall me-2"><BsTelephone className="" /></span>{item?.phone}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className="row align-items-center justify-content-center mt-5">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <nav aria-label="Page navigation">
                                <ul className="pagination justify-content-center">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => fetchData(currentPage - 1)}>
                                            <FaArrowLeft />
                                        </button>
                                    </li>

                                    {Array.from({ length: totalPages }, (_, index) => {
                                        const pageNum = index + 1;
                                        return (
                                            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                                                <button className="page-link" onClick={() => fetchData(pageNum)}>
                                                    {pageNum}
                                                </button>
                                            </li>
                                        );
                                    })}

                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link" onClick={() => fetchData(currentPage + 1)}>
                                            <FaArrowRight />
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>

            <FooterTop />
            <Footer />
            <BackToTop />

        </>
    )
}
