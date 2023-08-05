import React, { useEffect, useState } from 'react'
import { SearchInput, Button, Modal, Divider, NoDataFound, ButtonGroup, Input, TextArea, DesignationItem, showToast, DropDown } from '@Components'
import { useDropDown, useInput, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux'
import { AnalyzingAnimation, Profile, Schedules, Sectors } from '@Modules'
import { createSchedule, getKnowledgeGroups, getMyPastInterviews, getSectors, postJdVariant, selectedScheduleId } from '@Redux'
import { capitalizeFirstLetter, getDropDownCompanyDisplayData, filteredName } from '@Utils'
import { Card, CardBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap'
import classnames from 'classnames'
import { ROUTES } from '@Routes'


function Clients() {

    const FILTER = [{ id: 1, title: 'All' }, { id: 2, title: 'Past' }]

    const dispatch = useDispatch()
    const { goTo, goBack } = useNavigation()
    const { loginUser } = useSelector((state: any) => state.AuthReducer);

    const { knowledgeGroups, selectedClientSector, sectors, myPastInterviews } = useSelector((state: any) => state.DashboardReducer)
    const addJd = useModal(false);
    const filter = useDropDown(FILTER[0]);
    const search = useInput('');
    const [navList, setNavList] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])
    const [navIndex, setNavIndex] = useState<any>(0)
    const { height } = useWindowDimensions()

    console.log("screen.width", window.innerWidth)
    // const sector = useInput('');
    const position = useInput('');
    const experience = useInput('');
    const jd = useInput('');
    const portalUrl = useInput('')
    const sector = useDropDown({});
    const [showJobD, setShowJobD] = useState(false)
    const [dataGenerated, setDataGenerated] = useState(false);

    const JDSubmitLoader = useLoader(false);


    useEffect(() => {
        fetchSectorData()
        getKnowledgeGroupFromJdHandler()
    }, [])
    console.log('knowledgeGroups----------->', knowledgeGroups)

    function submitJdApiHandler() {
        const params = {
            sector_id: sector.value?.id,
            sector_name: sector.value?.name,
            position: position.value,
            experience: experience.value,
            reference_link: portalUrl.value,
            jd: jd.value
        }
        JDSubmitLoader.show()
        setDataGenerated(true)
        dispatch(postJdVariant({
            params,
            onSuccess: (response: any) => () => {
                JDSubmitLoader.hide()
                getKnowledgeGroupFromJdHandler()
                resetValues()
                setDataGenerated(false)
            },
            onError: (error) => () => {
                JDSubmitLoader.hide()
                setDataGenerated(false)
            },
        }))
    }
    function resetValues() {
        position.set('')
        experience.set('')
        jd.set('')
        portalUrl.set('')
        sector.set('')
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

    const getKnowledgeGroupFromJdHandler = () => {
        const params = { from_jd: true }

        console.log('11111111111---------->', JSON.stringify(params));

        dispatch(
            getKnowledgeGroups({
                params,
                onSuccess: (response) => () => {
                    console.log('2222222222222222222222222', JSON.stringify(response));

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




    useEffect(() => {
        getKnowledgeGroupDetailsApiHandler();
    }, [search.value, selectedClientSector])

    const getKnowledgeGroupDetailsApiHandler = () => {
        const params = { sector_id: selectedClientSector?.id, q: search.value }

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

    const scheduleApiForJdHandler = (id: any, type: 'Call' | "Schedule") => {
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
                    <div className='col-sm-6 py-lg py-sm-0 py-3 pr-0'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>

                </div>
                <div className=' overflow-auto overflow-hide mt--2' >
                    <div className='d-flex py-2 mx--3' >
                        <div className='col-sm-3'>
                            <Nav
                                className="nav-fill flex-column flex-sm-row"
                                id="tabs-text"
                                pills
                                role="tablist"
                            >
                                <NavItem>
                                    <NavLink
                                        className={"mb-sm-3 mb-md-0 bg-blue shadow-none text-white font-weight-bold"}
                                        role="tab"
                                        onClick={() => {
                                            setShowJobD(!showJobD)
                                            getKnowledgeGroupFromJdHandler()
                                        }}
                                    >
                                        From JD
                                    </NavLink>
                                </NavItem>
                            </Nav>

                        </div>
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
                                    <Card className='overflow-auto overflow-hide shadow-none'>
                                        <CardBody>
                                            <div className='row justify-content-between align-items-center px-3'>
                                                <div>
                                                    <h3 className='text-black font-weight-bolder'>{el.name}</h3>
                                                </div>
                                                {/* <div>
                                                    <h5 className='text-black font-weight-bolder'>Can't Find?</h5>
                                                </div> */}
                                            </div>
                                            <div className=' pt-2 mr-4'>
                                                {el.knowledge_group_variant && el.knowledge_group_variant.map((item, index) => {
                                                    return (
                                                        <>
                                                            <div className='pt-1 row justify-content-between'>
                                                                <div className='col my-2 hoverColor h5'>{filteredName(item.name, 30)}</div>
                                                                <div className='text-right row'>
                                                                    <div className='mr-3'>
                                                                        <Button
                                                                            id={`tooltip${index + 100 * 100}`}
                                                                            icons={'bi bi-calendar'}
                                                                            variant={'icon-rounded'}
                                                                            onClick={() => { scheduleApiHandler(item?.id, "Schedule") }}
                                                                        />
                                                                        <UncontrolledTooltip
                                                                            delay={0}
                                                                            placement="top"
                                                                            target={`tooltip${index + 100 * 100}`}
                                                                        >
                                                                            Schedule
                                                                        </UncontrolledTooltip>
                                                                    </div>
                                                                    <Button
                                                                        id={`tooltip${index + 200 * 100}`}
                                                                        variant={'icon-rounded'}
                                                                        icons={'bi bi-telephone'}
                                                                        onClick={() => { scheduleApiHandler(item?.id, "Call") }}
                                                                    />
                                                                    <UncontrolledTooltip
                                                                        delay={0}
                                                                        placement="top"
                                                                        target={`tooltip${index + 200 * 100}`}
                                                                    >
                                                                        Start Call
                                                                    </UncontrolledTooltip>
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

                {
                    showJobD &&
                    <>
                        <div className={'text-right pb-2'}><Button text={'Create New'} onClick={addJd.show} /></div>
                        <div className={'col-4 ml--2'}>
                            {knowledgeGroups && knowledgeGroups.length > 0 && <Card className='overflow-auto overflow-hide shadow-none'>
                                <CardBody>
                                    <div className='row justify-content-between align-items-center'>
                                        <div>
                                            <h3 className='text-black font-weight-bolder'>{''}</h3>
                                        </div>
                                    </div>
                                    <div className=' pt-2 mr-4'>
                                        {knowledgeGroups && knowledgeGroups.map((item, index) => {
                                            console.log('item----------->', item)
                                            return (
                                                <>
                                                    <div className='row'>
                                                        <h3 className='text-black col font-weight-bolder'>{filteredName(item.name, 30)}</h3>
                                                    </div>
                                                    <div className='pt-1 pl-3 row justify-content-between'>
                                                        <div className='my-2 hoverColor h5'>{filteredName(item.knowledge_group_variant.map((el) => el?.name), 30)}</div>
                                                        <div className='text-right row'>
                                                            <div className='mr-3'>
                                                                <Button
                                                                    id={`tooltip${index + 100 * 100}`}
                                                                    icons={'bi bi-calendar'}
                                                                    variant={'icon-rounded'}
                                                                    onClick={() => { scheduleApiForJdHandler(item.knowledge_group_variant.map((element: any) => { return element?.id })[0], "Schedule") }} />
                                                                <UncontrolledTooltip
                                                                    delay={0}
                                                                    placement="top"
                                                                    target={`tooltip${index + 100 * 100}`}
                                                                >
                                                                    Schedule
                                                                </UncontrolledTooltip>
                                                            </div>
                                                            <Button
                                                                id={`tooltip${index + 200 * 100}`}
                                                                variant={'icon-rounded'}
                                                                icons={'bi bi-telephone'}
                                                                onClick={() => { scheduleApiForJdHandler(item.knowledge_group_variant.map((element: any) => { return element?.id })[0], "Call") }} />
                                                            <UncontrolledTooltip
                                                                delay={0}
                                                                placement="top"
                                                                target={`tooltip${index + 200 * 100}`}
                                                            >
                                                                Start Call
                                                            </UncontrolledTooltip>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>

                                </CardBody>
                            </Card>}
                        </div>
                    </>
                }
            </div >


            <Modal title={'Create Interview Schedule From JD'} isOpen={addJd.visible} onClose={addJd.hide}>
                {/* <Input
                    className={'col-7'}
                    placeHolder={"Sector"}
                    value={sector.value}
                    onChange={sector.onChange}
                /> */}
                {!dataGenerated ?
                    <><div className='col-7 '>
                        {sectors && sectors.length > 0 &&
                            <DropDown
                                heading={'Sectors'}
                                placeHolder='Select Sector'
                                data={getDropDownCompanyDisplayData(sectors)}
                                selected={sector.value}
                                onChange={sector.onChange} />}
                        <Input
                            heading={'Role'}
                            placeHolder={"Position"}
                            value={position.value}
                            onChange={position.onChange} />
                        <Input
                            heading={'Years of experience'}
                            type={'number'}
                            placeHolder={"Experience"}
                            value={experience.value}
                            onChange={experience.onChange} />
                        <Input
                            heading='Portal JD URL'
                            value={portalUrl.value}
                            onChange={portalUrl.onChange} />
                        <TextArea
                            heading='Job Description'
                            value={jd.value}
                            onChange={jd.onChange} />
                    </div><div className='text-right'>
                            <Button size='md' text={'Submit'} loading={JDSubmitLoader.loader} onClick={submitJdApiHandler} />
                        </div>
                    </>
                    : <AnalyzingAnimation />
                }
            </Modal>

        </>
    )
}

export { Clients }