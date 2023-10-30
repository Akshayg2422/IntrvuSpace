
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs, showToast, TextArea, ReactAutoComplete, Heading, InputHeading, TopNavbarCorporateFlow, Spinner, PageNation } from '@Components';
import { useDropDown, useInput, useKeyPress, useLoader, useModal, useNavigation } from '@Hooks';
import { CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, breadCrumbs, clearBreadCrumbs, createCorporateSchedules, createKnowledgeGroup, createKnowledgeGroupVariant, getDepartmentCorporate, getCorporateSchedules, getKnowledgeGroups, getSectorCorporate, getSectors, setSelectedRole, addSectorCorporate, addDepartmentCorporate, showCreateOpeningsModal, hideCreateOpeningsModal, fetchCandidatesCorporateSuccess } from '@Redux';
import { ROUTES } from '@Routes';
import { ADD_DESIGNATION_RULES, CREATE_CORPORATE_SCHEDULE_RULES, CREATE_KNOWLEDGE_GROUP_VARIANT_RULES, STATUS_LIST, getDropDownCompanyDisplayData, getValidateError, ifObjectExist, paginationHandler, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames'
import { UploadCorporateOpeningsCard } from '@Modules';


const PLACE_HOLDER = {
    "sector": "Software, Banking...",
}


function Designation() {

    const { sectors } = useSelector((state: any) => state.DashboardReducer)
    const { sectorsCorporate, departmentCorporate, createOpening, corporateSchedules, corporateScheduleNumOfPages, corporateScheduleCurrentPages } = useSelector((state: any) => state.DashboardReducer)




    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const [navIndex, setNavIndex] = useState<any>(0)
    const [navList, setNavList] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])
    const [selectSector, setSelectedSector] = useState<any>('')
    const [selectDepartment, setSelectedDepartment] = useState<any>('')

    const [selectedDesignation, setSelectedDesignation] = useState<any>({})
    const [selectedVariant, setSelectedVariant] = useState<any>({})

    console.log(selectSector, "card selectSectorselectSectorselectSector------>");


    const addDesignationModal = useModal(false);
    const addRoleModal = useModal(false);
    const title = useInput("");
    const [positionSearch, setPositionSearch] = useState("")
    const description = useInput("");
    const sector = useDropDown({});
    // const experience = useInput('')
    const [experience, setExperience] = useState("")
    const jd = useInput('');
    const portalUrl = useInput('');
    const position = useInput('');
    const sectorInput = useInput('');
    const loader = useLoader(false);
    const interviewDurations: any = [
        { id: 1, text: 'Quick', subText: '5 mins', value: 5, isActive: false },
        { id: 2, text: 'Short', subText: '10 mins', value: 10, isActive: false },
        { id: 3, text: 'Medium', subText: '15 mins', value: 15, isActive: false },
        { id: 4, text: 'Long', subText: '30 mins', value: 30, isActive: false },
    ];

    const [changeColorButton, setChangeColorButton] = useState<any>(interviewDurations)
    const [vacancies, setVacancies] = useState<any>('')
    const [interviewDuration, setInterviewDuration] = useState<any>('')
    const [loading, setLoading] = useState(true);
    const status = useDropDown(STATUS_LIST[1]);
    const enterPress = useKeyPress("Enter");
    const [isPositionExist, setIsPositionExist] = useState<boolean>(false)


    useEffect(() => {
        getCorporateScheduleApiHandler(corporateScheduleCurrentPages);
    }, []);


    useEffect(() => {
        if (isPositionExist) {
            getCorporateScheduleApiHandler(corporateScheduleCurrentPages);
        }
    }, [enterPress]);





    useEffect(() => {
        dispatch(clearBreadCrumbs([]))
        // getSectorsApiHandler();
        getSectorsCorporateApiHandler();
        getDepartmentCorporateApiHandler();
        // dispatch(fetchCandidatesCorporateSuccess(undefined))
    }, [])

    const getSectorsCorporateApiHandler = () => {
        const params = {}
        dispatch(
            getSectorCorporate({
                params,
                onSuccess: (response: any) => () => {

                },
                onError: () => () => {
                },
            })
        )
    }

    const addSectorCorporateApiHandler = (value) => {
        console.log(value, "apiCheck");
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
            experience: experience,
            jd: jd.value,
            vacancies: vacancies,
            interview_duration: interviewDuration,
        }


        const validation = validate(CREATE_CORPORATE_SCHEDULE_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()
            dispatch(
                createCorporateSchedules({
                    params,
                    onSuccess: (response) => () => {
                        console.log(response, "submit");
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
        setExperience("")
        jd.set("")
        position.set('')
        setVacancies('')
        setInterviewDuration('')
    }

    const getCorporateScheduleApiHandler = (page_number: number) => {

        let is_active = '';

        if (status.value === 'ACV') {
            is_active = 'true';
        } else if (status.value === 'CSD') {
            is_active = 'false';
        }
        const params = {
            position: positionSearch,
            page_number,
            is_active
            // sector_id: '',
            // department_id: ''
        }
        dispatch(getCorporateSchedules({
            params,
            onSuccess: (response: any) => () => {
                setCardData(response.details.corporate_jd_items.data)
                console.log('getCorporateScheduleApiHandler---->', response)
                setLoading(false)
            },
            onError: (error) => () => {

            },
        }))
    }


    const handleItemClick = (index) => {
        const updatedButtons = changeColorButton.map((item, i) => {
            if (i === index) {
                return { ...item, isActive: true };
            } else {
                return { ...item, isActive: false };
            }
        });
        setChangeColorButton(updatedButtons);
    };


    return (
        <>
            <TopNavbarCorporateFlow />
            {
                loading ? (
                    <div className={'vh-100 d-flex justify-content-center align-items-center'}>
                        <Spinner />
                    </div>
                ) : corporateSchedules?.details?.corporate_jd_items?.data.length === 0 && !isPositionExist ? (
                    <UploadCorporateOpeningsCard />
                ) : (<div className='pt-4 mx-sm-7'>
                    <div className='row pt-6'>
                        <div className='col'>
                            <Input
                                heading={'Position'}
                                type={'text'}
                                placeHolder={"HR Executive, QA Manager..."}
                                value={positionSearch}
                                onChange={(e: any) => {
                                    setPositionSearch(e.target.value)
                                }}
                                onFocus={() => setIsPositionExist(true)}
                                onBlur={() => setIsPositionExist(false)}
                            />
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-12 ">
                            <DropDown
                                id={'status'}
                                heading={'Status'}
                                data={STATUS_LIST}
                                selected={status.value}
                                onChange={status.onChange}
                            />
                        </div>
                        <div className='col'>
                            <DropDown
                                id={'department'}
                                className="form-control-md rounded-sm"
                                heading={'Department'}
                            // data={}
                            // selected={}
                            // onChange={}
                            />
                        </div>
                        <div className='col'>
                            <DropDown
                                id={'sector'}
                                className="form-control-md rounded-sm"
                                heading={'Sector'}
                            // data={}
                            // selected={}
                            // onChange={}
                            />
                        </div>
                        <div>
                        </div>
                    </div>

                    <div className='row pt-4 '>
                        {cardData && cardData.length > 0 ? (
                            cardData.map((el: any, index: number) => {
                                return (
                                    <div className='col-sm-12 col-lg-12 mb-3' key={index}>
                                        <DesignationItem
                                            item={el}
                                            onEdit={(designation, role) => {
                                                setSelectedDesignation(designation);
                                                dispatch(setSelectedRole(role));
                                                const { name, description } = role;
                                                title.set(name);
                                                position.set(name);
                                                if (description) {
                                                    description.set(description);
                                                }
                                                addRoleModal.show();
                                            }}
                                            onView={(role) => {
                                                dispatch(setSelectedRole(role));
                                                dispatch(breadCrumbs({ name: role?.name, title: el?.name, path: window.location.pathname }));
                                                goTo(ROUTES['designation-module']['variant-info']);
                                            }}
                                        />
                                    </div>
                                );
                            })

                        ) : (
                            <div
                                className={'d-flex justify-content-center align-items-center mx-auto my-auto'}
                                style={{
                                    height: '60vh'
                                }}
                            >
                                <NoDataFound />
                            </div>
                        )}
                    </div>
                    <PageNation
                        currentPage={corporateScheduleCurrentPages}
                        noOfPage={corporateScheduleNumOfPages}
                        isPagination={corporateScheduleNumOfPages > 1}
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
                )
            }

            <Modal size={'lg'} isOpen={createOpening} onClose={() => {
                resetValues()
                dispatch(hideCreateOpeningsModal())
            }}
                style={{ padding: 0 }}>
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

                            <div className='col-sm-4'>
                                <InputHeading heading={'Experience'} />
                                <select
                                    id="experience"
                                    value={experience}
                                    placeholder='Select'
                                    onChange={(e) => setExperience(e.target.value)}
                                    className={`form-control ${experience.length === 0 ? 'text-default' : 'text-black'} rounded-sm `}
                                >
                                    {Array.from({ length: 31 }, (_, index) => (
                                        <option key={index} value={index.toString()}>
                                            {index === 0 ? 'Fresher' : index}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-sm-3 mt-4 mt-sm-0'>
                                <Input

                                    heading={'Vacancies'}
                                    type={'number'}
                                    placeHolder={"0"}
                                    value={vacancies}
                                    onChange={(e) => setVacancies(e.target.value)} />
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
                                    changeColorButton.map((item, index) => {
                                        return <div className='mb-4 mb-sm-0'>
                                            <Button text={item.subText} className={`${item.isActive ? "btn-outline-primary" : "btn-outline-light-gray text-default"} rounded-sm px-sm-4`} style={{ width: "140px" }} onClick={() => {
                                                console.log(item.value);
                                                setInterviewDuration(item.value)

                                                handleItemClick(index)
                                            }} />

                                        </div>
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
                                    onAdd={(value) => {
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
                            className={'rounded px-5'}
                            onClick={createCorporateScheduleApiHandler}
                        />
                    </div>
                </div>

            </Modal >
        </>
    )
}

export { Designation };