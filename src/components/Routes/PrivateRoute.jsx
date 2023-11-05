/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const { token } = useSelector(state => state.auth);
    return (token ? <Outlet /> : <Navigate to={'/login'} />)
}

export default PrivateRoute;
