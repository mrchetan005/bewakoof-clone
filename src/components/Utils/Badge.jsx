/* eslint-disable react/prop-types */

function Badge({ count, children }) {
    return (
        <span className="relative inline-block">
            {children}
            {typeof count === 'number' && count > 0 && (
                <p className="absolute top-0 right-0 font-medium transform translate-x-1/2 -translate-y-1/2 bg-red-500 lg:bg-[#fdd855] rounded-full h-5 w-5 flex justify-center items-center  text-white lg:text-black text-xs ">
                    {count > 99 ? '99+' : count}
                </p>
            )}
        </span>
    );
}

export default Badge;
