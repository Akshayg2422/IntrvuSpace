import React, { useEffect, useState } from 'react'
import { CandidatesProps } from './interfaces'
import { Input, Button, DropDown, CommonTable, Image, MenuBar, Modal, showToast, NoDataFound, Alert } from '@Components'
import { fetchCandidatesCorporate, createSchedule, refreshCorporateSchedule, postManualApprovalOnCandidate, bulkUploadCandidates } from '@Redux'
import { useSelector, useDispatch } from 'react-redux';
import { paginationHandler, capitalizeFirstLetter, validate, VALIDATE_ADD_NEW_CANDIDATES_RULES, ifObjectExist, getValidateError } from '@Utils';
import { icons } from '@Assets';
import { useModal, useInput, useLoader, useDropDown, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { BulkUpload } from '@Modules'
import './index.css'


function Candidates({ id, details }: CandidatesProps) {

    const { goTo } = useNavigation()

    const CANDIDATE_MENU_OPTIONS = [
        { id: 1, name: "Approve Manually" },
        { id: 2, name: "Reject Manually" },
        { id: 3, name: "Remove Candidate" },
        { id: 4, name: "Close Candidate" },
    ];

    const USER_STATUS_FILTER = [
        { id: "ALL", text: "All" },
        { id: "SLD", text: "Selected" },
        { id: "RJD", text: "Rejected" },
        { id: "YTS", text: "Yet to Start" },
    ];


    const getIcon = (key: number) => {
        const iconsMap = {
            1: { icon: icons.check, h: 12, w: 12 },
            2: { icon: icons.frame, h: 18, w: 18 },
            3: { icon: icons.checkBlack, h: 18, w: 18 }
        }
        return iconsMap[key];
    };

    const dispatch = useDispatch();

    const { candidate_details = {}, vacancies = 0 } = details || {}
    const { total_candidates = 0, yet_to_attend_candidates = 0, selected_candidates = 0, rejected_candidates = 0 } = candidate_details

    const {
        candidatesList,
        candidatesCount,
        candidatesListNumOfPages,
        candidatesListCurrentPages,
    } = useSelector((state: any) => state.DashboardReducer);


    /**
     * add candidate state
     */

    const addCandidateModal = useModal(false);
    const addCandidateLoader = useLoader(false);


    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const mobileNumber = useInput("");


    const candidateStatus = useDropDown(USER_STATUS_FILTER[0])
    const searchCandidate = useInput('')



    const [selectedCandidates, setSelectedCandidates] = useState(undefined)


    /**
     * remove candidate
     */

    const removeCandidateModal = useModal(false);
    const closeCandidateModal = useModal(false);


    /**
  * bulk upload state
  */

    const bulkUploadModal = useModal(false)
    const bulkUploadLoader = useLoader(false)




    function openBulkUploadHandler() {
        bulkUploadModal.show();
    }


    useEffect(() => {
        getCandidatesCorporate(candidatesListCurrentPages);
    }, [candidateStatus?.value?.id, searchCandidate?.value]);


    const getCandidatesCorporate = (page_number: number) => {

        const params = {
            corporate_openings_details_id: id,
            ...(searchCandidate?.value && { q: searchCandidate?.value }),
            ...(candidateStatus.value.id === USER_STATUS_FILTER[1].id && { is_approved: true }),
            ...(candidateStatus.value.id === USER_STATUS_FILTER[2].id && { is_rejected: true }),
            ...(candidateStatus.value.id === USER_STATUS_FILTER[3].id && {
                is_not_attended: true,
            }),
            page_number,
        };


        dispatch(
            fetchCandidatesCorporate({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => { },
            })
        );
    };

    const normalizedTableData = (data: any) => {
        if (data && data.length > 0)
            return data.map((item: any) => {

                const {
                    candidate_score,
                    interviewee_name,
                    interviewee_mobile_number,
                    interviewee_email,
                    status_note,
                    status_note_colour,
                    is_report_completed,
                    status_icon_type,
                    is_closed
                } = item;


                const status = getIcon(status_icon_type)
                return {
                    "": (
                        <div className={'d-flex align-items-center'}>
                            {status_icon_type ?
                                <Image src={status.icon} height={status.h} width={status.w} style={{
                                    objectFit: 'contain',
                                }} /> : null
                            }
                            {candidate_score &&
                                <div className={'screen-heading ml-2'}>
                                    {candidate_score}
                                </div>
                            }
                        </div>
                    ),
                    name: (
                        <div className={'th-bold'}>
                            {capitalizeFirstLetter(interviewee_name)}
                        </div>
                    ),

                    Mobile: (
                        <div className={'th-regular'}>
                            {interviewee_mobile_number}
                        </div>
                    ),

                    Email: (
                        <div className={'th-regular'}>
                            {interviewee_email}
                        </div>
                    ),

                    "status Note": (
                        <div className={`text-${status_note_colour} font-weight-400`}>
                            {status_note}
                        </div>
                    ),

                    " ":
                        <div className={'d-flex align-items-center'}>
                            {is_report_completed &&
                                <div className={'th-button'}>
                                    <Button
                                        block
                                        outline
                                        text={'Report'}
                                        onClick={
                                            () => {
                                                gotoReportScreen(item)
                                            }
                                        }
                                    />
                                </div>
                            }
                            {!is_closed &&
                                <div className={'th-menu-container'}>
                                    <MenuBar
                                        menuData={CANDIDATE_MENU_OPTIONS}
                                        onClick={(action) => onCandidateMenuHandler(action, item)}
                                    />
                                </div>
                            }
                        </div >
                };
            });
    };


    function generateNewCandidateHandler() {
        const params = {
            corporate_openings_details_id: id,
            first_name: firstName.value,
            last_name: lastName.value,
            mobile_number: mobileNumber.value,
            email: email.value,
        };

        const validation = validate(VALIDATE_ADD_NEW_CANDIDATES_RULES, params);

        if (ifObjectExist(validation)) {
            addCandidateLoader.show();
            dispatch(
                createSchedule({
                    params,
                    onSuccess: (response: any) => () => {
                        resetValues();
                        dispatch(refreshCorporateSchedule())
                        showToast("Candidate added successfully", "success");
                        addCandidateLoader.hide();
                        addCandidateModal.hide();
                        getCandidatesCorporate(candidatesListCurrentPages);
                    },
                    onError: (error: any) => () => {
                        showToast(error.error_message, "error");
                        addCandidateModal.hide();
                        addCandidateLoader.hide();
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    }


    /**
     * candidate menu Handler
     */



    function onCandidateMenuHandler(action: any, item: any) {
        const { id } = item
        setSelectedCandidates(id)

        if (action.id === CANDIDATE_MENU_OPTIONS[0].id) {
            const params = { is_manually_approved: true }
            postManualApprovalOnCandidateApiHandler(params, id);

        } else if (action.id === CANDIDATE_MENU_OPTIONS[1].id) {
            const params = { is_manually_rejected: true }
            postManualApprovalOnCandidateApiHandler(params, id);
        }
        else if (action.id === CANDIDATE_MENU_OPTIONS[2].id) {
            removeCandidateModal.show();
        }
        else if (action.id === CANDIDATE_MENU_OPTIONS[3].id) {
            closeCandidateModal.show()
        }
    }


    const postManualApprovalOnCandidateApiHandler = (updatedParams: any, id?: any) => {
        const params = {
            corporate_schedule_id: id ? id : selectedCandidates,
            ...updatedParams
        };


        console.log(JSON.stringify(params) + '=====');

        dispatch(
            postManualApprovalOnCandidate({
                params,
                onSuccess: (response: any) => () => {
                    showToast(response.message, "success");
                    getCandidatesCorporate(candidatesListCurrentPages);
                    dispatch(refreshCorporateSchedule());

                    try {
                        closeCandidateModal.hide();
                        removeCandidateModal.hide();
                        setSelectedCandidates(undefined)
                    } catch (e) {

                    }
                },
                onError: (error: any) => () => {
                    showToast(error.error_message, "error");
                },
            })
        );
    };


    function removeCandidateApiHandler() {
        const params = { is_removed: true }
        postManualApprovalOnCandidateApiHandler(params)
    }

    function closeCandidateApiHandler() {
        const params = { is_closed: true }
        postManualApprovalOnCandidateApiHandler(params)
    }


    const gotoReportScreen = (item: any) => {
        const { schedule_id } = item;
        goTo(ROUTES["designation-module"].report + "/" + schedule_id);
    };


    function resetValues() {
        firstName.set("");
        lastName.set("");
        email.set("");
        mobileNumber.set("");
    }


    /**
     * bulk upload
     */

    // bulk upload candidates

    function bulkUploadCandidatesHandler(file: any) {
        const params = {
            corporate_openings_details_id: details?.id,
            csv_file: file,
        };

        bulkUploadLoader.show();

        dispatch(
            bulkUploadCandidates({
                params,
                onSuccess: (response: any) => () => {
                    showToast(response.message, "success");
                    bulkUploadLoader.hide();
                    dispatch(refreshCorporateSchedule());
                    bulkUploadModal.hide()
                    getCandidatesCorporate(candidatesListCurrentPages);
                },
                onError: (error: any) => () => {
                    showToast(error.error_message, "error");
                    bulkUploadLoader.hide();
                },
            })
        );
    }


    return (
        <>

            {
                candidatesCount <= 0 &&
                <div className={'empty-candidates-container'}>
                    <div className={'text-heading'}>{'Start adding your Candidates Now !'}</div>
                    <div className={'empty-candidates-des-container'}>
                        <div className={'text-des'}>
                            {'Start adding the candidates with their email and phone number. intrvu SPACE instantly schedules interviews and sends the interview'}
                        </div>
                        <div className={'text-des'}>
                            {'invite link over email and message with the deadlines before which they can join anytime of their preference'}
                        </div>
                    </div>
                    <div className={'empty-candidates-btn-container'}>
                        <div className={'empty-btn-container'}>
                            <Button block text={'Add Manually'} onClick={addCandidateModal.show} />
                        </div>
                        <div className={'empty-btn-container bulk-btn-container'}>
                            <Button block text={'Bulk Import'} onClick={openBulkUploadHandler} />
                        </div>
                    </div>
                </div>
            }

            {
                candidatesCount > 0 &&
                <div>
                    <div className={'candidate-dashboard-container'}>
                        <div className={'dashboard-card-container dashboard-card-spacing  dashboard-card-left-spacing'}>
                            <div className={'dashboard-title'}>{'Total Candidates'}</div>
                            <div className={'text-heading'}>{total_candidates}</div>
                        </div>
                        <div className={'dashboard-card-container dashboard-card-spacing'}>
                            <div className={'dashboard-title'}>{'Selected Candidates'}</div>
                            <div>
                                <span className={`text-heading ${selected_candidates > 0 && 'text-primary'}`}>{selected_candidates}</span>
                                <span className={'selected-sub-text'}>{`/${vacancies}`}</span>
                            </div>

                        </div>
                        <div className={'dashboard-card-container dashboard-card-spacing '}>
                            <div className={'dashboard-title'}>{'Rejected Candidates'}</div>
                            <div className={'text-heading'}>{rejected_candidates}</div>

                        </div>
                        <div className={'dashboard-card-container dashboard-card-spacing dashboard-card-right-spacing'}>
                            <div className={'dashboard-title'}>{'Yet to Start '}</div>
                            <div className={'text-heading'}>{yet_to_attend_candidates}</div>
                        </div>

                    </div>

                    <div className={'card-container'}>
                        <div className={'table-heading'}>
                            <span className={'screen-heading'}>{'Candidates'}</span>
                            <div className={'badge-schedule'}>
                                <span className={'badge-text'}>{`${selected_candidates} Selected`}</span>
                            </div>
                        </div>

                        <div className={'table-search-container'}>
                            <div className={'col-sm-4 input-container'}>
                                <Input
                                    noSpace
                                    placeHolder={'Name, Email, ...'}
                                    value={searchCandidate?.value}
                                    onChange={searchCandidate?.onChange}
                                />
                            </div>

                            <div className={'col-sm-3 input-container'}>
                                <DropDown noSpace id={'status'}
                                    data={USER_STATUS_FILTER}
                                    selected={candidateStatus.value}
                                    onChange={candidateStatus.onChange}
                                />
                            </div>

                            <div className={'add-candidate-container'}>
                                <div className={'add-button-container'}>
                                    <Button block text={'Add'} onClick={addCandidateModal.show} />
                                </div>
                                <div className={'add-button-container'}>
                                    <Button block outline text={'Bulk Import'} onClick={openBulkUploadHandler} />
                                </div>
                            </div>
                        </div>

                        <div className={'table-container'}>
                            {candidatesList?.length > 0 ?
                                <CommonTable
                                    isPagination={candidatesListNumOfPages > 1}
                                    tableDataSet={candidatesList}
                                    displayDataSet={normalizedTableData(candidatesList)}
                                    noOfPage={candidatesListNumOfPages}
                                    currentPage={candidatesListCurrentPages}
                                    paginationNumberClick={(currentPage) => {
                                        getCandidatesCorporate(
                                            paginationHandler('current', currentPage)
                                        );
                                    }}
                                    previousClick={() => {
                                        getCandidatesCorporate(
                                            paginationHandler(
                                                'prev',
                                                candidatesListCurrentPages
                                            )
                                        );
                                    }}
                                    nextClick={() => {
                                        getCandidatesCorporate(
                                            paginationHandler(
                                                'next',
                                                candidatesListCurrentPages
                                            )
                                        );
                                    }}
                                />
                                :
                                <div className={'no-data-found'}>
                                    <NoDataFound />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }


            {
                /**
                 * add candidate Modal
                 */
            }
            <Modal
                loading={addCandidateLoader.loader}
                title={'Add Candidate'}
                isOpen={addCandidateModal.visible}
                onClose={addCandidateModal.hide}
                onClick={generateNewCandidateHandler}
            >
                <div className={'row'}>
                    <div className={'col-sm-6'}>
                        <Input
                            heading={'First Name'}
                            placeholder={'First Name'}
                            value={firstName.value}
                            onChange={firstName.onChange}
                        />
                    </div>
                    <div className={'col-sm-6'}>
                        <Input
                            heading={'Last Name'}
                            placeholder={'Last Name'}
                            value={lastName.value}
                            onChange={lastName.onChange}
                        />
                    </div>
                </div>
                <div className={'row'}>
                    <div className={'col-sm-6'}>
                        <Input
                            maxLength={10}
                            heading={'Mobile Number'}
                            placeholder={'Mobile Number'}
                            type={'number'}
                            value={mobileNumber.value}
                            onChange={mobileNumber.onChange}
                        />
                    </div>
                    <div className={'col-sm-6'}>
                        <Input
                            heading={'Email'}
                            placeholder={'Email'}
                            value={email.value}
                            onChange={email.onChange}
                        />
                    </div>
                </div>
            </Modal>

            {

                /**
                 * remove candidate alert
                 */
            }

            <Alert
                isOpen={removeCandidateModal.visible}
                title={'Remove Candidate'}
                subTitle={'Are you sure, want to remove this candidate?'}
                onClose={() => {
                    removeCandidateModal.hide();
                }}
                primaryOnClick={removeCandidateApiHandler}
                secondaryOnClick={removeCandidateModal.hide}

            />

            <Alert
                isOpen={closeCandidateModal.visible}
                title={'Remove Candidate'}
                subTitle={'Are you sure, want to remove this candidate?'}
                onClose={() => {
                    closeCandidateModal.hide();
                }}
                primaryOnClick={closeCandidateApiHandler}
                secondaryOnClick={closeCandidateModal.hide}

            />

            <BulkUpload
                loading={addCandidateLoader.loader}
                tempFile={details?.bulk_upload_template}
                isOpen={bulkUploadModal.visible}
                onClose={bulkUploadModal.hide}
                onUpload={bulkUploadCandidatesHandler}
            />
        </>
    )
}

export { Candidates }