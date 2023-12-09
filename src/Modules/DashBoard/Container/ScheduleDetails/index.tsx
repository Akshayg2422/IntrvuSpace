import { Divider, NoRecordsFound, Spinner } from '@Components';
import { useLoader } from '@Hooks';
import { getInterviewScheduleDetails } from '@Redux';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "./index.css";


function ScheduleDetails() {

    const [interviewMessage, setInterviewMessage] = useState<any>()
    const dispatch = useDispatch()
    const { onGoingSelectedId, interviewScheduleDetails, onGoingScheduleMessage,interviewUserScheduleDetails, } = useSelector((state: any) => state.DashboardReducer);
const loader =useLoader(false)



    useEffect(() => {
     

        if (onGoingSelectedId) {
        
            getInterviewHandler()

        
            loader.show()
         
        }

        else {
            setInterviewMessage('')
        }

    }, [onGoingSelectedId])

    ///
    


    const getInterviewHandler = () => {
       

if(onGoingSelectedId){
        const params = {
            schedule_id: onGoingSelectedId
        }

        dispatch(

            getInterviewScheduleDetails({
                params,
                onSuccess: (response: any) => () => {
                    loader.hide()
                    setInterviewMessage(response?.details)
                },
                onError: () => () => {
                    loader.hide()

                },
            })
        );
        }
        else {
            setInterviewMessage('')

        }

    }

    useEffect(() => {

        const interval = setInterval(() => {
          
                getInterviewHandler()
           
        }, 3000);

        return () => {
            clearInterval(interval);
        };


    }, [onGoingSelectedId]);

    


    return (
        <>
      { onGoingSelectedId &&   <div className='card rounded-sm custom-height m-0' style={{ borderColor: '#d3deff' }} >


                <div className='card-header sticky-top'>
                    <div className='d-flex align-items-center'>

                        <h2 className=" display-6 mb-0 font-weight-bolder text-primary mb-0 ">Interview for the role of {interviewMessage?.basic_info?.role} </h2>

                    </div>
                    <div className="mt-0">
                              <small className={"text-secondary"}>
                              <span style={{
                                                    fontSize: "15px"
                                                }} className='text-black font-weight-600'>
                                                    {interviewMessage?.basic_info?.name.charAt(0).toUpperCase() + interviewMessage?.basic_info?.name?.slice(1)}
                                                </span> {' - '}
                                {interviewMessage?.basic_info?.experience} years of experience
                              </small>
                            </div>
                </div>
              
                {loader.loader &&
                <div className='row align-items-center justify-content-center h-100vh'>
                    <Spinner />
                </div>
            }
{!loader.loader &&onGoingSelectedId ?
                <div className='overflow-auto overflow-hide d-flex mx-4 my-1' style={{ flexDirection: 'column-reverse' , overflowY:'scroll'}}>

                    <div  >
                        {interviewMessage && interviewMessage?.items?.length > 0 &&
                            <>
                                <Divider space={'5'} />
                                <div>
                                    <h2 className='font-weight-700'>Items</h2>
                                    <div className='col mt-3' >
                                        {
                                            interviewMessage?.items?.map((conversation: any) => {

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

                   {interviewMessage&& <div>
                        <h2 className='font-weight-700 mb-0'>Questions</h2>
                        <div className='col'>
                            {
                                interviewMessage && interviewMessage?.qa?.length > 0 && interviewMessage.qa.map((sections: any, index: number) => {
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
}



                </div>
                :<>
<div className='custom-height   d-flex justify-content-center align-items-center'>
  <NoRecordsFound text={'There are no ongoing schedule at present.'} />
</div>
                </>
}


            </div>
}
        </>

    )
}

export { ScheduleDetails }