import React, { useState } from "react";
import { addtech, deletetech } from "../../service/ProfileApi";
import { ReactComponent as Del } from "../../assets/workable/delete.svg";
import { showErrorToast, showSuccessToast } from "../../utils/showToast";
import useSWR, { useSWRConfig } from 'swr'
import { defaultfetcher, profilefetcher } from "../../utils/Fetchers";
import { useParams } from "react-router-dom";
import "../../styles/Profile.css"

const ProfileTechSkills = ({ type }) => {
    const [techs, settechs] = useState([]);
    const [techinput, settechinput] = useState("");
    const [techdel, settechdel] = useState([]);
    const { mutate } = useSWRConfig()
    const { username } = useParams();
    console.log(username);


    const { data: user, isLoading } = useSWR(
        `${import.meta.env.VITE_SERVER_API}/profile/user/${username}`,
        profilefetcher
    );

    console.log(user);

    const handleTechinput = (e) => {
        settechinput(e.target.value);
    };

    const handleAddtech = async (e) => {
        e.preventDefault();

        if (
            techinput.trim() === "" ||
            techinput.length < 2 ||
            techinput === null ||
            techinput === undefined ||
            techinput === " "
        ) {
            toast.error("Please enter valid tech");
            settechinput("");
            return;
        }

        techs.push(techinput);
        const response = await addtech(techs);

        if (response.status === 201) {
            mutate(`${import.meta.env.VITE_SERVER_API}/profile/${username}`,
                profilefetcher)
            showSuccessToast(response.data.message)
            settechinput("");
            settechs([]);
        }
    };

    const handleDeletetech = async (data) => {
        techdel.push(data);
        const response = await deletetech(techdel);

        if (response.status === 201) {
            mutate(`${import.meta.env.VITE_SERVER_API}/profile/${username}`,
                profilefetcher)
            settechdel([]);
            showSuccessToast(response.data.message)
        }
    };

    return (
        <>
            <div className="pf_techskills_mainparent">

                <div className="pf_techskills_subparent">
                    <p className="text" style={{ color: "f0ad4e"}}>
                        Skills
                    </p>

                    {isLoading && <p className='text-white text-[22px] font-poppins tracking-[0.1rem] text-center  '>Loading . . .</p>}

                    <div className="flex gap-3 flex-wrap md:w-[70%] md:justify-start justify-center ">

                        {/* //* Add skills sec */}

                        {type === "edit" && (
                            <div className="relative">
                                <input
                                    type="text"
                                    className="form-control text-[1.2rem] font-poppins tracking-[0.1rem] rounded-[5px]  "
                                    placeholder="Ex: React"
                                    name="techinput"
                                    value={techinput}
                                    onChange={handleTechinput}
                                />

                                <img
                                    src="https://i.ibb.co/QbtWbDR/Add-1.png"
                                    alt=""
                                    className="absolute top-[7px] right-[7px] cursor-pointer w-[25px]"
                                    onClick={(e) => {
                                        handleAddtech(e);
                                    }}
                                />
                            </div>
                        )}

                        {/* //* Skills */}

                        {user?.tech ? user?.tech?.map((data) => (
                            <div className="pf_techskills_techs bg-white px-[10px]  rounded-[5px] flex items-center h-[40px]">
                                <p className="text-black font-poppins text-[1.2rem] tracking-[0.1rem] mr-[5px]">
                                    {data}
                                </p>
                                {type === "edit" && (
                                    <Del
                                        className="w-[20px] cursor-pointer"
                                        onClick={() => {
                                            handleDeletetech(data);
                                        }}
                                    />
                                )}
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileTechSkills;
