'use client';
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Select = dynamic(()=>import('react-select'),{ssr:false})

import { FaStar } from 'react-icons/fa6'
import APIServices from '../../../../lib/services/api_services';
import { toast } from 'react-toastify';
import { ListingModel, ReviewModel } from '../../../../lib/models/all_models';


interface ReviewsProps {
    business: ListingModel;
}

export default function Reviews({ business }: ReviewsProps) {

    const [reviews, setReviews ] = useState([]);
    const [email, setEmail ] = useState("");
    const [rating, setRating] = useState(null);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const options = [
        { value: '1', label: 'Select Rating' },
        { value: '2', label: '1 Star - Very Poor' },
        { value: '3', label: '2 Star - Poor' },
        { value: '4', label: '3 Star - Medium' },
        { value: '5', label: '4 Star - Very Good' },
        { value: '6', label: '5 Star - Excellent' },
    ];


    const reviewSubmit = async(e: any) => {
        e.preventDefault();

        setLoading(true);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("rating", rating?.value);
        formData.append("title", title);
        formData.append("message", message); 
        formData.append("business", business?.id);
        
        try{
            const res = await APIServices.post("businesses/review/", formData);
            console.log(res);
            if(res.success){
                toast.success(res.message);
                
                setEmail('');
                setRating(null);
                setTitle('');
                setMessage('');
            } else {
                toast.error(res.message);
                
            }
        } catch (e){
            toast.error("Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    

  return (
        <div className="listingSingleblock mb-4" id="reviews">
            <div className="SingleblockHeader">
                <Link data-bs-toggle="collapse" data-parent="#review" data-bs-target="#review" aria-controls="review" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Reviews</h4></Link>
            </div>
            
            <div id="review" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <div className="allreviewsWrapper">
                        <div className="reviewsTitle d-flex flex-column mb-3"><h5>{business?.name} Reviews</h5></div>
                        <div className="allreviewsLists mb-4">
                            {business?.reviews.map((review: ReviewModel) => (
                                <div className="singlereviews" key={review?.id}>
                                    <div className="d-flex align-items-start justify-content-between flex-sm-wrap flex-wrap gap-3">
                                        <div className="reviewerThumb">
                                            <div className="square--60 circle overflow-hidden">
                                                <Image src='/icons/user.png' width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid circle" alt="Reviewer Thumb" />
                                            </div>
                                        </div>
                                        <div className="reviewerMessage">
                                            <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                <div className="reviewerInfo">
                                                    <h6 className="mb-0">{review?.email}</h6>
                                                    <p className="text-md mb-0">{new Date(review?.created_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "2-digit"})}</p>
                                                </div>
                                                <div className="reviewsFlexlast">
                                                    <div className="d-flex align-items-center justify-content-start gap-1">
                                                        <span><FaStar className="text-sm text-warning active" /></span>
                                                        <span><FaStar className="text-sm text-warning active" /></span>
                                                        <span><FaStar className="text-sm text-warning active" /></span>
                                                        <span><FaStar className="text-sm text-warning active" /></span>
                                                        <span><FaStar className="text-sm text-warning active" /></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="messageDescription">
                                                <p>Usually, we prefer the real thing, wine without sulfur based preservatives, real butter, not margarine, and so we'd like our layouts and designs to be.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            
                            
                        
                        </div>
                        
                        <form onSubmit={reviewSubmit}>
                        <div className="reviewssubmition">
                            <div className="formRow">
                                <div className="row align-items-start gx-xl-3 gx-lg-3">
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group form-border">
                                            <input 
                                                type="email" 
                                                className="form-control border" 
                                                placeholder="your@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}    
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-12">
                                        <div className="form-group form-border">
                                            <div className="position-relative">
                                                <Select 
                                                    placeholder="Select Rating" 
                                                    options={options} 
                                                    className="categories form-control"
                                                    value={rating}
                                                    onChange={setRating}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group form-border">
                                            <input 
                                                type="text" 
                                                className="form-control border" 
                                                placeholder="Review title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <div className="form-group form-border">
                                            <textarea 
                                                className="form-control border" 
                                                placeholder="Leave Review Message" 
                                                style={{height: '120px'}}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            >

                                            </textarea>
                                        </div>
                                    </div>
                                    <div className="col-xl-12 col-lg-12 col-md-12">
                                        <button 
                                            type="submit" 
                                            className="btn btn-primary fw-medium px-5"
                                            disabled={loading}
                                        >
                                            {loading ? "Submitting ..." : "Submit Review"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}
