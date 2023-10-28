
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs, showToast, TextArea, ReactAutoComplete, Heading } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, breadCrumbs, clearBreadCrumbs, createCorporateSchedules, createKnowledgeGroup, createKnowledgeGroupVariant, getDepartmentCorporate, getCorporateSchedules, getKnowledgeGroups, getSectorCorporate, getSectors, setSelectedRole, addSectorCorporate, addDepartmentCorporate } from '@Redux';
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
    const { sectorsCorporate, departmentCorporate } = useSelector((state: any) => state.DashboardReducer)

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
    const experience = useInput('')
    const jd = useInput('');
    const portalUrl = useInput('');
    const role1 = useInput('');
    const sectorInput = useInput('');
    const loader = useLoader(false);

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
            experience: experience.value,
            jd: jd.value
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

    return (
        <>
            <div className='container-fluid pt-4'>
                <h1 className={'text-black mb-0 pb-3'}>{'Schedules'}</h1>

                <div className='text-right mb-3'>
                    <Button
                        text={'Create Schedule'}
                        block
                        onClick={() => {
                            addRoleModal.show();
                        }
                        }
                    />
                </div>

                <div className='row pt-3'>
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

                <Modal size={'lg'} isOpen={addRoleModal.visible} onClose={() => {
                    addRoleModal.hide()
                    position.set("")
                    experience.set("")
                    jd.set("")
                    role1.set('')
                }} style={{padding: 0}}>
                    <div className='px-6'>
                    <Heading heading={'Create Opening'} style={{fontSize: '26px', fontWeight: 800, margin: 0}}/>
                    <div className='text-default pt-1 font-weight-500'>Input job details, specifying qualifications, requirements, interview duration</div>
                    
                    <div className={'col-12 pt-6 px-0'}>
                        <div className='row'>
                            <div className='col'>
                                <ReactAutoComplete
                                    isMandatory
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
                                    isMandatory
                                    data={departmentCorporate}
                                    heading={"Department"}
                                    onAdd={(value) => {
                                        addDepartmentApiHandler(value)
                                    }}
                                    state={setSelectedDepartment}
                                />
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col'>
                                <Input
                                    isMandatory
                                    heading={'Role'}
                                    type={'text'}
                                    placeHolder={"Role"}
                                    value={role1.value}
                                    onChange={role1.onChange} />
                            </div>

                            <div className='col'>
                                <Input
                                    isMandatory
                                    heading={'Experience'}
                                    type={'number'}
                                    placeHolder={"Experience"}
                                    value={experience.value}
                                    onChange={experience.onChange} />
                            </div>
                        </div>


                        <div>
                            <TextArea
                                isMandatory
                                heading='Job Description'
                                value={jd.value}
                                className={"float-end"}
                                onChange={jd.onChange} />
                        </div>

                    </div>

                    <div className="col text-right">
                        <Button size={'md'}
                            loading={loader.loader}
                            text={"Submit"}
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

