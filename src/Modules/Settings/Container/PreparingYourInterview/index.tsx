import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { Button } from '@Components';
import { PreparingYourInterviewProps } from './interfaces'

function PreparingYourInterview({ showStart, onClick }: PreparingYourInterviewProps) {

    const steps = [
        { icon: icons.check, text: 'Analyzing your JD' },
        { icon: icons.check, text: 'Extracting key areas' },
        { icon: icons.check, text: 'Preparing Topics' },
        { icon: icons.check, text: 'Generating evaluation criteria' },
        { icon: showStart ? icons.check : null, text: 'Preparing interview Room' },
    ];

    const [currentStep, setCurrentStep] = useState(-1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
        }, 5000);

        const initialStepTimer = setTimeout(() => {
            setCurrentStep(0);
        }, 1000);

        return () => {
            clearInterval(timer);
            clearTimeout(initialStepTimer);
        };
    }, []);

    return (
        <div className="col-md-12 rounded-sm px-md-4 mt--4">
            <div className="text-secondary col-11">
                <div className="m-0 h2 font-weight-800 pb-2">Preparing your Interview...</div>
                <div className="text-default">It will take a couple of minutes. You can wait and join using the link that will be sent to your email once the interview is ready.</div>
                <div className="pt-5 text-secondary pb-md-6 pb-sm-0 pb-5">
                    {steps.map((step, index) => (
                        <div key={index} className="d-flex align-items-center pb-2">
                            {index <= currentStep ? (
                                <>
                                    {index === 4 ? !step.icon ? <span style={{marginLeft:'2%'}}></span> : <img src={step.icon} height={22} /> : <img src={step.icon} height={22} />}
                                    <small className="pl-2 m-0 font-weight-500 text-black">{step.text}</small>
                                </>
                            ) : (
                                <small style={{ paddingLeft: '19px' }} className="m-0 text-default">{step.text}</small>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showStart && (
                <div className="d-flex justify-content-center pr-sm-0 pr-5 mb-md-4 mb-sm-0 mb-3">
                    <Button className={'px-5 border border-primary rounded-sm'} text={'Start Interview'} onClick={onClick} />
                </div>
            )}
        </div>
    );
}

export { PreparingYourInterview };
