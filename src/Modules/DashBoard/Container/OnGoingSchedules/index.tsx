import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewScheduleDetails, getOngoingSchedules, onGoingSelectedIIds } from '@Redux'
import { Image, Divider, Back, Spinner, NoRecordsFound } from '@Components'
import { icons } from '@Assets'
import { useLoader } from '@Hooks'
import './index.css'

function OnGoingSchedule() {
    const dispatch = useDispatch()
    const { onGoingScheduleMessage } = useSelector((state: any) => state.DashboardReducer);
    const [onGoingSelectId, setOnGoingSelectId] = useState<any>('')
    const [hoverColor, setHoverColor] = useState<any>('')
    const [onGoingInterviewDetails, setOnGoingInterviewDetails] = useState<any>('')

    const loader = useLoader(false);




    useEffect(() => {
        loader.show();
        onGoingInterval()
      
    }, [])

    // useEffect(()=>{
    //     if(onGoingInterviewDetails&&onGoingInterviewDetails.length>0){
    //         let setData=onGoingInterviewDetails.some((element)=>element?.id===onGoingSelectId)

    //         if(!setData){
    //             setOnGoingSelectId(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
    //             dispatch(
    //             onGoingSelectedIIds(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
    //             )

    //         }


    //     }

    // },[onGoingInterviewDetails])


    useEffect(() => {

        if (!onGoingSelectId) {
           
            setOnGoingSelectId(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
            dispatch(
                onGoingSelectedIIds(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
            )
        }

        if (onGoingInterviewDetails && onGoingInterviewDetails.length > 0) {
         
            let setData = onGoingInterviewDetails.some((element) => element?.id === onGoingSelectId)

            if (!setData) {
              
                setOnGoingSelectId(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
                dispatch(
                    onGoingSelectedIIds(onGoingScheduleMessage?.ongoing_schedules[0]?.id)
                )

            }

        }
       
        
    }, [onGoingInterviewDetails])


    const onGoingInterval = () => {
        const params = {}
        dispatch(
            getOngoingSchedules({
                params,
                onSuccess: (response: any) => () => {
                    loader.hide();
                    setOnGoingInterviewDetails(response?.details?.ongoing_schedules)

                    if (response?.details?.ongoing_schedules<=0) {
                        // console.log(response?.details?.ongoing_schedules.length,'pppppppppppp,,kkkk')
        
                        setOnGoingSelectId('')
                        dispatch(
                            onGoingSelectedIIds('')
                        )
                    }
                },
                onError: () => () => {
                    loader.hide();
                },

            })
        )

    }

    useEffect(() => {
        const interval = setInterval(() => {
            onGoingInterval()
        

        }, 3000);

        return () => {
            clearInterval(interval);
        }

    }, []);



    return (

        < >

            <div className='card rounded-sm custom-height  mb-5' style={{ borderColor: '#d3deff' }}
            >
                <div className='card-header sticky-top  '>
                    <div className=' row pl-1  py-2 mb-1 col'>
                        <div onClick={() => {
                            setOnGoingSelectId('')
                            dispatch(
                                onGoingSelectedIIds('')
                            )
                        }
                        }>
                            <Back />
                        </div>
                        <h2 className="pl-2 display-6 mb-0 font-weight-bolder text-primary mb-0 ">OnGoing Schedules</h2>
                    </div>
                </div>

                {loader.loader &&
                <div className='row align-items-center justify-content-center h-100vh'>
                    <Spinner />
                </div>
            }
                {onGoingInterviewDetails?.length > 0 ?
                    <div className='overflow-auto overflow-hide' >
                        {onGoingInterviewDetails?.map((el) => {
                            const { interviewee_name, interviewee_email, interview_duration, interviewee_role, id } = el
                            return (
                                <div>
                                    <div className='mt-0 mb-2 card m-2 p-3  pointer'
                                        style={{
                                            backgroundColor: `${id === onGoingSelectId ? '#fafbff' : hoverColor?.id === id ? '#f2f2f2' : ''}`,
                                            borderColor:`${id === onGoingSelectId ? '#d3deff' : hoverColor?.id === id ? '#f2f2f2' : ''}`

                                        }}
                                        onClick={() => {
                                            setOnGoingSelectId(id)
                                            dispatch(
                                                onGoingSelectedIIds(id)
                                            )
                                        }}
                                        onMouseEnter={() => {
                                            setHoverColor(el)
                                        }}
                                        onMouseLeave={() => {
                                            setHoverColor('')

                                        }}

                                    >
                                        <div>{
                                            interviewee_role ? <div style={{
                                                fontSize: "18px"
                                            }} className=' text-black font-weight-600 pb-1'>
                                                {interviewee_role.charAt(0).toUpperCase() + interviewee_role.slice(1)}
                                            </div>
                                                :
                                                <></>

                                        }
                                            {interviewee_name ?
                                                <span style={{
                                                    fontSize: "18px"
                                                }} className='text-primary font-weight-600'>
                                                    {interviewee_name.charAt(0).toUpperCase() + interviewee_name.slice(1)}
                                                </span>
                                                :
                                                <></>
                                            }
                                            <h5 className='mb-0  pt-1'>{interviewee_email}</h5>
                                            {interview_duration &&
                                                <div className='col'>
                                                    <div className='row d-flex align-items-center mb-1 mt-2'>
                                                        <Image src={icons.clock} height={17} width={17} style={{
                                                            objectFit: 'contain'
                                                        }} />
                                                        <h5 style={{
                                                            fontSize: "14px"
                                                        }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${interview_duration} mins`}</h5>
                                                    </div>
                                                </div>
                                            }

                                        </div>


                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    : <>

            <div className='custom-height   d-flex justify-content-center align-items-center'>
  <NoRecordsFound text={'There are no ongoing schedules.'} />
</div>
                    </>
                }


            </div>
        </>
    )
}

export { OnGoingSchedule }