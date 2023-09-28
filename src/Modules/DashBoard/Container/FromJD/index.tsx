/* eslint-disable react-hooks/rules-of-hooks */
import { icons } from '@Assets';
import { Button, Card, Checkbox, Divider, H, Input, Modal, Radio, Sliders, Spinner, TextArea, showToast } from '@Components';
import { useInput, useModal, useNavigation } from '@Hooks';
import { AnalyzingAnimation, GenerateModal, UploadJdCard } from '@Modules';
import { createNewJdSchedule, getJdItemList, postJdVariant, selectedScheduleId } from '@Redux';
import { ROUTES } from '@Routes';
import { FROM_JD_RULES, getValidateError, ifObjectExist, interviewDurations, validate } from '@Utils';
import Slider from "nouislider";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const PLACE_HOLDER = {
    "sector": "Software, Banking...",
    "role": "Developer, Manager...",
    "portal": "Naukri, LinkedIn...",
    "jd": `Copy a Job Description from the Job portal(Naukri, LinkedIn...\n\n1.Visit the job portal of choice (e.g., Naukri.com) in your web browser.\n2.Search using keywords for a job listing that interests you.\n3.Click the job title to view the full description.\n4.Highlight, copy, and paste the text into your preferred application seamlessly.`
}



function FromJD() {
    const CHAR_LENGTH = 3000
    const VIEW_MORE_LENGTH = 350
    const ERROR_MESSAGE = "Please provide a job description within " + CHAR_LENGTH + " characters."
    const { jdItem } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation();
    const position = useInput('');
    const experience = useInput('');
    const jd = useInput('');
    const sector = useInput('');
    const addJdModal = useModal(false);
    const generateJdModal = useModal(false);
    const completedModal = useModal(false);
    const [scheduleId, setScheduleId] = useState(undefined)
    const jdScheduleModal = useModal(false);
    const [loading, setLoading] = useState(true);
    const [jdMore, setJdMore] = useState<any>([])
    const [fresherChecked, setFresherChecked] = useState(false)
    const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined)
    const [selectedDuration, setSelectedDuration] = useState(interviewDurations[0]);
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (newValue: any) => {
        console.log('Slider value changed:', newValue);
        setSliderValue(newValue)
    }
