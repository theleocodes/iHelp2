import React from "react";
import ProfileProjComm from "../../components/profilecomponents/ProfileProjComm";
import ProfileTechSkills from "../../components/profilecomponents/ProfileTechSkills";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Gh } from "../../assets/socials/gh.svg";
import { ReactComponent as Tw } from "../../assets/socials/tw.svg";
import { ReactComponent as Li } from "../../assets/socials/li.svg";
import { ReactComponent as Pf } from "../../assets/socials/pf.svg";
import styles from "../../styles/styles";
import useSWR from 'swr'
import { profilefetcher, defaultfetcher } from "../../utils/Fetchers";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { Helmet } from "react-helmet";
import "../../styles/Profile.css"


const Profile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    console.log(username);

    const { data: user, isLoading } = useSWR(
        `${import.meta.env.VITE_SERVER_API}/profile/user/${username}`,
        defaultfetcher
    );



    return (
        <>

            <Helmet>
                <title>iHelp | Profile</title>
                <meta
                    name="description"
                    content="Welcome to your profile, add your projects, communities and skills to get started."
                />
                <link rel="canonical" href="/" />
            </Helmet>


            {isLoading && <p className='text-white text-[22px] font-poppins tracking-[0.1rem] text-center  '>Loading . . .</p>}
            {user !== undefined && (
                <div className="">
                    <div className=" pf_mainparent">
                        <div className="pf_subparent mt-[5rem] ">


                            <div className="pf_headerdiv flex justify-between md:flex-row flex-col md:items-start items-center md:gap-0 gap-5">

                                {/* NAME AND DESCRIPTION */}
                                <div className="profile_textdiv md:w-[60%] ">
                                    <div className="namediv">
                                        <h1 className= "username" >
                                            {user.name}
                                            
                                        </h1>
                                    </div>

                                    <div className="biodiv">
                                        <p className="text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                            {user.bio ||
                                                `Hello there i am ${user.name.split(" ")[0]
                                                }, i love tech, communities and collaborations. Glad to meet you all 🚀`}{" "}
                                        </p>


                                        {/* Socials div */}

                                        <div className="pf_socialdiv flex gap-3 mt-3 justify-center md:justify-start ">
                                            {user.gh_link && (
                                                <a href={user.gh_link}>
                                                    <Gh
                                                        className="pf_socialicons"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </a>
                                            )}

                                            {user.tw_link && (
                                                <a href={user.tw_link}>
                                                    <Tw
                                                        className="pf_socialicons"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </a>
                                            )}

                                            {user.li_link && (
                                                <a href={user.li_link}>
                                                    <Li
                                                        className="pf_socialicons"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </a>
                                            )}

                                            {user.pf_link && (
                                                <a href={user.pf_link}>
                                                    <Pf
                                                        className="pf_socialicons"
                                                        style={{ borderRadius: "50%" }}
                                                    />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>


                                {/* Profile pic, edit btn */}
                                <div className="imgdiv flex flex-col gap-3">
                                    <img
                                        src={user.avatar}
                                        alt=""
                                        className="rounded-[50%] w-[250px]"
                                    />
                                    {
                                        Cookies.get("username").replace("/", "") === user.username && <button
                                            className="edit"
                                            onClick={() => {
                                                navigate(`${Cookies.get("username")}/editprofile`);
                                            }}
                                        >
                                            Edit profile
                                        </button>
                                    }
                                </div>
                            </div>

                            {/* TECH STACK */}
                            <div className="pf_projdiv mt-[3rem]">
                                <ProfileTechSkills />
                            </div>

                            {/* PROJECTS AND COMMUNITIES */}
                            <div className="pf_projdiv">
                                <ProfileProjComm type="profile" />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
