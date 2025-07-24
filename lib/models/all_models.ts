
export type OwnerModel = {
    id: string;
    fullname: string;
    profile_image: string;
}


export type HoursModel = {
    day: string;
    opening_time: string;
    closing_time: string;
}


export type MallModel = {
    id: string;
    name: string;
    floors: string;
    stalls: string;
    description: string;
    email: string;
    phone: string;
    website: string;
    main_image: string;
    listings_count: string;
}


export type ProductModel = {
    id: string;
    name: string;
    price: string;
    main_image: string;
    description: string;
}


export type ImageModel = {
    id: string;
    business: string;
    image: string;
}


export type ReviewModel = {
    title: string;
    message: string;
    email: string;
    rating: string;
    created_at: string;
}

export type ListingModel = {
    id: string;
    slug: string;
    name: string,
    mall: string,
    category: string,
    category_name: string;
    category_icon: string,
    services: string,
    location: string,
    latitude?: number,
    longitude?: number,
    description: string,
    email: string,
    phone: string,
    website?: string,
    whatsapp?: string,
    facebook?: string,
    instagram?: string,
    tiktok?: string,
    twitterx?: string,
    youtube?: string,
    linkedin?: string,
    main_banner?: any,
    profile_image?: any,
    is_open: boolean,
    created_by: OwnerModel,
    hours: HoursModel,
    products: ProductModel,
    gallery: ImageModel,
    reviews: ReviewModel,
}







