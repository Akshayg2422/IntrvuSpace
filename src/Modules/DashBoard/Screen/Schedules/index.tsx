import { Button, ButtonGroup, Divider, Modal, NoRecordsFound, TopNavbar } from '@Components';
import { useModal, useNavigation, useWindowDimensions } from '@Hooks';
import { getMyPastInterviews, selectedScheduleId } from '@Redux';
import { ROUTES } from '@Routes';
import { SERVER } from '@Services';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'reactstrap';


function Schedules() {

    const dispatch = useDispatch()
    const { myPastInterviews } = useSelector((state: any) => state.DashboardReducer)
    const showVideoModal = useModal(false);

    const { goTo } = useNavigation();
    const [videoDetails, setVideoDetails] = useState<any>()

    const FILTER = [
        {
            id: 1, title: "Upcoming"
        },
        {
            id: 2, title: "Completed"
        },
        {
            id: 3, title: "Inprogress"
        }]

    const [selectedSort, setSelectedSort] = useState(FILTER[0])



    useEffect(() => {
        const params = { is_started: false }
        getMypastInterviewApi(params)
    }, [])

    const getMypastInterviewApi = (params: any) => {

        dispatch(
            getMyPastInterviews({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {

                },
            }))
    }

    const handleNextStep = (item: any) => {
        const { id, is_complete, is_started, is_report_complete } = item;
        if (is_complete === true && is_report_complete) {
            return (

                <Button
                    text={'Report'}
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
                        dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].interview + '/' + id)
                    }} />
                </>
            )

        } else if (is_started === false) {
            return (
                <>
                    <Button text={'Start'} size='sm' onClick={() => {
                        dispatch(selectedScheduleId(id))
                        goTo(ROUTES['designation-module'].interview + '/' + id)
                    }} />
                </>
            )
        }
    }

    const videoPlayerHandler = (item: any) => {
        showVideoModal.show()
        setVideoDetails(item)
    }

    return (
        <>
            <TopNavbar />
            <div className='mt-7'>
                <div className='col text-right mx--3'>
                    <ButtonGroup
                        selected={selectedSort}
                        sortData={FILTER}
                        onClick={(item) => {

                            setSelectedSort(item)
                            let params = {}
                            if (item.id === FILTER[0].id) {
                                params = { is_started: false }
                            } else if (item.id === FILTER[1].id) {
                                params = { is_completed: true }
                            }
                            else if (item.id === FILTER[2].id) {
                                params = {
                                    is_started: true, is_completed: false
                                }
                            }
                            getMypastInterviewApi(params)
                        }} />
                </div>

                <div className='row mx-3 mt-4'>
                    {
                        myPastInterviews && myPastInterviews.length > 0 ? myPastInterviews?.map((item: any) => {
                            const { id, interviewee_expected_sector, interviewee_expected_designation, interviewee_expected_role, is_complete, is_started } = item;
                            return (
                                <div className='col-xl-4 px-2 my--2 py-3' key={id}>
                                    <Card className='justify-content-center p-4'
                                    >
                                        <h4 className='mb-0 pointer mt--2'>{interviewee_expected_sector}</h4>
                                        <div className={'mt--2 mx--4'}><Divider space={'3'} /></div>
                                        <h5>{interviewee_expected_designation}</h5>
                                        <small className='mb-0 pointer'>{interviewee_expected_role}</small>
                                        <div className='text-right'>
                                            {is_complete && <span className='col text-primary pointer text-sm' onClick={() => videoPlayerHandler(item)}>{'Show Interview'}</span>}
                                            {handleNextStep(item)}
                                        </div>
                                    </Card>
                                </div>
                            )
                        })
                            : <div className={'d-flex  justify-content-center align-items-center mx-auto my-9 '}
                            > <NoRecordsFound /></div>}
                </div>
                < Modal size={'xl'} isOpen={showVideoModal.visible}
                    onClose={() => {
                        showVideoModal.hide()
                    }}
                    title={videoDetails?.interviewee_expected_role}>
                    <video controls className='d-flex col' loop={false} >
                        <source src={SERVER + videoDetails?.recording_url} type="video/mp4" />
                    </video>
                    {/* <div  className='d-flex'>
                    <ReactPlayer  loop={true} controls url={SERVER + videoDetails?.recording_url} />
                </div> */}
                </Modal >
            </div>
        </>
    )
}

export { Schedules };
