import { Button, Card, Divider, Modal, TextArea, Input, showToast, MultiSelectDropDown } from '@Components';
import { createNewJdSchedule, getJdItemList, postJdVariant, selectedScheduleId } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInput, useNavigation, useModal } from '@Hooks';
import { AnalyzingAnimation, GenerateModal } from '@Modules';
import { ROUTES } from '@Routes';
import { validate, FROM_JD_RULES, ifObjectExist, getValidateError } from '@Utils';


function FromSkills() {

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

    const skills = [{ id: "1", text: 'Javascript' }, { id: "2", text: 'Core' }, { id: "3", text: 'Hooks' }]





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
                    showToast(res.message, 'success')
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




    return (
        <>
            <div>
                <div className={'mx--1'}>
                    <Button size={'md'} className='mt-3' block text={'Upload key skills and start interview'} onClick={addJdModal.show} />
                </div>
                {/* <div
                    style={{
                        paddingTop: '20px'
                    }}>
                </div>
                {
                    <div className={'row mt-3'}>
                        {jdItem && jdItem.length > 0 && jdItem.map(item => {
                            const { name, description, knowledge_group_variant } = item
                            const schedules = knowledge_group_variant[0].schedules;
                            const isTryAgain = schedules && schedules.length > 0 && schedules.every((each: any) => {
                                return each.is_complete
                            })


                            const knowledgeId = knowledge_group_variant[0].id;


                            return (
                                <div className='col-4 mt--3' >
                                    <Card className="overflow-auto overflow-hide scroll-y" style={{
                                        height: '350px',
                                    }}>
                                        <h4 className='mb-0 pointer'>{name}</h4>
                                        <Divider space={'3'} />
                                        <small className='text-sm text-muted'>{description}</small>

                                        {isTryAgain && <div className='mt-2'>
                                            <Button
                                                block
                                                text={'Try Another Interview'}
                                                onClick={() => {
                                                    createNewJdScheduleApiHandler(knowledgeId);
                                                }} />
                                        </div>}

                                        <div className='py-3'>
                                            {
                                                schedules &&
                                                schedules.length > 0 &&
                                                schedules.map((each: any, index: number) => {

                                                    const { is_complete, is_started, is_report_complete, id } = each;
                                                    return (
                                                        <div className='mt-2'>
                                                            <h5 className="text-uppercase text-muted mb-0 card-title">{"Interview " + (index + 1)}</h5>
                                                            {!is_started &&
                                                                <div className='mt-2'>
                                                                    <Button block text={'Start Interview'} onClick={() => {
                                                                        proceedInterview(id);
                                                                    }} />
                                                                </div>}
                                                            {(is_started && !is_complete) && <div className='mt-2'>
                                                                <Button
                                                                    block
                                                                    text={'Resume Interview'}
                                                                    onClick={() => {
                                                                        proceedInterview(id);
                                                                    }}
                                                                />
                                                            </div>}
                                                            {is_report_complete &&
                                                                <div className='mt-2'>
                                                                    <Button
                                                                        block
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
                                                    )
                                                })
                                            }
                                        </div>
                                    </Card>
                                </div>

                            )
                        })
                        }

                    </div>
                } */}
            </div>

            <Modal title={'Create Interview Schedule From Skills'} isOpen={addJdModal.visible} onClose={addJdModal.hide}>
                <div className='col-7 '>
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

                    {/* <MultiSelectDropDown
                        heading={'Skills'}
                        options={skills}
                        displayValue={"value"}
                        onSelect={(item) => {
                            setSelectedCompanies(item);
                        }}
                        onRemove={(item) => {
                            setSelectedCompanies(item);
                        }}
                    /> */}

                    <TextArea
                        heading='Job Description'
                        value={jd.value}
                        onChange={jd.onChange}
                    />
                </div>

                <div className='text-right'>
                    <Button size='md' text={'Submit'} onClick={submitJdApiHandler} />
                </div>
            </Modal>

            <GenerateModal title={'Create Interview Schedule From JD'} isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
                <AnalyzingAnimation />
            </GenerateModal>

            <Modal isOpen={completedModal.visible} onClose={completedModal.hide}>
                <div className='text-center '>
                    <div className='display-1 text-black'>
                        Your Interview is Ready!
                    </div>
                </div>
                <div className='text-center py-3 mb-5'>
                    <small className='text-black'>Click below to start Interview</small>
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

export { FromSkills };
