
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
    DropdownItem, DropdownMenu, DropdownToggle, Media
    , UncontrolledDropdown,
    Container
} from "reactstrap";
import { icons } from '@Assets'
import { Image, Modal, Button } from '@Components'
import { Profile } from '@Modules'
import { getPhoto, } from '@Utils'
import { useModal, useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';
import { useLocation } from 'react-router-dom'
import { showCreateJddModal, userLogout } from "@Redux";
import { useDispatch, useSelector } from "react-redux";

function TopNavbar() {

    const HEADER_MENU = [
        { id: '1', name: 'Setting', value: 'ST', icon: 'ni ni-badge' },
        { id: '2', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
    ]

    const logoutModal = useModal(false);
    const { goTo } = useNavigation()
    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    const location = useLocation()
    const dispatch = useDispatch();

    const pathName = location.pathname


    console.log(pathName);


    const dropdownHandler = (item: any) => {
        if (item.value === 'ST') {
        }
        else if (item.value === 'LG') {
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

    const handleCreateInterviewClick = () => {
        dispatch(showCreateJddModal());
    };

    return (
        <>
            <Navbar
                className="navbar-horizontal navbar-main navbar-dark navbar-transparent bg-white position-fixed py-xl-0 py-sm-0 py-2"
                expand="lg"
                id="navbar-main"
            >
                <div className="container-fluid mx-sm-0 mx-2">
                    <NavbarBrand tag={Link}>
                        <Image src={icons.logoText} width={'65%'} style={{
                            objectFit: 'contain'
                        }} />

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
                            <NavItem>
                                <NavLink to="/home" tag={Link}>
                                    {/* <span className={`nav-link-inner--text  ${'/home' !== pathName ? "text-black h4" : 'text-primary h4'}`}>Create Interview</span> */}
                                    <span style={{ fontSize: '15px' }} className={'text-primary font-weight-bolder'} onClick={handleCreateInterviewClick}>Create Interview</span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {/* <NavLink to="/schedules" tag={Link}>
                                    <span className={`nav-link-inner--text  ${'/schedules' !== pathName ? "text-black h4" : 'text-primary h4'}`}>My Schedule</span>
                                </NavLink> */}
                            </NavItem>
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <div className='row align-items-center m-auto'>
                                    <span className='mb-0 text-primary font-weight-bolder'>
                                        {loginDetails?.user}
                                    </span>
                                    <Nav navbar>
                                        <UncontrolledDropdown nav>
                                            <DropdownToggle className="nav-link pr-0" color="" tag="a">
                                                <Media className="align-items-center">
                                                    <Image
                                                        size={'sm'}
                                                        variant={'avatar'}
                                                        src={icons.logoIcon}
                                                        style={{
                                                            objectFit: "contain"
                                                        }}
                                                    />
                                                    <Media className="ml-2 d-none d-lg-block">
                                                        <div className='media-body text-black d-none d-lg-block dropdown-toggle'> </div>
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
                                                {/* <i className={item.icon}></i> */}
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

export { TopNavbar };
