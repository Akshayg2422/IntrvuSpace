/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Card, Divider, Modal, TextArea, Input, showToast, Spinner } from '@Components';
import { createNewJdSchedule, getJdItemList, postJdVariant, selectedScheduleId, getJdItemListSuccess } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useNavigation, useModal } from '@Hooks';
import { AnalyzingAnimation, GenerateModal, UploadJdCard } from '@Modules';
import { ROUTES } from '@Routes';
import { validate, FROM_JD_RULES, ifObjectExist, getValidateError } from '@Utils';
import { icons } from '@Assets';


function FromJD() {

    const ERROR_MESSAGE = "Job description should be below 300 chars"

    const { jdItem } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation();

    const position = useInput('');
    const experience = useInput('');
    const jd = useInput('');
    const portalUrl = useInput('')
    const sector = useInput('');
    const addJdModal = useModal(false);
    const generateJdModal = useModal(false);
    const completedModal = useModal(false);
    const [scheduleId, setScheduleId] = useState(undefined)
    const jdScheduleModal = useModal(false);
    const [loading, setLoading] = useState(true);
    const [jdMore, setJdMore] = useState<any>([])


    const [jdDescriptionError, setJdDescriptionError] = useState<any>(undefined)

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
            experience: experience.value,
            reference_link: portalUrl.value,
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
        portalUrl.set('')
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
            text={'Upload job description details and start interview'}
            onClick={addJdModal.show}
        />
    );

    return (
        <>
            {loading ? <div className={'d-flex justify-content-center my-9 py-5'}><Spinner /></div> :
                jdItem && jdItem.length > 0 ? <div>
                    <div className={'mx--1 mt--4'}>
                        {openAddJdModalButton()}
                    </div>
                    <div style={{
                        paddingTop: '20px'
                    }}></div>
                    {
                        <div className={'row mt-3'}>
                            {jdItem && jdItem.length > 0 && jdItem.map((item: any, index: any) => {

                                const { job_description: { details, experience }, schedules, sector, name, id } = item
                                const isTryAgain = schedules && schedules.length > 0 && schedules.every((each: any) => {
                                    return each.is_complete
                                })

                                const more = jdMore[index]?.more

                                const modifiedSchedules = schedules.filter((each: any) => {
                                    const { is_started, is_complete } = each
                                    return is_started && is_complete
                                })


                                const proceedInterview = schedules.find((each: any) => {
                                    const { is_started, is_complete } = each
                                    return !is_started
                                })

                                console.log(JSON.stringify(proceedInterview) + '====proceed');


                                return (
                                    <Card className="mt--3">
                                        <div className={'d-flex justify-content-between'}>
                                            <h3 className='mb-0 pointer text-black'>{name}</h3>
                                            {proceedInterview ?
                                                <div>
                                                    <Button
                                                        className={'px-4 border border-primary'}
                                                        text={proceedInterview.is_complete ? "Resume Interview" : "Start Interview"}
                                                        onClick={() => {
                                                            proceedInterviewHandler(proceedInterview?.id);
                                                        }}
                                                    />
                                                </div> : <Button
                                                    size={'sm'}
                                                    text={'Try Another'}
                                                    onClick={() => {
                                                        createNewJdScheduleApiHandler(id);
                                                    }} />
                                            }
                                        </div>
                                        <h5 className='mb-0 pointer text-muted'>{sector}</h5>
                                        <div className='col mt-3'>
                                            <div className='row align-items-center'>
                                                <img src={icons.briefCaseBlack} alt="Comment Icon" height={16} width={16} />
                                                <small className='text-sm text-black col'>Experience with {experience} years</small>
                                            </div>
                                        </div>
                                        <div className='col mt-3'>
                                            <div className='row'>
                                                <img src={icons.information} alt="Comment Icon" height={16} width={16} style={{
                                                    marginTop: 2
                                                }} />
                                                <div className='col ml-3'>
                                                    {more ?
                                                        <div>
                                                            <small className='text-sm text-black'>{details}</small>
                                                            {/* <small className='h5 text-primary ml-1 pointer' onClick={() => {
                                                                const updatedData: any = [...jdMore]
                                                                updatedData[index] = { ...updatedData[index], more: false }
                                                                setJdMore(updatedData)
                                                            }}>View Less</small> */}
                                                        </div>
                                                        :
                                                        <div className='row'>
                                                            <small className='text-sm text-black'>{details.slice(0, 320) + "..."}
                                                            </small>
                                                            {/* <small className='h5 text-primary ml-1 pointer' onClick={() => {
                                                                const updatedData: any = [...jdMore]
                                                                updatedData[index] = { ...updatedData[index], more: true }
                                                                setJdMore(updatedData)
                                                            }}>View More</small> */}
                                                        </div>
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
                                                        <>
                                                            <div className='row align-items-center'>
                                                                <h5 className='col mb-0'>{"Interview " + (index + 1)}</h5>
                                                                <h5 className='col mb-0'>{"Created at: " + (is_complete ? "Completed" : getDisplayTimeFromMoment(created_at))}</h5>
                                                                <div className='col-auto'>
                                                                    {is_report_complete &&
                                                                        <div className='text-center'>
                                                                            <Button
                                                                                text={'View Report'}
                                                                                onClick={() => {
                                                                                    proceedReport(id);
                                                                                }} />
                                                                        </div>

                                                                    }

                                                                    {is_complete && !is_report_complete && <div>
                                                                        <span className="name mb-0 text-sm">Generating Report ...</span>
                                                                    </div>}
                                                                </div>
                                                            </div>
                                                            <Divider className={'row'} space={"3"} />
                                                        </>

                                                    )
                                                })
                                            }
                                        </div>
                                    </Card>
                                )
                            })
                            }

                        </div>

                    }
                </div > : <UploadJdCard openAddJdModal={openAddJdModalButton} />
            }

            <Modal title={'Create Interview Schedule From JD'} isOpen={addJdModal.visible} onClose={addJdModal.hide}>
                <div className='col-xl-7 '>
                    <Input
                        heading={'Sector'}
                        placeHolder={"Sector"}
                        value={sector.value}
                        onChange={sector.onChange} />
                    <Input
                        heading={'Role'}
                        placeHolder={"Position"}
                        value={position.value}
                        onChange={position.onChange} />
                    <Input
                        heading={'Years of experience'}
                        type={'number'}
                        placeHolder={"Experience"}
                        value={experience.value}
                        onChange={experience.onChange} />
                    <Input
                        heading='Portal JD URL'
                        value={portalUrl.value}
                        onChange={portalUrl.onChange} />
                    <TextArea
                        error={jdDescriptionError}
                        heading='Job Description'
                        value={jd.value}
                        onChange={(e) => {
                            let value = e.target.value
                            let finalValue = value

                            if (value.length > 300) {
                                setJdDescriptionError(ERROR_MESSAGE)
                            }
                            jd.set(value)

                        }} />
                </div>
                <div className='text-right'>
                    <Button size='md' text={'Submit'} onClick={submitJdApiHandler} />
                </div>
            </Modal>

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
                        <small className='text-black'>Click on Start Now to Start Interview</small>
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
