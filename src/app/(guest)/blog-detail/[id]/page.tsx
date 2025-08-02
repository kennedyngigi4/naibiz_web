'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import NavbarDark from '@/app/components/navbar/navbar-dark'
import BlogSidebar from '@/app/components/blog-sidebar'
import FooterTop from '@/app/components/footer-top'
import Footer from '@/app/components/footer/footer'
import BackToTop from '@/app/components/back-to-top'

import { MdArrowForwardIos } from 'react-icons/md'
import { FaQuoteLeft, FaQuoteRight, FaThumbsDown, FaThumbsUp } from 'react-icons/fa6'
import { BsReply } from 'react-icons/bs'

import { blogData } from '@/app/data/data'
import Image from 'next/image'
import APIServices from '../../../../../lib/services/api_services'
import { toast } from 'react-toastify'

export default function BlogDetail() {
    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);
    let params = useParams()
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const blog = await APIServices.get(`blogs/blog/${params.id}/`);
            const blogs = await APIServices.get('blogs/blogs/');
            const comments = await APIServices.get("blogs/comments/");
            setBlog(blog)
            setBlogs(blogs);
            setComments(comments);
        }
        fetchData();
    }, [params]);


    const handleComment = async(e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("desc", comment);

        try {
            const res = await APIServices.post("blogs/comments/", formData);
            
            if(res){
                toast.success("Comment sent successfully.");
                setName("");
                setEmail("");
                setComment("");
            } else {
                toast.error("Failed.");
            }
        } catch(e){
            toast.error("Something went wrong");
        } 
    }

  return (  
    <div className='bg-light'>
        <NavbarDark/>
        <section>
            <div className="container">
                <div className="row justify-content-start align-items-center">
                    <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12 pt-lg-0 pt-5">
                        <div className="position-relative">
                            <h1 className="xl-heading">Latest Article</h1>
                            <nav id="breadcrumbs" className="breadcrumbs">
                                <ul>
                                    <li><Link href="#">Home</Link></li><MdArrowForwardIos className='ms-2'/>
                                    <li><Link href="#">Blog</Link></li><MdArrowForwardIos className='ms-2'/>
                                    <li>Blog Detail</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>  

        <section className="pt-0">
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="blogDetails d-flex align-items-start gap-4 flex-column w-100">
                            <div className="card shadow-sm w-100">
                                <div className="blogThumb">
                                    <img src={blog && blog?.image} className="img-fluid" alt="Blog Thumb"/>
                                </div>
                                <div className="card-body">
                                    <div className="d-inline-flex mb-2"><span className="badge badge-xs badge-primary rounded-pill">Software & Tools</span></div>
                                    <h1 className="fs-3">{blog && blog?.title}</h1>
                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-3 mb-3">
                                        <div>By <Link href="#" className="link">{blog && blog?.author}</Link></div>
                                        <div>{blog && new Date(blog.created_at).toLocaleDateString("en-us", {year:"numeric", month: "short", day: "numeric"})}</div>
                                        <div><Link href="#" className="link">24 Comments</Link></div>
                                    </div>
                                    
                                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog?.content }} />
                                    
                                    
                                    
                                </div>
                                
                                <div className="card-footer border-top bg-white">
                                    <div className="d-md-flex justify-content-between align-items-center">
                                        <h6 className="mb-0">Was this article helpful?</h6>
                                        <small className="py-3 p-md-0 d-block">40 out of 84 found this helpful</small>
                                        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio1"/>
                                            <label className="btn btn-outline-secondary btn-sm mb-0" htmlFor="btnradio1"><FaThumbsUp className="me-1"/> Yes</label>
                                            <input type="radio" className="btn-check" name="btnradio" id="btnradio2"/>
                                            <label className="btn btn-outline-secondary btn-sm mb-0" htmlFor="btnradio2"> No <FaThumbsDown className="ms-1"/></label>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="card shadow-sm w-100">
                                <div className="card-header p-4">
                                    <h4>Comments (4)</h4>
                                </div>
                                
                                <div className="card-body">
                                    <div className="blogcommentsBox">
                                        <ul>
                                            {comments.map((comment: any) => (
                                                <li key={comment.id}>
                                                    <div className="singleComments">
                                                        <div className="blogavatar">
                                                            <Image src="/icons/user.png" width={80} height={80} className="img-fluid circle" alt="" />
                                                        </div>

                                                        <div className="blogCaps">
                                                            <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                                                                <div className="commentBy">
                                                                    <h6 className="mb-1 lh-base">{comment.name}</h6>
                                                                    <span>{new Date(comment?.created_at).toLocaleDateString("en-us", { year: "numeric", month: "short", day: "numeric"})}</span>
                                                                </div>
                                                                <div className="replyLink">
                                                                    <Link href="#" className="btn btn-sm btn-light rounded-pill" data-bs-toggle="modal" data-bs-target="#commentModal"><BsReply className="me-2" />Reply</Link>
                                                                </div>
                                                            </div>
                                                            <div className="commentsDes">
                                                                <p>{comment?.desc}</p>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </li>
                                            ))}
                                            
                                            
                                            
                                            
                                        </ul>
                                    </div>
                                </div>
                                
                            </div>
                            
                            <div className="card shadow-sm p-4 w-100">
                                <div className="commentsBox">
                                    <div className="row align-items-start">
                                    
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <h4 className="fw-semibold">Drop Comments</h4>
                                        </div>
                                        
                                        <form onSubmit={handleComment}>
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label>Name:</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control gray border-0"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}    
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-6 col-lg-6 col-md-6">
                                            <div className="form-group form-border">
                                                <label>Email:</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control gray border-0"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}    
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <div className="form-group form-border">
                                                <label>Comments:</label>
                                                <textarea 
                                                    className="form-control gray border-0"
                                                    name="comment"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}    
                                                ></textarea>
                                            </div>
                                        </div>
                                        
                                        <div className="col-xl-12 col-lg-12 col-md-12">
                                            <button type="submit" className="btn btn-light-primary rounded-pill fw-medium px-5">Submit Comment</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        
                    </div>
                    
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                        <BlogSidebar blogs={blogs} />
                    </div>
                    
                </div>
            </div>
        </section>

        <FooterTop/>
        <Footer/>
        <BackToTop/>
    </div>
  )
}
