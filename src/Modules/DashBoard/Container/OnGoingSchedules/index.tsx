import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewScheduleDetails, getOngoingSchedules } from '@Redux'
import { Image, Divider, Back, Spinner } from '@Components'
import { icons } from '@Assets'
import { useLoader } from '@Hooks'

function OnGoingSchedule() {
    const dispatch = useDispatch()
    const { schedule_id } = useParams();

    const { interviewScheduleDetails } = useSelector((state: any) => state.DashboardReducer);
    const [id,setId]=useState<any>('')

    const loader = useLoader(false);
    let data = [{ id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: '45' },
    { id: '2', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '3', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '4', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '5', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '6', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" }

    ]

    useEffect(() => {
        setId(data[0])

        const params = { schedule_id }
         loader.show();
        dispatch(
            getOngoingSchedules({
                params,
                onSuccess: () => () => {
                    loader.hide();
                },
                onError: () => () => {

                    loader.hide();
                },

            })
        )


    }, [])


 
   


    return (

            < >
                <div className='card rounded-0 h-100vh mb-5'>
                    <div className='card-header sticky-top'>
                        <div className='d-flex align-items-center'>
                            <Back />
                            <h2 className="ml-3 display-6 mb-0 font-weight-bolder text-primary mb-0">OnGoing Schedules</h2>
                        </div>
                    </div>
                    <div className='overflow-auto overflow-hide'>
                        

                        {data?.map((el) => {
                            return (
                                <div>
                                    <div className='mt-0 mb-2 card p-3 ' style={{
                                        backgroundColor:`${el?.id===id?.id?'#ebecec':''}`
                                    }} onClick={()=>{
                                        setId(el)
                                    }}>
                                        <div>
                                            {el.name ?
                                                <span style={{
                                                    fontSize: "18px"
                                                }} className='text-primary font-weight-600'>
                                                    {el?.name.charAt(0).toUpperCase() + el?.name.slice(1)}
                                                </span>
                                                :
                                                <></>
                                            }
                 <h5 className='mb-0 pointer pt-1'>{'002naveen.ch@gmail.comn'}</h5>
                                            {el?.duration &&
                                                <div className='col'>
                                                    <div className='row d-flex align-items-center mb-1 mt-2'>
                                                        <Image src={icons.clock} height={17} width={17} style={{
                                                            objectFit: 'contain'
                                                        }} />
                                                        <h5 style={{
                                                            fontSize: "14px"
                                                        }} className='mb-0 text-primary font-weight-bolder ml-2'>{`${el?.duration} mins`}</h5>
                                                    </div>
                                                </div>
                                            }
                           
                                        </div>


                                    </div>
                                </div>
                            )
                        })}

                    </div>

                </div>
            </>
    )
}

export {OnGoingSchedule}