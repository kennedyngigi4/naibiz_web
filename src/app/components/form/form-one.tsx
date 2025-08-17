'use client'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

const Select = dynamic(()=>import('react-select'),{ssr:false});

import { FaLocationDot } from 'react-icons/fa6'
import { BiSearch } from 'react-icons/bi';
import APIServices from '../../../../lib/services/api_services';
import { useRouter } from 'next/navigation';

export default function FormOne() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    const [ search, setSearch ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ category, setCategory ] = useState("");

    
    useEffect(()=>{
        const fetchData = async() => {
            const res = await APIServices.get("businesses/categories/");
            // const formatted = res?.map((cat: any) => ({
            //     value: cat.id,
            //     label: cat.name
            // }));

            setCategories(res);
        }
        fetchData();
    }, []);


    const handleSubmit = async(e: any) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (search) params.append("q", search);
        if (location) params.append("location", location);
        if (category) params.append("category", category);

        router.push(`/search?${params.toString()}`);
    } 

  return (
    <div className="row align-items-start justify-content-center mb-lg-5 mb-4">
        <div className="col-xl-11 col-lg-12 col-md-12 col-sm-12">
            <form onSubmit={handleSubmit}>
            <div className="heroSearch style-01 shadow">
                <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                    <div className="col-xl-4 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group position-relative">
                            <input 
                                type="text" 
                                className="form-control fs-6 fw-medium border-0 ps-md-2" 
                                placeholder="What are you looking for?"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 side-border">
                        <div className="form-group position-relative">
                            <input 
                                type="text" 
                                className="form-control fs-6 fw-medium border-0" 
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}    
                            />
                            <span className="position-absolute top-50 end-0 translate-middle me-2"><FaLocationDot className="fa-solid fa-location-dot text-muted opacity-50 fs-5"/></span>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group fw-medium lights-bg no-border">
                            <div className="selects">
                                <select 
                                    className="form-control border-0"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}    
                                >
                                    <option value="">Choose category</option>
                                    {categories.map((item:any) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary full-width fw-medium"><BiSearch className="me-2"/>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}
