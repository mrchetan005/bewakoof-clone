/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const DropDownMenu = ({ title, categories, specials }) => {
    return (
        <div className="dropDownMenu p-10 z-50">
            <div className="w-7/12 float-left border-r mr-10">
                {
                    categories?.map(({ id, heading, items }) => (
                        <div key={id} className="w-1/3 float-left">
                            <Link to={`/${title}/${heading?.name?.toLowerCase()?.split(' ').join('-')}`} className="headings singleEntry text-[#494949] text-sm float-left w-full pr-8 mb-5 font-medium relative table whitespace-normal">{heading?.name}</Link>
                            {
                                items?.map(({ id, name }) => (
                                    <Link to={`/${title}/${name?.toLowerCase()?.split(' ').join('-')}`} key={id} className="singleEntry text-[#7f7f7f] text-xs float-left w-full pr-8 mb-3 last:mb-10 relative table">
                                        <span className="hover:underline">{name}</span></Link>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="w-1/4 !w-[calc(25% - 40px)] float-left px-4 relative">
                <span className="heading text-sm uppercase text-[#a8a8a8] headings singleEntry float-left w-full pr-8 mb-5 font-medium relative table whitespace-normal">SPECIALS</span>
                {
                    specials?.map(({ id, image, name }) => (
                        <Link to={`/${title}/${name?.toLowerCase()?.split(' ').join('-')}`} key={id} className="float-left flex items-center pr-8  last:mb-10 w-full mb-3">
                            {image && <img className="w-10 mr-2 rounded-full   object-cover" src={image} alt={name} />}
                            <span className="singleEntry text-sm break-words text-[#7f7f7f] float-left w-full relative hover:underline">{name}</span>
                        </Link>
                    ))
                }
            </div>
            <div className="w-1/6 float-left"></div>
        </div>
    )
}

export default DropDownMenu;