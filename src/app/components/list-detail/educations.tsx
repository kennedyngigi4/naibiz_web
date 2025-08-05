"use client";

import React from 'react';
import Link from 'next/link';


interface EducationsProps {
    professional: any;
}

export default function Educations({ professional }: EducationsProps) {
    return (
        <div className="listingSingleblock mb-4" id="educations">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#educations" data-bs-target="#educations" aria-controls="educations" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Education Levels</h4></Link>
            </div>

            <div id="educations" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    {professional?.education?.map((item: any) => (
                        <div key={item.id} className="row pb-3">
                            <div className="col-lg-4 col-12">
                                <h6>{item?.institution}</h6>
                            </div>
                            <div className="col-lg-4 col-12">
                                <p className='pb-0 mb-0'>{item?.degree}</p>
                                <p>{item?.field_of_study}</p>
                            </div>
                            <div className="col-lg-4 col-12">
                                <p className='pb-0 mb-0'>{item?.start_year} - {item?.end_year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
