/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { icons } from '@Assets';
import { Button, Card, Checkbox, Divider, Image, Input, InputHeading, Modal, Radio, Spinner, TextArea, showToast } from '@Components';
import { useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { AnalyzingAnimation, GenerateModal, UploadJdCard } from '@Modules';
import { canStartInterview, createNewJdSchedule, getJdItemList, hideCreateJdModal, postJdVariant, selectedScheduleId, showCreateJddModal } from '@Redux';
import { ROUTES } from '@Routes';
import { FROM_JD_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const interviewDurations = [
    { id: '1', text: 'Short', subText: '(5 mins)', value: 5 },
    { id: '2', text: 'Medium', subText: '(15 mins)', value: 15 },
    { id: '3', text: 'Long', subText: '(30 mins)', value: 30 },
];

const PLACE_HOLDER = {
    "sector": "Software, Banking...",
    "role": "Developer, Manager...",
    "portal": "Naukri, LinkedIn...",
    "jd": `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`
}

const INTERVAL_TIME = 5000


function FromJD() {
    const CHAR_LENGTH = 5000
    const VIEW_MORE_LENGTH = 300


    const ERROR_MESSAGE = "In beta version, you can upload only max of " + CHAR_LENGTH + " characters."
    const { createJdModal, jdItem } = useSelector((state: any) => state.DashboardReducer);

    const { goTo } = useNavigation();
    const position = useInput('');
    const experience = useInput('');
    const jd = useInput('');
    const sector = useInput('');
    const generateJdModal = useModal(false);
    const completedModal = useModal(false);
    const [scheduleId, setScheduleId] = useState(undefined)
    const jdScheduleModal = useModal(false);
    const [loading, setLoading] = useState(true);
    const [jdMore, setJdMore] = useState<any>([])
    const [fresherChecked, setFresherChecked] = useState(false)

    const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined)
    const [selectedDuration, setSelectedDuration] = useState(interviewDurations[0]);
    const startInterviewLoader = useLoader(false);


    useEffect(() => {
        getKnowledgeGroupFromJdHandler();
    }, [])


    const dispatch = useDispatch()

    const getKnowledgeGroupFromJdHandler = () => {
        const params = { from_jd: true }

        dispatch(
            getJdItemList({
                params,
                onSuccess: () => () => {
                    setLoading(false)
                },
                onError: () => () => {
                },
            })
        );
    };

    function submitJdApiHandler() {
        const params = {
            sector_name: sector.value,
            position: position.value,
            interview_duration: selectedDuration.value,
            experience: fresherChecked ? '0' : experience.value,
            jd: jd.value
        }

        const validation = validate(FROM_JD_RULES, params)

        if (ifObjectExist(validation)) {

            dispatch(hideCreateJdModal())
            generateJdModal.show();
            dispatch(postJdVariant({
                params,
                onSuccess: (res: any) => () => {
                    const { details } = res;


                    if (details?.schedule_id) {
                        const canStartParams = { schedule_id: details?.schedule_id }
                        setScheduleId(details?.schedule_id)
                        const intervalId = setInterval(() => {
                            dispatch(canStartInterview({
                                params: canStartParams,
                                onSuccess: (res: any) => () => {
                                    generateJdModal.hide();
                                    completedModal.show();
                                    getKnowledgeGroupFromJdHandler();
                                    resetValues();
                                    // showToast(res.status, 'success');
                                    clearInterval(intervalId);
                                },
                                onError: (error: any) => () => {
                                    console.log(error);
                                }
                            }))
                        }, INTERVAL_TIME);
                    }
                },
                onError: (error) => () => {
                    generateJdModal.hide();
                    // addJdModal.show();
                    dispatch(showCreateJddModal())
                    showToast(error.error_message, 'error')
                },
            }))
        } else {
            showToast(getValidateError(validation))
        }
    }

    function resetValues() {
        position.set('')
        experience.set('')
        jd.set('')
        sector.set('')
    }


    function createNewJdScheduleApiHandler(id: string) {
        const params = {
            "knowledge_group_variant_id": id
        }

        generateJdModal.show();

        dispatch(
            createNewJdSchedule({
                params,
                onSuccess: (res: any) => () => {

                    const { details } = res;

                    if (details?.schedule_id) {
                        const canStartParams = { schedule_id: details?.schedule_id }
                        setScheduleId(details?.schedule_id)
                        const intervalId = setInterval(() => {
                            dispatch(canStartInterview({
                                params: canStartParams,
                                onSuccess: (res: any) => () => {
                                    generateJdModal.hide();
                                    completedModal.show();
                                    getKnowledgeGroupFromJdHandler();
                                    resetValues();
                                    showToast(res.status, 'success');
                                    clearInterval(intervalId);
                                },
                                onError: (error: any) => () => {
                                    console.log(error);
                                }
                            }))
                        }, INTERVAL_TIME);
                    }
                },
                onError: () => () => {
                    generateJdModal.hide();
                },
            }))
    }



    function proceedInterviewHandler(id: string) {
        if (id) {
            if (id !== '-1') {

                // const canStartParams = { schedule_id: id }
                startInterviewLoader.hide();
                dispatch(selectedScheduleId(id))
                goTo(ROUTES['designation-module'].interview + "/" + id)

                // startInterviewLoader.show();
                // const intervalId = setInterval(() => {
                //     dispatch(canStartInterview({
                //         params: canStartParams,
                //         onSuccess: (res: any) => () => {
                //             startInterviewLoader.hide();
                //             goTo(ROUTES['designation-module'].interview + "/" + id)
                //             clearInterval(intervalId);
                //         },
                //         onError: (error: any) => () => {
                //             console.log(error);
                //         }
                //     }))
                // }, INTERVAL_TIME);

            } else {
                jdScheduleModal.show();
            }
        }
    }


    function proceedReport(id: string) {
        if (id) {
            goTo(ROUTES['designation-module'].report + "/" + id)
        }
    }





    return (
        <>
            {loading ? <div className={'d-flex justify-content-center my-9'}><Spinner /></div> :
                jdItem && jdItem.length > 0 ?
                    <div>
                        {
                            <div className={'mt-3'}>
                                {jdItem && jdItem.length > 0 && jdItem.map((item: any, index: any) => {

                                    const { job_description: { details, experience }, schedules, name, id, interview_duration } = item

                                    const more = jdMore[index]?.more

                                    const modifiedSchedules = schedules.filter((each: any) => {
                                        const { is_started, is_complete, id } = each
                                        return is_started && is_complete
                                    })

                                    const proceedInterview = schedules.find((each: any) => {
                                        const { is_complete } = each
                                        return !is_complete
                                    })


                                    const basic_info = proceedInterview?.custom_interviewee_details?.basic_info

                                    const basicInfo = basic_info && basic_info.first_name ? basic_info : null;
                                    let demoDisplayName: any = ''
                                    if (basicInfo)
                                        demoDisplayName = " - " + basicInfo?.first_name

                                    return (
                                        <Card className="mt--3 ">
                                            <div className={'d-flex justify-content-between'}>
                                                <div>
                                                    {name ? <span style={{
                                                        fontSize: "21px"
                                                    }} className='mb-0 text-primary font-weight-bolder'>
                                                        {name.charAt(0).toUpperCase() + name.slice(1) + demoDisplayName}
                                                    </span> : <></>
                                                    }

                                                    {interview_duration &&
                                                        <div className='col'>
                                                            <div className='row d-flex align-items-center mb-1'>
                                                                <Image src={icons.clock} height={17} width={17} style={{
                                                                    objectFit: 'contain'
                                                                }} />
                                                                <h5 style={{
                                                                    fontSize: "14px"
                                                                }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${interview_duration} mins`}</h5>
                                                            </div>
                                                        </div>
                                                    }
                                                    <h5 className='mb-0 pointer'>{experience === 0 ? "Fresher" : "" + experience + (experience === 1 ? " year " : " years ") + "of experience"}</h5>
                                                </div>


                                                {
                                                    proceedInterview ?
                                                        <div>
                                                            <Button
                                                                loading={startInterviewLoader.loader}
                                                                className={'px-4 border border-primary'}
                                                                text={proceedInterview.is_started ? "Resume Interview" : "Start Interview"}
                                                                onClick={() => {
                                                                    proceedInterviewHandler(proceedInterview?.id);
                                                                }}
                                                            />
                                                        </div> :
                                                        <div>
                                                            <Button
                                                                text={'Try Another'}
                                                                onClick={() => {
                                                                    createNewJdScheduleApiHandler(id);
                                                                }}
                                                            />
                                                        </div>
                                                }
                                            </div>
                                            <div className='col mt-3'>
                                                <div className='row'>
                                                    <div className='col ml-0'>
                                                        {
                                                            details.length < VIEW_MORE_LENGTH ?
                                                                <div className='row'>
                                                                    <div className='text-details text-black'>{`${details}`}</div>
                                                                </div>
                                                                :
                                                                <>
                                                                    {more ?
                                                                        <div className='row'>
                                                                            <div className='text-details text-black'>
                                                                                {details.split('\n\n').map((paragraph, index) => (
                                                                                    <React.Fragment key={index}>
                                                                                        {index > 0 && <br />} {/* Add <br /> between paragraphs except for the first one */}
                                                                                        {paragraph}
                                                                                    </React.Fragment>
                                                                                ))}
                                                                                <span className='h4 text-primary ml-3 pointer' onClick={() => {
                                                                                    const updatedData: any = [...jdMore];
                                                                                    updatedData[index] = { ...updatedData[index], more: false };
                                                                                    setJdMore(updatedData);
                                                                                }}>
                                                                                    View Less
                                                                                </span>
                                                                            </div>


                                                                        </div>
                                                                        :
                                                                        <div className='row'>
                                                                            <div className='text-details text-black'>{details.slice(0, VIEW_MORE_LENGTH) + " ..."}
                                                                                <span className='h4 text-primary ml-1 pointer'
                                                                                    onClick={() => {
                                                                                        const updatedData: any = [...jdMore]
                                                                                        updatedData[index] = { ...updatedData[index], more: true }
                                                                                        setJdMore(updatedData)
                                                                                    }}
                                                                                >
                                                                                    View More
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    }
                                                                </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col mt-3'>
                                                {modifiedSchedules && modifiedSchedules.length > 0 && <Divider className={'row'} space={"3"} />}
                                                {
                                                    modifiedSchedules &&
                                                    modifiedSchedules.length > 0 &&
                                                    modifiedSchedules.slice().reverse().map((each: any, index: number) => {
                                                        const { is_complete, is_report_complete, id, created_at, custom_interviewee_details } = each;

                                                        const basic_info = custom_interviewee_details?.basic_info


                                                        const basicInfo = basic_info && basic_info.first_name ? basic_info : null;
                                                        let demoDisplayName: any = ''
                                                        if (basicInfo)
                                                            demoDisplayName = " - " + basicInfo?.first_name

                                                        const getDisplayTimeFromMoment = (timestamp: any) => {
                                                            const currentTime = new Date().getTime();
                                                            const createdAt = new Date(timestamp).getTime();
                                                            const timeDifference = Math.floor((currentTime - createdAt) / (1000 * 60));

                                                            if (timeDifference < 60) {
                                                                return `${timeDifference} mins ago`;
                                                            } else if (timeDifference < 1440) {
                                                                const hours = Math.floor(timeDifference / 60);
                                                                return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
                                                            } else {
                                                                const days = Math.floor(timeDifference / 1440);
                                                                return `${days} ${days === 1 ? 'day' : 'days'} ago`;
                                                            }
                                                        };

                                                        return (
                                                            <div>
                                                                <div className='row align-items-center'>
                                                                    <h5 className='col m-0 p-0'>{"Interview " + (index + 1) + demoDisplayName}</h5>
                                                                    <h5 className='col mb-0 text-center'>{(is_complete ? "Completed: " : "Created at: ") + getDisplayTimeFromMoment(created_at)}</h5>
                                                                    <div className='col d-flex justify-content-end'>
                                                                        {
                                                                            is_report_complete &&
                                                                            <div className='row'>
                                                                                <Button
                                                                                    text={'View Report'}
                                                                                    onClick={() => {
                                                                                        proceedReport(id);
                                                                                    }}
                                                                                />
                                                                            </div>
                                                                        }
                                                                        {
                                                                            is_complete && !is_report_complete &&
                                                                            <div>
                                                                                <span className="name mb-0 text-sm">Generating Report ...</span>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <Divider className={'row'} space={"3"} />
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Card>
                                    )
                                })
                                }

                            </div >

                        }
                    </div >
                    :
                    <UploadJdCard />
            }


            <Modal title={'Create Interview'} isOpen={createJdModal} onClose={() => { dispatch(hideCreateJdModal()) }}>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <Input
                            isMandatory
                            heading={'Sector'}
                            placeHolder={PLACE_HOLDER.sector}
                            value={sector.value}
                            onChange={sector.onChange} />
                    </div>
                    <div className={'col-6'}>
                        <Input
                            isMandatory
                            heading={'Role'}
                            placeHolder={PLACE_HOLDER.role}
                            value={position.value}
                            onChange={position.onChange} />
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col-6'}>
                        {fresherChecked ? (
                            <div className='ml-2'>
                                <Input
                                    isMandatory
                                    heading={'Years of experience'}
                                    type={'text'}
                                    placeHolder={'Fresher'}
                                    value={'Fresher'}
                                    disabled
                                />
                            </div>
                        ) : (
                            <div>
                                <Input
                                    isMandatory
                                    heading={'Years of experience'}
                                    type={'number'}
                                    placeHolder={'Experience'}
                                    value={experience.value}
                                    onChange={experience.onChange}
                                />
                            </div>
                        )}
                        <span className={'position-absolute left-9 pl-5 top-0'}>
                            <Checkbox className={'text-primary'} text={'Fresher'} defaultChecked={fresherChecked} onCheckChange={(checked) => {
                                setFresherChecked(checked)
                            }} />
                        </span>
                    </div>


                    <div className={'col-6 mt-1'}>
                        <InputHeading Class={'mb-0'} heading={'Interview Duration'} isMandatory />
                        <Radio
                            selected={selectedDuration}
                            selectItem={selectedDuration}
                            data={interviewDurations}
                            onRadioChange={(selected) => {
                                if (selected) {
                                    setSelectedDuration(selected)
                                }
                            }}
                        />
                    </div>

                </div>

                <TextArea
                    isMandatory
                    error={jdDescriptionError}
                    placeholder={PLACE_HOLDER.jd}
                    heading='Job Description'
                    value={jd.value.slice(0, CHAR_LENGTH)}
                    onChange={(e) => {
                        let value = e.target.value
                        if (value.length > CHAR_LENGTH) {
                            setJdDescriptionError(ERROR_MESSAGE)
                        } else {
                            setJdDescriptionError(undefined)
                        }
                        jd.set(value)
                    }}
                />

                <div className='text-center'>
                    <Button block size='md' text={'Submit'} onClick={submitJdApiHandler} />
                </div>

            </Modal >

            <GenerateModal title={'Preparing your Interview'} isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
                <AnalyzingAnimation />
            </GenerateModal>

            <Modal isOpen={completedModal.visible} onClose={completedModal.hide}>
                <div className='text-center '>
                    <div className='display-1 text-black'>
                        Your Interview is Ready!
                    </div>
                </div>
                <div className='text-center mb-5 mt-3'>
                    <small className='text-black'>Click Below to Start Interview</small>
                    <div className='row justify-content-center pt-1'>
                        <div className='col-4'>
                            <Button
                                loading={startInterviewLoader.loader}
                                block
                                size='md'
                                text={'Start Now'}
                                onClick={() => {
                                    if (scheduleId) {
                                        proceedInterviewHandler(scheduleId)
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </Modal>


            <Modal isOpen={jdScheduleModal.visible} onClose={jdScheduleModal.hide}>
                <div className='mt--5 pb-4'>
                    <div className='text-center '>
                        <div className='display-4 text-black'>
                            {'Interview Preparation is in progress,'}
                        </div>
                        <div className='display-4 text-black'>
                            {'it will take couple of minutes,'}
                        </div>
                        <div className='display-4 text-black'>
                            {'you will receive schedule confirmation over mail.'}
                        </div>
                    </div>
                    <div className='text-center py-3'>
                        <div className='row justify-content-center pt-1'>
                            <div className='col-4'>
                                <Button
                                    block
                                    size='md'
                                    text={'Close'}
                                    onClick={() => {
                                        jdScheduleModal.hide();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export { FromJD };
