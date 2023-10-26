import React, { useState, useEffect } from 'react';
import { icons } from '@Assets';
import { useModal, useNavigation } from '@Hooks';
import { Button, Modal } from '@Components';
import { useSelector } from 'react-redux';

function PreparingYourInterview() {
    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    const steps = [
        { icon: icons.check, text: 'Analyzing your JD' },
        { icon: icons.check, text: 'Extracting key areas' },
        { icon: icons.check, text: 'Preparing Topics' },
        { icon: icons.check, text: 'Generating evaluation criteria' },
        { icon: icons.check, text: 'Preparing interview Room' },
    ];

    const [currentStep, setCurrentStep] = useState(-1);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep));
        }, 5000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className="col-md-12 rounded-sm px-md-4">
            <div className="text-secondary col-11">
                <div className="m-0 h2 font-weight-800 pb-2">Preparing your Interview...</div>
                <div className="text-default">It will take a couple of minutes. You can wait and join using the link that will be sent to your email once the interview is ready.</div>
                <div className="pt-5 text-secondary pb-md-6 pb-sm-0 pb-5">
                    {steps.map((step, index) => (
                        <div key={index} className="d-flex align-items-center pb-2">
                            {index <= currentStep ? (
                                <>
                                    <img src={step.icon} height={22} />
                                    <small className="pl-2 m-0 font-weight-500 text-black">{step.text}</small>
                                </>
                            ) : (
                                <small style={{ paddingLeft: '19px' }} className="m-0 text-default">{step.text}</small>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {loginDetails?.isLoggedIn && (
                <div className="d-flex justify-content-center pr-sm-0 pr-5">
                    <Button className={'px-5 border border-primary rounded-sm'} text={'Start Interview'} onClick={() => { }} />
                </div>
            )}
        </div>
    );
}

export { PreparingYourInterview };