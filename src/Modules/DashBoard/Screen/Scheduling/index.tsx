import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewScheduleDetails, getOngoingSchedules } from '@Redux'
import { Image, Divider, Back, Spinner } from '@Components'
import { icons } from '@Assets'
import { useLoader } from '@Hooks'
import { OnGoingSchedule, ScheduleDetails } from '../../Container';

function Scheduling() {

    const dispatch = useDispatch()
    const { schedule_id } = useParams();

    const { interviewScheduleDetails } = useSelector((state: any) => state.DashboardReducer);

    const { name, jd, experience, duration, role } = interviewScheduleDetails?.basic_info || {}

    const { qa, items } = interviewScheduleDetails || {}
    const [jdMore, setJdMore] = useState<any>(false)
    const VIEW_MORE_LENGTH = 300

    const loader = useLoader(false);

    // useEffect(() => {


    //     const params = { schedule_id }
    //     loader.show();
    //     dispatch(
    //         getInterviewScheduleDetails({
    //             params,
    //             onSuccess: () => () => {
    //                 loader.hide();
    //             },
    //             onError: () => () => {

    //                 loader.hide();
    //             },
    //         })
    //     );

    // }, [])

    // const onGoingScheduleHandler=()=>{

    //   const params = {  }
    //     dispatch(
    //         getOngoingSchedules({
    //           params,
    //           onSuccess: () => () => {
    //               loader.hide();
    //           },
    //           onError: () => () => {

    //               loader.hide();
    //           },

    //         })
    //       )


    // }

    // useEffect(() => {

    //     const interval = setInterval(() => {
    //         onGoingScheduleHandler()

    //     }, 3000);

    //     return () => {
    //         clearInterval(interval);
    //     };

    // }, []);






    // useEffect(() => {

    //     const params = { schedule_id }
    //     // loader.show();
    //     dispatch(
    //         getOngoingSchedules({
    //             params,
    //             onSuccess: () => () => {
    //                 loader.hide();
    //             },
    //             onError: () => () => {

    //                 loader.hide();
    //             },

    //         })
    //     )


    // }, [])


    let data = [{ id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: '45' },
    { id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" },
    { id: '1', name: 'Naveen', email: '002naveen.ch@gmail.com', duration: "65" }

    ]


    return (
        <div className='container pt-3 fixed-top '>

            <div className='row'>
<div className='col-4  '>
    
<OnGoingSchedule/>

</div>
<div className='col-8  '>
    
<ScheduleDetails/>

</div>

            </div>

           


        </div>
    )
}

export { Scheduling }


{/* <div className='card flex-grow-1 m-3  col-6 rounded-0'>
<div className='card-header'>
    <div className='d-flex align-items-center'>

        <h2 className="ml-3 display-6 mb-0 font-weight-bolder text-primary mb-0">{`Interview for the role of ${role}`}</h2>
    </div>
</div>

</div> */}