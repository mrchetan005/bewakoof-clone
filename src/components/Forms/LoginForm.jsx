import { useDispatch, useSelector } from "react-redux";
import Input from "../Utils/Input";
import { useEffect, useState } from "react";
import { loginUser } from "../../store/asyncThunks/authAsyncThunk";
import DotsLoader from "../Loaders/DotsLoader";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '', password: '', appType: 'ecommerce'
    });
    const [errorData, setErrorData] = useState({
        email: '', password: ''
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated])

    const disabled = Object.values(errorData).join('') || Object.values(formData).some((val) => val === '');

    const onSubmit = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        dispatch(loginUser(formData));
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const checkErrors = (e) => {
        let { name, value } = e.target;
        if (!value) {
            value = `${name[0].toUpperCase() + name.slice(1)} is required`;
        } else if (name === 'email' && !validateEmail(value)) {
            value = 'Please Enter Valid Email';
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
        <form onSubmit={onSubmit} className="loginForm w-full relative">
            <div className="">
                <Input
                    value={formData?.email}
                    autoComplete={'off'}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={checkErrors}
                    type="email" name="email"
                    placeholder="Email"
                    errorData={errorData}
                />
                <Input
                    value={formData?.password}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={checkErrors}
                    type="password" name="password"
                    placeholder="Password"
                    errorData={errorData}
                />
                <button disabled={disabled} type="submit" className={`uppercase cursor-pointer lg:h-14 h-12 lg:text-xl w-full border-none outline-none flex justify-center items-center rounded-md text-white ${disabled ? 'bg-[#989898]' : 'bg-[#42a2a2]'}`}>{loading ? <DotsLoader /> : 'CONTINUE'}</button>
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

export default LoginForm;