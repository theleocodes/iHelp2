import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserSignup } from "../service/AuthApi.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSuccessToast } from "../../src/utils/showToast"
import SignupBanner from "../assets/auth/Signupbanner.png"
import { Helmet } from "react-helmet";
import "../styles/Signup.css"

const Signup = () => {
    const navigate = useNavigate();
    const [creds, setCreds] = useState({ name: "", email: "", password: "" });

    const handleChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await UserSignup(creds);

        if (response.status === 201) {


            showSuccessToast(response.data.message);
            navigate("/login");
        }
    };

    return (
        <>

            <Helmet>
                <title>iHelp | Signup</title>
                <meta
                className="meta1"
                    name="description"
                    content="Signup to start your journey with us."
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
                        <p className="meta1" >
                            Start your journey with us !
                        </p>
                        <form className="signup_form">
                            {window.innerWidth > 430 ? (
                                <div class="mb-4">
                                    <label
                                        for="exampleInputPassword1"
                                        class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        autoFocus
                                        name="name"
                                        value={creds.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            ) : (
                                <div class="mb-4">
                                    <label
                                        for="exampleInputPassword1"
                                        class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]"
                                    >
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        name="name"
                                        value={creds.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div class="mb-4">
                                <label
                                    for="exampleInputEmail1"
                                    class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]"
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    class="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    name="email"
                                    value={creds.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div class="mb-4">
                                <label
                                    for="exampleInputPassword1"
                                    class="text-white font-poppins text-[1.2rem] tracking-[0.1rem]"
                                >
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

                            <p className="text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                Already have an account ?{" "}
                                <span
                                    className="underline text-vio cursor-pointer"
                                    onClick={() => {
                                        navigate("/login");
                                    }}
                                >
                                    Log in
                                </span>
                            </p>

                            <div className="signup_btndiv">
                                <button
                                    type="submit"
                                    class="button2 "
                                    onClick={handleSubmit}
                                >
                                    Signup
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
