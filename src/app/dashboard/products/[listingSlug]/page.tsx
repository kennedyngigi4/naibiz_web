"use client";

import React, { useEffect, useRef, useState } from 'react';
import AdminSidebar from '@/app/components/admin/admin-sidebar';
import AdminNavbar from '@/app/components/navbar/admin-navbar';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsTrash, BsX } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';
import { ListingModel } from '../../../../../lib/models/all_models';
import MerchantAPIServices from '../../../../../lib/services/merchant_api_services';
import { useParams } from 'next/navigation';
import BackToTop from '@/app/components/back-to-top';
import { FaHeart } from 'react-icons/fa6';
import { toast } from 'react-toastify';


const ListingProductsPage = () => {
  const {data:session, status} = useSession();
  const fileInputRef = useRef(null);
  const params = useParams();
  const [businessData, setBusinessData] = useState<ListingModel>();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      if(!session?.accessToken){
        throw new Error("You must be logged in");
      }

      const res = await MerchantAPIServices.get(`businesses/merchant/listing/${params.listingSlug}/`, session?.accessToken);
      console.log(res);
      setBusinessData(res);

      if(res.id){
        const products = await MerchantAPIServices.get(`shop/merchant/business_products/?business=${res?.id}`, session?.accessToken);
        console.log(products);
        setProductsData(products);
      }
    }
    fetchData();
  }, [session, params]);


  


  const [ productData, setProductData ] = useState({
      producttitle: "",
      productprice: "",
      productimage: null,
      productdescription: "",
  });


  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    if (name === 'productimage') {
      setProductData({
        ...productData,
        [name]: files[0] // Store the file object
      });
    } else {
      setProductData({
        ...productData,
        [name]: value
      });
    }
  };


  const resetForm = () => {
    setProductData({
      producttitle: '',
      productprice: '',
      productdescription: '',
      productimage: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleProductUpload = async(e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.producttitle);
    formData.append("price", productData.productprice);
    formData.append("description", productData.productdescription);
    if(businessData?.id){
      formData.append("business", businessData?.id);
    }
    
    if(productData.productimage){
      formData.append("main_image", productData.productimage);
    }


    try {

      if(!session?.accessToken){
        throw new Error("You must be logged in");
      }

      const res = await MerchantAPIServices.post("shop/merchant/upload_product/", session?.accessToken, formData);
      console.log(res)
      if(res.success){
        toast.success(res.message);
        resetForm();
      } else {
        toast.error(res.message);
      }
    } catch(e: any) {
      toast.error(e);
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

                        <div className='row'>
                          <div className="col-xl-8 col-lg-8 col-md-8 col-12">
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 py-lg-0 py-5">
                              <h5 className="fw-medium mb-0 text-uppercase">{businessData?.name} Products</h5>
                            </div>
                          </div>
                          <div className="col-xl-4 col-lg-4 col-md-4 col-12 float-end">
                            <div className="dashHeader p-xl-5 p-4 pb-xl-0 pb-0 py-lg-0 py-5">
                              <div className="flexlastButton"><button type="button" className="btn px-4 btn-whites text-primary fw-medium" data-bs-toggle="modal" data-bs-target="#productModal">Add Product</button></div>
                            </div>
                          </div>
                        </div>

                        <div className='row px-5'>

                          {productsData.map((product: any) => (
                            <div className='col-lg-3 col-md-6 col-12' key={product.id}>
                              <div className='pb-3' style={{ height: '200px', overflow: 'hidden' }}>
                                <img
                                  src={product?.main_image}
                                  className='img-fluid w-100 h-100 object-fit-cover'
                                  alt={product.name}
                                />
                              </div>
                              <h6 className='text-truncate'>{product.name}</h6>
                              <p> KSh {parseInt(product.price).toLocaleString()}</p>
                              <button className='btn btn-xs rounded btn-dark'><BsTrash /> Delete</button>
                            </div>
                          ))}


                          <div className="row align-items-start g-4">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                              <p className="text-muted m-0">© {new Date().getFullYear()} Nairobi Business. Develop with <FaHeart className="ms-1 text-danger"></FaHeart>  By <Link href="https://savannahsoftwaresolutions.co.ke/" target="_blank">Savannah Software Solutions</Link></p>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
      </section>
      <BackToTop/>


      <div className="modal modal-lg fade" id="productModal" tabIndex={-1} aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light border-0 px-md-5 d-flex justify-content-between">
              <h4 className="modal-title fw-medium" id="messageModalLabel">Add Product</h4>
              <Link href="#" data-bs-dismiss="modal" aria-label="Close" className="square--40 circle bg-light-danger text-danger"><BsX className="bi bi-x" /></Link>
            </div>
            <div className="modal-body">
              <form onSubmit={handleProductUpload} encType="multipart/form-data">
                <div className="messageForm">
                  <div className="form-group form-border">
                    <label className="lableTitle">Product Title</label>
                    <input
                      type="text"
                      className="form-control rounded"
                      name="producttitle"
                      value={productData.producttitle}
                      onChange={handleChange}
                      placeholder="e.g. JBL Headphones"
                    />
                  </div>
                  <div className="form-group form-border">
                    <label className="lableTitle">Product Price</label>
                    <input
                      type="number"
                      className="form-control rounded"
                      name="productprice"
                      value={productData.productprice}
                      onChange={handleChange}
                      placeholder="e.g. 9800"
                    />
                  </div>
                  <div className="form-group form-border">
                    <label className="lableTitle">Product Image</label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="form-control rounded"
                      name="productimage"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group form-border">
                    <textarea
                      className="form-control"
                      placeholder="Product description comes here ...."
                      name="productdescription"
                      value={productData.productdescription}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary fw-medium px-md-5">Add Product<FiArrowRight className="ms-2" /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListingProductsPage