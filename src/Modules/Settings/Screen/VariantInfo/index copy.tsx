import { icons } from '@Assets'
import { Back, Breadcrumbs, Button, Card, CommonTable, DateTimePicker, Divider, Input, Modal, NoDataFound, showToast, Image, DropzoneFilePicker, Spinner } from '@Components'
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { AnalyzingAnimation, GenerateModal } from '@Modules'
import { bulkUploadCandidates, createSchedule, generateForm, getCorporateScheduleDetails, selectedScheduleId } from '@Redux'
import { ROUTES } from '@Routes'
import { VALIDATE_ADD_NEW_CANDIDATES_RULES, capitalizeFirstLetter, filteredName, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getValidateError, ifObjectExist, showMore, validate } from '@Utils'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveAs } from 'file-saver'

function VariantInfo() {
    const { selectedRole, corporateScheduleDetails } = useSelector((state: any) => state.DashboardReducer)
    // console.log(JSON.stringify(corporateScheduleDetails), "corporateScheduleDetails-------->");

    const { goTo } = useNavigation()
    const addNewCandidateModal = useModal(false)
    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const mobileNumber = useInput('')
    const loader = useLoader(false)
    const bulkUploadLoader = useLoader(false)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('12-02-2021')
    const generateVariantModal = useModal(false);
    const [showFullContent, setShowFullContent] = useState(false);
    const bulkUploadModal = useModal(false)
    const [candidateBulkUploadData, setCandidateBulkUploadData] = useState('')


    useEffect(() => {
        getCorporateScheduleDetailsHandler();
    }, [])

    const Refresh = () => {
        const refresh = () => window.location.reload()

        return (
            <button onClick={refresh}>Refresh</button>
        )
    }

    const getCorporateScheduleDetailsHandler = () => {
        const params = { corporate_openings_details_id: selectedRole?.id }
        dispatch(
            getCorporateScheduleDetails({
                params,
                onSuccess: (response: any) => () => {
                },
                onError: (error: any) => () => { },
            })
        );
    };


    function generateNewCandidateHandler() {

        const params = {
            corporate_openings_details_id: selectedRole?.id,
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            mobile_number: mobileNumber.value,
        }

        const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params)

        if (ifObjectExist(validation)) {
            addNewCandidateModal.hide()
            generateVariantModal.show()
            loader.show()
            dispatch(
                createSchedule({
                    params,
                    onSuccess: (response: any) => () => {
                        resetValues()
                        showToast('Candidate added successfully', 'success')
                        loader.hide()
                        generateVariantModal.hide()
                        getCorporateScheduleDetailsHandler()

                    },
                    onError: (error: any) => () => {
                        showToast(error.error_message, 'error')
                        generateVariantModal.hide()
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

    const { id, position, experience, details } = corporateScheduleDetails?.job_description || {}

    const { schedules } = corporateScheduleDetails || {}



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

                    'phone':
                        <div className={''}>
                            {el?.interviewee_mobile_number}
                        </div>,

                    "Email":
                        <div className="m-0">
                            {el?.interviewee_email}
                        </div>,

                    "status":
                        <div className="">
                            {el?.status}
                        </div>,
                    "": <div className={'text-right'}>{handleNextStep(el)}</div>
                }
            })

    };


    const handleNextStep = (item: any) => {
        const { id, is_complete, is_started } = item;
        if (is_complete === true) {
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
    }

    function bulkUploadCandidatesHandler() {
        const params = {
            corporate_openings_details_id: corporateScheduleDetails?.id,
            csv_file: candidateBulkUploadData
        }
        bulkUploadLoader.show()
        bulkUploadModal.hide()
        dispatch(
            bulkUploadCandidates({
                params,
                onSuccess: (response: any) => () => {
                    showToast(response.success, 'success')
                    bulkUploadLoader.hide()
                    getCorporateScheduleDetailsHandler()
                },
                onError: (error: any) => () => {
                    showToast(error.error_message, 'error')
                    bulkUploadLoader.hide()
                },
            })
        );
    }

    const downloadCSVTemplate = () => {
        const csvContent = "Name,Email,Phone\nJohn Doe,johndoe@example.com,123-456-7890";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        saveAs(blob, 'candidate_template.csv');
    };

    return (

        <>
            <Breadcrumbs />
            <div>
                <div className={'m-3'}>
                    {
                        schedules && schedules.length > 0 ?

                            < Card className={'mt--3 vh-100 mb-3 overflow-auto overflow-hide'} >
                                <>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className={'h3 text-dark'}>
                                            {'Candidates'}
                                        </div>
                                        <div className={'row align-items-center'}>

                                            <div className={'mr-3'}>
                                                <DropzoneFilePicker
                                                    size={'md'}
                                                    title={'Upload Candidates'}
                                                    onSelect={(data) => {
                                                        let eventPickers = [data]?.toString().replace(/^data:(.*,)?/, "");
                                                        setCandidateBulkUploadData(eventPickers);
                                                    }}
                                                    onSubmitClick={() => {
                                                        bulkUploadCandidatesHandler();
                                                    }}
                                                    onTemplateClick={downloadCSVTemplate}
                                                />
                                            </div>

                                            <Button text={'Add New'} onClick={addNewCandidateModal.show} />
                                        </div>
                                    </div>
                                    {corporateScheduleDetails && corporateScheduleDetails?.schedules.length > 0
                                        ? (
                                            <div className={'row px-0 mx--4'}>
                                                <div className={'col-sm-12 px-0'} >
                                                    <CommonTable
                                                        tableDataSet={corporateScheduleDetails}
                                                        displayDataSet={normalizedTableData(corporateScheduleDetails)}
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

                            : <div className={'m-2 row d-flex justify-content-between'}>
                                <div className={'mt-3  text-right col-9'}>
                                    <DropzoneFilePicker
                                        size={'md'}
                                        title={'Upload Candidates'}
                                        onSelect={(data) => {
                                            let eventPickers = [data]?.toString().replace(/^data:(.*,)?/, "");
                                            setCandidateBulkUploadData(eventPickers);
                                        }}
                                        onSubmitClick={() => {
                                            bulkUploadCandidatesHandler();
                                        }}
                                        onTemplateClick={downloadCSVTemplate}
                                    />
                                </div>
                                <div className={''}>
                                    <Button block text={'Add Candidates'} onClick={addNewCandidateModal.show} />
                                </div>
                            </div>
                    }
                    <Card className={'col-sm-12 col-lg-12 col-md-12'} >
                        <div className={'row justify-content-between mb-3 mx--4'}>
                            <div className={'ml-2 h3 text-dark'}>{capitalizeFirstLetter(position)}</div>
                            <div className={'mb-2 mr-2'}><h3 className={'text-primary pointer'} onClick={() => { goTo(ROUTES['designation-module']['questions']) }} >{'View Questions'}</h3></div>
                        </div>
                        <div className={'d-flex flex-column mt--3'}>
                            <div className={'row pb-2'}>
                                <span className={"text-black text-sm"}>
                                    <i className="pr-2">
                                        <img src={icons.briefCaseBlack} alt="Comment Icon" height={'20'} width={'20'} />
                                    </i>
                                    Experience with {experience}
                                </span>
                            </div>
                            <div className={'row pb-1 text-sm text-black font-weight-500'}>
                                <span style={{ maxWidth: '100vw' }}>
                                    <i className="pr-2">
                                        <img src={icons.information} alt="Comment Icon" height={'20'} width={'20'} />
                                    </i>
                                    {showFullContent ? details : filteredName(details, 480)}
                                </span>
                                {/* Toggle button */}
                                {details && details.length > 480 && (
                                    <span
                                        className="text-primary pointer"
                                        onClick={() => setShowFullContent(!showFullContent)}
                                    >
                                        {showFullContent ? <span className={'h5 text-primary'}> View Less</span> : <span className={'h5 text-primary'}> View More</span>}
                                    </span>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div >
            <Modal title={'Add Candidate'} isOpen={addNewCandidateModal.visible} onClose={addNewCandidateModal.hide}>
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
            <GenerateModal title={'Scheduling Interview'} isOpen={generateVariantModal.visible} onClose={generateVariantModal.hide}>
                <AnalyzingAnimation />
            </GenerateModal>
        </>
    )
}

export { VariantInfo }