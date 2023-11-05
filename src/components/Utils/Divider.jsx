/* eslint-disable react/prop-types */


const Divider = ({ h = 2 }) => {
    return (
        <div style={{ height: `${h}px` }} className={`divider bg-[#eee]`}></div>
    )
}

export default Divider;