"use client";

import React, { useEffect, useState } from 'react';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import AdminSidebar from '@/app/components/admin/admin-sidebar';
import BackToTop from '@/app/components/back-to-top';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import MerchantAPIServices from '../../../../../lib/services/merchant_api_services';
import { ListingModel } from '../../../../../lib/models/all_models';




const GalleryPage = () => {

    const { data:session } = useSession();
    const params = useParams();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewUrls, setPreviewUrls ] = useState([]);
    const [isUploading, setIsUploading ] = useState(false);
    const [gallery, setGallery ] = useState([]);

    const [businessData, setBusinessData] = useState<ListingModel>();
    

    useEffect(() => {
        const fetchData = async () => {
            if (!session?.accessToken) {
                throw new Error("You must be logged in");
            }
            const res = await MerchantAPIServices.get(`businesses/merchant/listing/${params.listingSlug}/`, session?.accessToken);
            setBusinessData(res);

            const images = await MerchantAPIServices.get(`businesses/merchant/gallery/?business=${businessData?.id}`, session?.accessToken);
            setGallery(images);
        }
        fetchData();
    }, [session, params, businessData]);


    const galleryChange = async(e: any) => {
        const files = Array.from(e.target.files);

        const newPreviewUrls = files.map((file: any) => URL.createObjectURL(file));
        setSelectedFiles(files);
        setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }


    // Remove a preview image
    const removeImage = (index: any) => {
        const newPreviews = [...previewUrls];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviewUrls(newPreviews);

        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedFiles.length === 0 || !businessData?.id) return;
        if (!session?.accessToken) {
            console.error("You must be logged in.");
            return;
        }

        setIsUploading(true);

        try {
            const results = [];
            for (const file of selectedFiles) {
                const singleFileFormData = new FormData();
                singleFileFormData.append('image', file);
                singleFileFormData.append('business', businessData.id);

                const result = await MerchantAPIServices.post(
                    "businesses/merchant/gallery/",
                    session.accessToken,
                    singleFileFormData
                );
                results.push(result);
            }

            console.log("All uploads completed:", results);
            setSelectedFiles([]);
            setPreviewUrls([]);

        } catch (error) {
            console.error('Error uploading files:', error);
        } finally {
            setIsUploading(false);
        }
    };


   

  return (
    <>
        <AdminNavbar/>

        <section className="p-0">
            <div className="container-fluid p-0">
                <div className="row user-dashboard g-0">
                    <AdminSidebar/>
                    
                    <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                        <div className="user-dashboard-box bg-light p-5">
                            <div className="row">
                                <div className='col-xl-4 col-lg-4 col-md-6 col-12'>
                                    <form onSubmit={handleUpload}>
                                        <div>
                                            <label className="lableTitle">Upload Images</label>
                                              <input
                                                  type="file"
                                                  className='form-control rounded'
                                                  name="gallery_images"
                                                  onChange={galleryChange}
                                                  multiple
                                                  accept="image/*"
                                              />
                                        </div>
                                        {selectedFiles.length > 0 && (
                                            <div className="mb-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    disabled={isUploading}
                                                >
                                                    {isUploading ? 'Uploading...' : 'Upload Images'}
                                                </button>
                                                <span className="ms-2 text-muted">
                                                    {selectedFiles.length} file(s) selected
                                                </span>
                                            </div>
                                        )}
                                    </form>
                                    
                                </div>
                                  <div className="col-12 pt-5">
                                        <h5 className="mb-3">Gallery Preview</h5>
                                        <div className="row g-3">
                                          {previewUrls.map((url, index) => (
                                              <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-12">
                                                  <div className="card border-0 shadow-sm h-100">
                                                      <div className="ratio ratio-1x1">
                                                          <img
                                                              src={url}
                                                              className="img-fluid object-fit-cover"
                                                              alt={`Preview ${index + 1}`}
                                                          />
                                                      </div>
                                                      <div className="card-footer bg-white border-0">
                                                          <button
                                                              type="button"
                                                              className="btn btn-sm btn-outline-danger"
                                                              onClick={() => removeImage(index)}
                                                          >
                                                              Remove
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                        </div>
                                        <div className='row'>
                                          {gallery.map((image: any) => (
                                              <div key={image?.id} className="col-xl-3 col-lg-4 col-md-6 col-12">
                                                  <div className="card border-0 shadow-sm h-100">
                                                      <div className="ratio ratio-1x1">
                                                          <img
                                                              src={image.image}
                                                              className="img-fluid object-fit-cover"
                                                              alt="image"
                                                          />
                                                      </div>
                                                  </div>
                                              </div>
                                          ))}
                                        </div>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <BackToTop/>
    </>
  )
}

export default GalleryPage