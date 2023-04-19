import React, { useEffect, useRef, useState } from 'react'
import "../../styles/CommunityBanner.css";
import Carousel from "react-elastic-carousel";
import { ReactComponent as EddieFeat } from '../../assets/communitybanners/EddieHub_feat.svg';
import { ReactComponent as FourCFeat } from '../../assets/communitybanners/4c_feat.svg';
import { ReactComponent as WmdFeat } from '../../assets/communitybanners/wmd_feat.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 1 },
    { width: 768, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1 },
];


const CommunityBannerDesktop = () => {


    const carouselRef = useRef(null);
    const [autoPlay, setAutoPlay] = useState(true);
    let resetTimeout;

    const handleMouse1 = () => {
        clearTimeout(resetTimeout);
        setAutoPlay(false);
    };

    const handleMouse2 = () => {
        setAutoPlay(true);
    };

    const handleEnd = () => {
        clearTimeout(resetTimeout);

        resetTimeout = setTimeout(() => {
            carouselRef?.current?.goTo(0);
        }, 2500);
    };

    const navigate = useNavigate();


    return (
        <>
            <div className=" container cb_main_parent">
                <div className="cb_subparent1">
                    <div className="cb_leftdiv">

                        <Carousel
                            ref={carouselRef}
                            breakPoints={breakPoints}
                            enableAutoPlay={autoPlay}
                            isRTL={false}
                            showButton={false}
                            showArrows={false}
                            pagination={false}
                            autoPlaySpeed={2000}
                            onNextEnd={handleEnd}

                        >
                            {/* <EddieFeat className="Feat_img" />
                            <FourCFeat className="Feat_img" />
                            <WmdFeat className="Feat_img" /> */}

                        </Carousel>

                    </div>

                    <div className="cb_rightdiv">
                        <p className='cb_rightdiv_p1'>Being a part of a community can be a lot of fun </p>



                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                            <p className='cb_rightdiv_p2'>Discover and join awesome communities from around the globe, or create your own community for others to join!</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CommunityBannerDesktop