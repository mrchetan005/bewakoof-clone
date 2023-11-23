
import { useLoaderData, useNavigate } from 'react-router-dom';
import StarsRating from '../components/detailsEssentials/StarsRating';
import { useEffect, useState } from 'react';
import GifLoader from '../components/Loaders/GifLoader';
import useApi from '../Hooks/useApi';

const reviewTextareaPlacehoder = [
    `We are extremely sorry for this, let us know what went wrong`,
    `We are very sorry to hear this, let us know what went wrong`,
    `We want to improve. Please tell us more.`,
    `Arghh! 1 star short, tell us what went right and how to make it better.`,
    `Yayy! That's how we roll. Tell us what you liked the most.`
]

const WriteReview = () => {
    const { _id, name, brand, displayImage } = useLoaderData();
    const [shake, setShake] = useState(false);
    const [ratings, setRatings] = useState(0);
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const { data, loading, post } = useApi();

    const handleClick = () => {
        if (text.length < 10) {
            setShake('shake');
            setTimeout(() => {
                setShake('');
            }, 1000);
            return;
        }
        post(`/ecommerce/review/${_id}`, { ratings, text: text.trim() });

    }

    useEffect(() => {
        if (data?.data?.status === 'success') {
            navigate(-1);
        }
    }, [data]);

    return (
        <>
            <div className='tateReviewWrpr my-5 pb-6 w-full md:w-[50%] max-w-2xl m-auto px-4'>
                <div className="prodDetailsWrpr flex justify-start mt-14">
                    <img className={`w-16 md:w-24 aspect-auto object-cover rounded-sm`} src={displayImage} alt={name} />
                    <div className="prodDetail pl-3 text-xs truncate">
                        {brand && <span className='font-bold pb-1'>{brand}</span>}
                        <div className="truncate font-medium">{name}</div>
                        <StarsRating rating={ratings} setRating={setRatings} numOfStars={5} />
                    </div>
                </div>
                {!!ratings &&
                    <div className="reviewWrapper w-full mt-5">
                        <textarea value={text} onChange={(e) => { setText(e.target.value) }} className={`${shake} outline-none !h-24 w-full rounded-sm shadow-inner p-3 text-xs text-black border focus:border-[#929292] transition-all`} placeholder={reviewTextareaPlacehoder[ratings - 1]} ></textarea>
                        {
                            text.length < 10 &&
                            <p className={`inputWrong text-xs mb-5 opacity-60 ${text.length > 0 ? 'text-red-500' : ''}`}>Minimum 10 Characters</p>
                        }
                        <div className="imgUploadWrapper mt-6 mb-3 px-2 py-7 border flex justify-around items-center">
                            <img className='w-10 h-7 object-contain' src="/assets/images/productDetails/camera.webp" alt="" />
                            <div className="flex flex-col justify-center text-xs font-medium">
                                <span className='text-[#333]'>Add a few shots & show off your style.</span>
                                <span className='text-[#929292]'>Maximum File Size: 10 Mb</span>
                            </div>
                        </div>
                        <div className="creditMsg text-xs text-[#333] font-medium mb-5">
                            <p>Get featured and stand a chance to <b>win upto 50 shopping credits</b> when you upload images using the product.</p>
                        </div>
                        <button onClick={handleClick} className={`cursor-pointer h-10 w-full my-5 m-auto font-medium border-none outline-none flex justify-center items-center rounded-md text-white bg-[#42a2a2] hover:bg-opacity-95`}>Submit</button>
                    </div>
                }
            </div>
            {
                loading && (<GifLoader />)
            }
        </>
    )
}

export default WriteReview;