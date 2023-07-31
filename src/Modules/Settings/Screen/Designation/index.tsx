
import { Button, DropDown, DesignationItem, Input, Modal, NoDataFound, Breadcrumbs } from '@Components';
import { useDropDown, useInput, useLoader, useModal, useNavigation } from '@Hooks';
import { createKnowledgeGroup, createKnowledgeGroupVariant, getKnowledgeGroups, getSectors, setSelectedRole } from '@Redux';
import { ROUTES } from '@Routes';
import { getDropDownCompanyDisplayData } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames'



function Designation() {

    const { knowledgeGroups, sectors, selectedRole } = useSelector((state: any) => state.DashboardReducer)

    const { goTo } = useNavigation()
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
        getSectorsApiHandler();
    }, [])

  
    const getSectorsApiHandler = () => {
        const params = {}
        dispatch(
            getSectors({
                params,
                onSuccess: (response:any) => () => {
                    setNavList(response.details.knowledege_groups)
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
        loader.show()

        const params = {
            name: title?.value,
            description: description?.value,
            // sector_id: sector.value?.id
        };

        dispatch(
            createKnowledgeGroup({
                params,
                onSuccess: () => () => {
                    loader.hide()
                    addDesignationModal.hide()
                    // getKnowledgeGroupDetailsApiHandler();
                    resetValue();
                },
                onError: () => () => {
                    loader.hide()
                },
            })
        );
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
                        // getKnowledgeGroupDetailsApiHandler();
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
            <div>
                <div className="row justify-content-end m-3">
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
                <div className='mx-3'>
                    <div className='row py-2 my-4' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        {navList && navList.map((el, index) => {
                            return (
                                <div className='col-lg  col-sm-3 '>
                                    <Nav
                                        className="nav-fill flex-column flex-sm-row pointer"
                                        id="tabs-text"
                                        pills
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                aria-selected={index === navIndex}
                                                className={classnames(`mb-sm-3 mb-md-0  ${index !== navIndex ? 'text-black font-weight-normal' : 'font-weight-bold'}`, {
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
                    <div className='mx--3'>
                        {cardData && cardData.length > 0 ?
                            cardData.map((el: any, index: number) => {
                                return (
                                    <div className='col-4'>
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
                                                goTo(ROUTES['designation-module']['questions'])
                                            }
                                            }
                                        />
                                    </div>
                                )
                            })
                            :
                            <div className={'mt-9 d-flex  justify-content-center align-items-center'}>
                                <NoDataFound text={"No Data Found"} />
                            </div>
                        }
                    </div>
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

                    <div className="col text-right ">
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
            </div >
        </>
    )
}

export { Designation };

