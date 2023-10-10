
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs, showToast, TextArea, ReactAutoComplete } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { CREATE_KNOWLEDGE_GROUP_VARIANT_FAILURE, breadCrumbs, clearBreadCrumbs, createCorporateSchedules, createKnowledgeGroup, createKnowledgeGroupVariant, getDepartmentCorporate, getCorporateSchedules, getKnowledgeGroups, getSectorCorporate, getSectors, setSelectedRole } from '@Redux';
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

console.log(cardData,"card data------>");


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
    }, [])

    const getSectorsCorporateApiHandler = () => {
        const params = {}
        dispatch(
            getSectorCorporate({
                params,
                onSuccess: (response: any) => () => {
                    setCardData(response?.details?.knowledege_groups)
                },
                onError: () => () => {
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
                    // console.log(response?.details,"qevwbwe");


                },
                onError: () => () => {
                },
            })
        )
    }


    // const getSectorsApiHandler = () => {
    //     const params = {}
    //     dispatch(
    //         getSectors({
    //             params,
    //             onSuccess: (response: any) => () => {
    //                 setNavList(response?.details?.knowledege_groups)
    //                 fetchKnowledgeData(response?.details?.knowledege_groups[0]?.id)
    //             },
    //             onError: () => () => {
    //             },
    //         })
    //     );
    // };

    // const fetchKnowledgeData = (id) => {
    //     console.log('1111111111111111111111111111', id)
    //     const params = {
    //         sector_id: id
    //     }
    //     dispatch(getKnowledgeGroups({
    //         params,
    //         onSuccess: (response: any) => () => {
    //             setCardData(response.details.knowledege_groups)
    //         },
    //         onError: (error) => () => {

    //         },
    //     }))
    // }

    // const createKnowledgeGroupApiHandler = () => {

    //     const params = {
    //         name: title?.value,
    //         description: description?.value,
    //         sector_id: sector.value?.id
    //     };

    //     const validation = validate(ADD_DESIGNATION_RULES, params)

    //     if (ifObjectExist(validation)) {
    //         loader.show()
    //         dispatch(
    //             createKnowledgeGroup({
    //                 params,
    //                 onSuccess: (response) => () => {
    //                     loader.hide()
    //                     addDesignationModal.hide()
    //                     fetchKnowledgeData(navList[navIndex]?.id)
    //                     resetValue();
    //                     showToast(response.message, 'success');
    //                 },
    //                 onError: (error) => () => {
    //                     showToast(error.error_message, 'error');
    //                     loader.hide()
    //                 },
    //             })
    //         )
    //     } else {
    //         showToast(getValidateError(validation))
    //     }
    // };

    function resetValue() {
        title.set('')
        description.set('')
        sector.set({})

    }

    // const createKnowledgeGroupVariantApiHandler = () => {

    //     if (selectedDesignation) {
    //         const params = {
    //             knowledge_group_id: selectedDesignation?.id,
    //             position: position?.value,
    //             // sector:sectorInput.value,
    //             experience: experience.value,
    //             reference_link: portalUrl.value,
    //             jd: jd.value,
    //             // id: selectedRole?.id
    //         };
    //         const validation = validate(CREATE_KNOWLEDGE_GROUP_VARIANT_RULES, params)

    //         if (ifObjectExist(validation)) {
    //             loader.show()
    //             dispatch(
    //                 createKnowledgeGroupVariant({
    //                     params,
    //                     onSuccess: (response: any) => () => {
    //                         loader.hide();
    //                         addRoleModal.hide();
    //                         resetValue();
    //                         fetchKnowledgeData(navList[navIndex]?.id)
    //                         showToast(response.message, 'success')
    //                     },
    //                     onError: (error: any) => () => {
    //                         showToast(error.error_message, 'error')
    //                         loader.hide()
    //                     },
    //                 })
    //             )
    //         } else {
    //             showToast(getValidateError(validation))
    //         }
    //     }
    // };

   

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
                {/* <div className='row justify-content-end'>
                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Add Designation"}
                        onClick={() => {
                            addDesignationModal.show()
                            title.set("")
                        }}
                    />

                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Sector"}
                        onClick={() => {
                            goTo(ROUTES['designation-module']['sector']);
                        }}
                    />
                </div> */}
                {/* <div className='d-flex pt-3 overflow-auto overflow-hide mx--4'>
                    {navList && removeEmptyData(navList).map((el: any, index: number) => {
                        return (
                            <div className='col-sm-3 px-2'>
                                <Nav
                                    className="nav-fill flex-column flex-sm-row pointer"
                                    id="tabs-text"
                                    pills
                                    role="tablist"
                                >
                                    <NavItem>
                                        <NavLink
                                            aria-selected={index === navIndex}
                                            className={classnames(`mb-sm-3 mb-md-0 shadow-none rounded-0 ${index !== navIndex ? 'text-black font-weight-normal' : 'font-weight-bold'}`, {
                                                active: index === navIndex
                                            })}
                                            onClick={() => {
                                                setNavIndex(index)
                                                fetchKnowledgeData(el.id)
                                            }}
                                            role="tab"
                                        >
                                            {el.name}
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                            </div>
                        )
                    })

                    }
                </div> */}

                <div className='text-right mb-3'>
                         <Button
                        text={'Create Schedule'}
                         block
                         onClick={()=>{
                         addRoleModal.show();
                         } 
                     }
                    />
                 </div>

                <div className='row pt-3'>
               

                    {cardData && cardData.length > 0 ?
                        cardData.map((el: any, index: number) => {
                            return (
                                <div className='col-sm-12 col-lg-12 p-0 m-0 mb-3'>
                                    
                                    <DesignationItem
                                        item={el}
                                        // onAdd={(selected) => {
                                        //     addRoleModal.show();
                                        //     setSelectedDesignation(selected);
                                        // }}

                                        onEdit={(designation, role) => {
                                            // console.log("desss-->", designation, "riolee==?>", role)
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
                                        onView={(designation, role) => {
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
                {/* < Modal size={'lg'} title={"Add Designation"} isOpen={addDesignationModal.visible} onClose={() => {
                    addDesignationModal.hide()
                    title.set("")
                    description.set("")
                    sector.set({})
                }} >
                    <div className='col-7'>
                        <Input
                            heading={"Name"}
                            value={title.value}
                            onChange={title.onChange}
                        />
                        <Input
                            heading={"Description"}
                            value={description.value}
                            onChange={description.onChange}
                        />
                        {sectors && sectors.length > 0 &&
                            <DropDown
                                heading={'Sectors'}
                                data={getDropDownCompanyDisplayData(sectors)}
                                selected={sector.value}
                                onChange={sector.onChange} />
                        }
                    </div>

                    <div className="col text-right">
                        <Button size={'md'}
                            loading={loader.loader}
                            text={"Submit"}
                            onClick={createKnowledgeGroupApiHandler} />
                    </div>
                </Modal > */}

                <Modal size={'lg'} title={"Create Schedule"} isOpen={addRoleModal.visible} onClose={() => {
                    addRoleModal.hide()
                    position.set("")
                    experience.set("")
                    jd.set("")
                }}>
                    {/* <div className={'col-6'}>
                        <ReactAutoComplete
                        isMandatory
                        heading={"Sector"}
                        
                        />
                         <ReactAutoComplete 
                         isMandatory
                         heading={"Department"}
                        
                         />
                        <Input
                            heading={"Position"}
                            placeHolder={'Position'}
                            value={position.value}
                            onChange={position.onChange}
                        />
                        <Input
                            isMandatory
                            heading={'Sector'}
                            placeHolder={PLACE_HOLDER.sector}
                            value={sectorInput.value}
                            onChange={sector.onChange} />

                        <Input
                        heading = {'Role'}
                        type = {"text"}
                        placeHolder = {"Role"}
                        onchange={role.onChange}
                       

                        />

                        <Input
                            heading={'Years of experience'}
                            type={'number'}
                            placeHolder={"Experience"}
                            value={experience.value}
                            onChange={experience.onChange} />

                        <TextArea
                            heading='Job Description'
                            value={jd.value}
                            className = {"float-end"}
                            onChange={jd.onChange} />
                    </div> */}

                    <div className={'col-12'}>
                        <div className='row'>
                            <div className='col'>
                                <ReactAutoComplete
                                    isMandatory
                                    data={sectorsCorporate}
                                    heading={"Sector"}
                                    state={setSelectedSector}

                                />
                            </div>
                            <div className='col'>
                                <ReactAutoComplete
                                    isMandatory
                                    data={departmentCorporate}
                                    heading={"Department"}
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

                </Modal >
            </div>

        </>
    )
}

export { Designation };

