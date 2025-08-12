"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaEye, FaFacebook, FaGooglePlusG } from 'react-icons/fa6'
import  { loginUser } from '../../../../lib/services/auth_services';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function Login() {

    const [ loginData, setLoginData ] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors ] = useState<null | string>(null);
    const router = useRouter();

    const handleChange = (e: { target: { name: any, value: any}}) => {
        const { name, value } = e.target;

        setLoginData(prev => ({
            ...prev,
            [name]: value,
        }));
    }   

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        e.preventDefault();
        setIsSubmitting(true);
        setErrors(null);


        try {
            const res = await loginUser(loginData.email, loginData.password);
            
            if(res.success){
                const session = await getSession();
                const role = session?.user?.role;
                
                toast.success(res.message);
                if(role == "merchant"){
                    router.push("/dashboard");
                } else if (role == "professional"){
                    router.push("/professional");
                }
                
            } else {
                toast.error(res.message);
            }
        } catch(e: any){
            setErrors("An error occurred");
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
                                <div className="text-center mb-4"><Link href="/"><Image className="img-fluid" src='/img/icon.png' width={0} height={0} sizes='100vw' style={{width:'55px', height:'auto'}} alt="logo"/></Link></div>
                            </div>
                            <div className="authbody d-black mb-4">
                                <div className="card rounded-4 p-sm-5 p-4">
                                    <div className="card-body p-0">
                                        <div className="text-center"><h1 className="mb-2 fs-2">Welcome To Nairobi Business!</h1></div>
                                        <form className="mt-5 text-start" onSubmit={handleSubmit}>
                                            <div className="form mb-5">
                                                <div className="form-group form-border mb-4">
                                                    <label>User Name</label>
                                                    <input 
                                                        type="email" 
                                                        name="email"
                                                        className="form-control" 
                                                        placeholder="name@example.com" 
                                                        value={loginData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group form-border position-relative mb-4">
                                                    <label>Password</label>
                                                    <div className="position-relative">
                                                        <input 
                                                            type="password" 
                                                            className="form-control" 
                                                            id="password-field" name="password" 
                                                            placeholder="Password"
                                                            value={loginData.password}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <FaEye className="fa-solid fa-eye toggle-password position-absolute top-50 end-0 translate-middle-y me-3"/>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-4">
                                                    <button type="submit" className="btn btn-primary full-width fw-medium">Log In</button>
                                                </div>

                                                <div className="modal-flex-item d-flex align-items-center justify-content-between mb-3">
                                                    <div className="modal-flex-first">
                                                        <div className="form-check form-check-inline">
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="modal-flex-last">
                                                        <Link href="/auth/forgot-password" className="text-primary fw-medium">Forgot Password?</Link>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="prixer my-5">
                                                <div className="devider-wraps position-relative">
                                                    <div className="devider-text text-muted text-md">Or signin with email</div>
                                                </div>
                                            </div>
                                            
                                            <div className="social-login">
                                                <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 p-0">
                                                    <div className="flex-first flex-fill mob-100">
                                                        <Link href="#" className="btn bg-white border  text-dark full-width">
                                                            <FaGooglePlusG className="color--googleplus me-2"/>
                                                            <span className="fw-medium text-md">Signin with Google</span>
                                                        </Link>
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="authfooter">
                                <div className="text-center"><p className="text-dark mb-0">Are you new here?<Link href="/auth/register" className="fw-medium text-primary"> Create an account</Link></p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}
