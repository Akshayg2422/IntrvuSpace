import { Checkbox, DateTimePicker, DropDown, Duration, Input, Modal, NoDataFound, PageNation, Spinner, TextArea, showToast } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { AdminTopNavbar, OpeningEmpty, ScheduleLiteItem } from "@Modules";
import { addCandidateCorporateLite, createCorporateOpeningLite, getCorporateSchedulesLite, updatedCorporateSchedulesLite } from "@Redux";
import { ROUTES } from '@Routes';
import {
    CREATE_CORPORATE_SCHEDULE_LITE_RULES,
    EXPERIENCE_LIST,
    INITIAL_PAGE,
    INTERVIEW_DURATIONS,
    PLACEHOLDER_ROLES,
    VALIDATE_ADD_NEW_CANDIDATES_RULES,
    getValidateError,
    ifObjectExist,
    paginationHandler,
    validate
} from "@Utils";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function OpeningLite() {

    const dispatch = useDispatch();

    const { goTo } = useNavigation();

    const {
        schedulesLite,
        schedulesLiteCount,
        schedulesLiteNumOfPages,
        schedulesLiteCurrentPage
    } = useSelector((state: any) => state.AdminReducer);


    const loader = useLoader(false);
    const addLoader = useLoader(false);


    const [selectedSchedule, setSelectedSchedule] = useState<any>(undefined)


    /**
     * Add State opening
     */

    const createOpeningModal = useModal(false);


    const DEFAULT_DATE = moment().add(9, 'day').format('MMM D YYYY')
    const DEFAULT_TIME = moment().set({ hour: 23, minute: 59, second: 0 }).format('LT')


    const position = useInput("");
    const experience = useDropDown(EXPERIENCE_LIST[0]);
    const vacancies = useInput("1");
    const sector = useInput("");

    const jd = useInput("");
    const [duration, setDuration] = useState<any>(INTERVIEW_DURATIONS[0]);
    const [videoRecordMandatory, setVideoRecordMandatory] = useState(true)
    const [scheduleEndDate, setScheduleEndDate] = useState<any>(DEFAULT_DATE);
    const [scheduleEndTime, setScheduleEndTime] = useState<any>(DEFAULT_TIME);

    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput(undefined);
    const mobileNumber = useInput("");

    const [notifyInterview, setNotifyInterview] = useState(false);
    const [notifyReport, setNotifyReport] = useState(false);
    const [notifyError, setNotifyError] = useState(false);



    /**
     * state for candidates
     */

    const candidateFirstName = useInput("");
    const candidateLastName = useInput("");
    const candidateEmail = useInput(undefined);
    const candidateMobileNumber = useInput("");

    const [candidateNotifyInterview, setCandidateNotifyInterview] =
        useState(false);
    const [candidateNotifyReport, setCandidateNotifyReport] = useState(false);


    const addCandidateModal = useModal(false);


    useEffect(() => {
        getCorporateScheduleApiHelper(INITIAL_PAGE);
    }, [])



    function getCorporateScheduleApiHelper(page_number: number) {
        const params = { page_number }
        loader.show();

        dispatch(
            getCorporateSchedulesLite({
                params,
                onSuccess: () => () => {
                    loader.hide()
                },
                onError: () => () => {
                    loader.hide()
                },
            })
        );

    }

    function viewMoreDetailsHandler(status: boolean, index: number) {
        const updateData = [...schedulesLite];
        updateData[index] = { ...updateData[index], is_view_more: status };
        dispatch(updatedCorporateSchedulesLite(updateData));
    }


    function resetValues() {
        /**
         * hide modal
         */
        createOpeningModal.hide();

        /**
         * reset fields
         */

        position.set("");
        experience.set(EXPERIENCE_LIST[0]);
        jd.set("");
        vacancies.set("1");
        setDuration(INTERVIEW_DURATIONS[0]);
        sector.set('')

        firstName.set('')
        lastName.set('')
        email.set('')
        mobileNumber.set('')
        setNotifyInterview(false)
        setNotifyReport(false)
        setNotifyError(false)

        setScheduleEndDate(DEFAULT_DATE);
        setScheduleEndTime(DEFAULT_TIME);
    }

    function resetCandidatesValues() {
        addCandidateModal.hide();

        candidateFirstName.set('')
        candidateLastName.set('')
        candidateMobileNumber.set('')
        candidateEmail.set('')

        setCandidateNotifyInterview(false)
        setCandidateNotifyReport(false)

        setNotifyError(false)

    }


    const createCorporateScheduleLiteApiHandler = () => {
        const params = {
            role: position.value,
            experience: parseInt(experience.value?.id),
            jd: jd.value,
            vacancies: vacancies?.value > 0 ? vacancies?.value : '',
            interview_duration: duration?.value,
            video_recording_mandatory: videoRecordMandatory,
            deadline: formatDeadline(scheduleEndDate, scheduleEndTime),
            first_name: firstName?.value,
            last_name: lastName?.value,
            mobile_number: mobileNumber?.value,
            email: email?.value,
            sector_name: sector?.value,
            is_notify_interview: notifyInterview,
            is_notify_report: notifyReport,
        };


        const validation = validate(CREATE_CORPORATE_SCHEDULE_LITE_RULES, params);


        if (ifObjectExist(validation)) {
            addLoader.show();
            dispatch(
                createCorporateOpeningLite({
                    params,
                    onSuccess: (response: any) => () => {

                        addLoader.hide();

                        getCorporateScheduleApiHelper(schedulesLiteCurrentPage);
                        showToast(response.message, "success");
                        resetValues();

                    },
                    onError: (error: any) => () => {

                        addLoader.hide();

                        showToast(error.error_message, "error");
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    };

    const formatDeadline = (date: string, time: string) => {
        const formattedDate = moment(date, 'MMM D YYYY').format('YYYY-MM-DD');
        const formattedTime = moment(time, 'LT').format('HH:mm:ss');
        return `${formattedDate}T${formattedTime}`;
    };


    const addCandidateCorporateLiteApiHandler = () => {
        const params = {
            corporate_openings_details_id: selectedSchedule?.id,
            first_name: candidateFirstName?.value,
            last_name: candidateLastName?.value,
            mobile_number: candidateMobileNumber?.value,
            email: candidateEmail?.value,
            is_notify_interview: candidateNotifyInterview,
            is_notify_report: candidateNotifyReport,
        }

        const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params);


        if (ifObjectExist(validation)) {

            addLoader.show();

            dispatch(
                addCandidateCorporateLite({
                    params,
                    onSuccess: (response: any) => () => {
                        addLoader.hide();
                        getCorporateScheduleApiHelper(schedulesLiteCurrentPage);
                        showToast(response.message, "success");
                        resetCandidatesValues();
                    },
                    onError: (error: any) => () => {
                        addLoader.hide();
                        showToast(error.error_message, "error");
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    };

    function proceedReport(id: string) {
        if (id) {
            goTo(ROUTES["designation-module"].report + "/" + id);
        }
    }

    return (
        <>
            <div className={'screen'}>
                <AdminTopNavbar
                    showCreateOpening={schedulesLiteCount > 0}
                    onCreateOpeningClick={createOpeningModal.show}
                />
                {
                    loader.loader && (
                        <div className={"loader-container"}>
                            <Spinner />
                        </div>
                    )
                }

                {!loader.loader && schedulesLiteCount <= 0 && <OpeningEmpty onCreateOpeningClick={createOpeningModal.show} />}

                {schedulesLiteCount > 0 && (
                    <div className={"screen-container-lite"}>
                        {
                            schedulesLite && schedulesLite?.length > 0 && <>
                                <div>
                                    {
                                        schedulesLite.map((item: any, index: number) => {
                                            return (
                                                <div
                                                    className={
                                                        index === 0
                                                            ? "schedule-container-top"
                                                            : "schedule-container"
                                                    }
                                                >
                                                    <ScheduleLiteItem
                                                        key={index}
                                                        item={item}
                                                        reportOnClick={proceedReport}
                                                        onViewMore={(status) =>
                                                            viewMoreDetailsHandler(status, index)
                                                        }
                                                        onTryAnother={() => {
                                                            setSelectedSchedule(item);
                                                            addCandidateModal.show();
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                                <div className="mt-3">
                                    <PageNation
                                        currentPage={schedulesLiteCurrentPage}
                                        noOfPage={schedulesLiteNumOfPages}
                                        isPagination={schedulesLiteNumOfPages > 1}
                                        paginationNumberClick={(currentPage) => {
                                            getCorporateScheduleApiHelper(
                                                paginationHandler("current", currentPage)
                                            );
                                        }}
                                        previousClick={() => {
                                            getCorporateScheduleApiHelper(
                                                paginationHandler("prev", schedulesLiteCurrentPage)
                                            );
                                        }}
                                        nextClick={() => {
                                            getCorporateScheduleApiHelper(
                                                paginationHandler("next", schedulesLiteCurrentPage)
                                            );
                                        }}
                                    />
                                </div>
                            </>
                        }

                        {
                            !loader.loader && schedulesLite?.length <= 0 &&
                            <div className={"no-data-container"}>
                                <NoDataFound />
                            </div>
                        }
                    </div>
                )}

            </div>

            <Modal
                loading={addLoader.loader}
                isOpen={createOpeningModal.visible}
                title={"Create Opening"}
                subTitle={
                    "Input job details, specifying qualifications, requirements, interview duration"
                }
                buttonText={"Create Opening"}
                onClose={resetValues}
                onClick={createCorporateScheduleLiteApiHandler}
            >
                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Position"}
                            type={"text"}
                            placeHolder={"HR Executive, QA Manager..."}
                            value={position.value}
                            onChange={position.onChange}
                        />
                    </div>

                    <div className={"col-sm-6"}>
                        <DropDown
                            id={"experience"}
                            heading={"Experience"}
                            data={EXPERIENCE_LIST}
                            selected={experience.value}
                            onChange={experience.onChange}
                        />
                    </div>

                </div>

                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Vacancies"}
                            type={"number"}
                            placeHolder={"0"}
                            value={vacancies.value}
                            onChange={vacancies.onChange}
                            maxLength={4}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Sector"}
                            placeHolder={"Sector"}
                            value={sector.value}
                            onChange={sector.onChange}
                        />
                    </div>

                </div>
                <TextArea
                    height={'250px'}
                    heading="Job Description"
                    value={jd.value}
                    placeholder={PLACEHOLDER_ROLES}
                    className={"p-4"}
                    onChange={jd.onChange}
                />

                <Duration selected={duration} onSelected={setDuration} />


                <div className={'row'}>
                    <div className={"col-sm-6"}>
                        <DateTimePicker
                            disableFuture={true}
                            heading={"Deadline Date"}
                            placeholder={"Deadline Date"}
                            value={scheduleEndDate}
                            onChange={setScheduleEndDate}
                        />
                    </div>
                    <div className="col-sm-6">
                        <DateTimePicker
                            type={"time"}
                            dateFormat={"HH:mm:ss"}
                            heading={"Deadline Time"}
                            placeholder={"Deadline Time"}
                            value={scheduleEndTime}
                            onChange={setScheduleEndTime}
                        />
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"First Name"}
                            placeHolder={" First Name"}
                            value={firstName.value}
                            onChange={firstName.onChange}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Last Name"}
                            placeHolder={"Last Name"}
                            value={lastName.value}
                            onChange={lastName.onChange}
                        />
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Email"}
                            placeHolder={"Email"}
                            value={email.value}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                    setNotifyInterview(false);
                                    setNotifyReport(false);
                                } else {
                                    setNotifyError(false)
                                }
                                email.onChange(e);
                            }}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Mobile Number"}
                            maxLength={10}
                            type={"number"}
                            placeHolder={"Mobile Number"}
                            value={mobileNumber.value}
                            onChange={mobileNumber.onChange}
                        />
                    </div>
                </div>
                <div className={"d-flex justify-content-between align-items-center"}>

                    <Checkbox
                        id={"video-Recording"}
                        className={"text-primary"}
                        text={"Video Recording mandatory"}
                        defaultChecked={videoRecordMandatory}
                        onCheckChange={(checked) => {
                            setVideoRecordMandatory(checked);
                        }}
                    />

                    <Checkbox
                        text={"Notify interview"}
                        id={"notifyInterview"}
                        defaultChecked={notifyInterview}
                        onCheckChange={(checked) => {
                            setNotifyInterview(email.value ? checked : false);
                            setNotifyError(!email.value);
                        }}
                    />

                    <Checkbox
                        text={"Notify Report"}
                        id={"notifyReport"}
                        defaultChecked={notifyReport}
                        onCheckChange={(checked) => {
                            setNotifyReport(email.value ? checked : false);
                            setNotifyError(!email.value);
                        }}
                    />

                </div>
                {notifyError ? (
                    <div className='d-flex justify-content-end mt-2'>
                        <small className="text-red">
                            * Please fill above email field to enable notification.
                        </small>
                    </div>
                ) : null}

            </Modal>

            <Modal
                loading={addLoader.loader}
                title={"Add Candidate"}
                isOpen={addCandidateModal.visible}
                onClose={resetCandidatesValues}
                onClick={addCandidateCorporateLiteApiHandler}
            >
                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"First Name"}
                            placeHolder={" First Name"}
                            value={candidateFirstName.value}
                            onChange={candidateFirstName.onChange}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Last Name"}
                            placeHolder={"Last Name"}
                            value={candidateLastName.value}
                            onChange={candidateLastName.onChange}
                        />
                    </div>
                </div>

                <div className={"row"}>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Email"}
                            placeHolder={"Email"}
                            value={candidateEmail.value}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                    setCandidateNotifyInterview(false);
                                    setCandidateNotifyReport(false);
                                } else {
                                    setNotifyError(false)
                                }
                                candidateEmail.onChange(e);
                            }}
                        />
                    </div>
                    <div className={"col-sm-6"}>
                        <Input
                            heading={"Mobile Number"}
                            maxLength={10}
                            type={"number"}
                            placeHolder={"Mobile Number"}
                            value={candidateMobileNumber.value}
                            onChange={candidateMobileNumber.onChange}
                        />
                    </div>
                </div>


                <div className={"d-flex m-0 p-0"}>
                    <Checkbox
                        className={"text-primary flex-row"}
                        text={"Notify interview"}
                        id={"candidateNotifyInterview"}
                        defaultChecked={candidateNotifyInterview}
                        onCheckChange={(checked) => {
                            if (candidateEmail.value) {
                                setCandidateNotifyInterview(checked);
                                setNotifyError(false);
                            } else {
                                setCandidateNotifyInterview(false);
                                setNotifyError(true);
                            }
                        }}
                    />
                    <div className="ml-3"></div>
                    <Checkbox
                        className={"text-primary"}
                        text={"Notify Report"}
                        id={"candidateNotifyReport"}
                        defaultChecked={candidateNotifyReport}
                        onCheckChange={(checked) => {
                            if (candidateEmail.value) {
                                setCandidateNotifyReport(checked);
                                setNotifyError(false);
                            } else {
                                setCandidateNotifyReport(false);
                                setNotifyError(true);
                            }
                        }}
                    />
                </div>
                {notifyError ? (
                    <small className="text-red mt-2">
                        Please fill above email field to enable notification
                    </small>
                ) : null}
            </Modal>
        </>
    );
}

export { OpeningLite };
