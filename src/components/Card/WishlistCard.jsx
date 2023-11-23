/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import { getDiscountedPrice, getRandomDiscount } from '../../Utils/CommonFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/asyncThunks/cartAsyncThunk';
import { removeFromWishlist } from '../../store/asyncThunks/wishlistAsyncThunk';
import { useEffect, useRef } from 'react';
import { checkItemIsAddedToCart } from '../../store/slices/cartSlice';

const WishlistCard = ({ _id, brand, displayImage, name, price, ratings }) => {
    const discount = useRef(getRandomDiscount(20, 80));
    const dispatch = useDispatch();
    const { isAddedToCart } = useSelector(state => state.cart);


    const removeItem = (e) => {
        e && e.stopPropagation();
        dispatch(removeFromWishlist(_id));
    }

    const addToBag = (e) => {
        e && e.stopPropagation();
        dispatch(addToCart({ productId: _id, quantity: 1 }));
        removeItem();
    }

    useEffect(() => {
        dispatch(checkItemIsAddedToCart(_id));
    }, []);

    return (
        <div className='relative'>
            <div className='border lg:border-none rounded-sm overflow-hidden'>
                <Link to={`/p/${_id}`}>
                    <figure className="overflow-hidden relative">
                        <img className='w-full transition-all hover:scale-105 aspect-[5/7] object-cover object-top' src={displayImage || "/assets/images/banner/2.jpg"} alt={name} />
                        {
                            !!ratings &&
                            <div className="ratingBox absolute bottom-3 md:bottom-4 left-0 flex items-center gap-1 px-2 py-[2px] rounded-full bg-[#f7f7f7]">
                                <AiFillStar className="text-[#ffc700] w-3 h-3" />
                                <span className="text-[8px] md:text-xs text-[#000000e6]">{ratings.toFixed(1)}</span>
                            </div>
                        }
                        <div className="tagContainer bg-[#00b852cc] bg-[#525252cc] absolute top-0 left-0 min-h-4 flex items-center">
                            <span className="tagText text-white font-semibold px-1 py-[2px] md:px-2 text-[10px]">OVERSIZED FIT</span>
                        </div>
                    </figure>
                </Link>

                <div className={`cardDetails border pt-1 px-1 md:pt-2 md:px-2 pb-2`}>
                    <div className="flex">
                        <div className="flex-1 truncate">
                            <Link to={`/p/${_id}`}>
                                {brand &&
                                    <h3 className="brandName text-xs font-semibold truncate">{brand}</h3>
                                }
                                <h2 className="text-[10px] text-[#737373] truncate">{name}</h2>
                            </Link>
                        </div>
                    </div>
                    <div className="priceBox font-semibold flex items-end">
                        <div className="text-[10px] md:text-base"><span className="text-xs">₹</span>{price}</div>
                        <div className="pl-1 line-through text-[#949494] text-[10px] md:text-xs">₹{getDiscountedPrice(price, discount.current)}</div>
                        <div className="pl-2 text-[#00b852] text-[10px] md:text-xs whitespace-nowrap">{discount.current}% OFF</div>
                    </div>
                </div>
            </div>
            <div className="removeItem absolute top-2 right-2 cursor-pointer" onClick={removeItem}>
                <img src="/assets/icons/crossBtnIcon.svg" alt="" />
            </div>
            {!isAddedToCart && <div className="addToBag flex items-center justify-center gap-2 cursor-pointer border border-t-0 text-[10px] text-[#207bb4] px-3 py-2 font-semibold hover:text-[#333] hover:bg-[#e6e6e6]" onClick={addToBag}>
                <img src="/assets/icons/bag-blue.svg" alt="" />
                <span className=''>ADD TO BAG</span>
            </div>}
        </div>
    )
}

export default WishlistCard;