console.log('sliderValuesliderValue',);



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
            experience: fresherChecked ? '0' : sliderValue,
            jd: jd.value
        }

        const validation = validate(FROM_JD_RULES, params)

        if (ifObjectExist(validation)) {
            addJdModal.hide();
            generateJdModal.show();
            dispatch(postJdVariant({
                params,
                onSuccess: (res: any) => () => {
                    generateJdModal.hide();
                    const { details } = res;
                    if (details?.schedule_id) {
                        setScheduleId(details?.schedule_id)
                    }
                    completedModal.show();
                    getKnowledgeGroupFromJdHandler();
                    resetValues();
                    setSelectedDuration(interviewDurations[''])
                    showToast(res.status, 'success')
                },
                onError: (error) => () => {
                    generateJdModal.hide();
                    addJdModal.show();
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

        dispatch(createNewJdSchedule({
            params,
            onSuccess: (res: any) => () => {

                generateJdModal.hide();
                const { details } = res;
                if (details?.schedule_id) {
                    setScheduleId(details?.schedule_id)
                }
                completedModal.show();
                getKnowledgeGroupFromJdHandler();
            },
            onError: () => () => {
                generateJdModal.hide();
            },
        }))
    }


    function proceedInterviewHandler(id: string) {
        if (id) {
            if (id !== '-1') {
                dispatch(selectedScheduleId(id))
                goTo(ROUTES['designation-module'].interview + "/" + id)
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
    const openAddJdModalButton = () => (
        <Button
            size="md"
            className="mt-3"
            block
            text={'CREATE INTERVIEW'}
            onClick={addJdModal.show}
        />
    );

    return (
        <>
            {loading ? <div className={'d-flex justify-content-center my-9 py-5'}><Spinner /></div> :
                jdItem && jdItem.length > 0 ?
                    <div>
                        <div className={'mx--1 mt--4'}>
                            {openAddJdModalButton()}
                        </div>
                        <div style={{
                            paddingTop: '20px'
                        }}></div>
                        {
                            <div className={'mt-3'}>
                                {jdItem && jdItem.length > 0 && jdItem.map((item: any, index: any) => {

                                    const { job_description: { details, experience }, schedules, sector, name, id } = item

                                    const more = jdMore[index]?.more

                                    const modifiedSchedules = schedules.filter((each: any) => {
                                        const { is_started, is_complete } = each
                                        return is_started && is_complete
                                    })

                                    const proceedInterview = schedules.find((each: any) => {
                                        const { is_complete } = each
                                        return !is_complete
                                    })

                                    return (
                                        <Card className="mt--3">
                                            <div className={'d-flex justify-content-between'}>
                                                <h3 className='mb-0 pointer text-black'>{name}</h3>
                                                {proceedInterview ?
                                                    <div>
                                                        <Button
                                                            className={'px-4 border border-primary'}
                                                            text={proceedInterview.is_started ? "Resume Interview" : "Start Interview"}
                                                            onClick={() => {
                                                                proceedInterviewHandler(proceedInterview?.id);
                                                            }}
                                                        />
                                                    </div> :
                                                    <Button
                                                        size={'sm'}
                                                        text={'Try Another'}
                                                        onClick={() => {
                                                            createNewJdScheduleApiHandler(id);
                                                        }}
                                                    />
                                                }
                                            </div>
                                            <h5 className='mb-0 pointer text-muted'>{sector}</h5>
                                            <div className='col mt-3'>
                                                <div className='row align-items-center'>
                                                    <img src={icons.briefCaseBlack} alt="Comment Icon" height={16} width={16} />
                                                    <small className='text-sm text-black col'>Experience with {experience} years</small>
                                                </div>
                                            </div>
                                            <div className='col mt-2'>
                                                <div className='row'>
                                                    <img src={icons.information} alt="Comment Icon" height={16} width={16} style={{
                                                        marginTop: 2
                                                    }} />
                                                    <div className='col ml-3'>
                                                        {
                                                            details.length < VIEW_MORE_LENGTH ?
                                                                <div className='row'>
                                                                    <small className='text-sm text-black'>{details}</small>
                                                                </div>
                                                                :
                                                                <>
                                                                    {more ?
                                                                        <div className='row'>
                                                                            <small className='text-sm text-black'>
                                                                                {details}
                                                                                <span className='h5 text-primary ml-1 pointer'
                                                                                    onClick={() => {
                                                                                        const updatedData: any = [...jdMore]
                                                                                        updatedData[index] = { ...updatedData[index], more: false }
                                                                                        setJdMore(updatedData)
                                                                                    }}>
                                                                                    View Less
                                                                                </span>
                                                                            </small>
                                                                        </div>
                                                                        :
                                                                        <div className='row'>
                                                                            <small className='text-sm text-black'>{details.slice(0, VIEW_MORE_LENGTH) + " ..."}
                                                                                <span className='h5 text-primary ml-1 pointer'
                                                                                    onClick={() => {
                                                                                        const updatedData: any = [...jdMore]
                                                                                        updatedData[index] = { ...updatedData[index], more: true }
                                                                                        setJdMore(updatedData)
                                                                                    }}
                                                                                >
                                                                                    View More
                                                                                </span>
                                                                            </small>
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
                                                        const { is_complete, is_report_complete, id, created_at } = each;

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
                                                                    <h5 className='col m-0 p-0'>{"Interview " + (index + 1)}</h5>
                                                                    <h5 className='col mb-0 text-center'>{(is_complete ? "Completed: " : "Created at: ") + getDisplayTimeFromMoment(created_at)}</h5>
                                                                    <div className='col text-right p-0 m-0'>
                                                                        {is_report_complete &&
                                                                            <Button
                                                                                text={'View Report'}
                                                                                onClick={() => {
                                                                                    proceedReport(id);
                                                                                }} />
                                                                        }

                                                                        {is_complete && !is_report_complete && <div>
                                                                            <span className="name mb-0 text-sm">Generating Report ...</span>
                                                                        </div>}
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
                    <UploadJdCard openAddJdModal={openAddJdModalButton} />
            }


            <Modal title={'Create Interview'} isOpen={addJdModal.visible} onClose={addJdModal.hide}>
                <div className={'row'}>
                    <div className={'col-6'}>
                        <Input
                            heading={'Sector'}
                            placeHolder={PLACE_HOLDER.sector}
                            value={sector.value}
                            onChange={sector.onChange} />
                    </div>
                    <div className={'col-6'}>
                        <Input
                            heading={'Role'}
                            placeHolder={PLACE_HOLDER.role}
                            value={position.value}
                            onChange={position.onChange} />
                    </div>
                </div>

                <div className={'row'}>
                    <div className={'col-6'}>
                        {fresherChecked ? (
                            <Sliders
                                heading={'Years of Experience'}
                                min={0}
                                max={30}
                                value={'sliderValue'}
                                step={1}
                                onChange={handleSliderChange}
                                disabled={true}
                            />
                        ) : (
                            <div>
                                <Sliders
                                    heading={'Years of Experience'}
                                    min={0}
                                    max={30}
                                    value={sliderValue}
                                    step={1}
                                    onChange={handleSliderChange}
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
                        <H style={{ fontSize: '13px', color: '#525f7f' }} text={'Choose Interview Duration'} tag={'h4'} />
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

            <GenerateModal title={'Create Interview Schedule From JD'} isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
                <AnalyzingAnimation />
            </GenerateModal>

            <Modal isOpen={completedModal.visible} onClose={completedModal.hide}>
                <div className='mt--5 pb-4'>
                    <div className='text-center '>
                        <div className='display-1 text-black'>
                            Your Interview is Ready!
                        </div>
                    </div>
                    <div className='text-center py-3'>
                        <small className='text-black'>Click Below to Start Interview</small>
                        <div className='row justify-content-center pt-1'>
                            <div className='col-4'>
                                <Button
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
