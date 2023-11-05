import { useDispatch, useSelector } from "react-redux";
import Input from "../Utils/Input";
import { useEffect, useState } from "react";
import { signupUser } from "../../store/asyncThunks/authAsyncThunk";
import DotsLoader from "../Loaders/DotsLoader";
import { useNavigate } from "react-router-dom";

const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", appType: "ecommerce",
    });
    const [errorData, setErrorData] = useState({
        name: "", email: "", password: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { authenticated, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (authenticated) {
            navigate('/');
        }
    }, [authenticated])

    const disabled = Object.values(errorData).join("") || Object.values(formData).some((val) => val === "");

    const onSubmit = (e) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        dispatch(signupUser(formData));
    }

    const checkErrors = (e) => {
        let { name, value } = e.target;
        if (!value) {
            value = `${name[0].toUpperCase() + name.slice(1)} is required`;
        } else if (name === "email" && !validateEmail(value)) {
            value = "Please Enter Valid Email";
        } else {
            value = "";
        }

        setErrorData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onFocus = (e) => {
        const { name } = e.target;
        setErrorData((prev) => ({ ...prev, [name]: "" }));
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form
            onSubmit={onSubmit}
            className="SignupForm w-full relative h-screen md:h-full"
        >
            <div className="">
                <Input
                    label="Full Name"
                    value={formData?.name}
                    autoComplete={"off"}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={checkErrors}
                    type="text"
                    name="name"
                    placeholder="Enter Your Full Name..."
                    errorData={errorData}
                />
                <Input
                    label="Email"
                    value={formData?.email}
                    autoComplete={"off"}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={checkErrors}
                    type="email"
                    name="email"
                    placeholder="Enter Your Email..."
                    errorData={errorData}
                />
                <Input
                    label="Password"
                    value={formData?.password}
                    onChange={onInputChange}
                    onFocus={onFocus}
                    onBlur={checkErrors}
                    type="password"
                    name="password"
                    placeholder="Enter Your Password..."
                    errorData={errorData}
                />
                <button
                    disabled={disabled}
                    type="submit"
                    className={`uppercase cursor-pointer lg:h-14 h-12 lg:text-xl w-full border-none outline-none flex justify-center items-center rounded-md text-white ${disabled ? "bg-[#989898]" : "bg-[#42a2a2]"
                        }`}
                >
                    {loading ? <DotsLoader /> : "CONTINUE"}
                </button>
            </div>
            {error && (
                <p className=" text-sm absolute font-medium bg-white flex items-center gap-2 w-full -top-9 left-0 border shadow-sm px-2 py-1 lg:container m-auto">
                    <span className="bg-red-600 text-white flex items-center justify-center rounded-full w-5 h-5">
                        !
                    </span>
                    <span>{error}</span>
                </p>
            )}
        </form>
    );
};

export default SignupForm;
