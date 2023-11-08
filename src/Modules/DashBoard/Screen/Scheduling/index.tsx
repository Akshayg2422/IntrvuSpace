import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getInterviewScheduleDetails, getOngoingSchedules } from '@Redux'
import { Image, Divider, Back, Spinner } from '@Components'
import { icons } from '@Assets'
import { useLoader } from '@Hooks'
import { OnGoingSchedule, ScheduleDetails } from '../../Container';

function Scheduling() {




    return (
        <div className='container  pt-4 fixed-top '>

            <div className='row'>
                <div className='col-4  '>

                    <OnGoingSchedule />
                </div>
                <div className='col-8  '>

                    <ScheduleDetails />

                </div>

            </div>




        </div>
    )
}

export { Scheduling }


