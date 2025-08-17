"use client";

import BackToTop from '@/app/components/back-to-top';
import FooterTop from '@/app/components/footer-top';
import Footer from '@/app/components/footer/footer';
import NavbarDark from '@/app/components/navbar/navbar-dark';
import React, { useEffect, useState } from 'react';
import APIServices from '../../../../lib/services/api_services';
import { useSearchParams } from "next/navigation";
import { BsPatchCheckFill, BsTelephone } from 'react-icons/bs';
import Link from 'next/link';
import { FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6';
import Image from 'next/image';

export default function SearchPage() {
    const searchParams = useSearchParams();

    const q = searchParams.get("q") || "";
    const location = searchParams.get("location") || "";
    const category = searchParams.get("category") || "";

    const [categories, setCategories] = useState<any[]>([]);
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // fetch businesses when search params change
    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            const query = new URLSearchParams({
                ...(q && { q }),
                ...(location && { location }),
                ...(category && { category }),
            }).toString();

            const res = await APIServices.get(`businesses/search/?${query}`);
            setBusinesses(res);
            setLoading(false);
        };

        fetchBusinesses();
    }, [q, location, category]);

    // fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await APIServices.get("businesses/categories/");
            setCategories(res);
        };
        fetchCategories();
    }, []);

    return (
        <>
            <NavbarDark />
            <div>
                <div className="container py-5">
                    <h1 className="fs-4 font-bold">Search Results</h1>
                    <div className="row justify-content-center align-items-center mb-5 pt-lg-0 pt-5">
                        {loading ? (
                            <p>Loading...</p>
                        ) : businesses.length === 0 ? (
                            <p>No businesses found.</p>
                        ) : (
                            <div className="row justify-content-center align-items-center mb-5 pt-lg-0 pt-5">
                                {businesses.map((item: any, index: any) => (
                                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-4" key={index}>
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
                                                        <Link href={`/${item.slug}`} className="d-block"><Image src={item?.main_banner} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid list-thumb object-fit" alt="Listing Img" /></Link>
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
                                                                    <Link href={`/${item.slug}`} className="bookmarkList"><FaHeart className=""></FaHeart></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="list-features d-flex align-items-center justify-content-start row-gap-2 column-gap-3 flex-wrap text-dark">
                                                            <div className="d-flex align-items-center fw-medium">
                                                                <span className={`catIcon catIcon me-2 cats-1`}>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.category_icon }} />
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
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterTop />
            <Footer />
            <BackToTop />
        </>
    );
}
