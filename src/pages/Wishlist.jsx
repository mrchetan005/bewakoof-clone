
import { useEffect, useState } from 'react';
import WishlistCard from '../components/Card/WishlistCard';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ProductSlider } from '../components/Carousels';
import { getWishlist } from '../store/asyncThunks/wishlistAsyncThunk';
// const filterCategories = ['All', 'T-Shirt', 'Vest', 'Joggers', 'Shorts', 'Boxers', 'Jackets'];

const filterCategories = { All: '', }

const Wishlist = () => {
    const [filterActive, setFilterActive] = useState(['All']);
    const navigate = useNavigate()

    const { wishlistItems } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getWishlist());
    }, [])

    const handleFilter = (value) => {
        setFilterActive(prev => {
            const index = prev.indexOf(value);
            if (index === -1) {
                return [value, ...prev];
            } else {
                prev.splice(index, 1);
                return [...prev];
            }
        });
    }

    const handleClick = () => {
        navigate('/');
    }

    return (
        <>
            {
                wishlistItems?.length > 0 ?
                    <div className='wishlistWrapper lg:container px-4 pb-8'>
                        <ul className="wishlistFilter flex py-4 overflow-x-auto">
                            {
                                Object.keys(filterCategories)?.map((filter) => (
                                    <li key={filter} onClick={() => handleFilter(filter)} className={`rounded-3xl font-medium text-xs md:text-sm px-3 py-1 mr-3 border  whitespace-nowrap cursor-pointer ${filterActive.includes(filter) ? 'border-black text-black bg-[#ffc700]' : 'text-[#737e93] border-gray-500'}`}>{filter}</li>
                                ))
                            }
                        </ul>
                        <div className='wishlistGrid grid gap-4 grid-cols-2 md:grid-cols-4'>
                            {
                                wishlistItems?.slice(0)?.reverse()?.map((item) => (
                                    <WishlistCard key={item._id} {...item?.products} />
                                ))
                            }
                        </div>
                    </div>
                    : <div className="emptyWishlist flex flex-col">
                        <div className=" md:m-auto pt-8 text-center">
                            <img className='m-auto' src="/assets/images/others/wishlistEmpty.svg" alt="" />
                            <h2 className="emptyListTitle font-bold text-xs text-[#292d35] mt-5">Hey! Your wishlist is empty.</h2>
                            <p className="emptyListSubtitle text-xs text-[#8f98a9] mt-2 w-56 m-auto ">Save your favourites here and make them yours soon!</p>
                            <button onClick={handleClick} className={`uppercase cursor-pointer h-10 w-52 my-5 m-auto font-medium border-none outline-none flex justify-center items-center rounded-md text-white bg-[#42a2a2] hover:bg-opacity-80`}>SHOP NOW</button>
                        </div>
                        <div className="pb-8 pt-3 pl-4 md:px-10 h-full w-full bg-no-repeat bg-cover " style={{ backgroundImage: `url(/assets/images/others/bg-web-mc-land-page.svg)` }}>
                            <h2 className="font-semibold pb-4 md:text-center pt-8">YOU MAY ALSO LIKE</h2>
                            <ProductSlider />
                            <div className="text-sm font-semibold text-[#42a2a2] text-center underline pt-8">
                                <Link to={'/Men'}>Explore All</Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Wishlist;