import SignupForm from "../components/Forms/SignupForm";


const Signup = () => {
    return (
        <div className="gradientBackground">
            <div className="formSection lg:container flex-1 p-5 lg:px-4 lg:pt-0 lg:pb-20 mt-[-25px] bg-white lg:mt-0 rounded-tl-3xl rounded-tr-3xl lg:rounded-none">
                <div className="formWrap md:w-6/12 m-auto">
                    <div className="loginTextWrap lg:mt-5 text-center">
                        <h1 className="font-bold text-[#333] my-10 text-2xl">Sign up</h1>
                    </div>
                    <div className="formBody m-auto">
                        <SignupForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;