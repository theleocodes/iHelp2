import React, { useState } from 'react'
import "../../styles/ProjCommModal.css"
import { useStore } from '../../Store';


const WarningModal = ({ heading, content, warningFunction }) => {
    const setshowWarningModal = useStore(state => state.setshowWarningModal);


    return (
        <div className='pcmodal_main w-[102vw] fixed z-[99999999] h-[102vh]  flex justify-center items-center'>
            <div className='pcmodal_sub bg-white rounded-[12px] h-[400px] overflow-y-auto relative max-w-[650px]  w-auto px-[10px] ' id='pcmodal_sub'>

                <button className='font-mon absolute font-[600] right-3 top-3' onClick={() => {
                    setshowWarningModal()
                    document.body.style.overflow = "auto"
                    document.body.getElementsByClassName("navbar_main_parent")[0].style.pointerEvents = "auto"

                }}>X</button>

                <div className="modal-header mt-[10px]">
                    <h1 className="text-red-600 font-mon font-[600] text-[40px] tracking-[0.1rem] mb-[40px] " >
                        {heading}
                    </h1>

                </div>

                <div className='flex justify-center' >
                    <div className=" pcmodal_body flex  justify-center items-center ">
                        <p className='font-poppins text-[25px] text-center '>{content}</p>
                    </div>


                </div>
                <div className="flex mt-5 mb-5 justify-center items-center ">
                    <button
                        type="button"
                        className="btn font-mon text-[22px] font-[600] bg-vio hover:bg-vio "

                        onClick={warningFunction}

                    >
                        I understand, proceed
                    </button>
                </div>
            </div>
        </div>
    )
}

export default WarningModal