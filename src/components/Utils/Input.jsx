/* eslint-disable react/prop-types */


const Input = ({ errorData, label, ...inputProps }) => {
    return (
        <div className="flex-1">
            {label &&
                <label htmlFor={inputProps?.name} className="text-xs font-medium opacity-60 block mb-2">{label}</label>
            }
            <div className="inputWrap mb-3">
                <input id={inputProps?.name} {...inputProps} className={`border text-black h-12 lg:h-14 text-sm lg:text-base font-bold rounded-md p-1 w-full pl-3 outline-none ${errorData?.[inputProps.name] ? 'border-[#d24141]' : 'border-[#979797]'} ${inputProps?.disabled ? 'opacity-50 cursor-no-drop' : ''}`} />

                <div className="msgs text-xs lg:text-sm font-medium p-1 w-full opacity-90 whitespace-nowrap">
                    {errorData?.[inputProps.name] && <p className="error text-[#db3236]">{errorData?.[inputProps.name]}</p>}
                </div>
            </div>
        </div>
    )
}

export default Input;