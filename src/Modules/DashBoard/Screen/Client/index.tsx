import React, { useEffect, useState } from 'react'
import { SearchInput, Button, Modal, Divider, NoDataFound, ButtonGroup, Input, TextArea, DesignationItem } from '@Components'
import { useDropDown, useInput, useModal } from '@Hooks'
import { useSelector, useDispatch } from 'react-redux'
import { Sectors } from '@Modules'
import { getKnowledgeGroups, getSectors } from '@Redux'
import { capitalizeFirstLetter } from '@Utils'
import { Card, CardBody, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'

function Clients() {

    const FILTER = [{ id: 1, title: 'All' }, { id: 2, title: 'Past' }]

    const dispatch = useDispatch()

    const { knowledgeGroups, selectedClientSector } = useSelector((state: any) => state.DashboardReducer)
    const addJd = useModal(false);
    const filter = useDropDown(FILTER[0]);
    const search = useInput('');
    const [navList, setNavList] = useState<any>([])
    const [cardData, setCardData] = useState<any>([])
    const [navIndex, setNavIndex] = useState<any>(0)



    const sector = useInput('');
    const designation = useInput('');
    const role = useInput('');
    const jd = useInput('');


    useEffect(() => {
        fetchSectorData()
    }, [])


    function submitJdApiHandler() {


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



    return (
        <>
            {/* <div className='m-3'>
                <div className='row'>
                    <div className='col-7'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                    </div>
                    <div className='col text-right'>
                        <Button className={'text-white'} text={'From JD'} onClick={addJd.show} />
                    </div>
                </div>
                <div className='col text-right mt-3'>
                    <ButtonGroup size={'btn-sm'} sortData={FILTER} selected={filter.value} onClick={filter.onChange} />
                </div>

                <div className='mx-3'>
                    <Sectors />
                    <div className='row'>
                        {
                            knowledgeGroups && knowledgeGroups.length > 0 && knowledgeGroups.map(item => {
                                const { id, } = item;
                                return (
                                    <div className='col-4' key={id}>
                                        <DesignationItem item={item} />
                                    </div>

                                )
                            })

                        }

                    </div>

                </div>


            </div > */}

            <div className='container-fluid'>
                <div className='row justify-content-lg-between justify-content-sm-center  '>
                    <div className='col'>
                        <h1 className='display-3 font-weight-bolder text-primary'>MOCK <b className='text-black'>EASY</b></h1>
                    </div>
                    <div className='col text-lg-right'>
                        <ButtonGroup size={'btn-md'} sortData={FILTER} selected={filter.value} onClick={filter.onChange} />
                    </div>
                </div>
                <div className='row pb-3 pt-1'>
                    <div className='col-sm-9 py-lg py-sm-0 py-3'>
                        <SearchInput defaultValue={search.value} onSearch={search.set} />
                        {/* <div className="input-group mb-3">
                            <div className="input-group-prepend" 
                            style={{
                                borderRight:'0px'
                            }}
                            >
                                <span className="input-group-text bg-white" id="basic-addon1"><i className="bi bi-search "></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="basic-addon1" 
                             style={{
                                borderLeft:'0px'
                            }}
                            />
                        </div> */}
                        {/* <FormGroup>
                            <InputGroup
                                className={classnames({
                                    focused: inputStyle
                                })}
                            >
                                <InputGroupAddon addonType="prepend"
                                    style={{
                                        height: '7.7vh'
                                    }}
                                >
                                    <InputGroupText>@</InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    className='pl-0'
                                    style={{
                                        borderTopLeftRadius: '0px',
                                        borderBottomLeftRadius: '0px',
                                        borderLeft: '0px'
                                    }}
                                    placeholder="Search..."
                                    type="text"
                                    onFocus={(e) => {
                                        setInputStyle(true)
                                    }}
                                    onBlur={(e) => {
                                        setInputStyle(false)
                                    }}
                                    onChange={(e) => {

                                    }}
                                />
                            </InputGroup>
                        </FormGroup> */}
                    </div>
                    <div className='col '>
                        <Nav
                            className="nav-fill flex-column flex-sm-row"
                            id="tabs-text"
                            pills
                            role="tablist"
                        >
                            <NavItem>
                                <NavLink
                                    // aria-selected={this.state.navPills === 1}
                                    className={classnames("mb-sm-3 mb-md-0 bg-primary text-white font-weight-bold", {
                                        // active: this.state.navPills === 1
                                    })}
                                    // onClick={e => this.toggleNavs(e, "navPills", 1)}
                                    // href="#pablo"
                                    role="tab"
                                >
                                    From JD
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </div>
                <div className='row pt-2 '>
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
                <div className='row pt-4 mt-2'>
                    {cardData && cardData.map((el) => {
                        return (
                            <>
                                <div className='col-sm-4'>
                                    <Card className=''>
                                        <CardBody>
                                            <div className='row justify-content-between align-items-center px-3'>
                                                <div>
                                                    <h3 className='text-black font-weight-bolder'>{el.name}</h3>
                                                </div>
                                                <div>
                                                    <h5 className='text-black font-weight-bolder'>Can't Find?</h5>
                                                </div>
                                            </div>
                                            <div className=' pt-2'>
                                                {el.knowledge_group_variant && el.knowledge_group_variant.map((item) => {
                                                    return (
                                                        <>
                                                            <div className='pt-1 '>
                                                                <div className=' hoverColor h5'>{item.name}</div>
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