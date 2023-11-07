import api from "../../api";
import { LIMIT_PER_PAGE } from "../../constants";

export const getProductDetails = async ({ params }) => {
    // console.log(params);
    const data = await api.get(`/ecommerce/product/${params?.id}`);
    // console.log(data?.data?.data);
    return data?.data?.data;
}

export const getFilteredProduct = async ({ params }) => {
    // console.log(params);
    const { name } = params;
    console.log(name);
    const filter = { gender: name?.includes('women') ? 'Women' : 'Men', sellerTag: 'new arrival' }
    const data = await api.get(`/ecommerce/clothes/products?filter=${JSON.stringify(filter)}&limit=${LIMIT_PER_PAGE}`);
    console.log(data?.data?.data);
    return data?.data?.data;
}

export const getOrderDetails = async ({ params }) => {
    const data = await api.get(`/ecommerce/order/${params?.orderId}`);
    // console.log(data?.data?.data);
    return data?.data?.data;
}

export const getReviews = async ({ params }) => {
    // console.log(params);
    const data = await api.get(`/ecommerce/review/${params?.id}`);
    // console.log(data?.data?.data);
    return data?.data?.data;
}

export const writeReview = async ({ params }) => {
    // console.log(params);
    const data = await api.get(`/ecommerce/product/${params?.id}`);
    // console.log(data?.data?.data);
    return data?.data?.data;
}

export const getWishlist = async () => {
    const data = await api.get(`/ecommerce/wishlist`);
    console.log(data);
    return data?.data?.data;
}
