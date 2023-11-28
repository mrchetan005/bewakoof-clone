/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';
import { getDiscountedPrice, getRandomDiscount } from '../../Utils/CommonFunctions';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/asyncThunks/wishlistAsyncThunk";
import { checkItemIsAdded } from "../../Utils/CommonFunctions";

const Card = ({ _id, brand, displayImage, name, price, ratings, fabric }) => {
    const [wishlisted, setWishlisted] = useState(false);
    const [imgLoad, setImgLoad] = useState(true);
    const { pathname } = useLocation();
    const discount = useRef(getRandomDiscount(20, 80));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authenticated } = useSelector(state => state.auth);
    const { wishlistItems } = useSelector(state => state.wishlist);

    useEffect(() => {
        const addedToWishlist = checkItemIsAdded(wishlistItems, _id)
        setWishlisted(addedToWishlist);
    }, [wishlistItems]);


    const handleWishlisted = () => {
        if (!authenticated) {
            navigate('/login');
        } else {
            if (wishlisted) {
                dispatch(removeFromWishlist(_id));
            } else {
                dispatch(addToWishlist(_id));
            }
        }
    }

    return (
        <div className='border shadow-sm lg:border-none rounded-sm overflow-hidden pb-2 bg-white'>
            <Link to={`/p/${_id}`}>
                <figure className="overflow-hidden relative">
                    <img title={name} onLoad={() => { setImgLoad(false) }} className={`w-full  ${imgLoad ? 'animate-pulse bg-gray-300' : ''} flash text-center transition-all hover:scale-[1.02] aspect-[6/8] object-cover object-top`} src={displayImage || "/assets/images/banner/2.jpg"} alt={name} />
                    {
                        !!ratings &&
                        <div className="ratingBox absolute bottom-3 md:bottom-4 left-2 flex items-center gap-1 px-2 py-[2px] rounded-full bg-[#f7f7f7]">
                            <AiFillStar className="text-[#ffc700] w-3 h-3" />
                            <span className="text-[8px] md:text-xs text-[#000000e6]">{ratings.toFixed(1)}</span>
                        </div>
                    }
                    <div className="tagContainer bg-[#00b852cc] bg-[#525252cc] absolute top-0 left-0 min-h-4 flex items-center">
                        <span className="tagText text-white font-semibold px-1 py-[2px] md:px-2 text-[10px]">OVERSIZED FIT</span>
                    </div>
                </figure>
            </Link>

            <div className={`cardDetails pt-1 px-1 md:pt-2 md:px-3 lg:px-2 border-t`}>
                <div className="flex">
                    <div className="flex-1 truncate">
                        <Link to={`/p/${_id}`}>
                            {brand &&
                                <h3 className="brandName text-xs font-semibold truncate">{brand}</h3>
                            }
                            <h2 className="text-[10px] text-[#737373] truncate">{name}</h2>
                        </Link>
                    </div>
                    <button className='cursor-pointer active:animate-ping bounce' onClick={handleWishlisted}>
                        {
                            wishlisted
                                ? <img className='w-7 h-7 wishlist-selected' src="/assets/icons/wishlist-selected.svg" alt="wishlist" />
                                : <img className='w-7 h-7 wishlist' src="/assets/icons/wishlist.svg" alt="wishlist" />
                        }
                    </button>
                </div>
                <div className="priceBox font-semibold flex items-end">
                    <div className="text-[10px] md:text-base"><span className="text-xs">₹</span>{price}</div>
                    <div className="pl-1 line-through text-[#949494] text-[10px] md:text-xs">₹{getDiscountedPrice(price, discount.current)}</div>
                    <div className="pl-2 text-[#00b852] text-[10px] md:text-xs whitespace-nowrap">{discount.current}% OFF</div>
                </div>
                {
                    !pathname.includes('wishlist') && !pathname.includes('/p') && fabric &&
                    <div className="fabricTagContainer my-2 border border-[#737373] flex items-center w-fit">
                        <span className="tagText text-[#737373] font-semibold px-1 py-[2px] md:px-2 text-[10px]">WORLD'S FINEST COTTON</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Card;