import { memo, useEffect, useState } from 'react'

const PincodeCheckForm = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState();

    const [pincodeDetails, setPincodeDetails] = useState(null);

    const validateZip = (zip) => {
        return (!isNaN(zip) && zip.length === 6);
    }

    const getPincodeDetails = (e) => {
        e?.preventDefault && e.preventDefault();
        if (!validateZip(value)) return;
        fetch(`https://api.postalpincode.in/pincode/${value}`).then(res => res.json()).then(data => {
            const postDetails = data?.[0]?.PostOffice?.[0];
            if (!postDetails) {
                setError('Enter a valid pincode');
            } else {
                setError('');
                setPincodeDetails(postDetails);
                window.localStorage.setItem('bewakoof_pincode_details', JSON.stringify(postDetails));
            }
        })
    }

    const checkErrors = (e) => {
        const { value } = e.target;
        setError(() => validateZip(value) ? '' : 'Enter a valid pincode');
    }

    const resetError = () => {
        setError('');
    }

    const resetPincodeDetails = () => {
        setPincodeDetails(null);
        window.localStorage.setItem('bewakoof_pincode_details', null);
    }

    useEffect(() => {
        const pincodeDetails = JSON.parse(window.localStorage.getItem('bewakoof_pincode_details'));
        setPincodeDetails(pincodeDetails);
    }, []);

    return (
        <>
            <div className="flex flex-col-reverse sm:flex-row justify-between">
                <div className="deliveryLocation font-bold py-2 text-xs flex flex-wrap items-center mb-2">
                    <span>Delivering in</span>
                    <span className="text-[#207bb4] px-1"> {pincodeDetails ? `${pincodeDetails?.Name}, ${pincodeDetails?.District} ${pincodeDetails?.Pincode}` : 'India'}</span>
                    <img className="w-4 h-4 m-1 mt-0 rounded-full object-cover" src="/assets/icons/india-flag.png" alt="" />
                </div>
                {pincodeDetails && <button onClick={resetPincodeDetails} className="checkBtn text-[#207bb4] text-xs font-bold sm:px-3 my-2 self-end sm:self-start">CHANGE</button>}
            </div>
            {
                pincodeDetails
                    ? (<div className="flex items-center gap-2">
                        <img className='w-5 h-5 object-contain' src="/assets/icons/cod-icon.webp" alt="" />
                        <p className="text-xs font-bold">
                            Cash on Delivery is {pincodeDetails?.DeliveryStatus === 'Non-Delivery' ? 'not ' : ''} available.
                        </p>
                    </div>)
                    : (<form onSubmit={getPincodeDetails} className={`flex items-center rounded-md p-[2px] border focus-within:border-[#fdd835] border-[#0000005a] ${error ? 'border border-[#db3236]' : ''}`}>
                        <input
                            type="text"
                            value={value}
                            onBlur={checkErrors}
                            onFocus={resetError}
                            placeholder='Enter Pincode'
                            onChange={(e) => setValue(e.target.value)}
                            className={`flex-1 p-2 border-none outline-none text-xs font-semibold`}
                        />
                        <button className="checkBtn text-[#207bb4] text-xs font-semibold px-3">CHECK</button>
                    </form>)
            }
            {error && <p className="error text-xs py-2 text-[#db3236]">{error}</p>}
        </>
    )
}

export default memo(PincodeCheckForm);