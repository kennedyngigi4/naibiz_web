"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { FaEye, FaFacebookF, FaGooglePlusG } from 'react-icons/fa6'
import MerchantAPIServices from '../../../../lib/services/merchant_api_services'

export default function Register() {
    
    const [ registrationData, setRegistrationData ] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState(false);


    const handleChange = (e: { target: { name: any; value: any; type: any } }) => {
        const { name, value } = e.target;
        setRegistrationData(prev => ({
            ...prev,
            [name]: value,
        }));
    }


    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try{
            const formData = new FormData();
            formData.append("fullname", registrationData.fullname);
            formData.append("email", registrationData.email);
            formData.append("phone", registrationData.phone);
            formData.append("password", registrationData.password);
            formData.append("role", "merchant");


            const res = await MerchantAPIServices.registration("account/registration/", formData);
            console.log(res);
            if (res.success) {
                setSuccess(res.message || "Registration successful!");
                setRegistrationData({
                    fullname: "",
                    email: "",
                    phone: "",
                    password: "",
                });
            } else {
                setError(res.message || "Registration failed. Please try again.");
            }
        } catch(e){
            setError("An unexpected error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }

    }


  return (
        <section style={{backgroundImage:`url('/img/auth-bg.png')`, backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundColor:'#ffe8ee' , backgroundSize:'cover'}}>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-5 col-lg-7 col-md-9">
                        <div className="authWrap">
                            <div className="authhead">
                                <div className="text-center mb-4"><Link href="/"><Image className="img-fluid" src='/img/icon.png' width={0} height={0} sizes='100vw' style={{width:'55px' , height:'auto'}} alt="logo"/></Link></div>
                            </div>
                            <div className="authbody d-black mb-4">
                                <div className="card rounded-4 p-sm-5 p-4">
                                    <div className="card-body p-0">
                                        <div className="text-center"><h1 className="mb-2 fs-2">Create An Account!</h1></div>
                                        <form className="mt-5 text-start" onSubmit={handleSubmit}>
                                            <div className="form mb-5">
                                                {error && <div className="alert alert-danger mb-3">{error}</div>}
                                                {success && (
                                                    <div className="alert alert-success mb-3">
                                                        Registration successful! You can now login.
                                                    </div>
                                                )}
                                                <div className="form-group form-border">
                                                    <label className="form-label">Full Name</label>
                                                    <input 
                                                        type="text" 
                                                        name="fullname"
                                                        className="form-control" 
                                                        placeholder="e.g John Doe"
                                                        value={registrationData.fullname}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group form-border">
                                                    <label className="form-label">Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email"
                                                        className="form-control" 
                                                        placeholder="e.g name@example.com" 
                                                        value={registrationData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group form-border">
                                                    <label className="form-label">Phone</label>
                                                    <input 
                                                        type="tel" 
                                                        name="phone"
                                                        className="form-control" 
                                                        placeholder="e.g. 254722..." 
                                                        value={registrationData.phone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group form-border">
                                                    <label className="form-label">Enter Password</label>
                                                    <div className="position-relative">
                                                        <input 
                                                            type="password" 
                                                            className="form-control" 
                                                            id="password-field" name="password" 
                                                            placeholder="Password"
                                                            value={registrationData.password}
                                                            onChange={handleChange}
                                                            required
                                                            
                                                        />
                                                        <FaEye className="toggle-password position-absolute top-50 end-0 translate-middle-y me-3"></FaEye>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-4">
                                                    <button type="submit" className="btn btn-primary full-width fw-medium">
                                                      {isSubmitting ? "Registering ..." : "Create Account"}
                                                    </button>
                                                </div>

                                                <div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
                                                    <div className="modal-flex-last">
                                                        <Link href="/auth/forgot-password" className="text-primary fw-medium">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="prixer my-5">
                                                <div className="devider-wraps position-relative">
                                                    <div className="devider-text text-muted text-md">Or Signup with</div>
                                                </div>
                                            </div>
                                            
                                            <div className="social-login">
                                                <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 p-0">
                                                    <div className="flex-first flex-fill mob-100">
                                                        <Link href="#" className="btn bg-white border text-dark full-width">
                                                            <FaGooglePlusG className="color--googleplus me-2"/>
                                                            <span className="fw-medium text-md">Signup with Google</span>
                                                        </Link>
                                                    </div>
                                                    <div className="flex-last flex-fill mob-100">
                                                        <Link href="#" className="btn bg-white border text-dark full-width">
                                                            <FaFacebookF className="color--facebook me-2"/>
                                                            <span className="fw-medium text-md">Signup with Facebook</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="authfooter">
                                <div className="text-center"><p className="text-dark mb-0">Already having account?<Link href="/auth/login" className="fw-medium text-primary"> Log In</Link></p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
