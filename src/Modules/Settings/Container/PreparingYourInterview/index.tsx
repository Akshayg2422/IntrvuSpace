import { icons } from '@Assets';
import { Image, StatusIcon } from '@Components';
import { useEffect, useState } from 'react';
import { PreparingYourInterviewProps } from './interfaces';
import './index.css'

function PreparingYourInterview({ isCompleted }: PreparingYourInterviewProps) {

    const steps = [
        { text: 'Analyzing your JD' },
        { text: 'Extracting key areas' },
        { text: 'Preparing Topics' },
        { text: 'Generating evaluation criteria' },
        { text: 'Preparing interview Room' },
    ];

    const [currentStep, setCurrentStep] = useState(-1);


    useEffect(() => {
        if (isCompleted) {
            setCurrentStep(steps.length - 1)
        }
    }, [isCompleted])
    // 



    useEffect(() => {

        let timer: NodeJS.Timeout;

        const initialStepTimer = setTimeout(() => {
            setCurrentStep(0);
            timer = setInterval(() => {
                setCurrentStep((prevStep) => (prevStep < steps.length - 2 ? prevStep + 1 : prevStep));
            }, 5000);
        }, 2000);

        return () => {
            if (timer) {
                clearInterval(timer);
            }
            clearTimeout(initialStepTimer);
        };
    }, []);

    console.log("currentStep", currentStep);


    return (
        <div>
            {
                steps.map((each, index) => {

                    const isSelected = index <= currentStep

                    const { text } = each

                    return (
                        <div key={index} className={'d-flex align-items-center mb-2'}>
                            <div className={'d-flex align-items-center'}>
                                {
                                    isSelected ?

                                        <StatusIcon />

                                        :
                                        <>
                                            {
                                                currentStep !== -1
                                                    ?
                                                    <div
                                                        className='mr-2'
                                                        style={{
                                                            width: 12,
                                                            height: 12
                                                        }}>

                                                    </div>
                                                    :
                                                    null
                                            }
                                        </>
                                }
                            </div>
                            <div className={`key-point  ${isSelected ? 'text-secondary ml-2  mb-0' : ''}`}>{text}</div>
                        </div>
                    )
                })
            }
        </div >
    );
}

export { PreparingYourInterview };
