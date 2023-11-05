import { useEffect, useState } from "react";
import Input from "../Utils/Input";
import { useDispatch, useSelector } from "react-redux";
import Portal from "../Portal";
import ChangePasswordForm from "./ChangePasswordForm";
import Popup from "../Utils/Popup";
import { updateInfo } from "../../store/asyncThunks/authAsyncThunk";
import DotsLoader from "../Loaders/DotsLoader";
import { resetStatus } from "../../store/slices/authSlice";

const validateMobile = (number) => {
    return !isNaN(number) && number.length === 10;
}

const MyProfileForm = () => {
    const { user, loading, status } = useSelector(state => state.auth);
    const [popupMessage, setPopupMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name, phone: user?.phone || ''
    })
    const [errorData, setErrorData] = useState({
        name: '', phone: ''
    })
    const disabled = Object.values(errorData).join('') || Object.values(formData).some((val) => val === '');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disabled) {
            dispatch(updateInfo(formData));
        }
    }

    useEffect(() => {
        if (status === 'success') {
            onClose();
            setPopupMessage('Changes Saved Successfully!');
            setTimeout(() => {
                dispatch(resetStatus());
                setPopupMessage('')
            }, 3000);
        }
    }, [user?.phone]);

    const checkErrors = (e) => {
        let { name, value } = e.target;
        if (!value) {
            value = `${name === 'phone' ? 'Mobile Number' : name[0].toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'phone' && !validateMobile(value)) {
            value = 'Please enter a valid mobile number';
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
    }

    // ! Password modal 
    const onOpen = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setIsOpen(true);
        document.body.style.overflowY = 'hidden';
    }

    const onClose = (e) => {
        e?.stopPropagation && e.stopPropagation();
        setIsOpen(false);
        document.body.style.overflowY = '';
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="profileForm md:max-w-[480px]">
                <div className="mx-4 md:mx-10">
                    <Input
                        label={'Full Name'}
                        value={formData?.name}
                        autoComplete={'off'}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="text" name="name"
                        placeholder="Name"
                        errorData={errorData}
                    />
                    <Input
                        label={'Mobile Number'}
                        autoComplete={'off'}
                        value={formData?.phone}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        maxLength={10}
                        type="tel" name="phone"
                        placeholder="Mobile Number"
                        errorData={errorData}
                    />
                    <Input
                        label={'Email Id'}
                        defaultValue={user?.email}
                        disabled
                        type="email" name="email"
                        placeholder="Email Id"
                    />
                    <Input
                        label={'Password'}
                        defaultValue={'******'}
                        type="password" name="password"
                        placeholder="Password"
                        disabled
                    />
                    <div onClick={onOpen} className="text-[#51cccc] opacity-95 cursor-pointer mb-6">
                        <span>Change Password</span>
                        {
                            isOpen &&
                            <Portal onClose={onClose}>
                                <ChangePasswordForm onClose={onClose} setPopupMessage={setPopupMessage} />
                            </Portal>
                        }
                    </div>

                    <div className="gender">
                        <span className="text-xs opacity-60">Gender</span>
                        <div className=" flex w-max mt-2 mb-5 font-semibold text-sm">
                            <div>
                                <input type="radio" className="opacity-0 w-0 cursor-pointer peer" id="male" name="gender" />
                                <label className="cursor-pointer rounded-tl rounded-bl peer-checked:bg-[#ffd835] px-5 py-1 border border-r-0 border-[#1818188a] " htmlFor="male">Male</label>
                            </div>
                            <div>
                                <input type="radio" className="opacity-0 w-0 cursor-pointer peer" id="female" name="gender" />
                                <label className="cursor-pointer rounded-tr rounded-br peer-checked:bg-[#ffd835] border border-[#1818188a] px-5 py-1" htmlFor="female">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="updatedCheckbox my-10 pb-10 md:pb-0 text-sm font-medium flex items-center">
                        <input className="cursor-pointer accent-[#51cccc]" type="checkbox" id="updates" />
                        <label htmlFor="updates" className="cursor-pointer pl-2">I want to receive order updates on Whatsapp</label>
                    </div>
                </div>
                <button disabled={disabled} className={`saveChanges md:mx-10 fixed h-14 md:static bottom-0 w-full md:w-52 py-5 px-10 md:mb-5 text-white flex justify-center items-center  text-sm font-semibold ${disabled ? 'bg-[#989898] !cursor-no-drop' : 'bg-[#51cccc]'}`}>{loading ? <DotsLoader /> : 'SAVE CHANGES'}</button>
            </form>
            {
                <Popup message={popupMessage} />
            }
        </>
    )
}

export default MyProfileForm;