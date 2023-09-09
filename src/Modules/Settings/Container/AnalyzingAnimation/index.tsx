import React, { useState, useEffect } from 'react';
import { Image } from '@Components';
import { icons, videos } from '@Assets';
import './index.css'

function AnalyzingAnimation() {
    const [analyzing, setAnalyzing] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [contentStep, setContentStep] = useState(1);
    useEffect(() => {
        // After 3 seconds, stop "Analyzing" and start "Generating"
        setTimeout(() => {
            setAnalyzing(false);
            setGenerating(true);
        }, 3000);

        // After 63 seconds (3 seconds + 20 seconds + 20 seconds), reset the steps
        setTimeout(() => {
            setAnalyzing(true);
            setGenerating(false);
            setContentStep(1);
        }, 63000);
    }, []);

    useEffect(() => {
        // After 10 seconds, move to the next step
        if (generating && contentStep < 6) {
            const timer = setTimeout(() => {
                setContentStep((prevStep) => prevStep + 1);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [generating, contentStep]);

    return (
        <>
            <div className={'h-100 d-flex justify-content-center align-items-center'}>
                <div className={'text-black p-4 h-100'} style={{ height: '75vh', width: '50vw' }}>
                    {/* For the first 3 seconds */}
                    {analyzing && (
                        <div className={''}>
                            {/* {contentStep <= 3 && (
                                <div className={'d-flex justify-content-center mr-7 align-items-center'}>
                                    <img
                                        height={'30%'}
                                        width={'30%'}
                                        src={icons.search}
                                        style={
                                            contentStep === 1
                                                ? {
                                                    animation: 'searchAnimation 1s infinite',
                                                    animationName: 'mymove',
                                                    position: 'relative',
                                                }
                                                : {}
                                        }
                                    />
                                </div>
                            )} */}

                            <h4 className={'d-flex justify-content-center align-items-center py-lg-7 py-md-7 py-sm-8 text-black h1'}>
                                {contentStep === 1 ? 'Analyzing' : contentStep}
                                {contentStep === 1 && (
                                    <span className={'ml-md-5 ml-lg-5 ml-sm-3 mt-2 loaders'}></span>
                                )}
                            </h4>
                        </div>
                    )}


                    {/* For the next 20 seconds */}
                    {generating && contentStep === 1 && (
                        <div className={'mt--2'}>
                            {/* <h4 className={'d-flex justify-content-center align-items-center mt-3'} >
                                {contentStep === 1 && (
                                    <span className={'loader3 mr-2 mt-md--7 mt-lg-md--7 mt-sm--5'}></span>
                                )}
                            </h4> */}

                            <h4 className={'d-flex justify-content-center align-items-center text-black h1 py-md-7 py-lg-7 py-sm-8'}  >
                                {contentStep === 1 ? 'Generating' : contentStep}
                                <span className={'loader6 ml-md-5 ml-lg-5 ml-sm-3 mb-4 mt-2'}></span>
                            </h4>


                        </div>
                    )}

                    <div className={'my-5'}>
                        {/* For the next 20 seconds */}
                        {
                            generating && contentStep === 2 && (
                                <>
                                    <h4 className={'d-flex justify-content-center align-items-center text-black span-animation h1'} >Generating Topics</h4>

                                    {contentStep === 2 && (
                                        <span className={'loader2'}></span>
                                    )}

                                </>
                            )
                        }

                        {/* For the next 10 seconds */}
                        {generating && contentStep === 3 && (
                            <>

                                <h4 className={'d-flex justify-content-center align-items-center text-black topic-animation h1'} >Generating Questions</h4>
                                {contentStep === 3 && (
                                    <span className={'loader2'}></span>
                                )}
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '130%'
                                    }} >
                                    1. Topics Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                            </>
                        )}


                        {/* For the next 10 seconds */}
                        {generating && contentStep === 4 && (
                            <>

                                <h4 className={'d-flex justify-content-center align-items-center text-black topic-animation h1'} >Generating Rules</h4>

                                {contentStep === 4 && (
                                    <span className={'loader2'}></span>
                                )}
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '115%'
                                    }}
                                >
                                    1. Topics Generated  <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '130%'
                                    }}
                                >
                                    2. Questions Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                            </>
                        )}


                        {/* For the next 10 seconds */}
                        {generating && contentStep === 5 && (
                            <>

                                <h4 className={'d-flex justify-content-center align-items-center text-black topic-animation h1'} >Preparing Criteria  </h4>

                                {contentStep === 5 && (
                                    <span className={'loader2'}></span>
                                )}
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '100%'
                                    }}
                                >
                                    1. Topics Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '115%'
                                    }}
                                >
                                    2. Questions Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '130%'
                                    }}
                                >
                                    3. Rules Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>

                            </>
                        )}

                        {generating && contentStep === 6 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '85%'
                                    }}
                                >
                                    1. Topics Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '100%'
                                    }}
                                >
                                    2. Questions Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '115%'
                                    }}
                                >
                                    3. Rules Generated <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-black h3'}
                                    style={{
                                        position: 'absolute',
                                        left: '38%',
                                        top: '130%'
                                    }}
                                >
                                    4. Criteria Prepared <span className={'pb-1 ml-2'}><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                            </>
                        )}
                        {generating && contentStep === 6 && (
                            <>
                                {contentStep === 6 && (
                                    <span className={'loader7 mt-md-6 mt-sm-5 mt-lg-6'}></span>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export { AnalyzingAnimation }
