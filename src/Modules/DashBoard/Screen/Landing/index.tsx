import React from 'react';
import { AuthenticationAndDashboardModule, ContactUs, Data, Footer, From, HowItWorks, Introduction, LandingHeader, LandingNavBar, Pricing, Reports } from '@Modules';

function Landing() {


    return (

        // <div className="bg-primary h-100vh container-fluid" >
        //     <div className='d-flex justify-content-end p-3'>
        //         <Button color={'white'} text={'Login'} size={'md'} onClick={() => {
        //             goTo(ROUTES['auth-module'].login);
        //         }} />
        //     </div>
        //     <div className='d-flex justify-content-center align-items-center mt-sm-0 mt-7' >
        //         <h1 className='font-weight-bolder  text-white p-0 m-0'
        //             style={{
        //                 fontSize: isSmallScreen ? '58px' : '80px'
        //             }}
        //         >MOCK <b className='text-black'>EAZY</b></h1>
        //     </div>
        //     <div className="row align-items-center justify-content-center">
        //         <p className="text-center text-white "
        //             style={{
        //                 maxWidth: isSmallScreen ? '350px' : '700px'
        //             }}
        //         >
        //             Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
        //         </p>
        //     </div>
        //     <div className='d-flex align-items-center justify-content-center'>
        //         <Image
        //             className=""
        //             src={image.LOGIN_SIDE_IMAGE}
        //             height={'300px'}
        //             width={'300px'}
        //         />
        //     </div>
        // </div>
        <div>
            <div className="main-content">
                <LandingNavBar />
                <LandingHeader />
                <Introduction />
                <HowItWorks />
                <Reports />
                <Data />
                {/* <From /> */}
                <AuthenticationAndDashboardModule />
                <Pricing />
                <ContactUs />
                <Footer />
            </div>
        </div>
    )
}

export { Landing };
