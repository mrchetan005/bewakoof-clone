/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import Input from "../Utils/Input";
import { useEffect, useState } from "react";
import DotsLoader from "../Loaders/DotsLoader";
import { updateInfo } from "../../store/asyncThunks/authAsyncThunk";
import { useNavigate, useParams } from "react-router-dom";


const AddressForm = ({ onClose }) => {
    const { loading, error, user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        name: user?.name, street: '', city: '', state: '', country: 'India', zipCode: ''
    });

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (params?.addressId) {
            const address = user?.address?.find(addr => addr._id === params?.addressId);
            setFormData(prev => ({ ...prev, ...address }));
        }
    }, [])

    const [errorData, setErrorData] = useState({
        email: '', password: ''
    });

    const getPincodeDetails = (zipCode) => {
        fetch(`https://api.postalpincode.in/pincode/${zipCode}`).then(res => res.json()).then(data => {
            const postDetails = data?.[0]?.PostOffice?.[0];
            if (!postDetails) {
                setErrorData(prev => ({
                    ...prev, zipCode: 'Please enter a valid pincode'
                }))
            } else {
                setFormData(prev => ({
                    ...prev, city: postDetails?.District, state: postDetails?.State
                }))
                setErrorData(prev => ({ ...prev, city: '', state: '', zipCode: '' }));
            }
        })
    }

    const dispatch = useDispatch();

    const disabled = Object.values(errorData).join('') || Object.values(formData).some((val) => val === '');

    const onSubmit = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        const { name, ...newAddress } = formData;
        const address = [...user.address];
        if (params?.addressId) {
            const index = address?.findIndex((addr) => addr._id === params?.addressId);
            if (index !== -1) {
                address?.splice(index, 1, newAddress);
            }
        } else {
            address?.push({ ...newAddress });
        }

        dispatch(updateInfo({ name, address }));
        if (params?.addressId) {
            navigate(-1);
        } else {
            onClose(e);
        }
    }

    const handleCancel = (e) => {
        if (params?.addressId) {
            navigate('../');
        } else {
            onClose(e);
        }
    }

    const validateZip = (zip) => {
        return (!isNaN(zip) && zip.length === 6);
    }

    const checkErrors = (e) => {
        let { name, value } = e.target;
        let validatedZip = name === 'zipCode' && validateZip(value);
        if (!value) {
            value = `${name[0].toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'zipCode' && !validatedZip) {
            value = 'Please Enter Valid PinCode';
        } else {
            value = '';
        }

        setErrorData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const onFocus = (e) => {
        const { name } = e.target;
        setErrorData(prev => ({ ...prev, [name]: '' }));
    }

    const onInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (name === 'zipCode' && validateZip(value)) {
            getPincodeDetails(value);
        }
    }

    return (
        <form onSubmit={onSubmit} className="loginForm relative w-full lg:w-11/12   pb-12 m-auto">
            <div className="max-w-[650px]">
                <div className="px-4 md:px-6">
                    <Input
                        label={'Country'}
                        value={formData?.country}
                        disabled
                        type="text" name="country"
                        placeholder="Country"
                    />
                    <Input
                        label={'Full Name'}
                        value={formData?.name}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        disabled
                        type="text" name="name"
                        placeholder="name"
                        errorData={errorData}
                    />
                    <Input
                        label={'Pincode/Postal Code/Zipcode'}
                        value={formData?.zipCode}
                        autoComplete={'off'}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="text" name="zipCode"
                        placeholder="Pincode/Postal Code/Zipcode"
                        errorData={errorData}
                    />
                    <div className="md:flex md:gap-4">
                        <Input
                            label={'City'}
                            autoComplete={'off'}
                            value={formData?.city}
                            onChange={onInputChange}
                            onFocus={onFocus}
                            onBlur={checkErrors}
                            type="text" name="city"
                            placeholder="City"
                            errorData={errorData}
                        />
                        <Input
                            label={'State'}
                            value={formData?.state}
                            autoComplete={'off'}
                            onChange={onInputChange}
                            onFocus={onFocus}
                            onBlur={checkErrors}
                            type="text" name="state"
                            placeholder="State"
                            errorData={errorData}
                        />
                    </div>
                    <Input
                        label={'Flat no/Building, Street name'}
                        value={formData?.street}
                        autoComplete={'off'}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="text" name="street"
                        placeholder="Flat no/Building, Street name"
                        errorData={errorData}
                    />
                    <Input
                        label={'Area/Locality (Optional)'}
                        type="text" name="area"
                        autoComplete={'off'}
                        placeholder="Area/Locality (Optional)"
                    />
                    <Input
                        label={'Landmark (Optional)'}
                        type="text" name="landmark"
                        autoComplete={'off'}
                        placeholder="Landmark (Optional)"
                    />
                </div>
                <div className="flex gap-6 md:w-4/5 m-auto mt-10 my-2">
                    <button disabled={disabled} type="submit" className={`submit fixed md:static md:z-0 z-50 bottom-0 uppercase cursor-pointer lg:h-14 h-14 lg:text-xl w-full flex-1 border-none outline-none flex justify-center items-center md:rounded-md text-white ${disabled ? 'bg-[#989898] !cursor-no-drop' : 'bg-[#42a2a2]'}`}>{loading ? <DotsLoader /> : 'SAVE ADDRESS'}</button>
                    <button onClick={handleCancel} className="hidden md:flex border border-[#51cccc] text-[#51cccc] rounded-md justify-center items-center lg:text-xl flex-1">CANCEL</button>
                </div>
            </div>

            {error && (
                <p className=" text-sm absolute font-medium rounded bg-white flex items-center gap-2 w-full -top-9 left-0 border shadow-sm px-2 py-1 lg:container m-auto">
                    <span className="bg-red-600 text-white flex items-center justify-center rounded-full shadow w-5 h-5">
                        !
                    </span>
                    <span>{error}</span>
                </p>
            )}
        </form>
    )
}

export default AddressForm;