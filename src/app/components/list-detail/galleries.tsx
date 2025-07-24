'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { ImageModel, ListingModel } from '../../../../lib/models/all_models';

const images = ['/img/gal-1.jpg','/img/gal-2.jpg','/img/gal-3.jpg','/img/gal-4.jpg','/img/gal-5.jpg','/img/gal-6.jpg']


interface GalleriesProps {
    business: ListingModel;
}

export default function Galleries({ business } : GalleriesProps) {
    let [isOpen, setisOpen] = useState<boolean>(false);
    let [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  
    let handleImageClick = (index:number) => {
        setCurrentImageIndex(index);
        setisOpen(true);
    };
    const slides = business?.gallery?.map((image: ImageModel) => ({ src: image?.image }));
    
  return (
        <div className="listingSingleblock mb-4" id="Galleries">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#gallery" data-bs-target="#gallery" aria-controls="gallery" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Gallery</h4></Link>
            </div>
            
            <div id="gallery" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <ul className="row align-items-center justify-content-center g-3 p-0">
                      {business?.gallery?.map((item: ImageModel)=>{
                            return(
                                <li className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-6" key={item?.id}>
                                    <Link href="#" className="mfp-gallery d-block" onClick={() => handleImageClick(item?.id)}>
                                    <Image src={item?.image} width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid rounded" alt="Gallery Img"/></Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

                <Lightbox
                    open={isOpen}
                    close={() => setisOpen(false)}
                    slides={slides}
                    index={currentImageIndex} 
                />
        </div>
  )
}
