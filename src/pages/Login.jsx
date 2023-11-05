/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const goBack = () => {
            navigate('../');
        }
        window.addEventListener('popstate', goBack);

        return () => {
            window.removeEventListener('popstate', goBack);
        };
    }, []);

    return (
        <div className="loginWrapper flex flex-col lg:flex-row">
            <div className="welcomeSection gradientBackground hidden lg:flex px-4 flex-col justify-between pb-8 flex-1">
                <div>
                    <h2 className="font-bold text-black mt-[6%] ml-[5%] text-3xl">Welcome to the world of Bewakoof<span className="trademark text-sm relative top-[-1.2em]">®</span>!</h2>
                </div>
                <div className="loginWelcomeImage px-8 pt-8">
                    <img src="/assets/images/authentication/login.webp" alt="" />
                </div>
            </div>
            <div className="mobileImage lg:hidden">
                <img className="w-full object-cover" src="/assets/images/authentication/login-mobile.webp" alt="" />
            </div>
            <div className="formSection flex-1 p-5 lg:px-4 lg:py-0 mt-[-25px] bg-white lg:mt-0 rounded-tl-3xl rounded-tr-3xl lg:rounded-none">
                <div className="formWrap">
                    <div className="loginTextWrap hidden lg:block lg:mt-5 text-center">
                        <h1 className="font-bold text-[#333] mt-[6%] ml-[5%] text-2xl">Log in / Sign up</h1>
                        <p className="loginText text-lg text-[#a0a0a0] mb-16 font-medium">for Latest trends, exciting offers and everything Bewakoof<span className="trademark text-[9px] relative top-[-1.2em]">®</span>!</p>
                    </div>
                    <p className="loginTextMobile lg:hidden text-xs text-[#a0a0a0] mb-9 font-medium">Join us now to be a part of Bewakoof<span className="trademark text-[9px] relative top-[-1.2em]">®</span> family!</p>
                    <div className="formBody md:w-3/5 m-auto">
                        <LoginForm />
                        <div className="socialLogin mt-10">
                            <div className="connectWithTitle relative mb-10">
                                <hr className="lg:w-[110%] relative lg:left-[-4.5%] h-[1px] bg-[#cecece]" />
                                <span className="socialHeading absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-2 text-[#979797]">OR</span>
                            </div>
                            <div className="connectWithWrapper">
                                <Link to={'/signup'}>
                                    <button className="webEmailLogin mb-5 h-10 rounded-md border border-[#aeaeae] text-[#5c5c5c] font-bold flex items-center justify-center w-full">
                                        <img className="w-5 mr-3 object-cover " src="/assets/images/authentication/email.webp" alt="" />
                                        Sign Up
                                    </button>
                                </Link>
                                <div className="flex gap-3">
                                    <button className="webEmailLogin cursor-no-drop flex-1 mb-5 h-10 rounded-md border border-[#aeaeae] text-[#5c5c5c] font-bold flex items-center justify-center w-full">
                                        <img className="w-5 mr-3 object-cover " src="/assets/images/authentication/google.webp" alt="" />
                                        GOOGLE
                                    </button>
                                    <button className="webEmailLogin cursor-no-drop flex-1 mb-5 h-10 rounded-md border border-[#aeaeae] text-[#5c5c5c] font-bold flex items-center justify-center w-full">
                                        <img className="w-5 mr-3 object-cover " src="/assets/images/authentication/fb.webp" alt="" />
                                        FACEBOOK
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="termsAndConditions text-xs my-4 text-[#a0a0a0]">
                            By creating an account or logging in, you agree with Bewakoof<span className="trademark text-[6px] relative top-[-1.2em] m-[2px]">®</span>'s <a className="font-bold text-[#42a2a2]" href="https://www.bewakoof.com/terms-and-conditions" rel={'noreferrer'} target="_blank">Terms and Conditions </a> and <a className="font-bold text-[#42a2a2]" href="https://www.bewakoof.com/privacy-policy-and-disclaimer" rel={'noreferrer'} target="_blank">Privacy Policy</a>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;