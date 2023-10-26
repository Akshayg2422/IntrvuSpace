
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs, showToast, TextArea, ReactAutoComplete, Heading, InputHeading, TopNavbarCorporateFlow } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, breadCrumbs, clearBreadCrumbs, createCorporateSchedules, createKnowledgeGroup, createKnowledgeGroupVariant, getDepartmentCorporate, getCorporateSchedules, getKnowledgeGroups, getSectorCorporate, getSectors, setSelectedRole, addSectorCorporate, addDepartmentCorporate, showCreateOpeningsModal, hideCreateOpeningsModal } from '@Redux';
import { ROUTES } from '@Routes';
import { ADD_DESIGNATION_RULES, CREATE_CORPORATE_SCHEDULE_RULES, CREATE_KNOWLEDGE_GROUP_VARIANT_RULES, getDropDownCompanyDisplayData, getValidateError, ifObjectExist, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames'


const PLACE_HOLDER = {
    "sector": "Software, Banking...",
}


function Designation() {

    const { sectors } = useSelector((state: any) => state.DashboardReducer)
    const { sectorsCorporate, departmentCorporate, createOpening } = useSelector((state: any) => state.DashboardReducer)


    // console.log('departmentCorporate---------->', JSON.stringify(departmentCorporate));


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
    const position = useInput('')
    const description = useInput("");
    const sector = useDropDown({});
    // const experience = useInput('')
    const [experience, setExperience] = useState("")
    const jd = useInput('');
    const portalUrl = useInput('');
    const role1 = useInput('');
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


    // console.log("position===>", position.value)
    // console.log(sectorsCorporate, 564554);

    useEffect(() => {
        dispatch(clearBreadCrumbs([]))
        // getSectorsApiHandler();
        getSectorsCorporateApiHandler();
        getDepartmentCorporateApiHandler();
        getCorporateScheduleApiHandler()
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
                    console.log(response, "addSectorCorporateApiHandler");

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
                    console.log('getDepartmentCorporate-------->', JSON.stringify(response))
                },
                onError: () => () => {
                },
            })
        )
    }

    const addDepartmentApiHandler = (value) => {
        console.log(value, "apiCheck");

        const params = { name: value }
        dispatch(
            addDepartmentCorporate({
                params,
                onSuccess: (response) => () => {
                    console.log(response, 'addDepartapiHandler');

                    getDepartmentCorporateApiHandler();
                },
                onError: (error) => () => {
                },
            })
        )
    }

    const createCorporateScheduleApiHandler = () => {

        const params = {
            sector_id: selectSector.id,
            department_id: selectDepartment.id,
            role: role1.value,
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
                        getCorporateScheduleApiHandler()
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
        role1.set('')
        setVacancies('')
        setInterviewDuration('')
    }

    const getCorporateScheduleApiHandler = () => {
        console.log('getCorporateScheduleApiHandler----------->', getCorporateScheduleApiHandler)
        const params = {}
        dispatch(getCorporateSchedules({
            params,
            onSuccess: (response: any) => () => {
                setCardData(response.details.corporate_jd_items)
                console.log('getCorporateScheduleApiHandler---->', response)
            },
            onError: (error) => () => {

            },
        }))
    }



    function removeEmptyData(navList: any) {
        return navList.map((el: any) => {
            if (el.id && el.name) {
                return el;
            } else {
                return null;
            }
        }).filter(Boolean);
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
            <div className='pt-4 mx-sm-7'>
                {/* <h1 className={'text-black mb-0 pb-3'}>{'Schedules'}</h1> */}

                <div className='text-right mb-3'>
                    <Button
                        text={'Create Opening'}
                        block
                        onClick={() => {
                            addRoleModal.show();
                        }
                        }
                    />
                </div>

                <div className='row pt-6'>
                    <div className='col'>
                        <Input
                            heading={'Position'}
                            type={'text'}
                            placeHolder={"HR Executive, QA Manager..."}
                            value={role1.value}
                            onChange={role1.onChange}

                        />
                    </div>
                    <div className='col'>
                        <Input
                            heading={'Status'}
                            type={'text'}
                            placeHolder={"All"}
                            value={''}
                            onChange={''} />
                    </div>
                    <div className='col'>
                        <ReactAutoComplete
                            data={departmentCorporate}
                            heading={"Department"}
                            placeholder='Developer,Accounts..'
                        />
                    </div>
                    <div className='col'>
                        <ReactAutoComplete
                            data={sectorsCorporate}
                            heading={"Sector"}
                            placeholder='Healthcare, Real Estate...'
                        />
                    </div>
                    <div>

                    </div>


                </div>

                <div className='row pt-5 '>
                    {cardData && cardData.length > 0 ?
                        cardData.map((el: any, index: number) => {
                            return (
                                <div className='col-sm-12 col-lg-12 mb-3'>

                                    <DesignationItem
                                        item={el}
                                        // onAdd={(selected) => {
                                        //     addRoleModal.show();
                                        //     setSelectedDesignation(selected);
                                        // }}

                                        onEdit={(designation, role) => {
                                            console.log("desss-->", designation, "riolee==?>", role)
                                            setSelectedDesignation(designation)
                                            dispatch(setSelectedRole(role))
                                            const { name, description } = role
                                            title.set(name)
                                            position.set(name)
                                            // jd.set(designation)
                                            if (description) {
                                                description.set(description)
                                            }
                                            addRoleModal.show();
                                        }}
                                        onView={(role) => {
                                            console.log('role-------------->', role)
                                            dispatch(setSelectedRole(role))
                                            dispatch(breadCrumbs({ name: role?.name, title: el?.name, path: window.location.pathname }))
                                            goTo(ROUTES['designation-module']['variant-info'])
                                        }
                                        }
                                    />
                                </div>
                            )
                        })
                        :
                        <div className={'d-flex  justify-content-center align-items-center mx-auto my-auto '}
                            style={{
                                height: '60vh'
                            }}
                        >
                            <NoDataFound />
                        </div>
                    }
                </div>

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
                                        value={role1.value}
                                        onChange={role1.onChange} />
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
                            <div className='mb-4'>
                                <InputHeading heading={'Duration'} />
                                <div className='d-sm-flex justify-content-between'>
                                    {
                                        changeColorButton.map((item, index) => {
                                            return <div className=''>
                                                <Button text={item.subText} className={`${item.isActive ? "btn-outline-primary" : "btn-outline-default"} rounded-sm px-sm-4`} style={{ width: "140px" }} onClick={() => {
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

                                        data={sectorsCorporate}
                                        heading={"Sector"}
                                        onAdd={(value) => {
                                            addSectorCorporateApiHandler(value)
                                        }}
                                        state={setSelectedSector}
                                    />
                                </div>
                                <div className='col'>
                                    <ReactAutoComplete

                                        data={departmentCorporate}
                                        heading={"Department"}
                                        onAdd={(value) => {
                                            addDepartmentApiHandler(value)
                                        }}
                                        state={setSelectedDepartment}
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
            </div>

        </>
    )
}

export { Designation };

