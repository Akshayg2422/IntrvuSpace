import { Back, Button, Card, CommonTable, DateTimePicker, Divider, Input, Modal, NoDataFound, showToast } from '@Components'
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { createSchedule, generateForm, getKnowledgeGroupVariantDetails } from '@Redux'
import { ROUTES } from '@Routes'
import { VALIDATE_ADD_NEW_CANDIDATES_RULES, capitalizeFirstLetter, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getValidateError, ifObjectExist, validate } from '@Utils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function VariantInfo() {
    const { selectedRole, variantDetails } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation()
    const addNewCandidateModal = useModal(false)
    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const mobileNumber = useInput('')
    const loader = useLoader(false)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('12-02-2021')
    const { height } = useWindowDimensions()


    useEffect(() => {
        getKnowledgeGroupVariantDetailsHandler();
    }, [])

    const Refresh = () => {
        const refresh = () => window.location.reload()

        return (
            <button onClick={refresh}>Refresh</button>
        )
    }

    const getKnowledgeGroupVariantDetailsHandler = () => {
        const params = { knowledge_group_variant_id: selectedRole?.id }
        dispatch(
            getKnowledgeGroupVariantDetails({
                params,
                onSuccess: (response: any) => (response: any) => {
                },
                onError: (error: any) => () => { },
            })
        );
    };


    function generateNewCandidateHandler() {

        const params = {
            knowledge_group_variant_id: selectedRole?.id,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            mobileNumber: mobileNumber.value,
        }

        const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params)

        if (ifObjectExist(validation)) {

            loader.show()
            dispatch(
                createSchedule({
                    params,
                    onSuccess: () => (response: any) => {
                        resetValues()
                        showToast(response.message, 'success')
                        loader.hide()
                        getKnowledgeGroupVariantDetailsHandler()
                        addNewCandidateModal.hide()
                    },
                    onError: () => (error: any) => {
                        showToast(error.error_message, 'error')
                        loader.hide()
                    },
                })
            )
        } else {
            showToast(getValidateError(validation))
        }
    }

    function resetValues() {
        firstName.set('')
        lastName.set('')
        email.set('')
        mobileNumber.set('')
    }

    const { position, experience, details } = variantDetails?.job_description || {}

    const normalizedTableData = (data: any) => {
        if (data && data?.schedules?.length > 0)
            return data?.schedules?.map((el: any) => {
                return {

                    "name":
                        <div className="row">
                            <div className="col-auto ">
                                <div className="mr--3">{el?.interviewee_name}</div>
                            </div>
                        </div>,

                    // 'phone':
                    //     <div className={'ml-5'}>
                    //         {el?.mobile_number}
                    //     </div>,

                    "Email":
                        <div className="m-0">
                            {el?.interviewee_email}
                        </div>,

                    "status":
                        <div className="">
                            {el?.status}
                        </div>,
                    "": <div className={'text-right'}>{handleNextStep(data)}</div>
                }
            })

    };


    const handleNextStep = (item: any) => {
        const { id, is_complete, is_started } = item;
        if (true === true) {
            return (

                <Button
                    text={'View Report'}
                    size='sm'
                    onClick={() => {
                        goTo(ROUTES['designation-module'].report + "/" + id)
                    }}
                />

            )
        }
        // else if (is_complete === false && is_started === true) {
        //     return (
        //         <>
        //             <Button text={'Resume'} size='sm' onClick={() => {
        //                 dispatch(selectedScheduleId(id))
        //                 goTo(ROUTES['designation-module'].interview + '/' + id)
        //             }} />
        //         </>
        //     )

        // } 
        // else if (is_started === false) {
        //     return (
        //         <>
        //             <Button text={'Start'} size='sm' onClick={() => {
        //                 dispatch(selectedScheduleId(id))
        //                 goTo(ROUTES['designation-module'].interview + '/' + id)
        //             }} />
        //         </>
        //     )
        // }
    }




    return (

        <>
            <div>
                <div className={'m-3'}>
                    <Card className={'col-sm-12 col-lg-12 col-md-12'} >
                        <div className={'row justify-content-between mb-3 mx--4'}>
                            <div className={'h2 row mb-2 ml-1'}><Back /><span className={'ml-1'}>INFO</span></div>
                            <div className={'mb-2 mr-2'}><Button text={'View Questions'} onClick={() => { goTo(ROUTES['designation-module']['questions']) }} /></div>
                        </div>
                        <div className={'d-flex flex-column mt--3'}>
                            <div className={'row'}>
                                <h3>Position:</h3> <span className={'ml-2'}>{position}</span>
                            </div>
                            <div className={'row'}>
                                <h3>Experience:</h3><span className={'ml-2'}>{experience}</span>
                            </div>
                            <div className={'row'}>
                                <h3>Job Description:</h3><span className={'ml-2'}>{details}</span>
                            </div>
                        </div>
                    </Card>
                    <Card className={'mt--3 vh-100 mb-3'} >
                        <>
                            <div className="d-flex justify-content-between ">
                                <div className={'h3'}>
                                    {'Candidates'}
                                </div>
                                <div><Button text={'Add New'} onClick={addNewCandidateModal.show} /></div>
                            </div>

                            {variantDetails && variantDetails?.schedules.length > 0
                                ? (
                                    <div className={'row px-0 mx--4'} style={{ overflowY: 'auto' }}>
                                        <div className={'col-sm-12 px-0'} >
                                            <CommonTable
                                                tableDataSet={variantDetails}
                                                displayDataSet={normalizedTableData(variantDetails)}
                                            />

                                        </div>
                                    </div>
                                ) :
                                <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}>
                                    <NoDataFound text={"No Data Found"} />
                                </div>
                            }
                        </>

                    </Card>
                </div>
            </div>
            <Modal title={'Generate Form'} isOpen={addNewCandidateModal.visible} onClose={addNewCandidateModal.hide}>
                <div className='col-xl-6'>
                    <Input heading={'First Name'} value={firstName.value} onChange={firstName.onChange} />
                    <Input heading={'Last Name '} value={lastName.value} onChange={lastName.onChange} />
                    <Input heading={'Mobile Number'} maxLength={10} type={'number'} value={mobileNumber.value} onChange={mobileNumber.onChange} />
                    <Input heading={'Email'} value={email.value} onChange={email.onChange} />

                    {/* <DateTimePicker heading={'Date'}
                        initialValue={getDisplayTimeDateMonthYearTime(getMomentObjFromServer(status))}
                        type="both"
                    onChange={setStatus}
                    /> */}
                </div>
                <div className={'text-right'}><Button size={'md'} text={'Submit'} onClick={generateNewCandidateHandler} /></div>

            </Modal>
        </>
    )
}

export { VariantInfo }