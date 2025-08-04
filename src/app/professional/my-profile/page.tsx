"use client";

import ProfessionalSidebar from '@/app/components/admin/professional-sidebar';
import BackToTop from '@/app/components/back-to-top';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import MerchantAPIServices from '../../../../lib/services/merchant_api_services';
import { BsPatchQuestionFill } from 'react-icons/bs';
import { FaFile } from 'react-icons/fa6';
import APIServices from '../../../../lib/services/api_services';

const MyProfile = () => {
    const { data:session, status } = useSession();
    const [ professionsList, setProfessionsList ] = useState<any[]>([]);
    const [ specializationsList, setSpecializationsList ] = useState<any[]>([]);

    const [ name, setName ] = useState("");
    const [ title, setTitle] = useState("");
    const [ profession, setProfession] = useState("");
    const [ specializations, setSpecializations] = useState("");
    const [ yearsOfExperience, setYearsOfExperience] = useState("");
    const [ phone, setPhone] = useState("");
    const [ email, setEmail] = useState("");
    const [ website, setWebsite ] = useState("");
    const [ fee, setFee ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ bio, setBio] = useState("");
    const [ profileImage, setProfileImage ] = useState("");
    const [ bannerMain, setBannerMain ] = useState("");

    const [ logoImage, setLogoImage] = useState("");
    const [ logoPreview, setLogoPreview ] = useState("");
    const [ bannerImage, setBannerImage] = useState("");
    const [ bannerPreview, setBannerPreview ] = useState("");


    const logoChange = async(e: any) => {
        const file = e.target.files[0];
        if (file) {
            setLogoImage(file);
            setLogoPreview(URL.createObjectURL(file));
        }
    }

    const bannerChange = async(e: any) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        const fetchData = async()=> {
            if(!session?.accessToken){
                throw new Error("You must be logged in")
            }

            const res = await MerchantAPIServices.get("professional/profile/", session?.accessToken);
            console.log(res.fullname);
            setName(res.fullname || "");
            setTitle(res.title || "");
            setProfession(res.profession || "");
            setSpecializations(res.specializations || "");
            setYearsOfExperience(res.years_of_experience || "")
            setPhone(res.phone || "");
            setEmail(res.email || "");
            setWebsite(res.website || "");
            setLocation(res.location || "");
            setBio(res.bio || "");
            setProfileImage(res.profile_image || "");
            setBannerMain(res.banner_image || "");
            setFee(res.consultation_fee || "");
        }
        fetchData();
    }, [session])


    useEffect(() => {
        const fetchData = async() => {
            const [professions, specializations ] = await Promise.all([
                APIServices.get("professional/professions/"),
                APIServices.get("professional/specializations/"),
            ]);
            setProfessionsList(professions);
            setSpecializationsList(specializations);
        }
        fetchData();
    }, []);


    const handleProfileData = async(e: any) => {
        e.preventDefault();

        if(!session?.accessToken){
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("fullname", name);
        formData.append("title", title);
        formData.append("profession", profession);
        formData.append("specializations", specializations);
        formData.append("years_of_experience", yearsOfExperience);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("website", website);
        formData.append("location", location);
        formData.append("bio", bio);
        formData.append("consultation_fee", fee);

        const res = await MerchantAPIServices.patch("professional/profile/", session?.accessToken, formData);
        console.log(res);

    }


    const handleProfileImage = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("profile_image", logoImage);

        const res = await MerchantAPIServices.patch("professional/profile/", session?.accessToken, formData);
        console.log(res);
    }


    const handleBannerImage = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("banner_image", bannerImage);

        const res = await MerchantAPIServices.patch("professional/profile/", session?.accessToken, formData);
        console.log(res);
    }

    return (
        <>
                <AdminNavbar/>
        
                <section className="p-0">
                    <div className="container-fluid p-0">
                        <div className="row user-dashboard g-0">
                            <ProfessionalSidebar />
                            <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                                <div className="user-dashboard-box bg-light">
                                    
                                    <div className="dashCaption p-xl-5 p-3 p-md-4">
                                        
                                        <h4 className="fs-5 fw-medium pb-3"><FaFile className="text-primary me-2" />Profile Data</h4>

                                        <div className="row pb-5">
                                            <div className='col-xl-3 col-lg-3 col-md-4 col-12'>
                                                <div className="nav flex-column gap-2 nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                    <button className="nav-link active" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">Info</button>
                                                    <button className="nav-link" id="v-pills-images-tab" data-bs-toggle="pill" data-bs-target="#v-pills-images" type="button" role="tab" aria-controls="v-pills-images" aria-selected="false">Images</button>
                                                    <button className="nav-link" id="v-pills-education-tab" data-bs-toggle="pill" data-bs-target="#v-pills-education" type="button" role="tab" aria-controls="v-pills-education" aria-selected="false">Education</button>
                                                    <button className="nav-link" id="v-pills-experience-tab" data-bs-toggle="pill" data-bs-target="#v-pills-experience" type="button" role="tab" aria-controls="v-pills-experience" aria-selected="false">Experience</button>
                                                    <button className="nav-link" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab" aria-controls="v-pills-settings" aria-selected="false">Hours</button>
                                                </div>
                                            </div>
                                            <div className='col-xl-9 col-lg-9 col-md-8 col-12'>
                                                <div className="tab-content" id="v-pills-tabContent">
                                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabIndex={0}>
                                                        <form onSubmit={handleProfileData}>

                                                            <div className="row">
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Full Name<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="your name" /></label>
                                                                        <input type="text" className="form-control rounded" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Title<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="title" /></label>
                                                                        <input type="text" className="form-control rounded" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Dr, Adv, Eng" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Profession<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="profession" /></label>
                                                                        <select className='form-select rounded' 
                                                                            name="profession" 
                                                                            value={profession}
                                                                            onChange={(e) => setProfession(parseInt(e.target.value))}
                                                                        >
                                                                            <option value="">Choose option</option>
                                                                            {professionsList.map((item: any) => (
                                                                                <option key={item.id} value={item.id}>{item.name}</option>
                                                                            ))}
                                                                            
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Specializations<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="specializations" /></label>
                                                                        <select multiple className='form-select rounded' name="specializations" 
                                                                            value={specializations}
                                                                            onChange={(e) => {
                                                                                const selected = Array.from(e.target.selectedOptions).map((opt) => parseInt(opt.value));
                                                                                setSpecializations(selected);
                                                                            }}
                                                                        >
                                                                            <option value="">Choose option</option>
                                                                            {specializationsList.map((item: any) => (
                                                                                <option key={item.id} value={item.id}>{item.name}</option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                           

                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Years of Experience<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="years of experience" /></label>
                                                                        <input type="text" className="form-control rounded" name="years_of_experience" value={yearsOfExperience} onChange={(e) => setYearsOfExperience(e.target.value)} placeholder="e.g 5" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Phone Number<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="phone" /></label>
                                                                        <input type="text" className="form-control rounded" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g 254722..." />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Email<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="email" /></label>
                                                                        <input type="text" className="form-control rounded" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g johndoe@email.com" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Website<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="website" /></label>
                                                                        <input type="text" className="form-control rounded" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}  placeholder="e.g https://companyname.co.ke" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Consultation Fee (KShs)<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="specializations" /></label>
                                                                        <input type="text" name="fee" className="form-control rounded" value={fee} onChange={(e) => setFee(e.target.value)} placeholder='e.g. 5000' />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Location<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="location" /></label>
                                                                        <input type="text" className="form-control rounded" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g Office, Westlands, Nairobi, Kenya" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                                                                    <div className="form-group form-border">
                                                                        <label className="lableTitle">Bio<BsPatchQuestionFill className="lableTip" data-bs-toggle="tooltip" data-bs-title="bio" /></label>
                                                                        <textarea className="form-control" name="bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Enter your bio here ...."></textarea>
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <button type="submit" className="btn btn-primary rounded-pill fw-medium">
                                                                        Save Changes
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    <div className="tab-pane fade" id="v-pills-images" role="tabpanel" aria-labelledby="v-pills-images-tab" tabIndex={0}>
                                                        <div className="row">
                                                            <div className="col-lg-6 col-md-6">
                                                                <form onSubmit={handleProfileImage}>
                                                                    <label className="lableTitle">Upload Profile Image</label>
                                                                    <input type="file" className='form-control rounded' name="logo" onChange={logoChange} />
                                                                    {logoPreview && (
                                                                        <div>
                                                                            <div className="mt-2">
                                                                                <img src={logoPreview} alt="Profle Image Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                                                                            </div>

                                                                            <div className='py-4'>
                                                                                <button type="submit" className="btn btn-primary btn-sm rounded-pill fw-medium">Upload Image</button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {profileImage && (
                                                                        <img src={profileImage} alt="Profle Image" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                                                                    )}

                                                                    <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                                                                </form>
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                                <form onSubmit={handleBannerImage}>
                                                                    <label className="lableTitle">Upload Banner</label>
                                                                    <input type="file" className='form-control rounded' name="banner" onChange={bannerChange} />
                                                                    {bannerPreview && (
                                                                        <div>
                                                                            <div className="mt-2">
                                                                                <img src={bannerPreview} alt="Banner Preview" style={{ maxWidth: "100%", borderRadius: "8px" }} />
                                                                            </div>
                                                                            <div className='py-4'>
                                                                                <button type="submit" className="btn btn-primary btn-sm rounded-pill fw-medium">Upload Banner</button>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                    {bannerMain && (
                                                                        <img src={bannerMain} alt="Banner Image" style={{ maxWidth: "200px", borderRadius: "8px" }} />
                                                                    )}
                                                                    <label className="smart-text text-md">Maximum file size: 2 MB.</label>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="v-pills-education" role="tabpanel" aria-labelledby="v-pills-education-tab" tabIndex={0}>Education</div>
                                                    <div className="tab-pane fade" id="v-pills-experience" role="tabpanel" aria-labelledby="v-pills-experience-tab" tabIndex={0}>Experience</div>
                                                    <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab" tabIndex={0}>settings</div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                        <div className="row align-items-start g-4">
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <p className="text-muted m-0">© Nairobi Business {new Date().getFullYear()} Design By Savannah Software Solutions</p>
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

export default MyProfile