import api from "../../api";
import { LIMIT_PER_PAGE } from "../../constants";

export const getProductDetails = async ({ params }) => {
    const data = await api.get(`/ecommerce/product/${params?.id}`);
    return data?.data?.data;
}

export const getFilteredProduct = async ({ params }) => {
    const { name } = params;
    const filter = { gender: name?.includes('women') ? 'Women' : 'Men', sellerTag: 'new arrival' }
    const data = await api.get(`/ecommerce/clothes/products?filter=${JSON.stringify(filter)}&limit=${LIMIT_PER_PAGE}`);
    return data?.data?.data;
}

export const getOrderDetails = async ({ params }) => {
    const data = await api.get(`/ecommerce/order/${params?.orderId}`);
    return data?.data?.data;
}

export const getReviews = async ({ params }) => {
    const data = await api.get(`/ecommerce/review/${params?.id}`);
    return data?.data?.data;
}

export const writeReview = async ({ params }) => {
    const data = await api.get(`/ecommerce/product/${params?.id}`);
    return data?.data?.data;
}

export const getWishlist = async () => {
    const data = await api.get(`/ecommerce/wishlist`);
    return data?.data?.data;
}
