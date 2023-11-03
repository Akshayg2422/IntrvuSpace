import { Divider } from '@Components';
import { useLoader } from '@Hooks';
import { getInterviewScheduleDetails } from '@Redux';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';



function ScheduleDetails() {

    const [interview, setInterview] = useState<any>()
    const dispatch = useDispatch()
    const loader = useLoader(false);
    useEffect(() => {
        const params = {
            schedule_id: "dd896472-2317-445b-87b2-df323b2d6589"
        }
         loader.show();
        dispatch(
            getInterviewScheduleDetails({
                params,
                onSuccess: (response: any) => () => {
                    console.log(response, "rrrrr")
                    setInterview(response?.details)

                    loader.hide();
                },
                onError: () => () => {

                    loader.hide();
                },
            })
        );

    }, [])

    const getInterviewHandler =()=>{
        const params = {
            schedule_id: "dd896472-2317-445b-87b2-df323b2d6589"
        }
         loader.show();
        dispatch(
            getInterviewScheduleDetails({
                params,
                onSuccess: (response: any) => () => {
                    console.log(response, "rrrrr")
                    setInterview(response?.details)

                     loader.hide();
                },
                onError: () => () => {

                     loader.hide();
                },
            })
        );

        
    }

    //    useEffect(() => {

    //     const interval = setInterval(() => {
    //         getInterviewHandler()

    //     }, 3000);

    //     return () => {
    //         clearInterval(interval);
    //     };

    // }, []);


    // console.log(interview?.items, "ppppppppppppp")
    return (
        <>
<div className='card h-100vh m-0' >


    <div className='card-header sticky-top'>
    <div className='d-flex align-items-center'>
                            <h2 className="ml-3 display-6 mb-0 font-weight-bolder text-primary mb-0">OnGoing Schedules</h2>
                        </div>
    </div>

    <div className='overflow-auto overflow-hide'>
            <div>
                <h2 className='font-weight-700 mb-0'>Questions</h2>
                <div className='col '>
                    {
                        interview && interview?.qa?.length > 0 && interview.qa.map((sections: any, index: number) => {
                            const { name, questions } = sections
                            return (
                                <div className='col mb-4'>
                                    <div className='row align-items-center'>
                                        <span className='text-muted text-sm'>{"Section" + (index + 1) + ": "}</span>
                                        <h3 className='ml-2 mb-0'>{name}</h3>
                                    </div>
                                    <div className='col mt-2'>
                                        {
                                            questions && questions.map((questions: any, index: number) => {
                                                const { question, expected_answer } = questions
                                                return (
                                                    <div>
                                                        <span className='text-muted text-sm'>{`Question ${index + 1} :`}</span>
                                                        <h5
                                                            className='col'
                                                            style={{
                                                                fontSize: '14px'
                                                            }}>
                                                            {question}
                                                        </h5>
                                                        <span className='text-muted text-sm'>{'Expected Answers:'}</span>
                                                        <h5
                                                            className='col'
                                                            style={{
                                                                fontSize: '14px'
                                                            }}>
                                                            {expected_answer}
                                                        </h5>
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
            </div>

            <div>

        
            {interview && interview?.items?.length > 0 &&
                <>
                    <Divider space={'5'} />
                    <div>
                        <h2 className='font-weight-700'>Items</h2>
                        <div className='col mt-3' >
                            {
                                interview?.items?.map((conversation: any) => {

                                    const { by, message, time, type } = conversation
                                    return (
                                        <div className='mb-5'>
                                            <div className='d-flex justify-content-between mb-0'>
                                                <h4 className='font-weight-700'>{by === 'IV' ? "Interviewer" : "Interviewee"}</h4>
                                                <small>{new Date(time).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</small>
                                            </div>

                                            <small

                                                style={{
                                                    fontSize: '14px'
                                                }}>
                                                {message}
                                            </small>
                                        </div>

                                    )
                                })
                            }
                        </div>
                    </div>
                </>
            }
                </div>

                

            </div>


            </div>

        </>

    )
}

export { ScheduleDetails }