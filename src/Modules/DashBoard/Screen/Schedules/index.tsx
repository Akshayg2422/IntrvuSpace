import React, { useState, useEffect } from 'react'
import { getMyPastInterviews, selectedScheduleId } from '@Redux';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Divider, Modal } from '@Components';
import { useModal, useNavigation, useWindowDimensions } from '@Hooks';
import { ROUTES } from '@Routes';


function Schedules() {

    const dispatch = useDispatch()
    const { myPastInterviews } = useSelector((state: any) => state.DashboardReducer)
    const proceedModal = useModal(false);
    const { goBack } = useNavigation();
    const { goTo } = useNavigation();
    const { height } = useWindowDimensions()
    useEffect(() => {
        getMypastInterviewApi()
    }, [])

    const getMypastInterviewApi = () => {
        const params = {}

        dispatch(getMyPastInterviews({
            params,
            onSuccess: (response: any) => () => {
            },
            onError: (error) => () => {

            },
        }))
    }

    const handleNextStep = (item: any) => {
        const { id, is_complete, is_started } = item;
        if (is_complete === true) {
            return (
                <>
                    <Button text={'Report'} size='sm' onClick={() => {
                        dispatch(selectedScheduleId(item))
                        goTo(ROUTES['designation-module'].report)
                    }} />
                </>
            )
        } else if (is_complete === false && is_started === true) {
            return (
                <>
                    <Button text={'Resume'} size='sm' onClick={() => {
                        dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].call)
                    }} />
                </>
            )

        } else if (is_started === false) {
            return (
                <>
                    <Button text={'Start'} size='sm' onClick={() => {
                        dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].call)
                    }} />
                </>
            )
        }
    }

    return (
        <div className='pt-2'>
            <span className='pointer   ml-4 pl-2 text-black h3 '
                onClick={() => { goBack() }}
            >
                <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder pr-1"></i>  Past
            </span>
            <div className='row m-3 mt-3'>
                {
                    myPastInterviews && myPastInterviews.length > 0 && myPastInterviews?.map((item: any) => {
                        const { id, interviewee_expected_sector, interviewee_expected_designation, interviewee_expected_role, is_complete, is_started } = item;
                        return (
                            <div className='col-4 px-2 my--2' key={id}>
                                <Card className='justify-content-center'
                                style={{height:height - 590}}
                                >
                                    <h4 className='mb-0 pointer mt--2'>{interviewee_expected_sector}</h4>
                                    <div className={'mx--4 mt--2'}><Divider space={'3'} /></div>
                                    <h5>{interviewee_expected_designation}</h5>
                                    <small className='mb-0 pointer'>{interviewee_expected_role}</small>
                                    <div className='text-right'>
                                        {handleNextStep(item)}
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
            < Modal size={'sm'} isOpen={proceedModal.visible}
                onClose={() => {
                    proceedModal.hide()
                    goBack()
                }} >
                <div className="text-center ">

                    <Button color='secondary' size={'md'}
                        text={"RESUME"}
                    // onClick={() => handleResume()}
                    />
                    <Button size={'md'}
                        text={"START"}
                    // onClick={() => handleStart()}
                    />
                </div>
            </Modal >
        </div>
    )
}

export { Schedules }