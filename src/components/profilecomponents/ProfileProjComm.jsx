import React from 'react'
import ProjCommCard from '../ProjCommCard';
import styles from '../../styles/styles';
import { useStore } from '../../Store';
import useSWR from 'swr'
import { profilefetcher } from '../../utils/Fetchers';
import ProjCommModal from '../editprofilecomponents/ProjCommModal';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import "../../styles/Profile.css"



const ProfileCommunities = ({ type }) => {

    const setshowAddmodal = useStore(state => state.setshowAddmodal);
    const showAddmodal = useStore(state => state.showAddmodal);
    const setModalType = useStore(state => state.setModalType);
    const { username } = useParams();
    console.log(username)

    const { data: communities, isLoading } = useSWR(
        `${import.meta.env.VITE_SERVER_API}/profile/${username}/getuserscomm`,
        profilefetcher
    );

    console.log(communities)

    const { data: projects } = useSWR(
        `${import.meta.env.VITE_SERVER_API}/profile/${username}/getusersproject`,
        profilefetcher
    );


    return (
        <>

            {showAddmodal && <ProjCommModal type="project" />}

            <div className="pf_projcomm_mainparent mt-20 mb-10">
                <div className="pf_projcomm_subparent">

                    <div className="pf_projcomm_headerdiv flex flex-wrap items-center gap-y-[1rem] gap-x-[4rem] mb-8" >
                        <p className= "text">Projects</p>
                        {Cookies.get("username").replace("/", "") === username && <button type="button" class="profile-button" onClick={() => {

                            setshowAddmodal()
                            setModalType("project")
                            document.body.style.overflow = "hidden"
                            document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "none"

                        }} >
                            Add a project
                        </button>}


                    </div>

                    <div className="flex flex-wrap gap-5 md:justify-start justify-center">
                        {isLoading && <p className='text-white text-[22px] font-poppins tracking-[0.1rem]  '>Loading...</p>}
                        {projects && projects.map((data, index) => (
                            <div className="user" key={index}>
                                <ProjCommCard data={data} type="project" />
                            </div>
                        ))}
                    </div>

                    <div className="pf_projcomm_headerdiv flex flex-wrap items-center gap-y-[1rem] gap-x-[4rem] mb-8 mt-[4rem] " >
                        <p className="text">Communities</p>
                        {Cookies.get("username").replace("/", "") === username && <button type="button" class="profile-button" onClick={() => {

                            setshowAddmodal()
                            setModalType("community")
                            document.body.style.overflow = "hidden"
                            document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "none"

                        }}>
                            Add your community
                        </button>}

                    </div>

                    <div className="flex flex-wrap gap-5 md:justify-start justify-center">
                        {isLoading && <p className='text-white text-[22px] font-poppins tracking-[0.1rem]  '>Loading...</p>}
                        {communities && communities.map((data, index) => (
                            <div className="" key={index}>
                                <ProjCommCard data={data} type="communities" />
                            </div>
                        ))}
                    </div>


                </div>

            </div>

        </>
    )
}

export default ProfileCommunities