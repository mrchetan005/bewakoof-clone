/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";


const PageNotFound = () => {
    return (
        <div className="min-h-[50vh]">
            <div className="text-center my-20">
                <h1 className="heading font-medium text-7xl md:text-8xl text-[#333] mx-2 pt-5">404</h1>
                <p className="bigText text-xl md:text-2xl my-4 text-[#333] font-medium">OH SNAP !</p>
                <div className="textDiv w-full md:w-max m-auto px-4">
                    <p className="font-medium text-base md:text-lg pb-6">The page you are looking for doesn't exist.</p>
                    <div className="my-8">or</div>
                    <p className="font-medium text-base md:text-lg pb-6 border-b border-[#d7d6d6]">We are working hard on this for you, stay tuned 😊</p>
                    <Link to={-1}>
                        <button className="px-4 py-2 mt-8 hover:opacity-80 border text-[#42a2a2] border-[#42a2a2] font-semibold rounded">GO BACK</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;