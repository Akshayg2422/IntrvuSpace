import { ScreenHeading } from '@Components'
import { OnGoingSchedules, OngoingScheduleDetails } from '@Modules';
import { useSelector } from 'react-redux'
import './index.css'

function OngoingInterviews() {

    const { selectedOngoingSchedule } = useSelector((state: any) => state.SuperAdminReducer);


    return (
        <div className={'ongoing-container'}>
            <ScreenHeading text={'Ongoing Interviews'} />

            <div className="d-row">
                <div className="d-col card-border col-sm-4">
                    <OnGoingSchedules />
                </div>
                <div className="d-col col">
                    {selectedOngoingSchedule && <OngoingScheduleDetails />}
                </div>
            </div>
        </div >


    )
}

export { OngoingInterviews };


