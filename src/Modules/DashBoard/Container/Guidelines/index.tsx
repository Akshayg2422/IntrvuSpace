import React from 'react';
import { GuidelinesProps } from './interfaces';
import { Button, Image } from '@Components';
import { useNavigation } from '@Hooks';
import { icons, image } from '@Assets';

function Guidelines({
    scheduleInfo = undefined,
    loading,
    heading,
    guidelines = [],
    onClick,
}: GuidelinesProps) {
    const { goBack } = useNavigation();

    return (
        <>
            {!scheduleInfo.is_complete && (
                <div className={`vh-100 container-fluid`} style={{ backgroundImage: `url(${image.Guideline})`, objectFit: 'contain',backgroundSize:'cover',backgroundPosition:'center' }}>
                    <div className='mb-0 overflow-auto overflow-hide scroll-y'>
                        <div className='card-body mb-0 my-6'>
                            <h1 className='display-2'>{`Interview for the role of ${heading}`}</h1>
                            <p className='mt-0 mb-5'>{"3 years of experience"}</p>
                            <div className='mb-0 mt-3'>
                                <h5 className='mb-0 text-uppercase pb-2'>Guidelines:</h5>
                                {guidelines && guidelines.length > 0 && (
                                    <ul className='list-unstyled'>
                                        {guidelines.map((guideline: any, index: number) => {
                                            console.log('guideline', JSON.stringify(guideline))
                                            return (
                                                <li key={index} className='mb-3'>
                                                    <div className='d-flex align-items-center'>
                                                        <div>
                                                            {guideline.icon && (
                                                                <Image height={18} width={18} src={guideline.icon} />
                                                            )}

                                                        </div>
                                                        <p className='text-muted mb-0 ml-3' style={{ fontSize: '14px' }}>
                                                            {guideline.text}
                                                        </p>
                                                    </div>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </div>

                            <div className='text-center py-3 pt-5'>
                                <Button
                                    loading={loading}
                                    block
                                    size={'lg'}
                                    text={scheduleInfo.is_started === false ? 'Start Now' : 'Resume Interview'}
                                    onClick={() => {
                                        if (onClick) {
                                            onClick();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {scheduleInfo.is_complete ? (
                <div className='h-100 container d-flex  justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='card mb-0 overflow-auto overflow-hide scroll-y'>
                            <div className='card-body mb-0'>
                                <div className='col'>
                                    <h1 className='display-4'>{`Interview for ${heading}`}</h1>
                                    <p className='mt-0 mb-5'>Your interview is complete. Please check your registered mail address for further details.</p>
                                    <div>
                                        <Button text={'Go to Dashboard'} onClick={() => { goBack(); }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export { Guidelines };
