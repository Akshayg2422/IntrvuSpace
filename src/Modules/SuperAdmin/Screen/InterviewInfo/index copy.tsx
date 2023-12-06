import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewScheduleDetails } from '@Redux'
import { Image, Divider, Back, Spinner } from '@Components'
import { icons } from '@Assets'
import { useLoader } from '@Hooks'

function InterviewInfo() {

    const dispatch = useDispatch()

    const { schedule_id } = useParams();

    const { interviewScheduleDetails } = useSelector((state: any) => state.DashboardReducer);

    const { name, jd, experience, duration, role } = interviewScheduleDetails?.basic_info || {}

    const { qa, items } = interviewScheduleDetails || {}
    const [jdMore, setJdMore] = useState<any>(false)
    const VIEW_MORE_LENGTH = 300

    const loader = useLoader(false);

    useEffect(() => {

        const params = { schedule_id }
        loader.show();
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

    }, [])


    return (
        <div className='container'>
            {loader.loader &&
                <div className='row align-items-center justify-content-center h-100vh'>
                    <Spinner />
                </div>
            }
            {
                interviewScheduleDetails && !loader.loader && <div className='card flex-grow-1 m-3 rounded-0'>
                    <div className='card-header'>
                        <div className='d-flex align-items-center'>
                            <Back />
                            <h2 className="ml-3 display-3 mb-0 font-weight-bolder text-primary mb-0">{`Interview for the role of ${role}`}</h2>
                        </div>
                    </div>
                    <div className='card-body overflow-hide overflow-auto h-100vh' style={{ maxHeight: 'calc(100vh - px)' }}>
                        <div>
                            <h2 className='font-weight-700'>Basic Info</h2>
                            <div className='col mt-4'>
                                <div>
                                    {name ?
                                        <span style={{
                                            fontSize: "18px"
                                        }} className='text-primary font-weight-600'>
                                            {name.charAt(0).toUpperCase() + name.slice(1)}
                                        </span>
                                        :
                                        <></>
                                    }

                                    {duration &&
                                        <div className='col'>
                                            <div className='row d-flex align-items-center mb-1 mt-2'>
                                                <Image src={icons.clock} height={17} width={17} style={{
                                                    objectFit: 'contain'
                                                }} />
                                                <h5 style={{
                                                    fontSize: "14px"
                                                }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${duration} mins`}</h5>
                                            </div>
                                        </div>
                                    }
                                    <h5 className='mb-0 pointer'>{experience === 0 ? "Fresher" : "" + experience + (experience === 1 ? " year " : " years ") + "of experience"}</h5>
                                </div>

                                {jd ? <div className='col mt-3'>
                                    <div className='row'>
                                        <div className='col ml-0'>
                                            {
                                                jd?.length < VIEW_MORE_LENGTH ?
                                                    <div className='row'>
                                                        <div className='text-details text-black'>{`${jd}`}</div>
                                                    </div>
                                                    :
                                                    <>
                                                        {jdMore ?
                                                            <div className='row'>
                                                                <div className='text-details text-black'>
                                                                    {jd.split('\n\n').map((paragraph, index) => (
                                                                        <React.Fragment key={index}>
                                                                            {index > 0 && <br />}
                                                                            {paragraph}
                                                                        </React.Fragment>
                                                                    ))}
                                                                    <span className='h4 text-primary ml-3 pointer' onClick={() => {
                                                                        setJdMore(false);

                                                                    }}>
                                                                        View Less
                                                                    </span>
                                                                </div>


                                                            </div>
                                                            :
                                                            <div className='row'>
                                                                <div className='text-details text-black'>{jd.slice(0, VIEW_MORE_LENGTH) + " ..."}
                                                                    <span className='h4 text-primary ml-1 pointer'
                                                                        onClick={() => {
                                                                            setJdMore(true)
                                                                        }}
                                                                    >
                                                                        View More
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        }
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div> : null
                                }
                            </div>
                        </div>

                        <Divider space={'5'} />
                        {/* 
                        <div>
                            <h2 className='font-weight-700 mb-0'>Questions</h2>
                            <div className='col mt-3'>
                                {
                                    qa && qa.length > 0 && qa.map((sections: any, index: number) => {
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

                        {items && items.length > 0 &&
                            <>
                                <Divider space={'5'} />

                                <div>
                                    <h2 className='font-weight-700'>Items</h2>
                                    <div className='col mt-3' >
                                        {
                                            items.map((conversation: any) => {
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
                        } */}
                    </div>
                </div>
            }
        </div>
    )
}

export { InterviewInfo }