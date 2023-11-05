/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";


const Popup = ({ message, period = 3000 }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (message) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, period);
        }
    }, [message]);

    return show && (
        <div className="fixed bottom-20 w-60 md:w-96 text-center left-1/2 -translate-x-1/2 text-white bg-[#65676d] py-3 px-5 rounded-md">{message}</div>
    )
}

export default Popup;