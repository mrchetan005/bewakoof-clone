/* eslint-disable react/no-unescaped-entities */
import { AiFillStar } from "react-icons/ai";
import { ProductSlider, StickySlider } from "../components/Carousels";
import Divider from "../components/Utils/Divider";
import ColorOptions from "../components/detailsEssentials/ColorOptions";
import SizeOptions from "../components/detailsEssentials/SizeOptions";
import { useLoaderData, useNavigate } from "react-router-dom";
import { getDiscountedPrice, getRandomDiscount } from '../Utils/CommonFunctions';
import Portal from "../components/Portal";
import SizeModal from "../components/detailsEssentials/SizeModal";
import { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkItemIsAddedToCart } from "../store/slices/cartSlice";
import { addToCart } from "../store/asyncThunks/cartAsyncThunk";
import { addToWishlist, removeFromWishlist } from "../store/asyncThunks/wishlistAsyncThunk";
import { checkItemIsAdded } from "../Utils/CommonFunctions";
import Accordion from "../components/Utils/Accordion";
import Review from "../components/detailsEssentials/Review";
import TrustBagge from "../components/Utils/TrustBagge";
import PincodeCheckForm from "../components/Forms/PincodeCheckForm";
import GifLoader from "../components/Loaders/GifLoader";


const ProductDetails = () => {
    const [openSizeModal, setOpenSizeModal] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState(null);

    const { isAddedToCart, cartItems } = useSelector(state => state.cart);
    const { wishlistItems } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ! Fetching data from react router's loader function 
    // ! and getting it with hook useLoaderData()
    const { _id, name, brand, images, color, size, price, ratings, description } = useLoaderData();

    // ! Wishlist Functions

    useEffect(() => {
        const addedToWishlist = checkItemIsAdded(wishlistItems, _id);
        setWishlisted(addedToWishlist);
    }, [wishlistItems]);

    const handleWishlisted = () => {
        if (wishlisted) {
            dispatch(removeFromWishlist(_id));
        } else {
            dispatch(addToWishlist(_id));
        }
    }


    // ! Cart Functions

    useEffect(() => {
        dispatch(checkItemIsAddedToCart(_id));
    }, [cartItems]);

    const setAddedToBag = () => {
        dispatch(addToCart({ productId: _id, quantity: 1 }));
    }

    const handleAddedToBag = () => {
        if (isAddedToCart) {
            navigate('/cart')
        } else {
            if (selectedSize === null) {
                setOpenSizeModal(true);
            } else {
                setAddedToBag();
            }
        }
    }

    const onCloseSizeModal = (e) => {
        if (e?.stopPropagation) {
            e.stopPropagation();
        }
        setOpenSizeModal(false);
    }

    const discount = useRef(getRandomDiscount(20, 80));

    return (
        <Suspense fallback={<GifLoader />}>
            <div className="productWrapper lg:container md:mt-5">
                <div className="productDetailsContainer flex flex-col md:flex-row">
                    <div className="stickySlider md:px-4 h-max w-full md:w-1/2 md:sticky md:top-24">
                        <StickySlider images={images} />
                    </div>

                    <div className="detailsWrapper px-4 w-full md:w-1/2">
                        <div className="flex flex-col w-full md:max-w-[460px]">
                            <div className="hidden md:flex">
                                <h3 className="text-[#4f5362] text-lg font-semibold">{brand}</h3>
                            </div>
                            <h1 className="text-[#737373] pt-2 hidden md:block">{name}</h1>
                            <div className="mobileHeading flex md:hidden pt-2">
                                <div className="flex-1 truncate">
                                    {brand &&
                                        <h3 className="brandName text-lg text-[#4f5362] font-semibold truncate">{brand}</h3>
                                    }
                                    <h2 className="text-sm text-[#737373] truncate">{name}</h2>
                                </div>
                                <button className='cursor-pointer active:animate-ping bounce flex items-center justify-center' onClick={handleWishlisted}>
                                    {
                                        wishlisted
                                            ? <img className='w-9 h-9 transition-all delay-1000 active:animate-ping wishlist-selected' src="/assets/icons/wishlist-selected.svg" alt="wishlist" />
                                            : <img className='w-9 h-9 active:animate-ping wishlist' src="/assets/icons/wishlist.svg" alt="wishlist" />
                                    }
                                </button>
                            </div>
                            {!!ratings && <div className="ratingBox flex gap-2 border-black border w-max py-1 px-2 bg-[#f7f7f7] mt-3 items-center">
                                <AiFillStar className="text-[#ffc700]" />
                                <span className="text-sm font-semibold">{ratings.toFixed(1)}</span>
                            </div>}
                            <div className="priceRow mt-3">
                                <div className="priceContainer items-start flex flex-col justify-center">
                                    <div className="flex items-end justify-between">
                                        <div className="sellingPrice mr-1 text-2xl font-semibold text-[#0f0f0f]">
                                            <span className="rupee_icon text-base">₹</span>
                                            {price}
                                        </div>
                                        <div className="discPrice mr-2 text-[#949494] text-sm line-through">
                                            <span className="rupee_icon">₹</span>
                                            {getDiscountedPrice(price, discount.current)}
                                        </div>
                                        <div className="offerPerc text-[#00b852] font-medium">
                                            <p>{discount.current}% OFF</p>
                                        </div>
                                    </div>
                                    <span className="text-xs my-1">inclusive of all taxes</span>
                                </div>
                                <div className="tags my-2 mr-4 w-max border border-[#737373]">
                                    <p className="uppercase text-xs px-2 py-1 text-[#737373] font-semibold">100% COTTON</p>
                                </div>
                            </div>
                            <div className="tribeContainer py-2 mt-1">
                                <Divider h={3} />
                                <div className="tribeMsg py-4 text-xs font-medium cursor-pointer">
                                    <span className="text-[#333]">TriBe members get an extra discount of ₹20 and FREE shipping. </span>
                                    <span className="text-[#42a2a2]">Learn more</span>
                                </div>
                                <Divider h={3} />
                            </div>
                            <div className="sizeBlock mb-2 md:mb-8 pt-3">
                                <ColorOptions colors={[color]} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
                                <div className="sizeDiv">
                                    <div className="sizeName text-xs flex items-center justify-between font-bold text-[#333] my-2">
                                        <p>SELECT SIZE </p>
                                        <div className="font-bold cursor-pointer text-[#42a2a2]">Size Guide</div>
                                    </div>
                                    <SizeOptions size={size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
                                </div>
                            </div>
                            <div className="addButtons fixed bottom-0 left-0 z-50 md:z-0 h-14 w-full md:static md:mb-5 flex shadow-md md:shadow-none rotate-180 md:rotate-0 gap-4 p-2 pb-[10px] md:p-0 items-center justify-between font-medium">
                                <button onClick={handleAddedToBag} className="h-11 rotate-180 md:rotate-0 flex-1 bg-[#ffd84d] flex items-center md:rounded-none justify-center rounded-sm hover:shadow-md transition-all">
                                    {
                                        isAddedToCart
                                            ? <img className="w-5 h-5" src="/assets/icons/bag-filled.svg" alt="bag" />
                                            : <img className="w-5 h-5" src="/assets/icons/bag.svg" alt="bag" />
                                    }
                                    <p className="text-black text-sm pl-2">{isAddedToCart ? 'GO' : 'ADD'} TO BAG</p>

                                    {
                                        openSizeModal && (<Portal onClose={onCloseSizeModal}>
                                            <SizeModal onClose={onCloseSizeModal} size={size} selectedSize={selectedSize} setSelectedSize={setSelectedSize} setAddedToBag={setAddedToBag} />
                                        </Portal>)
                                    }
                                </button>
                                <button onClick={handleWishlisted} className={`h-11 hidden md:flex flex-1 items-center justify-center border rounded-sm hover:shadow-md transition-all ${wishlisted ? 'border-black' : ''}`}>
                                    {
                                        wishlisted
                                            ? <img className="w-6 h-6" src="/assets/icons/wishlist-selected.svg" alt="bag" />
                                            : <img className="w-6 h-6" src="/assets/icons/wishlist.svg" alt="bag" />
                                    }
                                    <p className={`${wishlisted ? 'text-black' : 'text-[#949494]'} text-sm pl-2`}>{wishlisted ? 'WISHLISTED' : 'WISHLIST'}</p>
                                </button>
                            </div>

                            <Divider h={3} />

                            <div className="checkPincode mt-1 mb-4">
                                <div className="checkPincodeHeader text-[#2d2d2d] text-xs p-2 pl-0 flex items-center gap-1">
                                    <img className="w-6 h-6 object-cover" src="/assets/icons/location.svg" alt="" />
                                    <span className="font-bold">CHECK FOR DELIVERY DETAILS</span>
                                </div>

                                <PincodeCheckForm />
                            </div>

                            <Divider h={3} />

                            <div className="productDescription">
                                <Accordion
                                    icon={'/assets/images/productDetails/ic-prod-desc.svg'}
                                    title={'Product Description'} subTitle={'Manufacture, Care and Fit'}
                                    description={<div dangerouslySetInnerHTML={{ __html: description }} />} />
                                <Divider h={1} />
                                <Accordion
                                    icon={'/assets/images/productDetails/ic-return.svg'}
                                    title={'15 Days Returns & Exchange'} subTitle={'Know about return & exchange policy'}
                                    description={'Easy returns upto 15 days of delivery. Exchange available on select pincodes'} />
                                <Divider h={1} />
                            </div>

                            <TrustBagge />

                            <div className="reviewsWrapper">
                                <Review productId={_id} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="customRelatedWrapper lg:container overflow-hidden px-4 mb-11">
                    <h2 className="font-semibold pb-8 pt-8">SUGGESTED FOR YOU</h2>
                    <ProductSlider />
                </div>
            </div>
        </Suspense>
    )
}

export default ProductDetails;
