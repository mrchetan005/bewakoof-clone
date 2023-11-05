/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import ReviewCard from "../components/Card/ReviewCard";
import { memo } from "react";


const Reviews = ({ reviews }) => {
    const { state } = useLocation();

    const reviewData = reviews ? reviews : state;
    console.log('reviews rendered');

    return (
        <div className='reviewsWrapper md:container px-4 md:px-0'>
            {
                reviewData?.slice(0)?.reverse()?.map((productReview) => (
                    <ReviewCard color={reviews ? 'grayscale invert' : ''} key={productReview._id} {...productReview} />
                ))
            }
        </div>
    )
}

export default memo(Reviews);