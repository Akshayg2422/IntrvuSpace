import { icons } from '@Assets';
import { Image } from '@Components';
import { useEffect, useState } from 'react';
import { PreparingYourInterviewProps } from './interfaces';
import './index.css'

function PreparingYourInterview({ isCompleted }: PreparingYourInterviewProps) {

    const steps = [
        { icon: icons.check, text: 'Analyzing your JD' },
        { icon: icons.check, text: 'Extracting key areas' },
        { icon: icons.check, text: 'Preparing Topics' },
        { icon: icons.check, text: 'Generating evaluation criteria' },
        { icon: icons.check, text: 'Preparing interview Room' },
    ];

    const [currentStep, setCurrentStep] = useState(-1);


    useEffect(() => {

        if (isCompleted) {
            setCurrentStep(steps.length - 1)
        }
    }, [isCompleted])



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



    return (
        <div>
            {
                steps.map((each, index) => {

                    const isSelected = index <= currentStep

                    const { text, icon } = each

                    return (
                        <div key={index} className={'d-flex align-items-center mb-2'}>

                            <div className={'d-flex align-items-center'}>
                                {
                                    isSelected ?

                                        <Image
                                            className='mr-2'
                                            src={icon}
                                            height={12}
                                            width={12}
                                            style={{
                                                objectFit: 'contain'
                                            }}
                                        />

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
                            <div className={`key-point  ${isSelected ? 'text-secondary  mb-0' : ''}`}>{text}</div>
                        </div>
                    )
                })
            }
        </div >
    );
}

export { PreparingYourInterview };
