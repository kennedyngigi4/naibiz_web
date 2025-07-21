"use client";

import React from 'react';
import Link from 'next/link';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type MapDisplayProps = {
    latitude: number;
    longitude: number;
    label?: string;
};


const containerStyle = {
    width: "100%",
    height: "450px",
};

export default function Maps({ latitude, longitude, label }: MapDisplayProps) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    // Parse and validate
    const lat = parseFloat(latitude as any);
    const lng = parseFloat(longitude as any);

    const isValidLatLng = !isNaN(lat) && !isNaN(lng);

    const center = { lat, lng };


    if (!isLoaded || !isValidLatLng) return <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.816903746152!2d36.82017067341916!3d-1.283741398704048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5d63997f1%3A0xfb825e08591621ab!2sKimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1753071103360!5m2!1sen!2ske" className="full-width" height="450" style={{ border: '0' }} allowFullScreen loading="lazy"></iframe>;

    return (
            <div className="listingSingleblock mb-4" id="maps">
                <div className="SingleblockHeader">
                    <Link data-bs-toggle="collapse" data-parent="#map" data-bs-target="#map" aria-controls="map" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Map</h4></Link>
                </div>
                
                <div id="map" className="panel-collapse collapse show">
                    <div className="card-body p-4 pt-2">
                        <div className="map-container rounded-3 overflow-hidden">
                        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
                            <Marker position={center} label={label} />
                        </GoogleMap>
                        </div>
                    </div>
                </div>
            </div>
    )
}
