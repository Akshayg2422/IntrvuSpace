import { ScreenHeading, Spinner, Image, Divider, ViewMore } from '@Components';
import { useLoader } from '@Hooks';
import { getInterviewScheduleDetails } from '@Redux';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { icons } from '@Assets'
import { capitalizeFirstLetter } from '@Utils'

import './index.css'


function InterviewInfo() {

    const dispatch = useDispatch()

    const { schedule_id } = useParams();

    const { interviewScheduleDetails } = useSelector((state: any) => state.DashboardReducer);

    const { name, jd, experience, duration, role } = interviewScheduleDetails?.basic_info || {}

    const experience_txt = experience === 0 ? "Fresher" : "" + experience + (experience === 1 ? " year " : " years ") + "of experience"

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
        <div className='screen-padding'>

            {
                loader.loader &&
                <div className='loader-container'>
                    <Spinner />
                </div>
            }

            {role && <ScreenHeading text={`Interview for the role of ${role}`} subtitle={experience_txt} />}
            {
                interviewScheduleDetails && !loader.loader &&
                <div>
                    <div className={"screen-heading basic-info-container"}>
                        {"Basic Info"}
                    </div>
                    <div>
                        {jd && (
                            <ViewMore
                                text={jd}
                                isViewMore={jdMore}
                                onViewMore={setJdMore}
                            />
                        )}
                    </div>
                </div>
            }
        </div>
    )
}

export { InterviewInfo };
