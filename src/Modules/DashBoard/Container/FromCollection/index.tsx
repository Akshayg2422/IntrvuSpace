import { Button, Card, NoDataFound, Divider, Spinner, showToast } from '@Components';
import { getKnowledgeGroups, getSectors, createSchedule, selectedScheduleId } from '@Redux';
import { filteredName } from '@Utils';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, NavItem, NavLink, UncontrolledTooltip } from 'reactstrap';
import { useLoader, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'


function FromCollection() {

    const dispatch = useDispatch()
    const { sectors, knowledgeGroups } = useSelector((state: any) => state.DashboardReducer)
    const [navIndex, setNavIndex] = useState<any>(0);
    const sectorLoader = useLoader(false);
    const roleLoader = useLoader(false);
    const { goTo } = useNavigation()

    useEffect(() => {
        fetchSectorData();
    }, [])

    const fetchKnowledgeData = (id: string) => {
        const params = {
            sector_id: id
        }
        roleLoader.show()
        dispatch(getKnowledgeGroups({
            params,
            onSuccess: () => () => {
                roleLoader.hide();
            },
            onError: () => () => {
                roleLoader.hide();
            },
        }))
    }

    const fetchSectorData = () => {
        const params = {}
        sectorLoader.show();

        dispatch(
            getSectors({
                params,
                onSuccess: (response: any) => () => {
                    sectorLoader.hide()
                    const { details } = response
                    if (details.knowledege_groups && details.knowledege_groups.length > 0) {
                        fetchKnowledgeData(details.knowledege_groups[0].id)
                    }
                },
                onError: () => () => {
                    sectorLoader.hide();
                },
            }))
    }


    const scheduleApiHandler = (id: any, type: 'Call' | "Schedule") => {
        const params = {
            knowledge_group_variant_id: id
        }
        dispatch(createSchedule({
            params,
            onSuccess: (response: any) => () => {
                if (type === 'Call') {
                    dispatch(selectedScheduleId(response.details.schedule_id))
                    goTo(ROUTES['designation-module'].interview + response.details.schedule_id)
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
        <div className='mt-2'>
            <div className='d-flex align-items-center justify-content-center'>
                {sectorLoader.loader && <Spinner />}
            </div>

            <div className='d-flex overflow-auto overflow-hide py-2 mx--3' >
                {sectors && sectors.map((el, index) => {
                    return (
                        <div className='col-xl-3 col-sm-0 col-auto col-md-3 px-2'
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
                                        className={classnames(`mb-sm-3 mb-md-0 col-auto  shadow-none  ${index !== navIndex ? 'text-black font-weight-normal' : 'font-weight-bold'}`, {
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
                })}
            </div>
            <div className='row mt-2'>
                {
                    knowledgeGroups && knowledgeGroups.length > 0 ? knowledgeGroups.map((el) => {
                        const { name } = el
                        return (

                            <div className='col-md-4 col-sm-4 col-lg-4 mb-3 px-2'>
                                <Card>
                                    <h4 className='mb-0 pointer'>{name}</h4>
                                    <div className={'mx--4'}><Divider space={'3'} /></div>
                                    <div className=' pt-2 mr-4'>
                                        {el.knowledge_group_variant && el.knowledge_group_variant.map((item, index) => {

                                            const { id } = item;
                                            return (
                                                <div className='pt-1 row justify-content-between'>
                                                    <div className='col my-2 hoverColor h5'>{filteredName(item.name, 30)}</div>
                                                    <div className='text-right row'>
                                                        <div className='mr-3'>
                                                            <Button
                                                                id={`tooltip${index + 100 * 100}`}
                                                                icons={'bi bi-calendar'}
                                                                variant={'icon-rounded'}
                                                                onClick={() => {
                                                                    scheduleApiHandler(id, 'Schedule')
                                                                }}
                                                            />
                                                            <UncontrolledTooltip
                                                                delay={0}
                                                                placement="top"
                                                                target={`tooltip${index + 100 * 100}`}>
                                                                Schedule
                                                            </UncontrolledTooltip>
                                                        </div>
                                                        <Button
                                                            id={`tooltip${index + 200 * 100}`}
                                                            variant={'icon-rounded'}
                                                            icons={'bi bi-telephone'}
                                                            onClick={() => {
                                                                scheduleApiHandler(id, 'Call')
                                                            }}
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
                                            )
                                        })}
                                    </div>
                                </Card>
                            </div>
                        )
                    })
                        :
                        !roleLoader.loader && knowledgeGroups && knowledgeGroups.length <= 0 && <div className='col d-flex justify-content-center align-items-center  mt-3'>
                            <NoDataFound />
                        </div>

                }
            </div>
            <div className='d-flex align-items-center justify-content-center'>
                {roleLoader.loader && <Spinner />}
            </div>

        </div >
    )
}

export { FromCollection };
