import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogin } from "../service/AuthApi.js";
import Cookies from "js-cookie";
import { showErrorToast, showSuccessToast } from "../utils/showToast";
import SignupBanner from "../assets/auth/Signupbanner.png"
import { Helmet } from "react-helmet";
import "../styles/Signup.css"

const Login = () => {
    const navigate = useNavigate();
    const [creds, setCreds] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await UserLogin(creds);

        if (response.status === 201) {
            console.log(response.data);
            Cookies.set("token", response.data.token);
            Cookies.set("username", "/" + response.data.existingUser.username);
            showSuccessToast(response.data.message);
            navigate("/");
        }
    };



    return (
        <>

            <Helmet>
                <title>iHelp | Login</title>
                <meta
                    name="description"
                    content="Login and continue your journey with us."
                />
                <link rel="canonical" href="/" />
            </Helmet>

            <div className=" signup_main_parent">
                <div className="signup_subparent  flex flex-wrap justify-between md:mt-[5rem] mt-[3rem] px-10">
                    {/* <img
                        src={SignupBanner}
                        alt=""
                        className="md:w-[500px] object-contain hidden md:block"
                    /> */}

                    <div className="md:w-[50%]">
                        <p className="meta1">
                            Continue your journey with us !
                        </p>
                        <form className="signup_form">
                            {window.innerWidth > 430 ? (
                                <div class="mb-4">
                                    <label for="exampleInputEmail1" class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control font-poppins"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        autoFocus
                                        name="email"
                                        value={creds.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : (
                                <div class="mb-4">
                                    <label for="exampleInputEmail1" class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        class="form-control  font-poppins"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={creds.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div class="mb-4">
                                <label for="exampleInputPassword1" class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    class="form-control"
                                    id="exampleInputPassword1"
                                    name="password"
                                    value={creds.password}
                                    onChange={handleChange}
                                />
                            </div>



                            <div className="signup_btndiv">
                                <button
                                    type="submit"
                                    class="button2"
                                    onClick={handleSubmit}

                                >
                                    Login
                                </button>
                            </div>

                            {/*  <p className=" text-vio tracking-[0.1rem] font-mon font-[600] leading-[60px]  mt-[80px] text-[30px] ">Or continue with</p>

                            <div className='signup_social_iconsdiv flex gap-[1rem] mt-[20px] '>
                                <img src="https://i.ibb.co/dWNXKj2/g1.png" alt="" className='w-[40px] cursor-pointer' onClick={() => loginWithRedirect()} />
                                <img src="https://i.ibb.co/2NZZfmC/git1.png" alt="" className='w-[40px] cursor-pointer bg-white rounded-[50%]' onClick={() => loginWithRedirect()} />
                            </div> */}



                            <p className="text-white font-poppins text-[1.2rem] tracking-[0.1rem] mb-[40px] mt-[40px]">
                                Don't have an account ?{" "}
                                <span
                                    className="underline text-vio cursor-pointer"
                                    onClick={() => {
                                        navigate("/signup");
                                    }}
                                >
                                    Sign up
                                </span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
