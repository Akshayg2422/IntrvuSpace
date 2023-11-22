import React from 'react'
import { GuidelinesProps } from './interfaces'
import { Back, Button, Image } from '@Components'
import { useNavigation } from '@Hooks'
import { icons } from '@Assets'
import { useSelector } from 'react-redux'

// const GUIDELINES = [
//     { title: "Kindly ensure the use of headphones to optimize audio quality.", icon: icons.headPhone },
//     { title: "Find a quiet and secluded space to minimize background noise and distractions.", icon: icons.room },
//     { title: "Verify the stability of your internet connection to ensure uninterrupted communication.", icon: icons.internet },
//     { title: "Keep the video function enabled throughout the session for effective interaction.", icon: icons.video },
//     { title: "We appreciate clear and succinct responses during the conversation.", icon: icons.voice }
// ];
const GUIDELINES = [
    { title: "Use of headphones for better quality", icon: icons.headPhone },
    { title: "Attend from an quiet and secluded space", icon: icons.room },
    { title: "Verify the stability of your internet connection", icon: icons.internet },
    { title: "Keep the video function enabled throughout the session", icon: icons.video }
];

function Guidelines({ scheduleInfo = undefined, loading, heading, onClick }: GuidelinesProps) {
    const { goBack } = useNavigation()


    const title = `Interview for the role of ${heading}`
    const experienceSubText = scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"

    return (
        <>
            {!scheduleInfo.is_complete &&


                <div style={{ height: '100%' }} className="d-block d-md-none d-lg-none d-xl-none">
                    <div className='container' >
                        <div style={{ display: 'flex', flexDirection: 'column' }} className='col-auto'>

                            <div style={{ padding: 0 }} className='col-md-auto'>

                                <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start' }}>
                                    <Image src={icons.back} height={14} width={14} style={{ flexShrink: 0, alignSelf: 'flex-start' }} />
                                    <div style={{ marginLeft: 10, marginTop: -5 }}>
                                        <h2 style={{ marginBottom: 0, whiteSpace: 'normal', overflow: 'hidden' }}>{title}</h2>
                                        <h5 style={{
                                            fontSize: "12px",
                                            marginTop: 0,
                                        }} className='mb-0 text-primary font-weight-bolder'>{experienceSubText}</h5>

                                        {scheduleInfo?.interview_duration &&
                                            <div className='col row align-items-center mb-1' style={{ marginTop: 5 }}>
                                                <Image src={icons.clock} height={12} width={12} style={{
                                                    objectFit: 'contain'
                                                }} />
                                                <h5 style={{
                                                    fontSize: "12px"
                                                }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${scheduleInfo?.interview_duration} mins`}</h5>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>
                            <div style={{ marginTop: 40, marginBottom: 30 }} className='col'>
                                <div className='mb-0'>
                                    <h3 style={{ letterSpacing: 1, paddingBottom: 20 }}>{"GUIDELINES"}</h3>
                                    {
                                        GUIDELINES && GUIDELINES.length > 0 && GUIDELINES.map(each => {

                                            const { title, icon } = each
                                            return (
                                                <div style={{ marginBottom: 10, display: 'flex', alignItems: 'flex-start' }}>
                                                    <Image src={icon} height={22} width={22} style={{ flexShrink: 0, alignSelf: 'flex-start' }} />
                                                    <h4 style={{ color: '#000', marginLeft: 10, whiteSpace: 'normal', overflow: 'hidden' }}>{title}</h4>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div style={{ margin: 'auto 0 0 0' }}>
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


            }

        </>
    );
}

export { Guidelines };
