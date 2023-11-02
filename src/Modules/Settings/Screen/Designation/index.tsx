/* eslint-disable react-hooks/exhaustive-deps */

import { Button, DesignationItem, DropDown, Heading, Input, InputHeading, Modal, NoDataFound, PageNation, ReactAutoComplete, Spinner, TextArea, showToast, TopNavbarCorporateFlow } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { UploadCorporateOpeningsCard, } from '@Modules';
import { addDepartmentCorporate, addSectorCorporate, breadCrumbs, createCorporateSchedules, getCorporateSchedules, getDepartmentCorporate, getSectorCorporate, hideCreateOpeningsModal, setSelectedRole, updateCorporateSchedules } from '@Redux';
import { ROUTES } from '@Routes';
import { CREATE_CORPORATE_SCHEDULE_RULES, EXPERIENCE_LIST, INTERVIEW_DURATIONS, STATUS_LIST, getDropDownCompanyDisplayData, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css'

function Designation() {

    const { sectorsCorporate, departmentCorporate, createOpening, corporateSchedules, corporateScheduleNumOfPages, corporateScheduleCurrentPages } = useSelector((state: any) => state.DashboardReducer)

    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    const DEFAULT_VALUE = { id: '-1', text: "All" }

    /**
     * filter state
     */
    const positionSearch = useInput('')
    const filterDepartment = useDropDown(DEFAULT_VALUE);
    const filterSector = useDropDown(DEFAULT_VALUE);
    const status = useDropDown(STATUS_LIST[1]);



    const [selectSector, setSelectedSector] = useState<any>('')
    const [selectDepartment, setSelectedDepartment] = useState<any>('')

    const [selectedDesignation, setSelectedDesignation] = useState<any>({})
    const [selectedVariant, setSelectedVariant] = useState<any>({})

    const listLoader = useLoader(false);



    const addDesignationModal = useModal(false);
    const addRoleModal = useModal(false);
    const title = useInput("");
    const description = useInput("");
    const sector = useDropDown({});
    // const experience = useInput('')
    const experience = useDropDown(EXPERIENCE_LIST[0])
    const jd = useInput('');
    const portalUrl = useInput('');
    const sectorInput = useInput('');
    const loader = useLoader(false);
    const position = useInput('');



    const [isFilter, setIsFilter] = useState(false)




    const [selectedDuration, setSelectedDuration] = useState<any>(INTERVIEW_DURATIONS[0])


    const vacancies = useInput('1')
    const [loading, setLoading] = useState(false);





    useEffect(() => {
        getCorporateScheduleApiHandler(corporateScheduleCurrentPages);
    }, [filterSector.value, filterDepartment.value, status.value]);



    useEffect(() => {
        getSectorsCorporateApiHandler();
        getDepartmentCorporateApiHandler();
    }, [])

    const getSectorsCorporateApiHandler = () => {
        const params = {}
        dispatch(
            getSectorCorporate({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        )
    }

    const addSectorCorporateApiHandler = (value) => {
        const params = { name: value, description: null }
        dispatch(
            addSectorCorporate({
                params,
                onSuccess: (response) => () => {
                    const { details } = response
                    setSelectedSector(details);
                    getSectorsCorporateApiHandler();
                },
                onError: (error) => () => {
                },
            })
        )
    }

    const getDepartmentCorporateApiHandler = () => {
        const params = {}
        dispatch(
            getDepartmentCorporate({
                params,
                onSuccess: (response: any) => () => {
                },
                onError: () => () => {
                },
            })
        )
    }

    const addDepartmentApiHandler = (value) => {
        const params = { name: value }
        dispatch(
            addDepartmentCorporate({
                params,
                onSuccess: (response: any) => () => {
                    const { details } = response
                    setSelectedDepartment(details);
                    getDepartmentCorporateApiHandler();
                },
                onError: (error) => () => {
                },
            })
        )
    }

    const createCorporateScheduleApiHandler = () => {

        const params = {
            ...(selectSector ? { sector_id: selectSector.id } : {}),
            ...(selectDepartment ? { department_id: selectDepartment?.id } : {}),
            role: position.value,
            experience: parseInt(experience.value?.id),
            jd: jd.value,
            vacancies: vacancies?.value,
            interview_duration: selectedDuration?.value,
        }


        const validation = validate(CREATE_CORPORATE_SCHEDULE_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()
            dispatch(
                createCorporateSchedules({
                    params,
                    onSuccess: (response) => () => {
                        getCorporateScheduleApiHandler(corporateScheduleCurrentPages)
                        loader.hide()
                        showToast(response.message, 'success');
                        addRoleModal.hide()
                        resetValues()
                        dispatch(hideCreateOpeningsModal())
                    },
                    onError: (error) => () => {
                        showToast(error.error_message, 'error');
                        loader.hide()
                    },
                })
            )
        } else {
            showToast(getValidateError(validation))
        }
    };



    function resetValues() {
        addRoleModal.hide()
        position.set("")
        experience.set({})
        jd.set("")
        vacancies.set('')
        setSelectedDuration(INTERVIEW_DURATIONS[0]);
    }

    const getCorporateScheduleApiHandler = (page_number: number) => {
        const filterStatus = status.value?.id === 'ACV' ? { is_active: true } : status.value?.id === 'CSD' ? { is_active: false } : undefined;
        const params = {
            page_number,
            ...(positionSearch?.value && { position: positionSearch?.value }),
            ...(filterStatus && filterStatus),
            ...((filterSector && filterSector.value.id !== '-1') && { sector_id: filterSector?.value?.id }),
            ...((filterDepartment && filterDepartment.value.id !== '-1') && { department_id: filterDepartment?.value?.id })
        }
        const keysToCheck = ['position', 'sector_id', 'department_id'];
        const exists = keysToCheck.some(key => params.hasOwnProperty(key));

        setIsFilter(exists);

        listLoader.show();
        dispatch(
            getCorporateSchedules({
                params,
                onSuccess: () => listLoader.hide,
                onError: () => listLoader.hide,
            })
        )
    }

    return (
        <div className={'screen'}>
            {/* <TopNavbarCorporateFlow /> */}

            {
                listLoader.loader && <div className='h-100'><Spinner /></div>
            }
            {
                !listLoader.loader && corporateSchedules.length <= 0 && <UploadCorporateOpeningsCard />
            }

            {corporateSchedules.length > 0 &&
                <div className={'screen-container'}>
                    <div>
                        <div>
                            <div className='row'>
                                <div className='col-sm-3'>
                                    <Input
                                        heading={'Position'}
                                        type={'text'}
                                        placeHolder={"HR Executive, QA Manager..."}
                                        value={positionSearch?.value}
                                        onChange={positionSearch.onChange}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <DropDown
                                        id={'status'}
                                        heading={'Status'}
                                        data={STATUS_LIST}
                                        selected={status.value}
                                        onChange={status.onChange}

                                    />
                                </div>
                                <div className='col-sm-3'>
                                    {departmentCorporate && departmentCorporate.length > 0 && <DropDown
                                        id={'department'}
                                        heading={'Department'}
                                        data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(departmentCorporate)]}
                                        selected={filterDepartment.value}
                                        onChange={filterDepartment.onChange}
                                    />
                                    }
                                </div>


                                <div className='col-sm-3'>
                                    {sectorsCorporate && sectorsCorporate.length > 0 &&
                                        <DropDown
                                            id={'sector'}
                                            heading={'Sector'}
                                            data={[DEFAULT_VALUE, ...getDropDownCompanyDisplayData(sectorsCorporate)]}
                                            selected={filterSector.value}
                                            onChange={filterSector.onChange}
                                        />
                                    }
                                </div>

                                <div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                corporateSchedules && corporateSchedules.length > 0 &&
                                (
                                    corporateSchedules.map((item: any, index: number) => {
                                        return (
                                            <div className={index === 0 ? 'schedule-container-top' : 'schedule-container'}>
                                                <DesignationItem
                                                    key={index}
                                                    item={item}
                                                    onViewMore={
                                                        (status) => {
                                                            const updateData = [...corporateSchedules]
                                                            updateData[index] = { ...updateData[index], is_view_more: status }
                                                            dispatch(updateCorporateSchedules(updateData))
                                                        }
                                                    }
                                                />
                                            </div>
                                        );
                                    })

                                )
                            }
                        </div>

                        {
                            corporateScheduleNumOfPages > 1 &&
                            <div className='mt-3'>
                                <PageNation
                                    currentPage={corporateScheduleCurrentPages}
                                    noOfPage={corporateScheduleNumOfPages}
                                    isPagination={corporateScheduleNumOfPages}
                                    paginationNumberClick={(currentPage) => {
                                        getCorporateScheduleApiHandler(paginationHandler("current", currentPage));
                                    }}
                                    previousClick={() => {
                                        getCorporateScheduleApiHandler(paginationHandler("prev", corporateScheduleCurrentPages))
                                    }
                                    }
                                    nextClick={() => {
                                        getCorporateScheduleApiHandler(paginationHandler("next", corporateScheduleCurrentPages));
                                    }}
                                />
                            </div>
                        }

                    </div>
                </div>
            }

            <Modal
                size={'lg'}
                isOpen={createOpening}
                onClose={() => {
                    dispatch(hideCreateOpeningsModal())
                }}
            >
                <div className='px-md-6 px-3 '>
                    <Heading heading={'Create Opening'} style={{ fontSize: '26px', fontWeight: 800, margin: 0 }} />
                    <div className='text-default pt-1 font-weight-500'>Input job details, specifying qualifications, requirements, interview duration</div>

                    <div className={'pt-5 px-0'}>
                        <div className='row'>
                            <div className='col-sm-5'>
                                <Input
                                    heading={'Position'}
                                    type={'text'}
                                    placeHolder={"HR Executive, QA Manager..."}
                                    value={position.value}
                                    onChange={position.onChange} />
                            </div>

                            <div className='col-sm-4' style={{
                                zIndex: 1
                            }}>
                                <DropDown
                                    heading={'Experience'}
                                    id={'experience'}
                                    data={EXPERIENCE_LIST}
                                    selected={experience.value}
                                    onChange={experience.onChange}
                                />
                            </div>
                            <div className='col-sm-3 mt-4 mt-sm-0'>
                                <Input
                                    heading={'Vacancies'}
                                    type={'number'}
                                    placeHolder={"0"}
                                    value={vacancies.value}
                                    onChange={vacancies.onChange}
                                />
                            </div>
                        </div>

                        <div className='pt-2 '>
                            <TextArea
                                heading='Job Description'
                                value={jd.value}
                                placeholder={'Role : \n...............................................................................................................................................\n...............................................................................................................................................\n...............................................................................................................................................\n.......................................................................................\nResponsibilities :\n1. ............................................................................................................................................\n2. ...........................................................................................................................................\n3. ...........................................................................................................................................'}
                                className={"float-end p-4"}
                                onChange={jd.onChange} />
                        </div>
                        <div className='mb-sm-4'>
                            <InputHeading heading={'Duration'} />
                            <div className='d-flex flex-wrap justify-content-between'>
                                {
                                    INTERVIEW_DURATIONS.map((item) => {
                                        const { id, subText } = item
                                        return (
                                            <div className='mb-4 mb-sm-0'>
                                                <Button
                                                    text={subText}
                                                    className={`${selectedDuration?.id === id ? "btn-outline-primary" : "btn-outline-light-gray text-default"} rounded-sm px-sm-4`} style={{ width: "140px" }} onClick={() => {
                                                        setSelectedDuration(item)
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <ReactAutoComplete
                                    selected={selectSector?.name}
                                    data={sectorsCorporate}
                                    heading={"Sector"}
                                    onAdd={(value: any) => {
                                        addSectorCorporateApiHandler(value)
                                    }}
                                    onSelected={setSelectedSector}
                                />
                            </div>
                            <div className='col'>
                                <ReactAutoComplete
                                    selected={selectDepartment?.name}
                                    data={departmentCorporate}
                                    heading={"Department"}
                                    onAdd={(value: string) => {
                                        addDepartmentApiHandler(value)
                                    }}
                                    onSelected={setSelectedDepartment}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="col d-flex justify-content-center py-5">
                        <Button size={'md'}
                            loading={loader.loader}
                            text={"Create Opening"}
                            className={'rounded-sm px-5'}
                            onClick={createCorporateScheduleApiHandler}
                        />
                    </div>
                </div>

            </Modal >
        </div>
    )
}

export { Designation };
