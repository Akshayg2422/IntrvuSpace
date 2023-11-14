import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { Button, Image } from '@Components';
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
        <div>
            <div className="text-secondary">
                <div className="text-secondary">
                    {steps.map((step, index) => (
                        <div key={index} className="d-flex align-items-center pb-2">
                            {index <= currentStep ? (
                                <>
                                    {index === 4 ? !step.icon ? <span style={{ marginLeft: '2%' }}></span> : <Image src={step.icon} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} /> : <Image src={step.icon} height={12} width={12} style={{
                                        objectFit: 'contain'
                                    }} />}
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
                <div className="d-flex justify-content-center">
                    <Button className={'border border-primary rounded-sm'} text={'Start Interview'} onClick={onClick} />
                </div>
            )}
        </div>
    );
}

export { PreparingYourInterview };
