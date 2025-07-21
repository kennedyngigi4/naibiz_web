import React from 'react'
import Link from 'next/link'

import { FaBriefcase, FaDribbble, FaFacebookF, FaGlobe, FaHeadset, FaInstagram, FaPaperPlane, FaTwitter } from 'react-icons/fa6'

import NavbarDark from '@/app/components/navbar/navbar-dark'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top'

export default function ContactUs() {
    return (
        <>
            <NavbarDark />

            <section className="bg-cover position-relative" style={{ backgroundImage: `url('/images/bg/1.jpg')` }} data-overlay="6">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-9 col-md-12">
                            <div className="fpc-capstion text-center my-4">
                                <div className="fpc-captions">
                                    <h1 className="xl-heading text-light">Contact Us</h1>
                                    <p className="text-lg text-light">Kenyatta Avenue, Nairobi, Kenya.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-between g-4 mt-lg-5 mt-4">
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card p-4 rounded-4 bg-transparents border-0 text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-light fs-2"><FaBriefcase className="" />
                                </div>
                                <div className="crds-desc">
                                    <h5 className="text-light">Drop a Mail</h5>
                                    <p className="fs-6 text-md lh-2 text-light opacity-75 mb-0">support@nairobibusiness.co.ke<br />info@nairobibusiness.co.ke</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card p-4 rounded-4 bg-transparents border-0 text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-light fs-2"><FaHeadset className="" />
                                </div>
                                <div className="crds-desc">
                                    <h5 className="text-light">Call Us</h5>
                                    <p className="fs-6 text-md lh-2 text-light opacity-75 mb-0">+254 712 345678<br />+254 712 345678</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-6">
                            <div className="card p-4 rounded-4 bg-transparents border-0 text-center h-100">
                                <div className="crds-icons d-inline-flex mx-auto mb-3 text-light fs-2"><FaGlobe className="" />
                                </div>
                                <div className="crds-desc">
                                    <h5 className="text-light">Connect with Social</h5>
                                    <p className="text-md text-light opacity-75 lh-2">Let's Connect with Us via social media</p>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item"><Link className="square--40 circle bg-transparents text-light" href="#"><FaFacebookF /></Link> </li>
                                        <li className="list-inline-item"><Link className="square--40 circle bg-transparents text-light" href="#"><FaInstagram /></Link> </li>
                                        <li className="list-inline-item"><Link className="square--40 circle bg-transparents text-light" href="#"><FaTwitter /></Link> </li>
                                        <li className="list-inline-item"><Link className="square--40 circle bg-transparents text-light" href="#"><FaDribbble /></Link> </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row align-items-center justify-content-between g-4">
                        <div className="col-xl-7 col-lg-7 col-md-12">
                            <div className="contactForm pe-xl-5 pe-lg-4">
                                <form>
                                    <div className="row align-items-center">
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="touch-block d-flex flex-column mb-4">
                                                <h2>Drop Us a Line</h2>
                                                <p>Get in touch via form below and we will reply as soos as we can. </p>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label className="form-label">Your Name</label>
                                                <input type="text" className="form-control bg-light" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label className="form-label">eMail ID</label>
                                                <input type="email" className="form-control bg-light" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label className="form-label">Phone No.</label>
                                                <input type="text" className="form-control bg-light" />
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label className="form-label">Subject</label>
                                                <input type="text" className="form-control bg-light" />
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group form-border">
                                                <label className="form-label">Your Query</label>
                                                <textarea className="form-control ht-120 bg-light"></textarea>
                                            </div>
                                        </div>

                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group form-border">
                                                <button type="button" className="btn fw-medium btn-primary">Send Message<FaPaperPlane className="ms-2" /></button>
                                            </div>
                                        </div>

                                        <div className="">
                                            <div className="">
                                                <div className="alert alert-success" role="alert">Message Sent Successfully To RealScout. You Will Get Response Soon.</div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-12">
                            <iframe className="full-width ht-100 grayscale rounded" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.816903746152!2d36.82017067341915!3d-1.283741398704049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d5d63997f1%3A0xfb825e08591621ab!2sKimathi%20St%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1753084763771!5m2!1sen!2ske" height="500" style={{ border: "0" }} aria-hidden="false" tabIndex={0} ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            <FooterTop />
            <Footer />
            <BackToTop />
        </>
    )
}
