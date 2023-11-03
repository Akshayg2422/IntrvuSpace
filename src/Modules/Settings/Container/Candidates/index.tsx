import React, { useEffect } from 'react'
import { CandidatesProps } from './interfaces'
import { Input, Button, DropDown, CommonTable, Image, MenuBar } from '@Components'
import { fetchCandidatesCorporate } from '@Redux'
import { useSelector, useDispatch } from 'react-redux';
import { paginationHandler, capitalizeFirstLetter } from '@Utils';
import { icons } from '@Assets';
import './index.css'


function Candidates({ id, details }: CandidatesProps) {

    const OPTIONS = [
        { id: 1, name: "Approve Manually" },
        { id: 2, name: "Reject Manually" },
        { id: 3, name: "Remove Candidate" },
        { id: 4, name: "Close Candidate" },
        // { id: 5, name: "Watch Interview" },
    ];


    const dispatch = useDispatch();

    const { candidate_details = {}, vacancies = 0 } = details || {}
    const { total_candidates = 0, yet_to_attend_candidates = 0, selected_candidates = 0, rejected_candidates = 0 } = candidate_details

    const {
        candidatesList,
        candidatesListNumOfPages,
        candidatesListCurrentPages,
    } = useSelector((state: any) => state.DashboardReducer);

    useEffect(() => {
        getCandidatesCorporate(candidatesListCurrentPages);
    }, []);


    const getCandidatesCorporate = (page_number: number) => {

        const params = {
            corporate_openings_details_id: id,
            // ...(searchCandidate && { q: searchCandidate }),
            // ...(statusNote.value.text === "Selected" && { is_approved: true }),
            // ...(statusNote.value.text === "Rejected" && { is_rejected: true }),
            // ...(statusNote.value.text === "Yet to Start" && {
            //   is_not_attended: true,
            // }),
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


    const getIcon = (key: number) => {
        const iconsMap = {
            1: icons.check,
            2: icons.frame,
            3: icons.checkBlack
        }
        return iconsMap[key];
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
                    status_icon_type
                } = item;

                return {
                    "": (
                        <div className={'d-flex align-items-center'}>
                            {status_icon_type ? <Image src={getIcon(status_icon_type)} height={13} width={13} style={{
                                objectFit: 'contain'
                            }} /> : null}
                            {candidate_score &&
                                <div className={'screen-heading ml-3'}>
                                    {candidate_score || 1}
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
                            <div className={'th-button'}>
                                <Button
                                    block
                                    outline
                                    text={'Report'}
                                    onClick={() => { }}
                                />
                            </div>
                            <div className={'th-menu-container'}>
                                <MenuBar
                                    menuData={OPTIONS}
                                    onClick={(action) => {

                                    }}
                                />
                            </div>
                        </div>
                };
            });
    };




    return (
        <>
            {
                candidatesList?.length > 0 ?
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
                                    <Input noSpace placeHolder={'Name, Email, ...'} />
                                </div>

                                <div className={'col-sm-3 input-container'}>
                                    <DropDown noSpace id={'status'} />
                                </div>

                                <div className={'add-candidate-container'}>
                                    <div className={'add-button-container'}>
                                        <Button block outline text={'Bulk Import'} />
                                    </div>
                                    <div className={'add-button-container'}>
                                        <Button block text={'Add'} />
                                    </div>
                                </div>
                            </div>

                            <div className={'table-container'}>
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
                            </div>
                        </div>
                    </div>
                    :
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
                                <Button block text={'Bulk Import'} />
                            </div>
                            <div className={'empty-btn-container bulk-btn-container'}>
                                <Button block text={'Add Manually'} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export { Candidates }