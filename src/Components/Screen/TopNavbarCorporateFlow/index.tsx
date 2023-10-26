
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Row,
    Col,
    DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown,
} from "reactstrap";
import { icons } from '@Assets'
import { Image, Modal, Button } from '@Components'
import { useModal, useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { showCreateOpeningsModal, userLogout } from "@Redux";
import { useDispatch, useSelector } from "react-redux";

function TopNavbarCorporateFlow() {

    const logoutModal = useModal(false);
    const { goTo } = useNavigation()
    const { loginDetails } = useSelector((state: any) => state.AppReducer);
    const { corporateSchedules } = useSelector((state: any) => state.DashboardReducer)
    const dispatch = useDispatch();

    const HEADER_MENU = [
        { id: '1', name: 'Schedule', value: 'SC', icon: 'ni ni-badge' },
        { id: '2', name: 'Setting', value: 'ST', icon: 'ni ni-settings-gear-65' },
        { id: '3', name: 'View as member', value: 'VAM', icon: 'ni ni-single-02', },
        { id: '4', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
    ]


    const dropdownHandler = (item: any) => {
        if (loginDetails?.is_admin) {
            if (item.value === 'SC') {
                goTo(ROUTES['designation-module'].schedule);
            }
            if (item.value === 'ST') {
                goTo(ROUTES['designation-module'].settings);
            }
            if (item.value === 'VAM') {
                goTo(ROUTES['designation-module'].client);
            }
        }
        if (item.value === 'LG') {
            logoutModal.show()
        }
    };


    function proceedLogout() {
        try {

            dispatch(
                userLogout({
                    onSuccess: () => {
                        goTo(ROUTES["auth-module"].splash, true)
                    },
                    onError: () => {
                        console.log('error');
                    },
                }),
            );
        } catch (error) {
        }
    }

    const handleCreateOpeningsClick = () => {
        dispatch(showCreateOpeningsModal());
    };

    return (
        <>
            <Navbar
                className="navbar-horizontal navbar-main navbar-dark navbar-transparent bg-white position-fixed py-xl-0 py-sm-0 py-2"
                expand="lg"
                id="navbar-main"
            >
                <div className="container-fluid mx-md-3 mx-sm-0 mx-2">
                    <NavbarBrand tag={Link}>
                        <img src={icons.logoText} alt="Logo" style={{ height: '20%', width: '20%' }} />
                    </NavbarBrand>
                    <button
                        aria-controls="navbar-collapse"
                        aria-expanded={false}
                        aria-label="Toggle navigation"
                        className="navbar-toggler bg-primary"
                        data-target="#navbar-collapse"
                        data-toggle="collapse"
                        id="navbar-collapse"
                        type="button"
                    >
                        <span className="navbar-toggler-icon navbar-dark" />
                    </button>
                    <UncontrolledCollapse
                        className="navbar-custom-collapse"
                        navbar
                        toggler="#navbar-collapse"
                    >
                        <div className="navbar-collapse-header">
                            <Row className="d-flex justify-content-between">
                                <Col>
                                    <div className='font-weight-bold text-black'>
                                        {loginDetails?.user}
                                    </div>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button
                                        aria-controls="navbar-collapse"
                                        aria-expanded={false}
                                        aria-label="Toggle navigation"
                                        className="navbar-toggler"
                                        data-target="#navbar-collapse"
                                        data-toggle="collapse"
                                        id="navbar-collapse"
                                        type="button"
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>

                            </Row>
                        </div>

                        {/* <hr className="d-lg-none" /> */}

                        <Nav className="align-items-lg-center ml-lg-auto mr--4 justify-content-end" navbar>
                            {corporateSchedules?.details?.corporate_jd_items.length > 0 && <NavItem>
                                <NavLink to="/schedule" tag={Link}>
                                    <Button
                                        size='md'
                                        className='btn btn-outline-primary rounded-sm mr--3'
                                        style={{
                                            borderColor: "#d8dade",
                                            fontSize: "15px"
                                        }}
                                        text={'Create Openings'}
                                        onClick={handleCreateOpeningsClick}
                                    />
                                </NavLink>
                            </NavItem>
                            }
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <div className='row align-items-center m-auto'>
                                    <span className='mb-0 text-secondary font-weight-400'>
                                        {loginDetails?.user}
                                    </span>
                                    <Nav navbar>
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                                <Media className="align-items-center">
                                                    <Media className="d-none d-lg-block ml--2 mr-2 pointer">
                                                        <Image height={12} width={12} src={icons.downArrowBlack} />
                                                    </Media>
                                                </Media>
                                            </DropdownToggle>
                                            <DropdownMenu right >
                                                {HEADER_MENU.map((item) => {
                                                    return (
                                                        <DropdownItem
                                                            onClick={(e) => {
                                                                e.preventDefault()
                                                                dropdownHandler(item);
                                                            }}
                                                        >
                                                            <i className={item.icon}></i>
                                                            <span>{item.name}</span>
                                                        </DropdownItem>
                                                    );
                                                })}
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </Nav>
                                </div>
                            </NavItem>
                            <div className="d-xl-none d-lg-none">
                                {HEADER_MENU.map((item) => {
                                    return (
                                        <NavItem>
                                            <NavLink
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    dropdownHandler(item);
                                                }}
                                            >
                                                <span className={`nav-link-inner--text text-black`}>{item.name}</span>

                                            </NavLink>
                                        </NavItem>
                                    );
                                })}
                            </div>
                        </Nav>
                    </UncontrolledCollapse>
                </div>
            </Navbar >

            <Modal title={'Logout User'} isOpen={logoutModal.visible} onClose={logoutModal.hide}>
                <div>
                    <span>{"Please click on proceed to logout user"}</span>
                    <div
                        className='d-flex justify-content-end'
                    >
                        <Button
                            color='white'
                            text={'Cancel'}
                            onClick={() => logoutModal.hide()}
                        />
                        <Button
                            text={'Proceed'}
                            onClick={proceedLogout}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
}

export { TopNavbarCorporateFlow };
