/* eslint-disable react/prop-types */
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../store/slices/authSlice";


const DropDownProfile = ({ list, active, setActive }) => {
    const handleMouseOver = () => setActive(true);
    const handleMouseOut = () => setActive(false);
    const { authenticated, user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logOutUser());
    }

    return (
        <>
            {
                authenticated ?
                    <div className="relative h-[52px] items-center hidden lg:flex cursor-pointer z-50" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                        <AiOutlineUser className="h-7 w-7 mx-2" />
                        <ul className={`${active ? 'block' : 'hidden'} absolute w-52 top-full left-1/2 shadow-sm -translate-x-1/2 bg-white`}>
                            <li className="bg-[#0000000d] text-[#00000080] text-ellipsis overflow-hidden italic  font-medium whitespace-nowrap w-full py-3 px-2">Hi, {user.name}</li>
                            {
                                list?.map(({ id, path, title }) => (
                                    <Link key={id} to={path}>
                                        <li className="hover:bg-[#f5f5f5] font-medium w-full py-3 px-2">
                                            {title}
                                        </li>
                                    </Link>
                                ))
                            }
                            <li onClick={handleLogout} className="hover:bg-[#f5f5f5] font-medium w-full py-3 px-2">Logout</li>
                        </ul>
                    </div>
                    : <div className="font-medium hidden lg:block text-sm relative ml-3"><Link to={'/login'}>Login</Link></div>
            }
        </>
    )
}

export default DropDownProfile;