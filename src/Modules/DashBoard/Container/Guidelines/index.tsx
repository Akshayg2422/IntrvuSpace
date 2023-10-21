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
    { title: "Use of headphones for better quality" },
    { title: "Attend from an quiet and secluded space" },
    { title: "Verify the stability of your internet connection" },
    { title: "Keep the video function enabled throughout the session" },
    { title: "After completing the interview, check back in a couple of minutes to view the report" },

];

function Guidelines({ scheduleInfo = undefined, loading, heading, onClick }: GuidelinesProps) {
    const { goBack } = useNavigation()
    const { loginDetails } = useSelector((state: any) => state.AppReducer);


    const title = `Interview for the role of ${heading}`
    const experienceSubText = scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"

    return (
        <>
            {!scheduleInfo.is_complete &&

                <div className='h-100vh'>
                    <div className='container d-none d-md-block d-lg-block d-xl-block'>
                        <div className={'col-8'}>
                        <div className="d-flex flex-column h-100vh py-3 py-md-5 py-sm-5">
                            <div className=''>
                                <div className=''>
                                    <div className="mx-4 h2 display-2 mb-0 font-weight-bolder text-primary mb-0">{`Interview for the role of ${heading}`}<span>{scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"}</span></div>
                                </div>
                                {scheduleInfo?.interview_duration &&
                                    <div className='col row align-items-center mb-1'>
                                        <h5 style={{
                                            fontSize: "16px"
                                        }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${scheduleInfo?.interview_duration} mins`}</h5>
                                    </div>
                                }
                            </div>
                            <div className='col my-5'>
                                <div className='mb-0'>
                                    {
                                        GUIDELINES && GUIDELINES.length > 0 && GUIDELINES.map(each => {

                                            const { title, } = each
                                            return (
                                                <div className="col row mt-4 align-items-center">
                                                    <Image src={icons.check} height={20} />
                                                    <div className="col-auto">
                                                        <span className="text-details text-black">{title}</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className='text-center'>
                                <Button
                                className={'rounded px-6'}
                                    loading={loading}
                                    text={!scheduleInfo.is_started ? 'Start Interview' : 'Resume Interview'}
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

                    <div style={{ height: '100%' }} className="d-block d-md-none d-lg-none d-xl-none">
                        <div className='container' >
                            <div style={{ display: 'flex', flexDirection: 'column' }} className='col-auto'>

                                <div style={{ padding: 0 }} className='col-md-auto'>

                                    <div style={{ marginTop: 20, display: 'flex', alignItems: 'flex-start' }}>
                                        <div onClick={() => { goBack(); }}>
                                            <Image src={icons.back} height={14} width={14} style={{ flexShrink: 0, alignSelf: 'flex-start' }} />
                                        </div>
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

                                                const { title } = each
                                                return (
                                                    <div style={{ marginBottom: 10, display: 'flex', alignItems: 'flex-start' }}>
                                                        <Image src={icons.check} height={20} style={{ flexShrink: 0, alignSelf: 'flex-start' }} />
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
                </div>


            }

            {
                scheduleInfo.is_complete && !scheduleInfo.is_report_complete ? (
                    <div className='h-100 container d-flex  justify-content-center align-items-center rounded-0 shadow-none'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div className='card mb-0 overflow-auto overflow-hide scroll-y'>
                                <div className='card-body mb-0 shadow-none'>
                                    <div className='col'>
                                        <div className='display-3 text-primary font-weight-700'>{'Report Generation in Progress'}</div>
                                        <p className='mt-0 mb-5'>Please revisit in a couple of minutes to access the completed report. We are currently in the process of generating your report.</p>
                                        {
                                            loginDetails?.isLoggedIn && <div>
                                                <Button text={'Go to Dashboard'} onClick={() => { goBack(); }} />
                                            </div>
                                        }
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
