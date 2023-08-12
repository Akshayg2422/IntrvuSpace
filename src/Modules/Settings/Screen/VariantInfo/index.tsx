import { Back, Button, Card, CommonTable, DateTimePicker, Divider, Input, Modal, NoDataFound, showToast } from '@Components'
import { useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { generateForm } from '@Redux'
import { ROUTES } from '@Routes'
import { VALIDATE_ADD_NEW_CANDIDATES_RULES, capitalizeFirstLetter, getDisplayTimeDateMonthYearTime, getMomentObjFromServer, getValidateError, ifObjectExist, validate } from '@Utils'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function VariantInfo() {
    const { questionSection, selectedRole } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation()
    const addNewCandidateModal = useModal(false)
    const firstName = useInput('')
    const lastName = useInput('')
    const email = useInput('')
    const mobileNumber = useInput('')
    const loader = useLoader(false)
    const dispatch = useDispatch()
    const [status, setStatus] = useState('12-02-2021')

    console.log('111111111----------------->', selectedRole)
    function generateNewCandidateHandler() {
        // addNewCandidateModal.hide()

        const params = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            mobileNumber: mobileNumber.value,

        }

        const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()
            dispatch(
                generateForm({
                    params,
                    onSuccess: () => (response) => {
                        resetValues()
                        showToast(response.message, 'success')
                        loader.hide()
                    },
                    onError: () => (error) => {
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


    const normalizedTableData = (data: any) => {
        if (data && data?.length > 0)
            return data.map((el: any) => {
                console.log('--------->', el)
                return {

                    "name":
                        <div className="row">
                            <div className="col-auto ">
                                <div className="mr--3">{el?.name}</div>
                            </div>
                        </div>,

                    'phone':
                        <div className={'ml-5'}>
                            {el?.mobileNumber}
                        </div>,

                    "Email":
                        <div className="ml-5 m-0">
                            {el?.email}
                        </div>,

                    "status":
                        <div className="">
                            {el?.status}
                        </div>,
                    "": handleNextStep(el)
                };
            });
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
        } else if (is_complete === false && is_started === true) {
            return (
                <>
                    <Button text={'Resume'} size='sm' onClick={() => {
                        // dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].interview + '/' + id)
                    }} />
                </>
            )

        } else if (is_started === false) {
            return (
                <>
                    <Button text={'Start'} size='sm' onClick={() => {
                        // dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].interview + '/' + id)
                    }} />
                </>
            )
        }
    }


    return (

        <>
            <div className={'vh-100 m-3'}>
                {/* <div className={'text-right mb-2'}><Button text={'Testing'} /></div> */}
                <div>
                    <Card className={'col-sm-12 col-lg-12 col-md-12'} >
                        <div className={'row mb-3 mx--4'}>
                            <span><Back /></span><span className={'h3'}>INFO</span>
                        </div>
                        <div className={'d-flex flex-column mt--3'}>
                            <div onClick={() => { goTo(ROUTES['designation-module']['questions']) }}>
                                {capitalizeFirstLetter(selectedRole?.name)}
                            </div>
                            <div>
                                {capitalizeFirstLetter('job Description :')}
                            </div>
                            <div>
                                Experience:
                            </div>
                        </div>
                    </Card>
                    <Card className={'col-sm-12 col-lg-12 col-md-12 mt--3'} >
                        <div className={'mx--4'}>

                            <div className="d-flex justify-content-between mt-3">
                                <div className={'h3 ml-1 '}>
                                    {'Candidates'}
                                </div>
                                <div><Button text={'Add New'} onClick={addNewCandidateModal.show} /></div>
                            </div>

                            {questionSection?.length > 0 ? (
                                <div className={'mt-4'} >
                                    <CommonTable
                                        tableDataSet={questionSection}
                                        displayDataSet={normalizedTableData(questionSection)}
                                    />

                                </div>
                            ) :
                                <div className={'d-flex justify-content-center align-items-center'} style={{ height: '90vh' }}>
                                    <NoDataFound text={"No Data Found"} />
                                </div>
                            }
                        </div>

                    </Card>
                </div>
            </div>
            <Modal title={'Generate Form'} isOpen={addNewCandidateModal.visible} onClose={addNewCandidateModal.hide}>
                <div className='col-xl-6'>
                    <Input heading={'First Name'} value={firstName.value} onChange={firstName.onChange} />
                    <Input heading={'Last Name '} value={lastName.value} onChange={lastName.onChange} />
                    <Input heading={'Email'} value={email.value} onChange={email.onChange} />
                    <Input heading={'Mobile Number'} type={'number'} value={mobileNumber.value} onChange={mobileNumber.onChange} />
                    <DateTimePicker heading={'Date'}
                        // initialValue={getDisplayTimeDateMonthYearTime(getMomentObjFromServer(status))}
                        type="both"
                    // onChange={setStatus}
                    />
                    <div className={'text-right'}><Button text={'Submit'} onClick={generateNewCandidateHandler} /></div>
                </div>

            </Modal>
        </>
    )
}

export { VariantInfo }