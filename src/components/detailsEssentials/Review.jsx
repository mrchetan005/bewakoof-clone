/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import { Reviews } from '../../pages';
import { useSelector } from 'react-redux';

const Review = ({ productId }) => {
    const { user } = useSelector(state => state.auth);
    const [selectedProdTab, setSelectedProdTab] = useState(true);

    const selectProdReview = () => setSelectedProdTab(true);
    const selectBrandReview = () => setSelectedProdTab(false);

    const navigate = useNavigate();

    const openWriteReview = () => {
        navigate(`/write-review/${productId}`);
    }

    const { data, get } = useApi();

    useEffect(() => {
        get(`/ecommerce/review/${productId}?limit=1`);
    }, []);

    const handleViewAllReviews = () => {
        navigate(`/review/${productId}`, { state: data?.data });
    }

    const alreadyReviewed = data?.data?.some(({ user: u }) => u === user?._id);

    return (
        <div className=''>
            <div className="tab-wrapper flex items-center cursor-pointer h-11 text-center font-bold text-sm text-[#8f98a9]">
                <button onClick={selectProdReview} className={`element flex-1 flex items-center justify-center h-full border-b-4 ${selectedProdTab ? 'border-b-[#ffd232] text-[#292d35]' : ''}`}>
                    <h2 className={`${selectedProdTab ? '' : ''}`}>PRODUCT REVIEWS</h2>
                </button>
                <button disabled onClick={selectBrandReview} className={`element disabled flex-1 flex items-center justify-center cursor-no-drop h-full border-b-4 ${selectedProdTab ? '' : 'border-b-[#ffd232] text-[#292d35]'}`}>
                    <h2 className=''>BRAND REVIEWS</h2>
                </button>
            </div>
            <div className="ratingsWrapper w-full">
                {!alreadyReviewed &&
                    (<div className="noRevsWrpr border-b flex items-center justify-between gap-3 py-2">
                        <p className='text-[#000000b3] text-xs'>{data?.data?.length === 0 ? `Be the first one to review this product.` : 'Review the product'}</p>
                        <button onClick={openWriteReview} className='font-semibold px-4 py-2 rounded-md border text-sm text-[#42a2a2] hover:shadow-md transition-all'>RATE</button>
                    </div>)}
                {
                    data?.data?.length > 0 &&
                    <div className='reviewsWrapper'>
                        <Reviews reviews={data?.data?.slice(0, 2)} />
                        <button onClick={handleViewAllReviews} className='border my-4 border-[#207bb4] flex rounded-md w-4/5 m-auto'>
                            <div className='text-[#207bb4] text-sm font-semibold px-5 py-3 m-auto'>View All Reviews</div>
                        </button>
                    </div>
                }


            </div>
        </div>
    )
}

export default memo(Review);