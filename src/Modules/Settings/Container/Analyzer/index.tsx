import React, { useState, useEffect } from 'react';
import { Card, Image } from '@Components';
import './index.css'
import { icons } from '@Assets';
import styled from 'styled-components';

function Analyzer() {
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

        // After 43 seconds (3 seconds + 20 seconds + 20 seconds), reset the steps
        setTimeout(() => {
            setAnalyzing(true);
            setGenerating(false);
            setIsLoading(true)
            setContentStep(1);
        }, 53000);
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
                <Card className={''} style={{ height: '70vh', width: '50vw' }}>
                    {/* For the first 3 seconds */}
                    {analyzing && (
                        <>

                            {contentStep <= 3 && (
                                <div className={'d-flex justify-content-center align-items-center mt-5'}>
                                    <img
                                        height={'100vh'}
                                        width={'90vh'}
                                        src={icons.searchLine}
                                        style={
                                            contentStep === 1
                                                ? { animation: 'searchAnimation 1s infinite' }
                                                : {}
                                        }
                                    />
                                </div>
                            )}
                            <h4 className={'d-flex justify-content-center align-items-center my-5 h1'} >
                                {contentStep === 1 ? 'Analyzing' : contentStep}
                                {contentStep === 1 && <span style={{ fontSize: '2.5rem' }}>...</span>}
                            </h4>
                        </>
                    )}

                    {/* For the next 20 seconds */}
                    {generating && contentStep === 1 && (
                        <>
                            <div className={'d-flex justify-content-center align-items-center'}>
                                <img height={'50vh'} width={'50vh'} src={icons.Comments} />
                            </div>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                Generating Topics
                            </h4>
                        </>
                    )}


                    {/* For the next 20 seconds */}
                    {
                        generating && contentStep === 2 && (
                            <>
                                <h4 className={'d-flex justify-content-center align-items-center span-animation h3'}>
                                    1. Generating Topics
                                    {contentStep === 2 && (
                                        <span className={`span-animation ${isLoading ? 'loading-animation' : ''}`} style={{ fontSize: '2.5rem' }}>
                                            ...
                                        </span>
                                    )}
                                </h4>
                            </>
                        )
                    }


                    {/* For the next 10 seconds */}
                    {generating && contentStep === 3 && (
                        <>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'} >
                                1. Generating Topics
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center rule-animation h3'}>
                                2. Generating Questions
                                {contentStep === 3 && (
                                    <span className={`span-animation ${isLoading ? 'loading-animation' : ''}`} style={{ fontSize: '2.5rem' }}>
                                        ...
                                    </span>
                                )}
                            </h4>
                        </>
                    )}


                    {/* For the next 10 seconds */}
                    {generating && contentStep === 4 && (
                        <>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                1. Generating Topics
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                2. Generating Questions
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center rule-animation h3'}>
                                3. Generating Rules
                                {contentStep === 4 && (
                                    <span className={`span-animation ${isLoading ? 'loading-animation' : ''}`} style={{ fontSize: '2.5rem' }}>
                                        ...
                                    </span>
                                )}
                            </h4>
                        </>
                    )}


                    {/* For the next 10 seconds */}
                    {generating && contentStep === 5 && (
                        <>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                1. Generating Topics
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                2. Generating Questions
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center topic-animation h1'}>
                                3. Generating Rules
                            </h4>
                            <h4 className={'d-flex justify-content-center align-items-center rule-animation h3'}>
                                4. Preparing Criteria
                                {contentStep === 5 && (
                                    <span className={`span-animation ${isLoading ? 'loading-animation' : ''}`} style={{ fontSize: '2.5rem' }}>
                                        ...
                                    </span>
                                )}
                            </h4>
                        </>
                    )}

                </Card>
            </div>
        </>
    );
}

export { Analyzer };
