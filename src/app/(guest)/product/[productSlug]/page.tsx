"use client";

import React, { useEffect, useState } from 'react';
import { ProductModel } from '../../../../../lib/models/all_models';
import { useParams } from 'next/navigation';
import APIServices from '../../../../../lib/services/api_services';
import NavbarDark from '@/app/components/navbar/navbar-dark';
import Link from 'next/link';
import Image from 'next/image';
import { BsBasket2Fill } from 'react-icons/bs';


const ProductDetailsPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<ProductModel>();
  const [products, setProducts ] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      const res = await APIServices.get(`shop/product/${params.productSlug}/`);
      const products = await APIServices.get(`shop/all/`);
      console.log(res);
      setProduct(res);
      setProducts(products);
    }
    fetchData();
  }, [])

  return (
    <>
      <NavbarDark />

      <section className="">
        <div className="container">
            <div className="row">
              <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                <img src={product?.main_image} className='img-fluid' />
              </div>
              <div className='col-xl-6 col-lg-6 col-md-6 col-12'>
                <h2 className="lh-base fs-3 text-primary">{product?.name}</h2>
                <div className='pb-3'>
                  <p>KSH. {parseInt(product?.price).toLocaleString()}</p>
                </div>
                <div>
                <h6 className='text-muted'>Description</h6>
                  <p className='text-muted'>{product?.description}</p>
                </div>

                <div className='py-2'>
                  <a href={product?.whatsapp} target='_blank'>
                    <button className='btn btn-sm btn-primary'>Order On WhatsApp</button>
                  </a>
                </div>
                
              </div>
            </div>
        </div>

        <div className='container py-5'>
          <h2 className="text-primary pb-3 fs-5">Products you may like</h2>
          <div className="row">
            {products.map((product: ProductModel) => (
              <div key={product?.id} className='col-xl-3 col-lg-3 col-md-3 col-6'>
                <div className="catalogCard">
                  <div className="catalogThumb position-relative">
                    <Link href={`/product/${product.slug}/`}>
                      <figure>
                        <Image src={product?.main_image} width={0} height={0} sizes='100vw' style={{ width: '100%', height: '100%' }} className="img-fluid rounded-2" alt="Product Thumb" />
                      </figure>
                    </Link>
                  </div>

                  <div className="catalogCaps">
                    <div className="d-flex align-items-start justify-content-between gap-2">
                      <div className="catalogProducttitle">
                        <h6 className="lh-base m-0">{product.name}</h6>
                        <p className="text-md d-flex align-items-center gap-2 m-0"><span>KSh. {parseInt(product.price).toLocaleString()}</span></p>
                      </div>
                      <div className="addCart">
                        {product?.whatsapp && (
                          <Link href={`${product?.whatsapp}`} target='_blank' className="text-muted-2 square--40 circle bg-light" data-bs-toggle="tooltip" data-bs-title="Add To Cart"><BsBasket2Fill /></Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailsPage