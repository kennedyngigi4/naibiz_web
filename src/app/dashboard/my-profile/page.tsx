"use client";
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import AdminNavbar from '@/app/components/navbar/admin-navbar'
import AdminSidebar from '@/app/components/admin/admin-sidebar'
import BackToTop from '@/app/components/back-to-top'

import { FaHeart } from 'react-icons/fa6'
import { useSession } from 'next-auth/react'
import MerchantAPIServices from '../../../../lib/services/merchant_api_services'
import { toast } from 'react-toastify';

export default function MyProfile() {
    const { data:session } = useSession();
    const [ profileData, setProfileData ] = useState<any>({});
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            if(!session?.accessToken){
                throw new Error("You must be logged in.")
            }

            const res = await MerchantAPIServices.get(`account/profile/`, session?.accessToken);
            console.log(res);
            setProfileData(res);

            
            
        }
        fetchData();
    }, [session]);


    useEffect(() => {
        if (profileData) {
            setFullname(profileData?.fullname);
            setEmail(profileData?.email);
            setPhone(profileData?.phone);
        }
    }, [profileData]);



    const handleUpdate = async() => {
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("email", email);
        formData.append("phone", phone);

        if (!session?.accessToken) {
            throw new Error("You must be logged in.")
        }

        const res = await MerchantAPIServices.patch('account/profile-update/', session?.accessToken, formData);
        console.log(res);
        if(res.success){
            toast.success("Profile updated.");
        } else {
            toast.error("An error occurred.");
        }
    }


  return (
    <>
       <AdminNavbar/>

       <section className="p-0">
        <div className="container-fluid p-0">
            <div className="row user-dashboard g-0">
                <AdminSidebar/>
                <div className="col-xl-10 col-lg-9 col-md-12 pt-lg-0 pt-5">
                    <div className="user-dashboard-box bg-light">
                        <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 py-lg-0 py-5">
                            <h2 className="fw-medium mb-0">My Profile</h2>
                        </div>
                        
                        <div className="dashCaption p-xl-5 p-3 p-md-4">
                            <div className="row align-items-start g-4 mb-lg-5 mb-4">
                                <div className="col-xl-8 col-lg-8 col-md-7">
                                    <div className="card rounded-3 shadow-sm mb-lg-5 mb-4">
                                        <div className="card-body p-4">
                                        
                                            <div className="row align-items-start">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                    <div className="cardTitle d-flex align-items-center justify-content-start mb-3">
                                                        <h6 className="fw-semibold">Agent Basic information</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <form onSubmit={handleUpdate}>
                                                <div className="row align-items-start">
                                                    
                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                        <div className="form-group form-border">
                                                            <label>Full Name</label>
                                                            <input type="text" name="fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" placeholder="Daniel"/>
                                                        </div>
                                                    </div>
                                                    
                                                
                                                    
                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group form-border">
                                                            <label>Phone</label>
                                                            <input type="tel" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" placeholder="254722..."/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-xl-6 col-lg-6 col-md-6">
                                                        <div className="form-group form-border">
                                                            <label>Email</label>
                                                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="danieldecuze@gmail.com"/>
                                                        </div>
                                                    </div>
                                                    
                                                    
                                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mt-3">
                                                            <button className="btn btn-primary btn-sm fw-medium flex-fill" type="submit">Save Changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            
                                        </div>
                                    </div>

                                    <div className="card rounded-3 shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="row align-items-start">
                                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                                    <div className="cardTitle d-flex align-items-center justify-content-start mb-3">
                                                        <h6 className="fw-semibold">Update Password</h6>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row align-items-start">
                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                    <div className="form-group form-border">
                                                        <label>Old Password</label>
                                                        <input type="password" className="form-control" placeholder=""/>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group form-border">
                                                        <label>New Password</label>
                                                        <input type="password" className="form-control" placeholder=""/>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-xl-6 col-lg-6 col-md-6">
                                                    <div className="form-group form-border">
                                                        <label>Confirm Password</label>
                                                        <input type="password" className="form-control" placeholder=""/>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-xl-12 col-lg-12 col-md-12">
                                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mt-3">
                                                        <button className="btn btn-primary btn-sm fw-medium flex-fill" type="button">Update Password</button>
                                                        <button className="btn btn-light-primary btn-sm fw-medium flex-fill" type="button">Delete Account</button>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                                
                                <div className="col-xl-4 col-lg-4 col-md-5">
                                    <div className="card rounded-3 shadow-sm">
                                        <div className="card-body py-5 p-4">
                                            <div className="dash-prf-start d-flex flex-column align-items-start justify-content-start">
                                                <div className="dash-prf-start-upper mx-auto">
                                                    <div className="dash-prf-start-thumb w-40 h-40 mb-2">
                                                        <figure><Image src='/img/team-2.jpg' width={0} height={0} sizes='100vw' style={{width:'100%', height:'100%'}} className="img-fluid circle" alt=""/></figure>
                                                    </div>
                                                </div>
                                                <div className="dash-prf-start-bottom mx-auto mt-3">
                                                    <div className="upload-btn-wrapper small">
                                                        <button className="btn btn-md btn-light-primary fw-medium">Change Profile Image</button>
                                                        <input type="file" name="myfile"/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row align-items-start g-4">
                                <div className="col-xl-12 col-lg-12 col-md-12">
                                    © {new Date().getFullYear()} ListingHub. Develop with <FaHeart className="ms-1 text-danger"></FaHeart>  By <Link href="https://shreethemes.in/" target="_blank">Shreethemes</Link>
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
