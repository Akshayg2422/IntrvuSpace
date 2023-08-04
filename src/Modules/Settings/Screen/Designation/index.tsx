
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs, showToast } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { breadCrumbs, clearBreadCrumbs, createKnowledgeGroup, createKnowledgeGroupVariant, getKnowledgeGroups, getSectors, setSelectedRole } from '@Redux';
import { ROUTES } from '@Routes';
import { ADD_DESIGNATION_RULES, getDropDownCompanyDisplayData, getValidateError, ifObjectExist, validate } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames'



function Designation() {

    const { sectors } = useSelector((state: any) => state.DashboardReducer)

    const { goTo, goBack } = useNavigation()

    const dispatch = useDispatch()
    const [navIndex, setNavIndex] = useState<any>(0)
    const [navList, setNavList] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])

    const [selectedDesignation, setSelectedDesignation] = useState<any>({})
    const [selectedVariant, setSelectedVariant] = useState<any>({})




    const addDesignationModal = useModal(false);
    const addRoleModal = useModal(false);

    const title = useInput("");
    const description = useInput("");
    const sector = useDropDown({});

    const loader = useLoader(false);


    useEffect(() => {
        dispatch(clearBreadCrumbs([]))
        getSectorsApiHandler();
    }, [])


    const getSectorsApiHandler = () => {
        const params = {}
        dispatch(
            getSectors({
                params,
                onSuccess: (response: any) => () => {
                    setNavList(response?.details?.knowledege_groups)
                    fetchKnowledgeData(response?.details?.knowledege_groups[0]?.id)
                },
                onError: () => () => {
                },
            })
        );
    };

    const fetchKnowledgeData = (id) => {
        const params = {
            sector_id: id
        }
        dispatch(getKnowledgeGroups({
            params,
            onSuccess: (response: any) => () => {
                setCardData(response.details.knowledege_groups)
            },
            onError: (error) => () => {

            },
        }))
    }

    const createKnowledgeGroupApiHandler = () => {

        const params = {
            name: title?.value,
            description: description?.value,
            sector_id: sector.value?.id
        };

        const validation = validate(ADD_DESIGNATION_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()
            dispatch(
                createKnowledgeGroup({
                    params,
                    onSuccess: (response) => () => {
                        loader.hide()
                        addDesignationModal.hide()
                        fetchKnowledgeData(navList[navIndex]?.id)
                        resetValue();
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

    function resetValue() {
        title.set('')
        description.set('')
        sector.set({})

    }

    const createKnowledgeGroupVariantApiHandler = () => {
        if (selectedDesignation) {
            const params = {
                name: title?.value,
                description: description?.value,
                knowledge_group_id: selectedDesignation?.id,
                // id: selectedRole?.id
            };
            loader.show()

            dispatch(
                createKnowledgeGroupVariant({
                    params,
                    onSuccess: () => () => {
                        loader.hide();
                        addRoleModal.hide();
                        resetValue();
                        fetchKnowledgeData(navList[navIndex]?.id)
                    },
                    onError: () => () => {
                        loader.hide()
                    },
                })
            );
        }
    };

    return (
        <>
            <div className='container-fluid pt-4'>
                <div className='row justify-content-end'>
                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Add Designation"}
                        onClick={addDesignationModal.show}
                    />

                    <Button
                        className={'text-white shadow-none'}
                        size={'sm'}
                        text={"Sector"}
                        onClick={() => {
                            goTo(ROUTES['designation-module']['sector']);
                        }}
                    />
                </div>
                <div className='d-flex pt-3 overflow-auto overflow-hide mx--4'>
                    {navList && navList.map((el, index) => {
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
                                            className={classnames(`mb-sm-3 mb-md-0 shadow-none ${index !== navIndex ? 'text-black font-weight-normal' : 'font-weight-bold'}`, {
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
                </div>
                <div className='row  pt-3 px-0'>
                    {cardData && cardData.length > 0 ?
                        cardData.map((el: any, index: number) => {
                            console.log('ellllllllllll------>', el)
                            return (
                                <div className='col-sm-4 px-0'>
                                    <DesignationItem
                                        item={el}
                                        onAdd={(selected) => {
                                            addRoleModal.show();
                                            setSelectedDesignation(selected);
                                        }}

                                        onEdit={(designation, role) => {
                                            setSelectedDesignation(designation)
                                            dispatch(setSelectedRole(role))
                                            const { name, description } = role
                                            title.set(name)
                                            if (description) {
                                                description.set(description)
                                            }
                                            addRoleModal.show();
                                        }}
                                        onView={(designation, role) => {
                                            dispatch(setSelectedRole(role))
                                            dispatch(breadCrumbs({name:role?.name,path:window.location.pathname}))
                                            goTo(ROUTES['designation-module']['questions'])
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
                < Modal size={'lg'} title={"Add Designation"} isOpen={addDesignationModal.visible} onClose={addDesignationModal.hide} >
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
                </Modal >

                < Modal size={'lg'} title={"Add Role"} isOpen={addRoleModal.visible} onClose={addRoleModal.hide} >
                    <Input
                        className={'col-6'}
                        heading={"Name"}
                        value={title.value}
                        onChange={title.onChange}
                    />
                    <Input
                        className={'col-6'}
                        heading={"Description"}
                        value={description.value}
                        onChange={description.onChange}
                    />
                    <div className="col text-right">
                        <Button size={'md'}
                            loading={loader.loader}
                            text={"Submit"}
                            onClick={createKnowledgeGroupVariantApiHandler}
                        />
                    </div>
                </Modal >
            </div>

        </>
    )
}

export { Designation };

