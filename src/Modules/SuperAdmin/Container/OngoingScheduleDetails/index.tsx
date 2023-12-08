import { useRef } from 'react'
import { Spinner, ViewMore } from '@Components';
import { useLoader } from '@Hooks';
import { getInterviewScheduleDetails } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter } from '@Utils';

import "./index.css";


function OngoingScheduleDetails() {

    const dispatch = useDispatch()



    const { interviewScheduleDetails } = useSelector((state: any) => state.DashboardReducer);
    const { selectedOngoingSchedule } = useSelector((state: any) => state.SuperAdminReducer);

    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const { name, jd, duration, role } = interviewScheduleDetails?.basic_info || {}


    const { qa, items } = interviewScheduleDetails || {}
    const [jdMore, setJdMore] = useState<any>(false)


    const loader = useLoader(false);

    useEffect(() => {

        getInterviewScheduleDetailsApiHandler(true);

        intervalIdRef.current = setInterval(() => {
            getInterviewScheduleDetailsApiHandler();
        }, 5000);


        return () => {
            stopInterval();
        }
    }, [selectedOngoingSchedule])

    const bottomRef = useRef<any>(null);

    useEffect(() => {
        if (bottomRef.current)
            bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    });

    function getInterviewScheduleDetailsApiHandler(showLoader: boolean = false) {
        const params = { schedule_id: selectedOngoingSchedule }

        showLoader && loader.show();

        dispatch(
            getInterviewScheduleDetails({
                params,
                onSuccess: () => () => {
                    loader.hide();
                },
                onError: () => () => {

                    loader.hide();
                },
            })
        );
    }

    const stopInterval = () => {
        if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };


    return (
        <div>
            {
                loader.loader &&
                <div className='loader-container'>
                    <Spinner />
                </div>
            }
            {
                interviewScheduleDetails && !loader.loader &&
                <div>
                    <div className={"screen-heading"}>{`${capitalizeFirstLetter(role)}`}</div>

                    <div className='d-flex align-items-center mt-2'>
                        <div className={"text-des font-weight-700 text-secondary"}>{`${capitalizeFirstLetter(name)}`}</div>
                        <div className='mx-2'>{'|'}</div>
                        <div>
                            <span className={'details-title'}>{duration} min</span>
                            <span className={'details-desc'}>{'Duration'}</span>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <ViewMore
                            text={jd}
                            isViewMore={jdMore}
                            onViewMore={setJdMore}
                        />
                    </div>

                    <div className={"screen-heading questions-info-container"}>
                        {"Questions"}
                    </div>

                    <div>
                        {
                            qa && qa.length > 0 && qa.map((each: any, index: number) => {
                                const { name, questions } = each;
                                return (
                                    <div className={'section-card-container  card-border'} style={{
                                        marginTop: index ? "40px" : "0px"
                                    }}>
                                        <div className={'sector-heading-container'}>
                                            <div className={'detailed-job-description-title'}>{capitalizeFirstLetter(name.replace(/_/g, ' '))}</div>
                                        </div>
                                        <div>
                                            {
                                                questions && questions.map(each => {
                                                    const { question, expected_answer } = each
                                                    return (
                                                        <div className={'question-container'}>
                                                            <span className={'question-text'}>{question}</span>

                                                            <div className={'answer-container'}>
                                                                <small className={'note-text'} style={{
                                                                    marginLeft: "0px"
                                                                }}>
                                                                    {
                                                                        expected_answer
                                                                    }
                                                                </small>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {
                        items && items.length > 0 &&
                        <div>
                            <div className={"screen-heading questions-info-container"}>
                                {"Communications"}
                            </div>
                            <div>
                                {
                                    items.map((conversation: any, index: number) => {
                                        const { by, message, time, type } = conversation
                                        return (

                                            <div
                                                className={'interview-item card-border'}
                                                style={{
                                                    marginTop: index ? "40px" : "0px"
                                                }}
                                            >
                                                <div className='col-10'>
                                                    <div className={'detailed-job-description-title'}>{by === 'IV' ? "Interviewer" : "Interviewee"}</div>
                                                    <div className={'note-text ml-0 mt-1'}>{message}</div>
                                                </div>
                                                <small className={'font-weight-400'}>{new Date(time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</small>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                    <div ref={bottomRef}>
                        {/* Content of your component */}
                    </div>

                </div>

            }
        </div >
    )
}

export { OngoingScheduleDetails };
