import React from 'react'
import ProjCommCard from '../components/ProjCommCard';
import useSWR from 'swr'
import { Helmet } from 'react-helmet';



const fetcher = (...args) => fetch(...args).then(res => res.json())
const Projects = () => {
    const { data: projects, error, isLoading } = useSWR(`${import.meta.env.VITE_SERVER_API}/data/getallprojects`, fetcher)

    return (
        <>
            <Helmet>
                <title>TekHub | Projects</title>
                <meta
                    name="description"
                    content="Here are some of the best opensource projects."
                />
                <link rel="canonical" href="/" />
            </Helmet>

            <div className="comm_main_parent ">
                <div className="comm_subparent mt-10">
                    <div className="comm_header md:w-[60%] text-center m-auto ">

                        <p className="comm_header_p1 text-vio text-[60px] tracking-[0.1rem] font-mon font-[600] leading-[60px] mb-10">
                            More projects, more fun !
                            {" "}
                        </p>

                        <div >
                            <p className="comm_header_p2 text-white font-poppins text-[1.2rem] tracking-[0.1rem]">
                                Check out, contribute, collaborate some of the best project ideas from around the world.
                            </p>
                        </div>


                    </div>


                    <div className="comm_carddiv  mt-20 mb-5 flex flex-wrap md:justify-start justify-center gap-5">
                        {isLoading && <p className='text-white text-[22px] font-poppins tracking-[0.1rem]  '>Loading...</p>}
                        {projects ? projects.map((data) => (
                            <div className="">
                                <ProjCommCard data={data} type="project" />
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>


        </>
    )
}

export default Projects