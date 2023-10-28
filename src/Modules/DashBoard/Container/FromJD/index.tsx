/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
import { icons } from '@Assets';
import { Button, Card, Checkbox, Divider, Image, Input, InputHeading, Modal, Radio, Spinner, TextArea, showToast } from '@Components';
import { useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { AnalyzingAnimation, GenerateModal, PreparingYourInterview, UploadJdCard } from '@Modules';
import { canStartInterview, createNewJdSchedule, getJdItemList, hideCreateJdModal, postJdVariant, selectedScheduleId, showCreateJddModal } from '@Redux';
import { ROUTES } from '@Routes';
import { FROM_JD_RULES, formatDateTime, getValidateError, ifObjectExist, validate } from '@Utils';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

const interviewDurations: any = [
    { id: 1, text: 'Quick', subText: '5 mins', value: 5, isActive: false },
    { id: 2, text: 'Short', subText: '10 mins', value: 10, isActive: false },
    { id: 3, text: 'Medium', subText: '15 mins', value: 15, isActive: false },
    { id: 4, text: 'Long', subText: '30 mins', value: 30, isActive: false },
];




const experienceInNumber: number[] = Array.from({ length: 31 }, (_, index) => index);


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
    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);



    const ERROR_MESSAGE = "In beta version, you can upload only max of " + CHAR_LENGTH + " characters."
    const { createJdModal, jdItem } = useSelector((state: any) => state.DashboardReducer);

    const { goTo } = useNavigation();
    const position = useInput('');
    const [experience, setExperience] = useState('0')
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
    const [selectedDuration, setSelectedDuration] = useState('');
    const startInterviewLoader = useLoader(false);

    const handleDurationClick = (interviewDurations) => {
        setSelectedDuration(interviewDurations);
    };
    const [changeColorButton, setChangeColorButton] = useState<any>(interviewDurations)


    useEffect(() => {
        getKnowledgeGroupFromJdHandler();

        return () => {
            stopInterval();
        };

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
            interview_duration: selectedDuration,
            experience: experience,
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
                        intervalIdRef.current = setInterval(() => {
                            dispatch(canStartInterview({
                                params: canStartParams,
                                onSuccess: (res: any) => () => {
                                    generateJdModal.hide();
                                    completedModal.show();
                                    getKnowledgeGroupFromJdHandler();
                                    resetValues();
                                    // showToast(res.status, 'success');
                                    if (intervalIdRef.current) {
                                        clearInterval(intervalIdRef.current);
                                    }
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
        setExperience('')
        jd.set('')
        sector.set('')
        setSelectedDuration('')
    }
    console.log('1111111111111', selectedDuration);

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



    const stopInterval = () => {
        if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };
    console.log('1111111111111111', experience);

    const handleItemClick = (index) => {
        const updatedButtons = changeColorButton.map((item, i) => {
          if (i === index) {
            return { ...item, isActive: true };
          } else {
            return { ...item, isActive: false };
          }
        });
        setChangeColorButton(updatedButtons);
      };


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

                                    const copyInterviewLink = schedules && schedules.length > 0 && schedules[0].custom_interview_link;
                                    console.log('copyInterviewLink', copyInterviewLink)

                                    const basic_info = proceedInterview?.custom_interviewee_details?.basic_info

                                    const basicInfo = basic_info && basic_info.first_name ? basic_info : null;
                                    let demoDisplayName: any = ''
                                    if (basicInfo)
                                        demoDisplayName = " - " + basicInfo?.first_name

                                    return (
                                        <Card className="mt-5 rounded-sm mx-md-5"
                                        style={{
                                            borderWidth: "1px",
                                            borderColor: "#d3deff",
                                            backgroundColor: "transparent"
                                        }}>
                                            <div className='px-md-4 py-md-3'>
                                                <div className={'d-flex justify-content-between'}  >
                                                    <div className='mt-2'>
                                                        {name ? <span style={{
                                                            fontSize: "21px"
                                                        }} className='mb-0 text-secondary font-weight-bolder'>
                                                            {name.charAt(0).toUpperCase() + name.slice(1) + demoDisplayName}
                                                        </span> : <></>
                                                        }
                                                        <small className={"text-secondary ml-1"}>{experience}</small>
                                                        {
                                                            modifiedSchedules &&
                                                            modifiedSchedules.length > 0 &&
                                                            modifiedSchedules.slice().reverse().map((each: any, index: number) => {

                                                                const { is_complete, is_report_complete, id, created_at, custom_interviewee_details } = each;
                                                                console.log(is_complete, 'com', created_at);


                                                                return (
                                                                    <>  {index === 0 && <div className=' d-flex align-items-center'>
                                                                        <img src={icons.check} height={20} width={20} style={{
                                                                            objectFit: 'contain'
                                                                        }} />
                                                                        <h5 className='col mb-0 font-weight-normal p-0 font-weight-bolder text-secondary'>{(is_complete ? "Completed " : "Created at ")} <span className='font-weight-normal text-secondary'>{("on ") + formatDateTime(created_at)} </span></h5>
                                                                    </div>
                                                                    }
                                                                    </>

                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <div>
                                                        <div className='d-flex flex-column justify-content-center align-items-center'>
                                                            {
                                                                proceedInterview ?
                                                                    <div>
                                                                        <Button style={{ fontSize: "15px" }}
                                                                            size='md'
                                                                            loading={startInterviewLoader.loader}
                                                                            className={'px-md-5 border border-primary rounded-sm'}
                                                                            text={proceedInterview.is_started ? "Resume Interview" : "Start Interview"}
                                                                            onClick={() => {
                                                                                proceedInterviewHandler(proceedInterview?.id);
                                                                            }}
                                                                        />
                                                                    </div> :
                                                                    <div>
                                                                        <Button style={{ fontSize: "15px" }}
                                                                            size='md'
                                                                            outline
                                                                            className={'px-md-5 border border-primary rounded-sm'}
                                                                            text={'Try Another'}
                                                                            onClick={() => {
                                                                                createNewJdScheduleApiHandler(id);
                                                                            }}
                                                                        />
                                                                    </div>
                                                            }
                                                            {interview_duration &&
                                                                <div>
                                                                    <div className='row d-flex align-items-center mt-1'>
                                                                        {/* <Image src={icons.clock} height={17} width={17} style={{
                                                                    objectFit: 'contain'
                                                                }} /> */}
                                                                        <h5 style={{
                                                                            fontSize: "14px"
                                                                        }} className='mb-0 text-secondary font-weight-bolder ml-2'>{`${interview_duration} mins`}<span className={"font-weight-normal"}> Duration</span></h5>

                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>


                                                </div>

                                                <div className='col mt-3'>
                                                    <div className='row'>
                                                        <div className='col ml-0' style={{ fontSize: "14px" }}>
                                                            {
                                                                details.length < VIEW_MORE_LENGTH ?
                                                                    <div className='row'>
                                                                        <div className='text-details text-default'>{`${details}`}</div>
                                                                    </div>
                                                                    :
                                                                    <>
                                                                        {more ?
                                                                            <div className='row'>
                                                                                <div className='text-details text-default'>
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
                                                                                <div className='text-details text-default'>{details.slice(0, VIEW_MORE_LENGTH) + " ..."}
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
                                                {modifiedSchedules && modifiedSchedules.length > 0 &&
                                                    <div className='mt-3 px-md-4 pt-md-5' style={{ backgroundColor: "#fafbff" }}>
                                                        {/* {modifiedSchedules && modifiedSchedules.length > 0 && <Divider className={'row'} space={"3"} />} */}
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
                                                                    <div className='d-flex flex-column'>
                                                                        {
                                                                            index === 0 && <div className='d-flex '>
                                                                                <div className='col-3'></div>
                                                                                <div className='col-7 d-flex justify-content-around mb-3'>
                                                                                    <h4 className='ml-4'>Skill matrix</h4>
                                                                                    <h4>Communication</h4>
                                                                                    <h4 className='mr-5'>Aptitude</h4>
                                                                                </div>
                                                                                <div className='col-2'></div>
                                                                            </div>
                                                                        }
                                                                        <div className='d-flex'>

                                                                            <div className='col-3'>
                                                                                <h5 className='col m-0 p-0 text-secondary'>{"Interview " + (index + 1) + demoDisplayName}</h5>
                                                                                <h5 className='col mb-0 pl-1 font-weight-normal text-default'>{(is_complete ? "Completed " : "Created at ") + getDisplayTimeFromMoment(created_at)}</h5>
                                                                            </div>
                                                                            <div className='col-9'>
                                                                                <div className='d-flex'>
                                                                                    <div className='col-9 d-flex justify-content-around align-items-center'>
                                                                                        <h5>-</h5>
                                                                                        <h5>-</h5>
                                                                                        <h5>-</h5>
                                                                                    </div>

                                                                                    <div className='col-3 d-flex justify-content-center'>
                                                                                        {
                                                                                            is_report_complete &&
                                                                                            <div >
                                                                                                <Button
                                                                                                    size='md'
                                                                                                    className='btn btn-outline-primary rounded-sm'
                                                                                                    style={{
                                                                                                        borderColor: "#d8dade",
                                                                                                        fontSize: "15px"
                                                                                                    }}
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
                                                                                <Divider className={"col-11 mx--3 text-"} space={"3"} />

                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
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

            <div className='p-5'>
                <Modal size={'lg'} isOpen={createJdModal} onClose={() => { dispatch(hideCreateJdModal()) }}>
                    <div className={'m-md-5 mt-sm-0 mt-5'}>
                        <div className='display-4 text-secondary font-weight-bolder mt--6 mb-md-5'>{'Create Interview'}
                            <p className={'text-default'} style={{ fontSize: '15px', fontWeight: 400 }}>{'Input job details, specifying qualifications, requirements, interview duration'}</p>
                        </div>

                        <div className={'row'}>
                            <div className={'col-md-8 col-sm-0 col-12'}>
                                <Input
                                    heading={'Position'}
                                    placeHolder={PLACE_HOLDER.role}
                                    value={position.value}
                                    onChange={position.onChange} />
                            </div>

                            <div className={'col-md-4 col-sm-0 col-12 mb-sm-0 mb-4'}>
                                <InputHeading heading={'Experience'} />
                                <select
                                    id="experience"
                                    value={experience}
                                    onChange={(e) => setExperience(e.target.value)}
                                    className={`form-control ${experience.length === 0 ? 'text-gray' : 'text-black'} rounded-sm`}
                                >
                                    {Array.from({ length: 31 }, (_, index) => (
                                        <option key={index} value={index.toString()}>
                                            {index === 0 ? 'Fresher' : index}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <TextArea
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

                        <div className={'mb-sm-4'}>
                            <InputHeading heading={'Interview Duration'} />
                            <div className='d-flex flex-wrap justify-content-between'>
                                    {
                                        changeColorButton.map((item, index) => {
                                            return <div className='mb-4 mb-sm-0'>
                                                <Button text={item.subText} className={`${item.isActive ? "btn-outline-primary" : "btn-outline-light-gray text-default"} rounded-sm px-sm-4`} style={{ width: "140px" }} onClick={() => {
                                                    setSelectedDuration(item.value)
                                                    
                                                    handleItemClick(index)}} />
                                                
                                            </div>
                                        })
                                    }
                                </div>
                        </div>

                        <div className={'col m-0 p-0'}>
                            <Input
                                heading={'Sector'}
                                placeHolder={PLACE_HOLDER.sector}
                                value={sector.value}
                                onChange={sector.onChange} />
                        </div>

                        <div className='text-center mt-md-6'>
                            <Button className={'rounded-sm px-md-5 px-sm-0 px-6'} size='md' text={'Start Inteview'} width={30} onClick={submitJdApiHandler} />
                        </div>
                    </div>

                </Modal >

            </div>

            <Modal isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
                <PreparingYourInterview />
            </Modal>

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
