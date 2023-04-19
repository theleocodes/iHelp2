import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import Trending from '../components/explorecomponents/Trending'
import TrendingDevPro from '../components/explorecomponents/TrendingDevPro'
import "../styles/Explore.css"
import { Link } from 'react-router-dom';



const Explore = () => {

    const [activebtn, setactivebtn] = useState(0);
    return (
        <>

            <Helmet>
                <title>iHelp | Explore</title>
                <meta
                    name="description"
                    content="Explore more tech."
                />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className="comm_main_parent ">
                <div className="comm_subparent mt-10">
                    <div className="comm_header md:w-[60%] text-center m-auto ">

                        <p className="comm_header_p1">
                            So what's trending <br /> today ?
                            {" "}
                        </p>


                    </div>

                    <div className='flex mt-20 gap-4 justify-center flex-wrap'>

                        <div className='flex flex-col gap-2 items-center'>
                            <button type="submit" className={`${activebtn !== 0 ? "btn-grad" : "btn-gradinactive"} font-poppins font-[600] tracking-[0.1rem]`}
                                onClick={() => {
                                    setactivebtn(0);
                                }}>Trending Developers
                            </button>

                            {activebtn === 0 && <hr className='bg-white w-[70px] h-[3px] border-white' />}
                        </div>
                        <div className='flex flex-col gap-2 items-center'>
                            <button type="submit" className={`${activebtn !== 1 ? "btn-grad" : "btn-gradinactive"} font-poppins font-[600] tracking-[0.1rem]`} onClick={() => {
                                console.log(activebtn);
                                setactivebtn(1);

                            }}>Trending projects
                            </button>
                            {activebtn === 1 && <hr className='bg-white w-[70px] h-[3px] border-white' />}
                        </div>

                        <div className='flex flex-col gap-2 items-center'>
      <Link to='/careerchoice' className={`${activebtn !== 1 ? "btn-grad" : "btn-gradinactive"} font-poppins font-[600] tracking-[0.1rem]`} onClick={() => {
          console.log(activebtn);
          setactivebtn(1);
      }}>Explore Your Career
      </Link>
      {activebtn === 1 && <hr className='bg-white w-[70px] h-[3px] border-white' />}
    </div>

                    </div>

                    <TrendingDevPro activebtn={activebtn} />






                    <Trending />

                </div>
            </div>


        </>
    )
}

export default Explore