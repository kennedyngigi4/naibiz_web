// @ts-nocheck 
'use client'
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsPatchPlus } from 'react-icons/bs';






export default function ImageUplod({ onLogoChange: onFeaturedChange }) {
    const [logoImage, setLogoImage] = useState(null);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImage, setGalleryImage] = useState(null);
  
  const createOnDropHandler = (onChange) =>
    useCallback((acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles[0]); 
      }
    }, [onChange]);
  
    const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
      onDrop: createOnDropHandler(setLogoImage),
    });
  
    const { getRootProps: getFeaturedRootProps, getInputProps: getFeaturedInputProps } = useDropzone({
      onDrop: createOnDropHandler(setFeaturedImage),
    });
  
    
  
    const renderDropzone = (imageSrc, getRootProps, getInputProps) => (
      <div {...getRootProps()} className="dropzone dz-clickable p-4 my-3">
        <input {...getInputProps()} />
        {!imageSrc ? (
          <>
            <div className="text-center">
              <BsPatchPlus className='fs-2 mb-3'/>
            </div>
            <p className="text-center">Drop files here to upload</p>
          </>
        ) : (
          <div>
            <img src={imageSrc} alt="Uploaded" style={{ width: '100%', height: 'auto' }} />
          </div>
        )}
      </div>
    );
return (
    <div className="card-body">
    <div className="row g-4">
      <div className="col-lg-6 col-md-6">
        <label className="lableTitle">Upload Logo</label>
        {renderDropzone(logoImage, getLogoRootProps, getLogoInputProps)}
        <label className="smart-text text-md">Maximum file size: 2 MB.</label>
      </div>

      <div className="col-lg-6 col-md-6">
        <label className="lableTitle">Featured Image</label>
        {renderDropzone(featuredImage, getFeaturedRootProps, getFeaturedInputProps)}
        <label className="smart-text text-md">Maximum file size: 2 MB.</label>
      </div>

      
    </div>
  </div>
  )
}
