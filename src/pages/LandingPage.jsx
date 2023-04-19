import React from 'react'
import CommunityBanner from '../components/landingcomponents/CommunityBanner'
import DeveloperBanner from '../components/landingcomponents/DeveloperBanner'
import About from './About.jsx'
import Footer from '../components/Footer'
// import Home from '../components/landingcomponents/Home'
import Home from '../components/landingcomponents/Home'
import ProjectsBanner from '../components/landingcomponents/ProjectsBanner'
import { Helmet } from 'react-helmet'
import "../styles/LandingPage.css"




const LandingPage = () => {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };


    return (
        <>

            <Helmet>
                <title>iHelp</title>
                <meta
                    name="description"
                    content="Welcome to iHelp."
                />
                <link rel="canonical" href="/" />
            </Helmet>


            <div className='HeroBannerDesktop_Parentdiv break-normal'>
                <Home />
                <DeveloperBanner />
                <CommunityBanner />
                <ProjectsBanner />
                <About />
                {/* <button className='scroll-to-top-btn' onClick={scrollToTop}>
                    Scroll to top
                </button> */}
                <Footer />
                    



            </div>
        </>
    )
}

export default LandingPage