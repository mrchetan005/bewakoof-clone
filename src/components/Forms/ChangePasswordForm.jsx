/* eslint-disable react/prop-types */

import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Input from "../Utils/Input";
import { useEffect, useState } from "react";
import DotsLoader from "../Loaders/DotsLoader";
import { updatePassword } from "../../store/asyncThunks/authAsyncThunk";
import { resetStatus } from "../../store/slices/authSlice";

const ChangePasswordModal = ({ onClose, setPopupMessage }) => {
    const { user, loading, error, status, token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'success') {
            onClose();
            setPopupMessage('Password Changes Successfully!');
            setTimeout(() => {
                dispatch(resetStatus());
                setPopupMessage('')
            }, 3000);
        }
    }, [token]);

    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    }
    const [formData, setFormData] = useState({
        passwordCurrent: '', password: '', confirmPassword: ''
    });
    const [errorData, setErrorData] = useState({
        email: '', password: '', confirmPassword: ''
    });

    const disabled = Object.values(errorData).join('') || Object.values(formData).some((val) => val === '');

    const onSubmit = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        const { confirmPassword: _, ...passwordData } = formData;
        dispatch(updatePassword(passwordData));
    }

    const checkErrors = (e) => {
        let { name, value } = e.target;
        if (!value) {
            value = `${name[0].toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'password' && value.length < 6) {
            value = `Password must contain at least 6 characters`;
        } else if (name === 'confirmPassword' && formData.password !== value) {
            value = `Password doesn't match`;
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

    return (
        <div className="w-full h-full bg-[#0000007a] flex" onClick={handleClick}>
            <form onSubmit={onSubmit} className="changePasswordBox bg-white  m-auto w-full h-full md:h-max md:w-96 relative">
                <div className="changePwdHead w-full p-9 pb-12 flex items-center justify-between">
                    <div className="font-semibold text-sm flex flex-col justify-center">
                        <h2>Change Password</h2>
                        <p className="text-xs opacity-60">{user?.email}</p>
                    </div>
                    <span onClick={onClose} className="cursor-pointer">
                        <AiOutlineClose className="w-5 h-5" />
                    </span>
                </div>
                <div className="changePwdContainer px-9 pb-20 flex flex-col gap-5">
                    <Input
                        label={'Old Password'}
                        value={formData?.passwordCurrent}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="password" name="passwordCurrent"
                        placeholder={'Enter your Old Password'}
                        errorData={errorData}
                    />

                    <Input
                        label={'New Password'}
                        value={formData?.password}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="password" name="password"
                        placeholder={'Enter your New Password'}
                        errorData={errorData}
                    />

                    <Input
                        label={'Confirm New Password'}
                        value={formData?.confirmPassword}
                        onChange={onInputChange}
                        onFocus={onFocus}
                        onBlur={checkErrors}
                        type="password" name="confirmPassword"
                        placeholder={'Confirm New Password'}
                        errorData={errorData}
                    />
                </div>
                <button className="submit absolute bottom-0 w-full py-3 px-10 h-11 flex items-center justify-center text-white font-semibold text-sm bg-[#51cccc]">{loading ? <DotsLoader /> : 'UPDATE PASSWORD'}</button>
                {error && (
                    <p className=" text-sm absolute font-medium rounded bg-white flex items-center gap-2 w-full md:-top-9 top-0 left-0 border shadow-sm px-2 py-1 lg:container m-auto">
                        <span className="bg-red-600 text-white flex items-center justify-center rounded-full shadow w-5 h-5">
                            !
                        </span>
                        <span>{error}</span>
                    </p>
                )}
            </form>

        </div>
    )
}

export default ChangePasswordModal;


