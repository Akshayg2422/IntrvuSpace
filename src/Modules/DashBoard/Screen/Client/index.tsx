import React, { useEffect, useState } from 'react'
import { SearchInput, Button, Modal, Divider, NoDataFound, ButtonGroup, Input, TextArea, DesignationItem, showToast } from '@Components'
import { useDropDown, useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Profile, Schedules, Sectors } from '@Modules'
import { createSchedule, getKnowledgeGroups, getMyPastInterviews, getSectors, selectedScheduleId } from '@Redux'
import { capitalizeFirstLetter } from '@Utils'
import { Card, CardBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import { ROUTES } from '@Routes'


function Clients() {

    const FILTER = [{ id: 1, title: 'All' }, { id: 2, title: 'Past' }]

    const dispatch = useDispatch()
    const { goTo } = useNavigation()
    const { loginUser } = useSelector((state: any) => state.AuthReducer);

    const { knowledgeGroups, selectedClientSector, myPastInterviews } = useSelector((state: any) => state.DashboardReducer)
    const addJd = useModal(false);
    const filter = useDropDown(FILTER[0]);
    const search = useInput('');
    const [navList, setNavList] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])
    const [navIndex, setNavIndex] = useState<any>(0)
    const {height} = useWindowDimensions()

    console.log("screen.width", window.innerWidth)
    const sector = useInput('');
    const designation = useInput('');
    const role = useInput('');
    const jd = useInput('');


    useEffect(() => {
        fetchSectorData()
    }, [])


    function submitJdApiHandler() {

    }


    const getMypastInterviewApi = () => {
        const params = {}

        dispatch(getMyPastInterviews({
            params,
            onSuccess: (response: any) => () => {
                // goTo(ROUTES['auth-module'].otp)
            },
            onError: (error) => () => {

            },
        }))
    }

    const fetchSectorData = () => {
        const params = {}

        dispatch(getSectors({
            params,
            onSuccess: (response: any) => () => {
                setNavList(response.details.knowledege_groups)
                fetchKnowledgeData(response.details.knowledege_groups[0].id)
            },
            onError: (error) => () => {

            },
        }))
    }


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




    useEffect(() => {
        getKnowledgeGroupDetailsApiHandler();
    }, [search.value, selectedClientSector])

    const getKnowledgeGroupDetailsApiHandler = () => {
        const params = { sector_id: selectedClientSector?.id, q: search.value }

        console.log(JSON.stringify(params));

        dispatch(
            getKnowledgeGroups({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    };

    const handleButtonClick = (selectedOption) => {
        if (selectedOption.title === 'Past') {
            goTo(ROUTES['designation-module']['schedules'])
        }
        filter.onChange(selectedOption);
    };

    const scheduleApiHandler = (id: any, type: 'Call' | "Schedule") => {
        const params = {
            knowledge_group_variant_id: id
        }
        dispatch(createSchedule({
            params,
            onSuccess: (response: any) => () => {
                if (type === 'Call') {
                    dispatch(selectedScheduleId(response.details.schedule_id))
                    goTo(ROUTES['designation-module'].call)
                } else {
                    showToast('Scheduled Successfully')
                }
            },
            onError: (error) => () => {
                showToast(error.error_message, 'error')
            },
        }))
    }


    return (
        <>
            <div className={`container-fluid pt-4`}>
                <div className='row justify-content-lg-between justify-content-sm-center  '>
                    <div className='col'>
                        <h1 className='display-3 font-weight-bolder text-primary'>MOCK <b className='text-black'>EAZY</b></h1>
                    </div>
                    <div className='col text-lg-right'>
                        <ButtonGroup size={'btn-md'} sortData={FILTER} selected={filter.value} onClick={handleButtonClick} />
                        {/* {filter.value?.title === 'Past' && <Schedules />} */}
                    </div>
                    <div className='mt--2 mr-3'>
                        <Profile />
                    </div>
                </div>
                <div className='row pb-3 pt-1 mt--2'>
                    <div className='col-sm-9 py-lg py-sm-0 py-3 pr-0'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>
                    <div className='col'>
                        <Nav
                            className="nav-fill flex-column flex-sm-row"
                            id="tabs-text"
                            pills
                            role="tablist"
                        >
                            <NavItem>
                                <NavLink
                                    className={"mb-sm-3 mb-md-0 bg-primary shadow-none text-white font-weight-bold"}
                                    role="tab"
                                    onClick={
                                        addJd.show
                                    }
                                >
                                    From JD
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <div className=' overflow-auto overflow-hide mt--2' >
                    <div className='d-flex py-2 mx--3' >
                        {navList && navList.map((el, index) => {
                            return (
                                <div className='col col-sm-3 mr--3 '

                                >
                                    <Nav
                                        className="nav-fill flex-column flex-sm-row pointer"
                                        id="tabs-text"
                                        pills
                                        role="tablist"
                                    >
                                        <NavItem>
                                            <NavLink
                                                aria-selected={index === navIndex}
                                                className={classnames(`mb-sm-3 mb-md-0 shadow-none  ${index !== navIndex ? 'text-black font-weight-normal' : 'font-weight-bold'}`, {
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
                </div>
                <div className='row mt-2'>
                    {cardData && cardData.map((el) => {
                        return (
                            <>
                                <div className='col-4'>
                                    <Card className='overflow-auto overflow-hide shadow-none'
                                    style={{height: height - 230}}>
                                        <CardBody>
                                            <div className='row justify-content-between align-items-center px-3'>
                                                <div>
                                                    <h3 className='text-black font-weight-bolder'>{el.name}</h3>
                                                </div>
                                                <div>
                                                    <h5 className='text-black font-weight-bolder'>Can't Find?</h5>
                                                </div>
                                            </div>
                                            <div className=' pt-2 mr-3'>
                                                {el.knowledge_group_variant && el.knowledge_group_variant.map((item) => {
                                                    return (
                                                        <>
                                                            <div className='pt-1 row justify-content-between'>
                                                                <div className='col my-2 hoverColor h5'>{item.name}</div>
                                                                <div className='text-right'>
                                                                    <Button
                                                                        className={'text-white shadow-none'}
                                                                        size={'sm'}
                                                                        text={"Schedule"}
                                                                        onClick={() => { scheduleApiHandler(item?.id, "Schedule") }}
                                                                    />
                                                                    <Button
                                                                        className={'text-white shadow-none'}
                                                                        size={'sm'}
                                                                        text={"Start Call"}
                                                                        onClick={() => { scheduleApiHandler(item?.id, "Call") }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </div>

                                        </CardBody>
                                    </Card>
                                </div>
                            </>
                        )
                    })}

                </div>
            </div >


            <Modal title={'Create JD'} isOpen={addJd.visible} onClose={addJd.hide}>
                <Input
                    className={'col-7'}
                    placeHolder={"Sector"}
                    value={sector.value}
                    onChange={sector.onChange}
                />
                <Input
                    className={'col-7'}
                    placeHolder={"Designation"}
                    value={designation.value}
                    onChange={designation.onChange}
                />
                <Input
                    className={'col-7'}
                    placeHolder={"Role"}
                    value={role.value}
                    onChange={role.onChange}
                />
                <TextArea
                    className={'col-7'}
                    value={jd.value}
                    onChange={jd.onChange}
                />

                <Button text={'Submit'} onClick={submitJdApiHandler} />

            </Modal>
        </>
    )
}

export { Clients }