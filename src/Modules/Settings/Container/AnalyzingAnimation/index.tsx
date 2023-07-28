import React, { useState, useEffect } from 'react';
import { Card, Image } from '@Components';
import { icons } from '@Assets';
import './index.css'

function AnalyzingAnimation() {
    const [analyzing, setAnalyzing] = useState(true);
    const [generating, setGenerating] = useState(false);
    const [contentStep, setContentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        // After 3 seconds, stop "Analyzing" and start "Generating"
        setTimeout(() => {
            setAnalyzing(false);
            setGenerating(true);
            setIsLoading(true)
        }, 3000);

        // After 63 seconds (3 seconds + 20 seconds + 20 seconds), reset the steps
        setTimeout(() => {
            setAnalyzing(true);
            setGenerating(false);
            setIsLoading(true)
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
            <div className={'vh-100 d-flex justify-content-center align-items-center'}>
                <Card className={'text-white border border-white p-4'} style={{ height: '75vh', width: '50vw', backgroundColor: '#68d75c' }}>
                    {/* For the first 3 seconds */}
                    {analyzing && (
                        <div className={''}>
                            {contentStep <= 3 && (
                                <div className={'d-flex justify-content-center align-items-center'}>
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
                            )}
                            <h4 className={'d-flex justify-content-center align-items-center text-white mt-8 h1'} style={{ backgroundColor: "#fabe2c" }}>
                                {contentStep === 1 ? 'Analyzing' : contentStep}
                                {contentStep === 1 && (
                                    <span className={' ml-5 loader'}></span>
                                )}
                            </h4>
                        </div>
                    )}


                    {/* For the next 20 seconds */}
                    {generating && contentStep === 1 && (
                        <div className={'mt--2'}>
                            <div className={'d-flex justify-content-center align-items-center'}>
                                <img
                                    height={'200px'}
                                    width={'200px'}
                                    src={icons.Comments}
                                    className={'flip-image'}
                                    style={contentStep === 1 ? { animation: 'flipAnimation 1s infinite' } : {}}
                                />
                            </div>
                            <h4 className={'d-flex justify-content-center align-items-center text-white h1 mt-3'} style={{ backgroundColor: "#fabe2c" }} >
                                {contentStep === 1 ? 'Generating' : contentStep}
                                <span className={'loader6 ml-4 mt--2'}></span>
                            </h4>

                            <h4 className={'d-flex justify-content-center align-items-center'} >
                                {/* {contentStep === 1 ? 'Generating' : contentStep} */}
                                {contentStep === 1 && (
                                    <span className={'loader3 mr-2 mt--7'}></span>
                                )}
                            </h4>
                        </div>
                    )}

                    <div className={'my-5'}>
                        {/* For the next 20 seconds */}
                        {
                            generating && contentStep === 2 && (
                                <>
                                    <h4 className={'d-flex justify-content-center align-items-center text-white span-animation h1'} style={{ backgroundColor: "#fabe2c" }}>Generating Topics</h4>

                                    {contentStep === 2 && (
                                        <span className={'loader2'}></span>
                                    )}

                                </>
                            )
                        }


                        {/* For the next 10 seconds */}
                        {generating && contentStep === 3 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'} >
                                    1. Topics Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center text-white topic-animation h3'} style={{ backgroundColor: "#fabe2c" }}>Generating Questions</h4>
                                {contentStep === 3 && (
                                    <span className={'loader2'}></span>
                                )}

                            </>
                        )}


                        {/* For the next 10 seconds */}
                        {generating && contentStep === 4 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    1. Topics Generated  <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    2. Questions Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center text-white topic-animation h3'} style={{ backgroundColor: "#fabe2c" }}>Generating Rules</h4>

                                {contentStep === 4 && (
                                    <span className={'loader2'}></span>
                                )}

                            </>
                        )}


                        {/* For the next 10 seconds */}
                        {generating && contentStep === 5 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    1. Topics Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    2. Questions Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    3. Rules Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center text-white topic-animation h3'} style={{ backgroundColor: "#fabe2c" }}>Preparing Criteria  </h4>

                                {contentStep === 5 && (
                                    <span className={'loader2'}></span>
                                )}

                            </>
                        )}

                        {generating && contentStep === 6 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    1. Topics Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    2. Questions Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    3. Rules Generated <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center topic-animation text-white h1'}>
                                    4. Criteria Prepared <span><Image height={20} width={20} src={icons.tickGreen} /></span>
                                </h4>
                                <h4 className={'d-flex justify-content-center align-items-center text-white topic-animation h3 loader5'} style={{ backgroundColor: "#fabe2c" }}>

                                    {contentStep === 6 && (
                                        <span className={' ml-4 loader4'}></span>
                                    )}
                                </h4>
                            </>
                        )}
                    </div>

                </Card>
            </div>
        </>
    );
}

export { AnalyzingAnimation }