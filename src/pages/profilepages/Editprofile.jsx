import React, { useEffect, useState } from "react";
import { getUser, editUser } from "../../service/ProfileApi";
import ProfileProjComm from "../../components/profilecomponents/ProfileProjComm";
import ProfileTechSkills from "../../components/profilecomponents/ProfileTechSkills";
import { useNavigate } from "react-router-dom";
import { showSuccessToast } from "../../utils/showToast";
import styles from "../../styles/styles";
import { BsPencilSquare } from "react-icons/bs";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useStore } from "../../Store";
import WarningModal from "../../components/editprofilecomponents/WarningModal";

const Editprofile = () => {
    const [user, setuser] = useState();
    const { username } = useParams();

    const showWarningModal = useStore(state => state.showWarningModal);
    const setshowWarningModal = useStore(state => state.setshowWarningModal);

    const navigate = useNavigate();

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleImage = async (e) => {
        const base64 = await convertToBase64(e.target.files[0]);
        setuser({ ...user, [e.target.name]: base64 });
    };

    const getuser = async () => {
        const response = await getUser();
        console.log(response.data.username);
        setuser(response.data);
    };

    useEffect(() => {

        if (username !== Cookies.get("username").replace("/", ""))
            navigate(`${Cookies.get("username")}`);
        getuser();
    }, []);

    const handleuserchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        console.log(user);


        if (user.username !== Cookies.get("username").replace("/", "")) {
            document.body.style.overflow = "hidden";
            document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "none"
            setshowWarningModal();
        } else {
            const response = await editUser(user);

            if (response.status === 201) {
                showSuccessToast("Profile Updated Successfully");
                getuser();
            }
        }

    };


    const warningFunction = async () => {
        document.body.style.overflow = "auto";
        document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "auto"
        setshowWarningModal();
        const response = await editUser(user);
        if (response.status === 201) {
            showSuccessToast("Profile Updated Successfully");
            setTimeout(() => {
                Cookies.set("username", "/" + user.username);
                navigate(`/${user.username}`);
            }, 1200);
        }
    }


    return (
        <>

            {showWarningModal && <WarningModal heading={"Warning"} content={"Changing the username will update all your data with the current data that are in the input fields, and revert back to the profile page."} warningFunction={warningFunction} />}

            {user !== undefined && (
                <div className=" pf_mainparent  ">
                    <div className="pf_subparent">


                        {/* NAME AND DESCRIPTION */}
                        <div className="mt-20 flex md:flex-row flex-col gap-3 justify-between mb-10">
                            <div className="textdiv md:w-[50%] flex flex-col gap-4 ">
                                <div className="mb-4">
                                    <p className="font-poppins text-[22px] text-white mb-2">Full name</p>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.purpleheader} h-auto `}
                                        aria-describedby="Fullname"
                                        name="name"
                                        value={user.name}
                                        autoFocus
                                        onChange={handleuserchange}
                                    />
                                </div>


                                <div className="mb-4">
                                    <p className="font-poppins text-[22px] text-white mb-2">Username</p>
                                    <input
                                        type="text"
                                        className={`form-control ${styles.purpleheader} !text-[28px] h-auto `}
                                        aria-describedby="Username"
                                        name="username"
                                        value={user.username}
                                        onChange={handleuserchange}
                                    />
                                </div>

                                <div className="mb-4">
                                    <p className="font-poppins text-[22px] text-white mb-2">Bio</p>
                                    <textarea
                                        class="form-control text-white bg-transparent h-[200px] font-poppins text-[1.2rem] tracking-[0.1rem]"
                                        id="floatingTextarea"
                                        value={
                                            user.bio
                                        }
                                        name="bio"
                                        onChange={handleuserchange}
                                    ></textarea>
                                </div>


                            </div>

                            <div className="flex flex-col items-center relative ">
                                <img
                                    src={user.avatar}
                                    alt=""
                                    className="w-[250px] rounded-[50%] mb-1"
                                />


                                <input
                                    class="form-control font-poppins font-[600] mb-3 w-[10px] text-transparent absolute z-[-10]"
                                    type="file"
                                    id="editPicfile"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={handleImage}
                                    name="avatar"
                                />


                                {/* //* Edit button */}
                                <button
                                    className="text-white absolute top-[12rem] md:left-[0]  bg-[#28282b] flex items-center gap-2 justify-center px-3 py-1 text-[15px] font-poppins tracking-[0.05rem] rounded-[5px] editpicbtn "
                                    onClick={() => { document.getElementById("editPicfile").click() }}
                                >
                                    <BsPencilSquare className="" />
                                    <span>Edit</span>
                                </button>

                                <button
                                    className={`${styles.purplebtn} mb-3 `}
                                    onClick={handleSave}
                                >
                                    Save changes
                                </button>
                                <button
                                    className={`${styles.purplebtn} `}
                                    onClick={() => {
                                        navigate(`${Cookies.get("username")}`);
                                    }}
                                >
                                    Back to profile
                                </button>
                            </div>
                        </div>

                        <div className="ep_socials_div mb-[5rem]">
                            <p className={`${styles.purpleheader} mb-5 ep_linksheader`}>Links</p>

                            <div className="flex flex-wrap gap-3">
                                <input
                                    type="text"
                                    className="form-control w-[45%] text-[24px] font-poppins"
                                    aria-describedby="Fullname"
                                    onChange={handleuserchange}
                                    placeholder="Github link"
                                    name="gh_link"
                                    value={user.gh_link}
                                />

                                <input
                                    type="text"
                                    className="form-control w-[45%] text-[24px] font-poppins"
                                    aria-describedby="Fullname"
                                    onChange={handleuserchange}
                                    placeholder="Twitter link"
                                    name="tw_link"
                                    value={user.tw_link}
                                />

                                <input
                                    type="text"
                                    className="form-control w-[45%] text-[24px] font-poppins"
                                    aria-describedby="Fullname"
                                    onChange={handleuserchange}
                                    placeholder="Linkedin link"
                                    name="li_link"
                                    value={user.li_link}
                                />

                                <input
                                    type="text"
                                    className="form-control w-[45%] text-[24px] font-poppins"
                                    aria-describedby="Fullname"
                                    onChange={handleuserchange}
                                    placeholder="Portfolio link"
                                    name="pf_link"
                                    value={user.pf_link}
                                />
                            </div>
                        </div>

                        {/* TECH STACK */}
                        <div className="pf_projdiv">
                            <ProfileTechSkills type="edit" />
                        </div>

                        {/* PROJECTS AND COMMUNITIES */}
                        <div className="pf_projdiv">
                            <ProfileProjComm type="edit" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Editprofile;
