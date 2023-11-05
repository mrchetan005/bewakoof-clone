/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Accordion = ({ icon, title, subTitle, description }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpanded = () => setExpanded(!expanded);

    return (
        <>
            <div className='accordion py-4 flex justify-between items-center cursor-pointer' onClick={toggleExpanded}>
                <div className="accordionTitleBox flex items-center gap-2">
                    {icon && <img className='w-6 h-6 object-cover' src={`${icon}`} alt="" />}
                    <div className="accordionTitle">
                        <h2 className='font-bold text-sm'>{title}</h2>
                        {subTitle && <p className='text-xs text-[#878787]'>{subTitle}</p>}
                    </div>
                </div>
                {subTitle ?
                    <p className='font-medium text-xl'>{expanded ? '-' : '+'}</p>
                    : <p className='font-medium text-xl'>{expanded ? <BsChevronUp className='h-4 w-4 object-cover' /> : <BsChevronDown className='h-4 w-4 object-cover' />}</p>
                }
            </div>
            {
                expanded && (
                    <div className="description py-2 text-sm">{description}</div>
                )
            }
        </>
    )
}

export default Accordion;