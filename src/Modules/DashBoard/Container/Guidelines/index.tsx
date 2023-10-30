import React from 'react'
import { GuidelinesProps } from './interfaces'
import { Back, Button, Image, Modal } from '@Components'
import { useModal, useNavigation } from '@Hooks'
import { icons } from '@Assets'
import { useSelector } from 'react-redux'

const START_INTERVIEW_GUIDELINES = [
    { icon: icons.check, title: "Use of headphones for better quality" },
    { icon: icons.check, title: "Attend from an quiet and secluded space" },
    { icon: icons.check, title: "Verify the stability of your internet connection" },
    { icon: icons.check, title: "Keep the video function enabled throughout the session" },
    { icon: icons.check, title: "After completing the interview, check back in a couple of minutes to view the report" },
];

const GO_TO_DASHBOARD_GUIDELINES = [
    { icon: icons.check, title: "Your interview is complete" },
    { icon: icons.check, title: "Report is being generated" },
    { icon: icons.check, title: "Upon completion of report, you will be notified over email" },
];

function Guidelines({ scheduleInfo = undefined, loading, heading, onClick }: GuidelinesProps) {
    const { goBack } = useNavigation()
    const { loginDetails } = useSelector((state: any) => state.AppReducer);
    const startInterviewModal = useModal(true)
    const goToDashboardModal = useModal(true)

    return (
        <>
            {!scheduleInfo.is_complete &&

                <Modal isOpen={startInterviewModal.visible} onClose={() => { goBack() }}>
                    <div className="col-md-12 rounded-sm px-md-4">
                        <div className="text-secondary col-md-9 mb-md-4">
                            <span style={{ lineHeight: '1rem' }} className="m-0 display-4 font-weight-800">{`Interview for the role of ${heading}`}<a className={'text-secondary h4 font-weight-400 ml-2'}>{scheduleInfo?.interviewee_experience === 0 ? "Fresher" : "" + scheduleInfo?.interviewee_experience + (scheduleInfo?.interviewee_experience === 1 ? " year " : " years ") + "of experience"}</a></span>
                            {scheduleInfo?.interview_duration &&
                                <div className='mb-0 text-secondary font-weight-bolder'>
                                    {`${scheduleInfo?.interview_duration} mins`}
                                    <span className={'text-secondary font-weight-400 ml-1'}>{'Duration'}</span>
                                </div>
                            }
                        </div>
                        <div className="pt-4 text-secondary col-12">
                            {START_INTERVIEW_GUIDELINES.map((step, index) => (
                                <div key={index} className="d-flex align-items-center pb-3">
                                    <img src={step.icon} height={22} />
                                    <small className="pl-2 m-0 font-weight-500 text-secondary">{step.title}</small>
                                </div>
                            ))}

                            <div className="d-flex justify-content-center pr-sm-0 pr-5 mt-md-5 mt-sm-0 mt-2">
                                <Button className={'px-5 border border-primary rounded-sm'}
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
                </Modal>

            }

            {
                scheduleInfo.is_complete && !scheduleInfo.is_report_complete ? (
                    <Modal size={'md'} isOpen={goToDashboardModal.visible} onClose={() => { goBack() }}>

                        <div className="col-md-12 rounded-sm px-md-4">
                            <div className="text-secondary col-md-12 mb-md-4">
                                <h2 className='m-0'>Wola! You have successfully completed your interview</h2>
                                <small className='text-default'>React Native Developer | Fresher | 30 mins duration</small>
                            </div>
                            <div className="pt-4 text-secondary col-12">
                                {GO_TO_DASHBOARD_GUIDELINES.map((step, index) => (
                                    <div key={index} className="d-flex align-items-center pb-3">
                                        <img src={step.icon} height={22} />
                                        <small className="pl-2 m-0 font-weight-500 text-secondary">{step.title}</small>
                                    </div>
                                ))}
                                {loginDetails?.isLoggedIn && (
                                    <div className="d-flex justify-content-center pr-sm-0 pr-5 mt-md-5 mt-sm-0 mt-2 mb-sm-0 mb-4">
                                        <Button className={'px-5 border border-primary rounded'} text={'Go to Dashboard'} onClick={() => { goBack() }} />
                                    </div>
                                )}
                            </div>
                        </div>

                    </Modal>
                ) : (
                    <></>
                )
            }

        </>
    );
}

export { Guidelines };
