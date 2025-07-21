"use client";

import React from 'react';
import Link from 'next/link';
import { ListingModel } from '../../../../lib/models/all_models';

interface DescriptionsProps {
    business: ListingModel;
}

export default function Descriptions({ business }: DescriptionsProps) {
  return (
        <div className="listingSingleblock mb-4" id="descriptions">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#description" data-bs-target="#description" aria-controls="description" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Description</h4></Link>
            </div>
            
            <div id="description" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <p>{business?.description}</p>
                </div>
            </div>
        </div>
  )
}
