/* eslint-disable react/prop-types */
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Nav/Navbar";
import BackToTopButton from "../Utils/BackToTopButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "../../store/slices/authSlice";
import { getWishlist } from "../../store/asyncThunks/wishlistAsyncThunk";
import { getCart } from "../../store/asyncThunks/cartAsyncThunk";
import GifLoader from "../Loaders/GifLoader";
import { includePath } from "../../Utils/CommonFunctions";


const paths = ['login', 'signup', 'cart', 'write-review', 'profile', 'search', 'address', 'wallet', 'payment', 'order'];

const Layout = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        });

    }, [pathname]);

    const { loading: cartLoading } = useSelector(state => state.cart);
    const { loading: wishlistLoading } = useSelector(state => state.wishlist);
    const { loading: authLoading } = useSelector(state => state.auth);
    const { loading: orderLoading } = useSelector(state => state.order);

    const loading = [cartLoading, wishlistLoading, authLoading, orderLoading];

    const { authenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!authenticated) {
            dispatch(isUserLoggedIn());
        }
    }, [authenticated]);

    useEffect(() => {
        if (authenticated) {
            dispatch(getWishlist());
            dispatch(getCart());
        }
    }, [authenticated]);

    return (
        <>
            <Navbar />
            <div className={`pt-14 ${pathname === '/' ? 'lg:pt-[139px]' : 'lg:pt-[83px]'}`}>
                <Outlet />
            </div>
            {
                !includePath(pathname, paths) &&
                <>
                    <Footer />
                    <BackToTopButton />
                </>
            }
            {
                loading.includes(true) && (
                    <GifLoader />
                )
            }
        </>
    )
}

export default Layout;