import React from 'react'
import Link from 'next/link'

import { MdArrowForwardIos } from 'react-icons/md'

import { faqData1, faqData2, faqData3 } from '@/app/data/data'

import NavbarDark from '@/app/components/navbar/navbar-dark'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top'

interface FaqData {
    id: string;
    title: string;
    desc: string;
}

export default function Terms() {
    return (
        <>
            <NavbarDark />

            <section className="bg-light">
                <div className="container">
                    <div className="row justify-content-start align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12 pt-lg-0 pt-5">
                            <div className="position-relative">
                                <h1 className="xl-heading">Terms and Conditions</h1>
                                <nav id="breadcrumbs" className="breadcrumbs">
                                    <ul>
                                        <li><Link href="#">Home</Link></li><MdArrowForwardIos className='ms-2' />
                                        <li><Link href="#">Pages</Link></li><MdArrowForwardIos className='ms-2' />
                                        <li>Terms and Conditions</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-xl-12 col-lg-12 col-md-12">
                            <div className="d-flex align-items-start flex-column gap-xl-2 gap-4">
                                <div>
                                    <h1 className='fs-6'>1. Introduction</h1>
                                    <p>These Terms and Conditions govern the use of www.nairobibusiness.co.ke a digital business directory platform. By accessing the website, users agree to these terms. Users must be at least 18 years old.</p>
                                </div>

                                <div>
                                    <h1 className='fs-6'>2. Copyright and Ownership</h1>
                                    <p>All content on www.nairobibusiness.co.ke is protected by copyright laws, and www.nairobibusiness.co.ke owns all intellectual property rights related to the site.</p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>3. Permission to Use Website</h1>
                                    <p>
                                        We grant users a limited, non-transferable license to use the website for personal or commercial purposes, but modification or redistribution of content without consent is prohibited. We reserve the right to restrict access to any part of the website at our discretion.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>4. Misuse of Website</h1>
                                    <p>
                                        Users are prohibited from using the website for illegal purposes or supplying false or misleading information. Any misuse may result in suspension or termination of the user’s account.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>5. Use on Behalf of an Organization</h1>
                                    <p>
                                        If you are using the website on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these terms.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>6. Accounts and Registration</h1>
                                    <p>
                                        To access certain features, users must register an account, providing accurate and truthful information. Users are responsible for keeping their login details confidential and must notify us of any unauthorized access or misuse of their account.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>7. User Login Details</h1>
                                    <p>
                                        Users must maintain the confidentiality of their login details and are solely responsible for activities under their account. If login details are compromised, users must notify us immediately.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>8. Cancellation and Suspension of Accounts</h1>
                                    <p>
                                        www.nairobibusiness.co.ke reserves the right to suspend or terminate accounts at any time, particularly in cases of non-compliance with these terms. Users can cancel their account at any time, but no refunds will be provided for any remaining paid services.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>9. Directory Listings</h1>
                                    <p>
                                        Users can submit free or paid directory listings. Free listings may be deleted after a certain period, while paid listings follow a specified submission process and offer extended visibility or benefits.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>10. Directory Submission Rules</h1>
                                    <p>
                                        All submissions must comply with our acceptable use policy. Listings should be accurate, up to date, and lawful. We reserve the right to reject or delete any listings at our discretion, without issuing refunds.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>11. Prohibited Listings</h1>
                                    <p>
                                        www.nairobibusiness.co.ke reserves the right to reject or remove any listings or advertisements that do not align with the platform’s content guidelines. These include, but are not limited to, products and services involving alcohol, gambling, tobacco, pork and other items that may be considered inappropriate and/or restricted. We aim to maintain a broad, inclusive environment, ensuring compliance with applicable laws and community standards.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>12. Fees and Payments</h1>
                                    <p>
                                        Fees for paid directory listings or other services are clearly indicated on the website and must be paid in full upon submission. We reserve the right to change fees at any time and will notify users of such changes.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>13. Our Role</h1>
                                    <p>
                                        www.nairobibusiness.co.ke operates as a platform to facilitate connections between businesses and customers. We do not vet or endorse any listings and are not responsible for transactions or agreements made through the platform.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>14. Our Rights to Use Your Content</h1>
                                    <p>
                                        By submitting content to the website, users grant us a license to use, modify, and display that content. Users may edit or delete their own content, but we reserve the right to remove any content that breaches these terms.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>15. User Content Rules</h1>
                                    <p>
                                        Content submitted must comply with all applicable laws, regulations and community standards. Users are prohibited from submitting content that is offensive, defamatory, or violates the rights of others. We are not responsible for any legal issues arising from user-submitted content.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>16. Legal Protections and Limitation of Liability</h1>
                                    <p>
                                        We provide the website “as is” and disclaim all warranties, express or implied. We are not responsible for any direct, indirect, incidental, or consequential damages arising from the use of the website, including interactions with businesses listed on the platform. Users agree not to hold us liable for any losses or disputes related to the use of the website.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>17. User Responsibility and Disclaimer</h1>
                                    <p>
                                        Users acknowledge that www.nairobibusiness.co.ke serves as a platform for listings. We do not verify the accuracy, legality, or reliability of listings, and users agree to conduct their own due diligence. Any disputes arising from transactions or interactions on the platform must be resolved between the users and the businesses involved.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>18. Indemnity</h1>
                                    <p>
                                        Users agree to indemnify and hold www.nairobibusiness.co.ke harmless from any claims, damages, or liabilities arising from their use of the website or breach of these terms. This includes claims related to third-party content submitted by users. By submitting content, users confirm they have obtained all necessary rights and permissions. www.nairobibusiness.co.ke will not be liable for unauthorized use of third-party images, trademarks, or intellectual property, including cease-and-desist orders.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>19. Third-Party Links and Content</h1>
                                    <p>
                                        The website may contain links to third-party websites. www.nairobibusiness.co.ke does not endorse or accept responsibility for the content or services of these third-party sites. Additionally, any third-party content submitted to www.nairobibusiness.co.ke is the responsibility of the user, who agrees to indemnify the platform against any legal claims related to unauthorized use of third-party content.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>20. Competitions</h1>
                                    <p>
                                        Any competitions run on the website will be subject to separate terms and conditions, which will be clearly communicated at the time.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>21. Amendments to Terms</h1>
                                    <p>
                                        We reserve the right to modify these terms at any time. Changes will be communicated to registered users and posted on the website.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>22. Severability</h1>
                                    <p>
                                        If any provision of these terms is deemed unenforceable, the remainder of the terms will continue in effect.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>23. Governing Law and Jurisdiction</h1>
                                    <p>
                                        These terms are governed by the laws of the Republic of Kenya, and any disputes arising from the use of the website will be subject to the jurisdiction of the Courts within its jurisdiction.
                                    </p>
                                </div>
                                <div>
                                    <h1 className='fs-6'>24. Contact Information</h1>
                                    <p>
                                        For any inquiries or issues, users may contact us at info@nairobibusiness.co.ke or on +254 722 476646.
                                    </p>
                                </div>
                            </div>
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
