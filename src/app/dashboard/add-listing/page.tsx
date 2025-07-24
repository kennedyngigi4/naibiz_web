'use client'
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Select = dynamic(()=>import('react-select'),{ssr:false})

import AdminNavbar from '@/app/components/navbar/admin-navbar'
import AdminSidebar from '@/app/components/admin/admin-sidebar'

import { FaFile, FaHeart } from 'react-icons/fa6'
import { BsArrowRightCircle, BsFeather, BsGeoAlt, BsImages, BsPatchQuestionFill, BsPhoneFlip, BsPlusCircle, BsStopwatch, BsX } from 'react-icons/bs'
import BackToTop from '@/app/components/back-to-top'
import { useSession } from 'next-auth/react'
import MerchantAPIServices from '../../../../lib/services/merchant_api_services'
import APIServices from '../../../../lib/services/api_services'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Autocomplete, LoadScript } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function AddListing() {

    const {data:session } = useSession();
    const router = useRouter();
    const [malls, setMalls] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    const [logoImage, setLogoImage ] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [logoPreview, setLogoPreview] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const [autocompleteRef, setAutocompleteRef] = useState<google.maps.places.Autocomplete | null>(null);
    const [location, setLocation] = useState("");
    const [latLng, setLatLng] = useState({ lat: null, lng: null });

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        setAutocompleteRef(autocomplete);
    };


    const onPlaceChanged = () => {
        if (autocompleteRef !== null) {
            const place = autocompleteRef.getPlace();
            if (!place.geometry) return;

            const name = place.name || "";
            const address = place.formatted_address || place.name;
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();

            // Round lat/lng to 5 decimals
            const roundedLat = lat ? Number(lat.toFixed(5)) : "";
            const roundedLng = lng ? Number(lng.toFixed(5)) : "";

            setLocation(`${name}, ${address}`);
            setLatLng({ lat, lng });
            setListingData(prev => ({
                ...prev,
                location: `${name}, ${address}`,   // e.g., "Imenti House, Tom Mboya St, Nairobi, Kenya"
                latitude: roundedLat,
                longitude: roundedLng,
            }));
        }
    };

    const handleManualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };


    const [ listingData, setListingData ] = useState({
        name: "",
        mall: "",
        category: "",
        subcategory: "",
        services: "",
        location: "",
        description: "",
        email: "",
        phone: "",
        website: "",
        whatsapp: "",
        facebook: "",
        instagram: "",
        tiktok: "",
        twitterx: "",
        youtube: "",
        linkedin: "",
        main_banner: "",
        profile_image: "",
    });

    const [hours, setHours ] = useState({
        monday: { opening: "", closing: "", },
        tuesday: { opening: "", closing: "", },
        wednesday: { opening: "", closing: "", },
        thursday: { opening: "", closing: "", },
        friday: { opening: "", closing: "", },
        saturday: { opening: "", closing: "", },
        sunday: { opening: "", closing: "", },
    });



    const [ isSubmitting, setIsSubmitting] = useState(false);
    const [ errors, setErrors ] = useState<string | null>(null);
    const [ success, setSuccess] = useState(false);


    useEffect(() => {
        const fetchData = async() => {
            const malls = await APIServices.get("malls/all/");
            const categories = await APIServices.get("businesses/categories/");
            const subcategories = await APIServices.get("businesses/subcategories/");
            setMalls(malls);
            setCategories(categories);
            setSubCategories(subcategories);
            console.log(malls);
            console.log(categories);
        }
        fetchData();
    }, [])


    const mallOptions = malls.map((mall:any) => ({
        value: mall.id,
        label: mall.name,
    }));


    const categoriesOptions = categories.map((category: any) => ({
        value: category.id,
        label: category.name,
    }))

    const subcategoriesOptions = subcategories.map((subcategory: any) => ({
        value: subcategory.id,
        label: subcategory.name,
    }))
      
    const time = [
        { value: '', label: 'Closed' },
        { value: '01:00', label: '1 :00 AM' },
        { value: '02:00', label: '2 :00 AM' },
        { value: '03:00', label: '3 :00 AM' },
        { value: '04:00', label: '4 :00 AM' },
        { value: '05:00', label: '5 :00 AM' },
        { value: '06:00', label: '6 :00 AM' },
        { value: '07:00', label: '7 :00 AM' },
        { value: '08:00', label: '8 :00 AM' },
        { value: '09:00', label: '9 :00 AM' },
        { value: '10:00', label: '10 :00 AM' },
        { value: '11:00', label: '11 :00 AM' },
        { value: '12:00', label: '12 :00 AM' },
        { value: '13:00', label: '1 :00 PM' },
        { value: '14:00', label: '2 :00 PM' },
        { value: '15:00', label: '3 :00 PM' },
        { value: '16:00', label: '4 :00 PM' },
        { value: '17:00', label: '5 :00 PM' },
        { value: '18:00', label: '6 :00 PM' },
        { value: '19:00', label: '7 :00 PM' },
        { value: '20:00', label: '8 :00 PM' },
        { value: '21:00', label: '9 :00 PM' },
        { value: '22:00', label: '10 :00 PM' },
        { value: '23:00', label: '11 :00 PM' },
        { value: '00:00', label: '12 :00 PM' },
    ];


    const DAY_CODES = {
        monday: "Mon",
        tuesday: "Tue",
        wednesday: "Wed",
        thursday: "Thu",
        friday: "Fri",
        saturday: "Sat",
        sunday: "Sun"
    };


    const buildHoursList = () => {
        return Object.entries(hours).map(([longDay, times]) => {
            const opening = times.opening || null;
            const closing = times.closing || null;

            return {
                day: DAY_CODES[longDay],
                opening_time: opening,
                closing_time: closing
            };
        });
    };
      

    const handelChange = (e: { target: { name: any, value: any}}) => {
        const { name, value } = e.target;
        setListingData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    // For Select components
    const handleSelectChange = (name, selectedOption) => {
        setListingData(prev => ({
            ...prev,
            [name]: selectedOption.value
        }));
    };

    // For working hours
    const handleWorkingHoursChange = (day, type, selectedOption) => {
        setHours(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [type]: selectedOption.value
            }
        }));
    };


    const logoChange = (e: any) =>{
        const file = e.target.files[0];
        if (file) {
            setLogoImage(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    }


    const bannerChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    }
    

    const handleSubmit = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }


        console.log(listingData);

        const formData = new FormData();
        Object.entries(listingData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        buildHoursList().forEach(hour => {
            formData.append("hours", JSON.stringify(hour));
        });
        


        // Append files if selected
        if (logoImage) formData.append("profile_image", logoImage);
        if (bannerImage) formData.append("main_banner", bannerImage);

        setIsSubmitting(true);

        try{
            const res = await MerchantAPIServices.post("businesses/merchant/add_listing/", session?.accessToken, formData);
            if(res.success){
                toast.success(res.message || "Upload successful!");
                router.push("/dashboard/my-listings");
            } else {
                toast.error(res.message || "An error occurred.");
            }
        } catch(e){
            console.log(e);
        } finally {
            setIsSubmitting(false);
        }
    }


  return (
    <>
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
        <AdminNavbar/>

        <section className="p-0">
            <div className="container-fluid p-0">
                <div className="row user-dashboard g-0">
                    <AdminSidebar/>
                    <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                        <div className="user-dashboard-box bg-light">
                            
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 py-lg-0 py-5">
                                <h2 className="fw-medium mb-0">Add Listing</h2>
                            </div>
                            
                            <form onSubmit={handleSubmit}>
                            <div className="dashCaption p-xl-5 p-3 p-md-4">
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><FaFile className="text-primary me-2"/>Basic Informations</h4>
                                            </div>
                                            <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Listing Name<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Name of your business"/></label>
                                                                <input type="text" className="form-control rounded" name="name" value={listingData.name} onChange={handelChange} placeholder="e.g. Decathlon Sport House"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                              <label className="lableTitle">Mall<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Maximum 10 keywords related with business" /></label>
                                                                <div className="selects">
                                                                    <Select 
                                                                        placeholder="Business Bay Square" 
                                                                        options={mallOptions} 
                                                                        className="categories form-control" 
                                                                        onChange={(selectedOption) => handleSelectChange('mall', selectedOption)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                              <label className="lableTitle">Category<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Maximum 10 keywords related with business" /></label>
                                                                <div className="selects">
                                                                    <Select 
                                                                        placeholder="e.g Fashion" 
                                                                        options={categoriesOptions} 
                                                                        className="categories form-control"
                                                                        onChange={(selectedOption) => handleSelectChange('category', selectedOption)}    
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Sub Category<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Maximum 10 keywords related with business" /></label>
                                                                <div className="selects">
                                                                    <Select
                                                                        placeholder="e.g Women clothes"
                                                                        options={subcategoriesOptions}
                                                                        className="categories form-control"
                                                                        onChange={(selectedOption) => handleSelectChange('subcategory', selectedOption)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">Services<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="Maximum 10 keywords related with business"/></label>
                                                                <input type="text" className="form-control rounded" name="services" value={listingData.services} onChange={handelChange} placeholder="Type services by comma's"/>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                            <div className="form-group form-border">
                                                                <label className="lableTitle">About Listing</label>
                                                                <textarea className="form-control rounded ht-150" name="description" value={listingData.description} onChange={handelChange} placeholder="Describe your business"></textarea>
                                                            </div>
                                                        </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><BsGeoAlt className="text-primary me-2"/>Add Location</h4>
                                            </div>
                                            <div className="card-body">
                                                    <div className="row">
                                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Address</label>
                                                            <Autocomplete
                                                                onLoad={onLoad}
                                                                onPlaceChanged={onPlaceChanged}
                                                                options={{
                                                                    componentRestrictions: { country: "ke" },
                                                                    types: ["establishment"],
                                                                    fields: ["name", "formatted_address", "geometry", "place_id"],
                                                                }}
                                                            >
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    ref={inputRef}
                                                                    placeholder="Enter business or building name"
                                                                    value={location}
                                                                    onChange={handleManualChange}
                                                                />
                                                            </Autocomplete>
                                                            <small className="form-text text-muted">
                                                                Coordinates: {latLng.lat}, {latLng.lng}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>



                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><BsPhoneFlip className="text-primary me-2" />Contact Information</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Phone</label>
                                                            <input type="tel" className="form-control rounded" name="phone" value={listingData.phone} onChange={handelChange} placeholder="254722 ..." />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Email</label>
                                                            <input type="email" className="form-control rounded" name="email" value={listingData.email} onChange={handelChange} placeholder="e.g. company@email.com" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Website</label>
                                                            <input type="url" className="form-control rounded" name="website" value={listingData.website} onChange={handelChange} placeholder="e.g. https://companyname.com" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><BsImages className="text-primary me-2" />Logo & Gallery</h4>
                                            </div>

                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <label className="lableTitle">Upload Logo</label>
                                                        <input type="file" className='form-control rounded' name="logo" onChange={logoChange} />
                                                        {logoPreview && (
                                                            <div className="mt-2">
                                                                <img src={logoPreview} alt="Logo Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                                                            </div>
                                                        )}
                                                        <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                                                    </div>
                                                    <div className="col-lg-6 col-md-6">
                                                        <label className="lableTitle">Upload Banner</label>
                                                        <input type="file" className='form-control rounded' name="banner" onChange={bannerChange} />
                                                        {bannerPreview && (
                                                            <div className="mt-2">
                                                                <img src={bannerPreview} alt="Banner Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                                                            </div>
                                                        )}
                                                        <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><BsPhoneFlip className="text-primary me-2" />Social Media Links</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Whatsapp</label>
                                                            <input type="url" className="form-control rounded" name="whatsapp" value={listingData.whatsapp} onChange={handelChange} placeholder="e.g. https://wa.me/......" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Facebook</label>
                                                            <input type="url" className="form-control rounded" name="facebook" value={listingData.facebook} onChange={handelChange} placeholder="e.g. https://facebook.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Instagram</label>
                                                            <input type="url" className="form-control rounded" name="instagram" value={listingData.instagram} onChange={handelChange} placeholder="e.g. https://instagram.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">Twitter-X</label>
                                                            <input type="url" className="form-control rounded" name="twitterx" value={listingData.twitterx} onChange={handelChange} placeholder="e.g. https://x.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">TikTok</label>
                                                            <input type="url" className="form-control rounded" name="tiktok" value={listingData.tiktok} onChange={handelChange} placeholder="e.g. https://tiktok.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">YouTube</label>
                                                            <input type="url" className="form-control rounded" name="youtube" value={listingData.youtube} onChange={handelChange} placeholder="e.g. https://youtube.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                                        <div className="form-group form-border">
                                                            <label className="lableTitle">LinkedIn</label>
                                                            <input type="url" className="form-control rounded" name="linkedin" value={listingData.linkedin} onChange={handelChange} placeholder="e.g. https://linkedin.com/" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="card rounded-3 shadow-sm">
                                            <div className="card-header py-4 px-4">
                                                <h4 className="fs-5 fw-medium"><BsStopwatch className="text-primary me-2"/>Working Hours</h4>
                                            </div>
                                            <div className="card-body">
                                                    <div className="row">
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Monday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('monday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('monday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Tuesday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('tuesday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('tuesday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Wednesday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('wednesday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('wednesday', 'opening', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Thursday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('thursday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('thursday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Friday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('friday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('friday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Saturday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('saturday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('saturday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group form-border">
                                                        <div className="row align-items-center g-3">
                                                            <label className="lableTitle col-lg-2 col-md-2">Sunday</label>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='openingtime chosen-select border' options={time} placeholder="Opening Time" onChange={(selectedOption) => handleWorkingHoursChange('sunday', 'opening', selectedOption)} />
                                                            </div>
                                                            <div className="col-lg-5 col-md-5">
                                                                      <Select className='closingtime chosen-select border' options={time} placeholder="Closing Time" onChange={(selectedOption) => handleWorkingHoursChange('sunday', 'closing', selectedOption)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* <div className="form-check mt-4 ps-5">
                                                        <input id="t24" className="form-check-input" name="24-1" type="checkbox"/>
                                                        <label htmlFor="t24" className="form-check-label text-dark">This Business open 7x24</label>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <button type="submit" className="btn btn-primary rounded-pill fw-medium">
                                            {isSubmitting ? (<>Uploading ...</>) : (<>Publish & Preview<BsArrowRightCircle className="ms-2" /></>)}
                                        </button>
                                    </div>
                                    
                                </div>
                                
                                <div className="row align-items-start g-4">
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                          <p className="text-muted m-0">© {new Date().getFullYear()} Nairobi Business. Develop with <FaHeart className="ms-1 text-danger"></FaHeart>  By <Link href="https://savannahsoftwaresolutions.co.ke/" target="_blank">Savannah Software Solutions</Link></p>
                                    </div>
                                </div>
                                
                            </div>
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <BackToTop/>
        </LoadScript>
    </>
  )
}
