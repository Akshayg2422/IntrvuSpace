import React from 'react'
import { GuidelinesProps } from './interfaces'
import { color } from '@Themes'
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


    console.log(JSON.stringify(scheduleInfo) + '====scheduleInfo');


    return (
        <>
            {!scheduleInfo.is_complete &&
                <div style={{ backgroundImage: `url(${require('../../../../Assets/img/Background/Guildlines/image.jpg')})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className='container'>
                        <div className="d-flex flex-column justify-content-between h-100vh py-5">
                            <div className='col'>
                                <h2 className="display-2 mb-0">{`Interview for the role of ${heading}`}</h2>
                                <h3 className="mb-0 pointer text-muted mt--1">{scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"}</h3>
                                <div className='mb-0 mt-6'>
                                    <h5 className="mb-0 text-uppercase">Guidelines:</h5>
                                    {
                                        GUIDELINES && GUIDELINES.length > 0 && GUIDELINES.map(each => {

                                            const { title, icon } = each
                                            return (
                                                <div className='col mt-4 align-items-center'>
                                                    <div className='row align-items-center'>
                                                        <Image src={icon} height={28} width={28} />
                                                        <p className="text-muted mb-0 ml-3" style={{ fontSize: '20px' }}>{title}</p>
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
                                    loadingMessage={'Please wait. We are preparing your interview.'}
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

            }

            {scheduleInfo.is_complete ?
                <div className='h-100 container d-flex  justify-content-center align-items-center'>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='card mb-0 overflow-auto overflow-hide scroll-y'>
                            <div className='card-body mb-0'>
                                <div className="col">
                                    <h1 className="display-4">{`Interview for ${heading}`}</h1>
                                    <p className="mt-0 mb-5">Your interview is complete. Please check your registered mail address for further details.</p>
                                    <div>
                                        <Button text={'Go to Dashboard'} onClick={() => { goBack() }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <></>
            }
        </>
    )
}

export { Guidelines }