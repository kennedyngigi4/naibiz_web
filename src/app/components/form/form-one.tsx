'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

const Select = dynamic(()=>import('react-select'),{ssr:false});

import { FaLocationDot } from 'react-icons/fa6'
import { BiSearch } from 'react-icons/bi';
import APIServices from '../../../../lib/services/api_services';

export default function FormOne() {
    const [categories, setCategories] = useState([]);
    
    useEffect(()=>{
        const fetchData = async() => {
            const res = await APIServices.get("businesses/categories/");
            const formatted = res?.map((cat: any) => ({
                value: cat.id,
                label: cat.name
            }));

            setCategories(formatted);
        }
        fetchData();
    }, []);

  return (
    <div className="row align-items-start justify-content-center mb-lg-5 mb-4">
        <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12">
            <div className="heroSearch style-01 shadow">
                <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                    <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group position-relative">
                            <input type="text" className="form-control fs-6 fw-medium border-0 ps-md-2" placeholder="What are you looking for?"/>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 side-border">
                        <div className="form-group position-relative">
                            <input type="text" className="form-control fs-6 fw-medium border-0" placeholder="Location"/>
                            <span className="position-absolute top-50 end-0 translate-middle me-2"><FaLocationDot className="fa-solid fa-location-dot text-muted opacity-50 fs-5"/></span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group fw-medium lights-bg no-border">
                            <div className="selects">
                                <Select placeholder="Electronics Shop" options={categories} className="categories form-control border-0"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group">
                            <button type="button" className="btn btn-primary full-width fw-medium"><BiSearch className="me-2"/>Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
