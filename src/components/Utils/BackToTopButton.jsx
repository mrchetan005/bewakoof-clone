import { useEffect, useState } from "react";


const BackToTopButton = () => {
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        const toggleVisibility = () => {
            const { scrollTop, clientHeight } = document.documentElement;
            if (scrollTop >= clientHeight) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }

        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    if (!visible) return <></>;

    return (
        <button onClick={handleClick} className='w-11 h-11 flex items-center shadow-lg  bg-white fixed bottom-16 right-5 rounded-full justify-center cursor-pointer z-50'>
            <img src='/assets/icons/back-to-top.webp' className='h-5 w-5 object-cover' />
        </button>
    )
}

export default BackToTopButton;