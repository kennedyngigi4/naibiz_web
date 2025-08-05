"use client";

import ProfessionalSidebar from '@/app/components/admin/professional-sidebar';
import BackToTop from '@/app/components/back-to-top';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import MerchantAPIServices from '../../../../lib/services/merchant_api_services';
import { BsPatchQuestionFill, BsTrash, BsTrash2 } from 'react-icons/bs';
import { FaFile } from 'react-icons/fa6';
import APIServices from '../../../../lib/services/api_services';
import { toast } from 'react-toastify';

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


    // Education
    const [ institution, setInstitution ] = useState("");
    const [ degree, setDegree ] = useState("");
    const [ fieldofstudy, setFieldofStudy ] = useState("");
    const [ startyear, setStartYear ] = useState("");
    const [ endyear, setEndYear ] = useState("");
    const [ educationList, setEducationList ] = useState<any[]>([]);

    // Work Experience Fields
    const [ company, setCompany ] = useState("");
    const [ position,setPosition ] = useState("");
    const [ startDate, setStartDate ] = useState("");
    const [ endDate, setEndDate] = useState("");
    const [experienceDescription, setExperienceDescription] = useState("");
    const [ workList, setWorkList] = useState<any[]>([]);

    // schedule
    const [ scheduleDay, setScheduleDay ] = useState("");
    const [ details, setDetails ] = useState("");
    const [ timeFrom, setTimeFrom] = useState("");
    const [ timeTo, setTimeTo] = useState("");
    const [ scheduleList, setScheduleList ] = useState<any[]>([]);


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

            const [res, educationList, workList, schedules ] = await Promise.all([
                MerchantAPIServices.get("professional/profile/", session?.accessToken),
                MerchantAPIServices.get("professional/education/", session?.accessToken),
                MerchantAPIServices.get("professional/experience/", session?.accessToken),
                MerchantAPIServices.get("professional/schedule/", session?.accessToken),
            ]);
            
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

            // education list
            console.log(educationList);
            setEducationList(educationList);

            // works list
            setWorkList(workList);

            // schedules list
            setScheduleList(schedules);
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


    const handleEducation = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("institution", institution);
        formData.append("degree", degree);
        formData.append("field_of_study", fieldofstudy);
        formData.append("start_year", startyear);
        formData.append("end_year", endyear);

        const res = await MerchantAPIServices.post("professional/education/", session?.accessToken, formData);
        if (res.success) {
            toast.success(res.message);
            window.location.reload();
        } else {
            toast.error(res.message);
            window.location.reload();
        }
    }


    const handleEducationDelete = async(item:any) => {

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const res = await MerchantAPIServices.delete(`professional/education-delete/${item.id}/`, session?.accessToken);
        if (res) {
            toast.success("Deleted successfully!");
            window.location.reload();
        } else {
            toast.error("Something went wrong");
            window.location.reload();
        }
    }

    const handleExperience = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("company", company);
        formData.append("position", position);
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
        formData.append("description", experienceDescription);

        const res = await MerchantAPIServices.post("professional/experience/", session?.accessToken, formData);
        if (res.success) {
            toast.success(res.message);
            window.location.reload();
        } else {
            toast.error(res.message)
            window.location.reload();
        }
    }


    const handleExperienceDelete = async (item: any) => {

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const res = await MerchantAPIServices.delete(`professional/experience-delete/${item.id}/`, session?.accessToken);
        if (res) {
            toast.success("Deleted successfully!");
            window.location.reload();
        } else {
            toast.error("Something went wrong");
            window.location.reload();
        }
    }

    const handleSchedule = async(e: any) => {
        e.preventDefault();

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const formData = new FormData();
        formData.append("schedule_day", scheduleDay);
        formData.append("time_from", timeFrom);
        formData.append("time_to", timeTo);
        formData.append("details", details);

        const res = await MerchantAPIServices.post("professional/schedule/", session?.accessToken, formData);
        if(res.success){
            toast.success(res.message);
            window.location.reload();
        } else {
            toast.error(res.message)
            window.location.reload();
        }
    }


    const handleScheduleDelete = async (item: any) => {

        if (!session?.accessToken) {
            throw new Error("You must be logged in.");
        }

        const res = await MerchantAPIServices.delete(`professional/schedule-delete/${item.id}/`, session?.accessToken);
        if (res) {
            toast.success("Deleted successfully!");
            window.location.reload();
        } else {
            toast.error("Something went wrong");
            window.location.reload();
        }
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
                                                    <button className="nav-link" id="v-pills-schedule-tab" data-bs-toggle="pill" data-bs-target="#v-pills-schedule" type="button" role="tab" aria-controls="v-pills-schedule" aria-selected="false">Schedule</button>
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
                                                    <div className="tab-pane fade" id="v-pills-education" role="tabpanel" aria-labelledby="v-pills-education-tab" tabIndex={0}>
                                                        
                                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                        Add Education Level
                                                                    </button>
                                                                </h2>
                                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                    <div className="accordion-body bg-light"> 
                                                                        <form onSubmit={handleEducation}>
                                                                            <div className='mb-2'>
                                                                                <label className="lableTitle">Institution</label>
                                                                                <input type="text" className="form-control rounded" placeholder="e.g. Kenyatta University" name="institution" onChange={(e) => setInstitution(e.target.value)} />
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-lg-6 col-12 mb-2'>
                                                                                    <label className="lableTitle">Degree</label>
                                                                                    <input type="text" className="form-control rounded" placeholder="e.g. BSc" name="degree" onChange={(e) => setDegree(e.target.value)} />
                                                                                </div>
                                                                                <div className='col-lg-6 col-12 mb-2'>
                                                                                    <label className="lableTitle">Field of study</label>
                                                                                    <input type="text" className="form-control rounded" placeholder="e.g. Mathematical Sciences" name="field_of_study" onChange={(e) => setFieldofStudy(e.target.value)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-lg-6 col-12 mb-2'>
                                                                                    <label className="lableTitle">Start Year</label>
                                                                                    <input type="number" className="form-control rounded" placeholder="e.g. 2018" name="start_year" onChange={(e) => setStartYear(e.target.value)} />
                                                                                </div>
                                                                                <div className='col-lg-6 col-12 mb-2'>
                                                                                    <label className="lableTitle">End Year</label>
                                                                                    <input type="number" className="form-control rounded" placeholder="e.g. 2023" name="end_year" onChange={(e) => setEndYear(e.target.value)}  />
                                                                                </div>
                                                                            </div>
                                                                            <div className=''>
                                                                                <button type="submit" className="btn btn-primary btn-sm fw-medium">Submit</button>
                                                                            </div>
                                                                        </form>


                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='py-3'>
                                                            {educationList.map((item) => (
                                                                <div className='row' key={item.id}>
                                                                    <div className="col-lg-4 col-12">
                                                                        <p className='fs-5'>{item?.institution}</p>
                                                                    </div>
                                                                    <div className="col-lg-4 col-12">
                                                                        <p className='fs-6 pb-0 mb-0'>{item?.degree}</p>
                                                                        <p className='fs-6'>{item?.field_of_study}</p>
                                                                    </div>
                                                                    <div className="col-lg-3 col-12">
                                                                        <p className='fs-6'>{item?.start_year} - {item?.end_year}</p>
                                                                    </div>
                                                                    <div className="col-lg-1 col-12">
                                                                        <button className='btn btn-primary btn-sm' onClick={() => handleEducationDelete(item)}><BsTrash /></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                        
                                                    </div>
                                                    <div className="tab-pane fade" id="v-pills-experience" role="tabpanel" aria-labelledby="v-pills-experience-tab" tabIndex={0}>
                                                        
                                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                        Add Experience
                                                                    </button>
                                                                </h2>
                                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                    <div className="accordion-body bg-light">
                                                                        <form onSubmit={handleExperience}>
                                                                            <div className='mb-2'>
                                                                                <label className="lableTitle">Company</label>
                                                                                <input type="text" className="form-control rounded" placeholder="e.g. Nairobi Business" name="company" onChange={(e) => setCompany(e.target.value)} />
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='col-lg-4 col-12 mb-2'>
                                                                                    <label className="lableTitle">Position</label>
                                                                                    <input type="text" className="form-control rounded" placeholder="e.g. Manager" name="position" onChange={(e) => setPosition(e.target.value)} />
                                                                                </div>
                                                                                <div className='col-lg-4 col-12 mb-2'>
                                                                                    <label className="lableTitle">Start Date</label>
                                                                                    <input type="date" className="form-control rounded" placeholder="e.g. 2023" name="start_date" onChange={(e) => setStartDate(e.target.value)} />
                                                                                </div>
                                                                                <div className='col-lg-4 col-12 mb-2'>
                                                                                    <label className="lableTitle">End Date</label>
                                                                                    <input type="date" className="form-control rounded" placeholder="e.g. 2023" name="end_date" onChange={(e) => setEndDate(e.target.value)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className='mb-2'>
                                                                                <label className="lableTitle">Description</label>
                                                                                <textarea className='form-control' name="description" rows={1} placeholder='Description here ...' onChange={(e) => setExperienceDescription(e.target.value)}></textarea>
                                                                            </div>
                                                                            <div>
                                                                                <button type='submit' className='btn btn-primary btn-sm'>Submit</button>
                                                                            </div>
                                                                        </form>

                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                        <div className='py-3'>
                                                            {workList.map((item) => (
                                                                <div className='row' key={item.id}>
                                                                    <div className="col-lg-6 col-12">
                                                                        <h4 className='fs-6 pb-0 mb-0'>{item?.company}</h4>
                                                                        <p>{item?.position}</p>
                                                                    </div>
                                                                    <div className="col-lg-5 col-12">
                                                                        <h5 className='fs-6'>{item?.start_date} - {item?.end_date}</h5>
                                                                    </div>

                                                                    <div className="col-lg-1 col-12">
                                                                        <button className='btn btn-primary btn-sm' onClick={() => handleExperienceDelete(item)}><BsTrash /></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="tab-pane fade" id="v-pills-schedule" role="tabpanel" aria-labelledby="v-pills-schedule-tab" tabIndex={0}>
                                                        <div className="accordion accordion-flush" id="accordionFlushExample">
                                                            <div className="accordion-item">
                                                                <h2 className="accordion-header">
                                                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                                        Add Schedule
                                                                    </button>
                                                                </h2>
                                                                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                                                                    <div className="accordion-body bg-light">
                                                                        <form onSubmit={handleSchedule}>
                                                                            <div className="mb-3">
                                                                                <label className="lableTitle">Day</label>
                                                                                <select className="form-select" onChange={(e) => setScheduleDay(e.target.value)}>
                                                                                    <option value="">Choose option</option>
                                                                                    <option value="Mon">Monday</option>
                                                                                    <option value="Tue">Tuesday</option>
                                                                                    <option value="Wed">Wednesday</option>
                                                                                    <option value="Thu">Thursday</option>
                                                                                    <option value="Fri">Friday</option>
                                                                                    <option value="Sat">Saturday</option>
                                                                                    <option value="Sun">Sunday</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className="col-lg-6 col-12 mb-3">
                                                                                    <label className="lableTitle">From</label>
                                                                                <input type="time" className='form-control rounded' name="time_from" onChange={(e) => setTimeFrom(e.target.value)} />
                                                                                </div>
                                                                                <div className="col-lg-6 col-12 mb-3">
                                                                                    <label className="lableTitle">To</label>
                                                                                    <input type="time" className='form-control rounded' name="time_to" onChange={(e) => setTimeTo(e.target.value)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <label className="lableTitle">Details</label>
                                                                                <textarea className="form-control" placeholder="Details and location" onChange={(e) => setDetails(e.target.value)}></textarea>
                                                                            </div>
                                                                            <div className='py-2'>
                                                                                <button className='btn btn-sm btn-primary'>Submit</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='py-3'>
                                                            {scheduleList.map((item) => (
                                                                <div className='row' key={item.id}>
                                                                    <div className="col-lg-6 col-12">
                                                                        <h4 className='fs-6 pb-0 mb-0'>{item?.schedule_day}</h4>
                                                                        <p>{item?.time_from} - {item?.time_to}</p>
                                                                    </div>
                                                                    <div className="col-lg-5 col-12">
                                                                        <h5 className='fs-6'>{item?.details}</h5>
                                                                    </div>

                                                                    <div className="col-lg-1 col-12">
                                                                        <button className='btn btn-primary btn-sm' onClick={() => handleScheduleDelete(item)}><BsTrash /></button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                        
                                        
                                        <div className="row align-items-start g-4">
                                            <div className="col-xl-12 col-lg-12 col-md-12">
                                                <p className="text-muted m-0">© Nairobi Business {new Date().getFullYear()} Designed By <a href="https://savannahsoftwaresolutions.co.ke" target="_blank" rel="noopener noreferrer">Savannah Software Solutions</a></p>
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