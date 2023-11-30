import { OnGoingSchedule, ScheduleDetails } from '../../Container';

function Scheduling() {

    return (
        <div className='container-fluid  pt-4 fixed-top '>

            <div className='row  '>
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

export { Scheduling };


