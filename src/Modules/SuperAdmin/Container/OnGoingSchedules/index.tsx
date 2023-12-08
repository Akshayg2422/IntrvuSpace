import { Divider, NoDataFound, Spinner } from '@Components';
import { useLoader } from '@Hooks';
import { getOngoingSchedules, setSelectedOngoingSchedule } from '@Redux';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeFirstLetter, isKeyValueExistInArray } from '@Utils'
import './index.css';

function OnGoingSchedules() {

    const dispatch = useDispatch()

    const { onGoingSchedules } = useSelector((state: any) => state.SuperAdminReducer);
    const { selectedOngoingSchedule } = useSelector((state: any) => state.SuperAdminReducer);


    const loader = useLoader(false);
    const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null);


    useEffect(() => {

        getOngoingSchedulesApiHandler(true);

        intervalIdRef.current = setInterval(() => {
            getOngoingSchedulesApiHandler();
        }, 5000);


        return () => {
            stopInterval();
        }

    }, [])



    const stopInterval = () => {
        if (intervalIdRef.current !== null) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    };


    const getOngoingSchedulesApiHandler = (showLoader: boolean = false) => {
        const params = {}

        showLoader && loader.show();

        dispatch(
            getOngoingSchedules({
                params,
                onSuccess: (res) => () => {

                    const { details: { ongoing_schedules } } = res

                    if (ongoing_schedules?.length > 0) {
                        const isExist = ongoing_schedules.some(schedule => schedule.id === selectedOngoingSchedule);
                        if (!isExist) {
                            dispatch(setSelectedOngoingSchedule(ongoing_schedules[0].id));
                        }
                    } else {
                        dispatch(setSelectedOngoingSchedule(undefined));
                    }

                    loader.hide();


                },
                onError: () => () => {
                    loader.hide();
                },
            })
        )

    }

    function onGoingScheduleHandler(item: any) {
        const { id } = item
        dispatch(setSelectedOngoingSchedule(id))
    }


    return (
        <div>
            {
                loader.loader &&
                <div className='loader-container'>
                    <Spinner />
                </div>
            }
            {
                !loader.loader && onGoingSchedules?.length > 0 &&
                <div className='mt-3'>
                    {
                        onGoingSchedules?.map((el: any, index: number) => {
                            const { interviewee_name, interviewee_email, interview_duration, interviewee_experience, interviewee_role, id } = el

                            const experience_txt = !interviewee_experience ? "Fresher" : `${interviewee_experience} ${interviewee_experience > 1 ? "years" : interviewee_experience === 1 ? "year" : ""}`

                            return (
                                <>
                                    <div key={id} className={`schedule-ongoing-item-container lh-110 pointer ${id === selectedOngoingSchedule && 'background-selected'}`} onClick={() => { onGoingScheduleHandler(el) }}>
                                        <div className='text-secondary font-weight-700'>{capitalizeFirstLetter(interviewee_role)}</div>
                                        <small className={'experience-ongoing'}>{experience_txt} | {interview_duration + " min"}</small>
                                        <div className='lh-110 mt-3'>
                                            <div className="th-regular">{capitalizeFirstLetter(interviewee_name)}</div>
                                            <div className="th-regular">{interviewee_email}</div>
                                        </div>
                                    </div>
                                    {index < onGoingSchedules.length - 1 && <Divider space={'3'} />}
                                </>
                            )
                        })}

                </div>
            }

            {
                !loader.loader && onGoingSchedules?.length <= 0 &&
                <div className={"no-data-container"}>
                    <NoDataFound />
                </div>
            }

        </div >
    )
}

export { OnGoingSchedules };
