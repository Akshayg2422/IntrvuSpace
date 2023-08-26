import { Button, Card, Divider, Modal, TextArea, Input, showToast, Spinner } from '@Components';
import { createNewJdSchedule, getJdItemList, postJdVariant, selectedScheduleId } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useNavigation, useModal, useWindowDimensions } from '@Hooks';
import { AnalyzingAnimation, GenerateModal, UploadJdCard } from '@Modules';
import { ROUTES } from '@Routes';
import { validate, FROM_JD_RULES, ifObjectExist, getValidateError, filteredName } from '@Utils';
import { icons } from '@Assets';


function FromJD() {

    const { jdItem } = useSelector((state: any) => state.DashboardReducer)
    console.log('jdItem---------->', JSON.stringify(jdItem))
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
    const [showFullContent, setShowFullContent] = useState(false);
    const [expandedItems, setExpandedItems] = useState<boolean[]>([]);
    const { height } = useWindowDimensions()
    const [loading, setLoading] = useState(true);


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


    function proceedInterview(id: string) {
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
                                const { job_description, schedules, sector } = item
                                const isTryAgain = schedules && schedules.length > 0 && schedules.every((each: any) => {
                                    return each.is_complete
                                })

                                const knowledgeId = jdItem[0].id;
                                return (
                                    <div className='col-sm-12 col-md-12 col-lg-12 mt--3 px-2' >
                                        <Card className="" style={{
                                            height: height - 333,
                                        }}>
                                            <div className={'d-flex justify-content-between'}>
                                                <h3 className='mb-0 pointer text-black mb-1'>{job_description?.position}</h3>
                                                <div>
                                                    {
                                                        schedules &&
                                                        schedules.length > 0 &&
                                                        schedules.slice().reverse().map((each: any, index: number) => {

                                                            const { is_complete, is_started, is_report_complete, id, } = each;

                                                            return (
                                                                <>
                                                                    <div className=''>
                                                                        {is_complete && <div className=''>
                                                                            <Button
                                                                                size={'sm'}
                                                                                text={'Try Another'}
                                                                                onClick={() => {
                                                                                    createNewJdScheduleApiHandler(knowledgeId);
                                                                                }} />
                                                                        </div>}

                                                                        {!is_started &&
                                                                            <div className=''>
                                                                                <Button className={'px-3'} text={'Start Interview'} onClick={() => {
                                                                                    proceedInterview(id);
                                                                                }} />
                                                                            </div>}
                                                                        {(is_started && !is_complete) && <div className=''>
                                                                            <Button
                                                                                text={'Resume Interview'}
                                                                                onClick={() => {
                                                                                    proceedInterview(id);
                                                                                }}
                                                                            />
                                                                        </div>}
                                                                    </div>
                                                                </>

                                                            )
                                                        })
                                                    }
                                                </div>

                                            </div>
                                            <h5 className='mb-0 pointer text-black mb-1'>{sector}</h5>

                                            <div
                                                className="col-sm-12 col-md-12 col-lg-12 m-0 p-0 overflow-auto overflow-hide scroll-y mt-2" style={{
                                                    height: height - 414,
                                                }}>
                                                <span className={"text-black"}>
                                                    <i className="pr-2">
                                                        <img src={icons.briefCaseBlack} alt="Comment Icon" height={'20'} width={'20'} />
                                                    </i>
                                                    <small className='text-sm text-black'>Experience with {job_description?.experience} years</small>
                                                </span>

                                                <div className={'text-sm text-black'}>
                                                    <div className={'m-0 p-0'}>
                                                        <i className="pr-2">
                                                            <img src={icons.information} alt="Comment Icon" height={'20'} width={'20'} />
                                                        </i>
                                                        {showFullContent || expandedItems[index] ?
                                                            job_description?.details :
                                                            filteredName(job_description?.details, 320)}
                                                        {job_description?.details && job_description?.details.length > 320 && (
                                                            <span
                                                                className="text-primary pointer"
                                                                onClick={() => {
                                                                    const newExpandedItems = [...expandedItems];
                                                                    newExpandedItems[index] = !newExpandedItems[index];
                                                                    setExpandedItems(newExpandedItems);
                                                                }}
                                                            >
                                                                {expandedItems[index] ? (
                                                                    <span className={'h5 text-primary'}>View Less</span>
                                                                ) : (
                                                                    <span className={'h5 text-primary'}>View More</span>
                                                                )}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <Divider className={''} space={'2'} />

                                                <div className='py-3 col-sm-12 col-md-12 col-lg-12 mt--3'>
                                                    {
                                                        schedules &&
                                                        schedules.length > 0 &&
                                                        schedules.slice().reverse().map((each: any, index: number) => {

                                                            const { is_complete, is_started, is_report_complete, id, created_at } = each;

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
                                                                    <div className='row justify-content-between'>
                                                                        <h5 className="text-black col m-0 p-0">{"Interview " + (index + 1)}</h5>
                                                                        <h5 className="text-black col">{"Created at: " + (is_complete ? "Completed" : getDisplayTimeFromMoment(created_at))}</h5>
                                                                        {is_report_complete &&
                                                                            <div className=''>
                                                                                <Button
                                                                                    color={'white'}
                                                                                    className={'px-4 border border-primary'}
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
                                                                    {index !== schedules.length && <Divider className={'row'} space={"2"} />}
                                                                </>

                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                )
                            })
                            }

                        </div>

                    }
                </div> : <UploadJdCard openAddJdModal={openAddJdModalButton} />}

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
                        heading='Job Description'
                        value={jd.value}
                        onChange={jd.onChange} />
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
                                            proceedInterview(scheduleId)
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
