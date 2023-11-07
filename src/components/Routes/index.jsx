
import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Home, Account, Categories, ProductDetails, MobileCovers, Login, Signup, Cart, Wishlist, Profile, Search, PageNotFound, Order, WriteReview, Wallet, Address, Payment, Reviews, DesignOfTheWeek, OrderSuccess, OrderDetails } from '../../pages';
import PrivateRoute from './PrivateRoute';
import Layout from './Layout';
import { getFilteredProduct, getOrderDetails, getProductDetails, getReviews, writeReview } from './LoaderFunctions';
import AddressForm from '../Forms/AddressForm';

export const router = createBrowserRouter((
    createRoutesFromElements(
        <Route path='/' element={<Layout />}>
            <Route index path='' element={<Home />} />
            <Route path='c/:query' element={<Categories />} />
            <Route path='search/:query' element={<Categories />} />
            <Route path='Men' element={<Categories />} />
            <Route path='Women' element={<Categories />} />
            <Route path='campaign/:name' element={<DesignOfTheWeek />} loader={getFilteredProduct} />
            <Route path='Mobile-Covers' element={<MobileCovers />} />
            <Route path='p/:id' element={<ProductDetails />} loader={getProductDetails} />
            <Route path='review/:id' element={<Reviews />} loader={getReviews} />
            <Route path='search' element={<Search />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />

            <Route path='' element={<PrivateRoute />}>
                <Route path='wishlist' element={<Wishlist />} />
                <Route path='cart' element={<Cart />} />
                <Route path='order-success' element={<OrderSuccess />} />
                <Route path='account' element={<Outlet />}>
                    <Route path='' element={<Account />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='orders' element={<Order />} />
                    <Route path='orders/:orderId' element={<OrderDetails />} loader={getOrderDetails} />
                    <Route path='wallet' element={<Wallet />} />
                    <Route path='address' element={<Address />} />
                    <Route path='address/:addressId' element={<AddressForm />} />
                </Route>
                <Route path='/checkout/payment' element={<Payment />} />
                <Route path='write-review/:id' element={<WriteReview />} loader={writeReview} />
            </Route>

            <Route path='*' element={<PageNotFound />} />
        </Route>
    )
))

