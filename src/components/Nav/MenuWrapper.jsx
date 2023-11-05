/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";

const MenuWrapper = ({ active, setActive, title, children }) => {
    const navigate = useNavigate();
    const handleClick = () => navigate(`/${title}`);
    const handleMouseOver = () => setActive(title);
    const handleMouseOut = () => setActive('');

    return (
        <span className="cursor-pointer" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <span className="relative px-3 h-14 flex items-center" onClick={handleClick}>
                <Link className="uppercase font-medium text-sm relative">{title.toUpperCase()}</Link>
                <div className={`h-[5px] ${active === title ? 'bg-[#fdd855]' : ''} absolute bottom-0 left-0 right-0`}></div>
            </span>
            <div className={`menuDropdownWrapper container ${active === title ? 'block' : 'hidden'} absolute left-0 right-0 z-[100] max-h-[600px] min-h-[370px] bg-white overflow-y-scroll  overscroll-none border top-full border-[#00000033] cursor-default`}>{children}</div>
        </span>
    )
}

export default MenuWrapper;