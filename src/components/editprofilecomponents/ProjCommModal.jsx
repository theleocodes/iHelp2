import React, { useState } from 'react'
import "../../styles/ProjCommModal.css"
import { addProject, addUsersCommunity } from "../../service/ProfileApi";
import { validate } from "../../utils/validate";
import { showSuccessToast } from "../../utils/showToast";
import { useStore } from '../../Store';
import useSWRMutation from 'swr/mutation'
import Cookies from "js-cookie";
import { useParams } from 'react-router-dom';


async function updateUserCommunity(url) {
    await fetch(url, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        }
    })
}

const ProjCommModal = ({ type }) => {
    const setshowAddmodal = useStore(state => state.setshowAddmodal);
    const modalType = useStore(state => state.modalType);
    const { username } = useParams();
    const { trigger } = useSWRMutation(`${import.meta.env.VITE_SERVER_API}/profile/${username}/getuserscomm`, updateUserCommunity)

    const [data, setdata] = useState({
        name: "",
        desc: "",
        pic: "",
        gh_link: "",
        yt_link: "",
        pj_link: "",
        tw_link: "",
        dc_link: "",
    });

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
        setdata({ ...data, [e.target.name]: base64 });
    };

    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const dataUpload = async (e) => {
        e.preventDefault();

        if (modalType === "project") {

            if (validate(data)) {
                const response = await addProject(data);

                if (response.status === 201) {
                    showSuccessToast("Project added successfully")
                    setdata({
                        name: "",
                        desc: "",
                        pic: "",
                        gh_link: "",
                        yt_link: "",
                        pj_link: "",
                    });
                    setshowAddmodal()
                    document.body.style.overflow = "auto"
                    document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "auto"
                }
            }

        }

        if (modalType === "community") {

            if (validate(data)) {
                const response = await addUsersCommunity(data);

                if (response.status === 201) {
                    showSuccessToast("Community added successfully")
                    trigger();
                    setdata({
                        name: "",
                        desc: "",
                        pic: "",
                        gh_link: "",
                        yt_link: "",
                        pj_link: "",
                        tw_link: "",
                        dc_link: "",
                    });
                    setshowAddmodal()
                    document.body.style.overflow = "auto"
                    document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "auto"
                }
            }

        }
    };


    return (
        <div className='pcmodal_main w-[102vw] fixed z-[99999999] h-[102vh]  flex justify-center items-center'>
            <div className='pcmodal_sub bg-white rounded-[12px] h-[600px] overflow-y-auto relative  w-auto px-[15px] ' id='pcmodal_sub'>

                <button className='font-mon absolute font-[600] right-3 top-3' onClick={() => {
                    setshowAddmodal()
                    document.body.style.overflow = "auto"
                    document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "auto"

                }}>X</button>

                <div className="modal-header mt-[10px]">
                    {modalType === "project" ? (
                        <h1 className="text-vio font-mon font-[600] text-[40px] tracking-[0.1rem] mb-[40px] " >
                            Add a project
                        </h1>
                    ) : (
                        <h1 className="text-vio font-mon font-[600] text-[40px] tracking-[0.1rem] mb-[40px]" >
                            Add your community
                        </h1>
                    )}

                </div>

                <div >
                    <div className=" pcmodal_body flex gap-[2rem] items-center">
                        <div className='flex flex-col gap-4'>
                            <div>
                                <label for="nameofproject" className="form-label pcmodal_input_label">
                                    {modalType === "project" ? "Project name" : "Community name"}
                                </label>
                                <input
                                    autoFocus
                                    type="text" required
                                    className="form-control pcmodal_input"
                                    id="nameofproject"
                                    aria-describedby="emailHelp"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label
                                    for="floatingTextarea "
                                    className="pcmodal_input_label"

                                >
                                    {modalType === "project"
                                        ? "Project description"
                                        : "Community description"}
                                </label>
                                <textarea
                                    className="form-control ap_textarea"
                                    id="floatingTextarea"
                                    name="desc"
                                    value={data.desc}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label for="nameofproject" className="form-label pcmodal_input_label ">
                                    GitHub link
                                </label>
                                <input
                                    type="text" required
                                    className="form-control pcmodal_input"
                                    id="nameofproject"
                                    aria-describedby="emailHelp"
                                    name="gh_link"
                                    value={data.gh_link}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label for="nameofproject" className="form-label pcmodal_input_label">
                                    {modalType === "project" ? "Deployed link" : "Community website"}{" "}
                                </label>
                                <input
                                    type="text" required
                                    className="form-control pcmodal_input"
                                    id="nameofproject"
                                    aria-describedby="emailHelp"
                                    name="pj_link"
                                    value={data.pj_link}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label for="nameofproject" className="form-label pcmodal_input_label">
                                    Youtube link
                                </label>
                                <input
                                    type="text" required
                                    className="form-control pcmodal_input"
                                    id="nameofproject"
                                    aria-describedby="emailHelp"
                                    name="yt_link"
                                    value={data.yt_link}
                                    onChange={handleChange}
                                />
                            </div>
                            {modalType !== "project" && (
                                <>
                                    <div>
                                        <label
                                            for="nameofproject"
                                            className="form-label pcmodal_input_label"
                                        >
                                            Discord link
                                        </label>
                                        <input
                                            type="text" required
                                            className="form-control pcmodal_input"
                                            id="nameofproject"
                                            aria-describedby="emailHelp"
                                            name="dc_link"
                                            value={data.dc_link}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            for="nameofproject"
                                            className="form-label pcmodal_input_label"
                                        >
                                            Twitter link
                                        </label>
                                        <input
                                            type="text" required
                                            className="form-control pcmodal_input"
                                            id="nameofproject"
                                            aria-describedby="emailHelp"
                                            name="tw_link"
                                            value={data.tw_link}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="ap_img_inptdiv flex flex-col items-center gap-3">
                            <img
                                src={data.pic || "https://i.ibb.co/3zFTCwZ/1.png"}
                                alt="" className='w-[220px] h-[220px] object-cover rounded-[12px]'
                            />
                            <input
                                type="file"
                                className="ap_input_file w-[250px] font-poppins"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImage}
                                name="pic"
                            />
                        </div>
                    </div>


                </div>
                <div className="flex mt-5 mb-5 justify-center items-center ">
                    <button
                        type="button"
                        className="btn font-mon text-[22px] font-[600] bg-vio hover:bg-vio "


                        onClick={(e) => {
                            dataUpload(e);
                        }}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjCommModal