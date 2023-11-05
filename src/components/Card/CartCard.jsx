/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";
import CartModOptions from "../Utils/CartModOptions";
import { getDiscountedPrice, getRandomDiscount } from '../../Utils/CommonFunctions';
import { useEffect, useRef, useState } from "react";
import { checkItemIsAdded } from "../../Utils/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/asyncThunks/cartAsyncThunk";
import { addToWishlist } from "../../store/asyncThunks/wishlistAsyncThunk";
import { AiOutlineClose } from "react-icons/ai";
import { updateTotalPrice } from "../../store/slices/cartSlice";

const sizes = ['S', 'M', 'L', 'XL', '2XL', '3XL'];
const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CartCard = ({ _id, brand, displayImage, name, price }) => {
    const [qty, setQty] = useState(1);
    const [wishlisted, setWishlisted] = useState(false);
    const dispatch = useDispatch();

    const discount = useRef(getRandomDiscount(20, 80));
    let discountPrice = getDiscountedPrice(price, discount.current);
    price *= qty;
    discountPrice *= qty;

    const handleQty = (qtt) => {
        setQty(qtt);
        dispatch(updateTotalPrice(qtt * price));
    }

    const { wishlistItems } = useSelector(state => state.wishlist);

    useEffect(() => {
        const addedToWishlist = checkItemIsAdded(wishlistItems, _id);
        setWishlisted(addedToWishlist);
    }, [wishlistItems]);

    const removeItem = (e) => {
        e && e.stopPropagation();
        dispatch(removeFromCart(_id));
    }

    const moveToBag = (e) => {
        e && e.stopPropagation();
        dispatch(addToWishlist({ productId: _id, quantity: 1 }));
        removeItem();
    }

    return (
        <div className="cartProduct relative border rounded-md border-[#0003] mb-5">
            <div className="cartProductInner md:px-4">
                <div className="productRow py-2 md:py-5 px-2 md:px-0 flex md:justify-between flex-row-reverse md:flex-row justify-end">
                    <div className="productText ml-2 mr-4 md:mx-0 flex flex-col justify-between">
                        {brand && <div className="brandName md:hidden my-2 text-xs font-semibold">{brand}</div>}
                        <span className="text-[11px] flex py-1 md:text-sm text-[#000000b3]">
                            <Link to={`/p/${_id}`}>{name}</Link>
                        </span>
                        <div className="productDetails flex items-center mb-2">
                            <span className="cartProductPrice text-[#333] md:text-lg font-semibold md:font-bold mr-1">₹{price}</span>
                            <span className="cartProductMrp text-[#9c9c9c] text-sm md:text-sm line-through">₹{discountPrice}</span>
                        </div>
                        <div className="cartProdInfoMsg block text-xs md:text-sm text-[#1d8802] font-medium pt-1 pb-3">You saved ₹{discountPrice - price}!</div>
                        <div className="cartModOptionWrap flex gap-5 py-2">
                            <CartModOptions options={sizes} title={'Size'} heading={'Select Size'} />
                            <CartModOptions handleQty={handleQty} options={quantity} title={'Qty'} heading={'Select Quantity'} />
                        </div>
                        {/* <div className="cartProdInfoMsg text-sm text-[#db3a34] font-medium">Hurry! Only 18 left!</div> */}
                    </div>
                    <div className="productImage md:h-[166px] h-[130px] shadow md:min-w-[134px] relative min-w-[104px] rounded-md">
                        <Link to={`/p/${_id}`}>
                            <img className="aspect-[10/13] w-full h-full object-cover rounded-md" src={displayImage || "/assets/images/others/product.webp"} alt={name} />
                            {wishlisted &&
                                <>
                                    <div className="iconWrapper absolute bottom-1 right-1 w-6 h-6 bg-[#fefefe] opacity-60 rounded-full">
                                    </div>
                                    <img className="absolute bottom-1 right-1 w-6 h-6" src="/assets/icons/wishlist-selected.svg" alt="" />
                                </>}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="cartBottomAction hidden md:flex px-4 text-sm text-[#00000080] text-center">
                <button onClick={removeItem} className="remove py-5 border-r border-t flex-1 cursor-pointer">Remove</button>
                <button disabled={wishlisted} onClick={moveToBag} className={`addToWishlist py-5 border-l border-t flex-[2] cursor-pointer`}>{wishlisted ? '' : 'Move to Wishlist'}</button>
            </div>


            <div className="mobileRemoveItem md:hidden absolute cursor-pointer top-1 right-1 flex justify-center items-center">
                <span className='opacity-70' onClick={removeItem}><AiOutlineClose className='w-5 h-5' /></span>
            </div>
        </div>
    )
}

export default CartCard;