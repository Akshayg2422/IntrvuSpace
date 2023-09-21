import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4 } from '@Modules'

function Data() {

    const [data, setData] = useState('')
    const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


    return (
        
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="features-3 mt-n10 pt-9">
                <div className="container">
                    <div className="row pt-10">
                        <div className="col-lg-6">
                            <span className="mb-2">
                                <div className='row d-flex align-items-center pb-2'>
                                    <span><img className={'mt--1 ml-3'} src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} /></span>
                                    <span><h3 className="text-primary ml-3">Key Features</h3></span>
                                </div>
                            </span>
                            <h2 className={'display-4 text-black font-weight-bolder'}>Multiple Interview practices </h2>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-lg-4 mb-lg-0 mb-4">

                            <a href="javascript:;">
                                <div className="card card-background mb-4">
                                    <h2 className={'text-center text-black font-weight-bolder mt-4 text-decoration-underline-hover'}>INTERVIEW BY EXPERIENCE</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab1Image}
                                            width={"100%"}
                                            height={"100%"}
                                            style={{ borderRadius: '20px' }}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Your Expertise, Your Advantage</h4> */}
                                        <p className={'custom-text-color'}>
                                            The app will present you with a series of interview questions carefully tailored to match your expertise level.
                                        </p>
                                    </div>
                                </div>
                            </a>


                            <a href="javascript:;">
                                <div className="card card-background">
                                    <h2 className={'text-center text-black font-weight-bolder text-decoration-underline-hover mt-4'}>PERSONALIZED INTERVIEW</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab4Image}
                                            width={"100%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Co-working Spaces</h4> */}
                                        <p className={'custom-text-color'}>If you choose "Interview by Experience," our app will craft personalized questions to match your expertise level. you'll face industry-specific questions for your desired employers.
                                        </p>
                                    </div>
                                </div>
                            </a>



                        </div>
                        <div className="col-lg-4 mb-lg-0 mb-4">
                            <a href="javascript:;">
                                <div className="card card-background">
                                    <h2 className={'text-center text-black font-weight-bolder text-decoration-underline-hover mt-4'}>MOCK INTERVIEWS BY COMPANY</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab2Image}
                                            width={"100%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Virtual Office</h4> */}
                                        <p className={'custom-text-color'}>Select your desired company, and we'll simulate an interview experience with commonly asked questions. Prepare thoroughly for your dream employer and stand out among other candidates.</p>
                                    </div>
                                </div>
                            </a>

                            <a href="javascript:;">
                                <div className="card card-background mb-4">
                                    <h2 className={'text-center text-black font-weight-bolder text-decoration-underline-hover mt-4'}>EXCEL IN YOUR INTERVIEWS</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab5Image}
                                            width={"100%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Home Office</h4> */}
                                        <p className={'custom-text-color'}>Embrace each question as an opportunity to showcase your best self and leave a lasting impression on potential employers</p>
                                    </div>
                                </div>
                            </a>

                        </div>
                        <div className="col-lg-4">


                            <a href="javascript:;">
                                <div className="card card-background mb-4">
                                    <h2 className={'text-center text-black font-weight-bolder text-decoration-underline-hover mt-4'}>SEAMLESS REGISTRATION</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab3Image}
                                            width={"100%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Cozy Spots</h4> */}
                                        <p className={'custom-text-color'}>Get started by providing your basic information - name, email, and mobile number.</p>
                                    </div>
                                </div>
                            </a>
                            <a href="javascript:;">
                                <div className="card card-background">
                                    <h2 className={'text-center text-black font-weight-bolder text-decoration-underline-hover mt-4'}>INSIGHTS FOR IMPROVEMENT</h2>
                                    <div className="full-background mt-2">
                                        <img
                                            src={image.Tab6Image}
                                            width={"100%"}
                                            height={"100%"}
                                        />
                                    </div>
                                    <div className="card-body pt-12">
                                        {/* <h4 className="text-black text-decoration-underline-hover">Private Space</h4> */}
                                        <p className={'custom-text-color'}>After each interview, receive a comprehensive performance report with valuable insights. Identify your strengths and areas for growth, empowering you to refine your interview skills.</p>
                                    </div>
                                </div>
                            </a>

                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export { Data }