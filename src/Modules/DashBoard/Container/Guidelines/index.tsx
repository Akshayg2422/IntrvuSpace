import React from 'react'
import { GuidelinesProps } from './interfaces'
import { Button, Image } from '@Components'
import { useNavigation } from '@Hooks'
import { icons } from '@Assets'

const GUIDELINES = [
    { title: "Kindly ensure the use of headphones to optimize audio quality.", icon: icons.headPhone },
    { title: "Find a quiet and secluded space to minimize background noise and distractions.", icon: icons.room },
    { title: "Verify the stability of your internet connection to ensure uninterrupted communication.", icon: icons.internet },
    { title: "Keep the video function enabled throughout the session for effective interaction.", icon: icons.video },
    { title: "We appreciate clear and succinct responses during the conversation.", icon: icons.voice }
];

function Guidelines({ scheduleInfo = undefined, loading, heading, onClick }: GuidelinesProps) {
    const { goBack } = useNavigation()

    return (
        <>
            {!scheduleInfo.is_complete &&
                <div className='h-100vh' style={{ position: 'relative' }}>
                    <div style={{ backgroundImage: `url(${require('../../../../Assets/img/Background/Guildlines/image.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        {/* White overlay */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.96)' }}></div>

                        <div className='container'>
                            <div className="d-flex flex-column justify-content-between h-100vh py-3 py-md-5 py-sm-5">
                                <div className='col-md-auto'>
                                    <h2 className="display-2 mb-0 font-weight-bolder text-primary mb-0">{`Interview for the role of ${heading}`}</h2>
                                    {scheduleInfo?.interview_duration &&
                                        <div className='col row align-items-center mb-1'>
                                            <Image src={icons.clock} height={18} width={18} style={{
                                                objectFit: 'contain'
                                            }} />
                                            <h5 style={{
                                                fontSize: "16px"
                                            }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${scheduleInfo?.interview_duration} mins`}</h5>
                                        </div>
                                    }
                                    <h3 className="mb-0 pointer text-muted mt--1">{scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"}</h3>
                                </div>
                                <div className='col my-5'>
                                    <div className='mb-0'>
                                        <h5 className="mb-0 text-uppercase">Guidelines</h5>
                                        {
                                            GUIDELINES && GUIDELINES.length > 0 && GUIDELINES.map(each => {

                                                const { title, icon } = each
                                                return (
                                                    <div className="row mt-4 align-items-center">
                                                        <div className="col-auto">
                                                            <Image src={icon} height={28} width={28} />
                                                        </div>
                                                        <div className="col-10">
                                                            <p className="text-muted mb-0" style={{ fontSize: '20px' }}>{title}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className='col-auto'>
                                    <Button
                                        loading={loading}
                                        block
                                        text={!scheduleInfo.is_started ? 'Start Now' : 'Resume Interview'}
                                        onClick={() => {
                                            if (onClick) {
                                                onClick()
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            }

            {
                scheduleInfo.is_complete && !scheduleInfo.is_report_complete ? (
                    <div className='h-100 container d-flex  justify-content-center align-items-center rounded-0 shadow-none'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='card mb-0 overflow-auto overflow-hide scroll-y'>
                                <div className='card-body mb-0 shadow-none'>
                                    <div className='col'>
                                        <div className='display-3 text-primary font-weight-700'>{'Report generation inprogress'}</div>
                                        <p className='mt-0 mb-5'>We are generating your report, It might take a couple of minutes please check back after sometime.</p>
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
                )
            }
        </>
    );
}

export { Guidelines };
