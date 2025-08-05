"use client";

import React from 'react';
import Link from 'next/link';


interface WorkExperienceProps {
    professional: any;
}

export default function WorkExperience({ professional }: WorkExperienceProps) {
    return (
        <div className="listingSingleblock mb-4" id="workexperience">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#workexperience" data-bs-target="#workexperience" aria-controls="workexperience" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Work Experience</h4></Link>
            </div>

            <div id="workexperience" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    {professional?.work_experience?.map((item: any) => (
                        <div key={item.id} className="row pb-3">
                            <div className="col-lg-4 col-12">
                                <h6 className='pb-0 mb-0'>{item?.company}</h6>
                            </div>
                            <div className="col-lg-4 col-12">
                                <p>{item?.position}</p>
                            </div>
                            <div className="col-lg-4 col-12">
                                <p className='pb-0 mb-0 text-muted'>From - To</p>
                                <p className='pt-0 mt-0'>{item?.start_date} - {item?.end_date}</p>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
