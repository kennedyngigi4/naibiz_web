"use client";
import Link from 'next/link';
import React from 'react';

interface ProfessionalBioProps {
    professional: any;
}

const ProfessionalBio = ({ professional }: ProfessionalBioProps) => {
    return (
        <div className="listingSingleblock mb-4" id="descriptions">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#description" data-bs-target="#description" aria-controls="description" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">About me</h4></Link>
            </div>

            <div id="description" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <p>{professional?.bio}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalBio