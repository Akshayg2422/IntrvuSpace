import { icons } from "@Assets";
import { Button, Modal, Image, StatusIcon } from "@Components";
import { useModal, useNavigation } from "@Hooks";
import { useSelector } from "react-redux";
import { GuidelinesProps } from "./interfaces";
import DetectFace from "../../Screen/DetectFace";
import { useState } from "react";

const START_INTERVIEW_GUIDELINES = [
    { title: "Use of headphones for better quality" },
    { title: "Attend from an quiet and secluded space" },
    { title: "Verify the stability of your internet connection", },
    { title: "Keep the video function enabled throughout the session", },
    { title: "After completing the interview, check back in a couple of minutes to view the report" },
];

const GO_TO_DASHBOARD_GUIDELINES = [
    { title: "Your interview is complete" },
    { title: "Report is being generated" },
    { title: "Upon completion of report, you will be notified over email" },
];
function Guidelines({
    scheduleInfo = undefined,
    loading = false,
    heading,
    onClick,
    callValidating
}: GuidelinesProps) {


    const { goBack } = useNavigation();
    const { loginDetails } = useSelector((state: any) => state.AppReducer);
    const startInterviewModal = useModal(true);
    const goToDashboardModal = useModal(true);
    

    const { interviewee_expected_designation, interviewee_experience, interview_duration } = scheduleInfo

    const experience = interviewee_experience === 0 ? "Fresher" : `${interviewee_experience} ${(interviewee_experience === 1 ? " year " : " years ") + "of experience"}`
    console.log('hitting');



    function ModalHeading() {
        return (
            <div className={'text-secondary col-md-9 mb-md-4 m-0 p-0'}>
                <span className="screen-heading m-0 p-0 lh-120">{`Interview for the role of ${heading}`}<span className={'text-secondary text-des ml-2'}>{experience}</span></span>
                <div
                    className='text-secondary text-des font-weight-700' style={{
                        marginTop: '15px'
                    }}>
                    {`${interview_duration} mins`}
                    <span className={'font-weight-400 ml-1'}>{'Duration'}</span>
                </div>
            </div>
        )
    }

    return (
        <>
            {
                !scheduleInfo?.is_complete && <DetectFace onClick={onClick} heading={heading} experience={experience} duration={interview_duration} loading = {loading} callValidating = {callValidating} />
            }
            {
                //  !scheduleInfo?.is_complete && 
                //  <Modal
                //      loading={loading}
                //      title={<ModalHeading />}
                //      isOpen={startInterviewModal.visible}
                //      onClose={() => { goBack() }}
                //      buttonText={'Join Now'}
                //      onClick={onClick}
                //  >
                //      <div>
                //          {
                //              START_INTERVIEW_GUIDELINES.map((step, index) => (
                //                  <div>
                //                      <div key={index} className="d-flex align-items-center pb-2">
                //                          <Image
                //                              src={step.icon}
                //                              height={12}
                //                              width={12}
                //                              style={{
                //                                  objectFit: 'contain'
                //                              }} />
                //                          <small className="pl-2 m-0 bullet-key-point font-weight-400 text-secondary">{step.title}</small>
                //                      </div>
                //                  </div>
                //              ))
                //          }
                //      </div>
                     
                //  </Modal>
            }

            {
                scheduleInfo?.is_complete && !scheduleInfo?.is_report_complete ?
                    (
                        <Modal isOpen={goToDashboardModal.visible} onClose={() => { goBack() }}>

                            <div className="col-md-12 rounded-sm px-md-4 mt--4 mb-3">
                                <div className="text-secondary col-md-12 mb-md-4">
                                    <h2 className='m-0 text-secondary'>Wola! You have successfully completed your interview</h2>
                                    {/* <small className='text-default'>React Native Developer | Fresher | 30 mins duration</small> */}
                                    <small>{interviewee_expected_designation && interviewee_expected_designation + " "}</small> |
                                    <small>{interviewee_experience === 0 ? " Fresher" : " " + interviewee_experience + (interviewee_experience > 1 ? " years of experience" : " year of experience")}</small> |
                                    <small>{`${interview_duration && " " + interview_duration} mins duration`}</small>

                                </div>
                                <div className="pt-4 text-secondary col-12">
                                    {GO_TO_DASHBOARD_GUIDELINES.map((step, index) => (
                                        <span key={index} className="d-flex align-items-center pb-3">
                                            <StatusIcon />
                                            <small className="pl-2 m-0 font-weight-500 text-secondary">{step.title}</small>
                                        </span>
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
