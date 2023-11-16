import React, { useState } from "react";
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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
} from "reactstrap";
import { icons } from "@Assets";
import { Image, Modal, Button, Heading, Alert } from "@Components";
import { useModal, useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { showCreateForOthersJdModal, showCreateOpeningsModal, userLogout } from "@Redux";
import { useDispatch, useSelector } from "react-redux";
import { capitalizeFirstLetter, filteredName } from "@Utils";

function TopNavbarCorporateFlow() {
  const logoutModal = useModal(false);
  const { goTo } = useNavigation();
  const { loginDetails } = useSelector((state: any) => state.AppReducer);
  const { corporateScheduleCount } = useSelector(
    (state: any) => state.DashboardReducer
  );
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { is_super_admin } = loginDetails || {}

  const HEADER_MENU = [
    { id: '1', name: 'Home', value: 'HM', route: ROUTES['designation-module']['admin-schedule'] },
    { id: '2', name: 'Ongoing Schedule', value: 'OGS', route: ROUTES['designation-module']['scheduling-interview'] },
    { id: '3', name: 'Setting', value: 'ST', route: ROUTES['designation-module'].settings },
  ]

  function getCandidateMenu() {
    return [
      ...(is_super_admin ? HEADER_MENU : []),
      ...[{ id: '4', name: 'Logout', value: 'LG', route: "" }],
    ] as never[];
  }


  const dropdownHandler = (item: any) => {

    const { route } = item
    if (item.value === 'LG') {
      logoutModal.show()
    } else {
      goTo(route);
    }

  };


  function proceedLogout() {
    try {
      dispatch(
        userLogout({
          onSuccess: () => {
            goTo(ROUTES["auth-module"].splash, true);
          },
          onError: () => { },
        })
      );
    } catch (error) { }
  }

  const handleCreateOpeningsClick = () => {
    dispatch(showCreateOpeningsModal());
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCreateForOthersInterviewClick = () => {
    dispatch(showCreateForOthersJdModal());
  };

  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent bg-white position-fixed py-xl-0 py-sm-0 py-2"
        expand="lg"
        id="navbar-main"
        style={{
          zIndex: 999
        }}
      >
        <div className="container-fluid mx-md-3 mx-sm-0 mx-2 my-3">
          <NavbarBrand tag={Link}>
            <div className="d-flex justify-content-between">
              <img
                className={"d-none d-lg-block d-md-block d-xl-block"}
                src={icons.logoText}
                alt="Logo"
                style={{ height: "20%", width: "20%" }}
              />
              <img
                className={"d-block d-md-none d-lg-none d-xl-none"}
                src={icons.logoText}
                alt="Logo"
                style={{ height: "30%", width: "30%" }}
              />
              <button
                aria-controls="navbar-collapse"
                aria-expanded={false}
                aria-label="Toggle navigation"
                className="navbar-toggler mr--4"
                data-target="#navbar-collapse"
                data-toggle="collapse"
                id="navbar-collapse"
                type="button"
              >
                <Image height={30} width={30} src={icons.navbarToggler} />
              </button>
            </div>
          </NavbarBrand>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row className="d-flex justify-content-between">
                <Col>
                  <div className="font-weight-bold text-black">
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

            <Nav
              className="align-items-lg-center ml-lg-auto mr--4 justify-content-end"
              navbar
            >
              {loginDetails?.is_super_admin && (
                <NavItem>
                  <NavLink to="/admin-schedule" tag={Link}>
                    <div className={'btn-wrapper ml-md--9'}>
                      <Button
                        block
                        text={"Create For Others"}
                        onClick={handleCreateForOthersInterviewClick}
                      />
                    </div>
                  </NavLink>
                </NavItem>
              )}

              {corporateScheduleCount >
                0 && (
                  <NavItem>
                    <NavLink to="/schedule" tag={Link}>
                      <div className={'btn-wrapper'}>
                        <Button
                          block
                          text={"Create Opening"}
                          onClick={handleCreateOpeningsClick}
                        />
                      </div>
                    </NavLink>
                  </NavItem>
                )}
              <NavItem className="d-none d-lg-block ml-lg-2">
                <div className="row align-items-center m-auto">
                  <span
                    className="mb-0 text-secondary font-weight-400 pointer"
                    onClick={toggleDropdown}
                  >
                    {filteredName(capitalizeFirstLetter(loginDetails?.user), 20)}
                  </span>
                  <Nav navbar>
                    <UncontrolledDropdown
                      nav
                      isOpen={dropdownOpen}
                      toggle={toggleDropdown}
                    >
                      <DropdownToggle
                        className="nav-link pr-0"
                        color=""
                        tag="a"
                      >
                        <Media className="align-items-center">
                          <Media className="d-none d-lg-block ml--2 mr-2 pointer">
                            <Image
                              height={12}
                              width={12}
                              src={icons.downArrowBlack}
                            />
                          </Media>
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu right>
                        {getCandidateMenu().map((item: any) => {

                          return (
                            <DropdownItem
                              onClick={(e) => {
                                e.preventDefault();
                                dropdownHandler(item);
                                setDropdownOpen(false);
                                console.log('333333333333333333333')
                              }}
                            >
                              {/* <i className={item.icon}></i> */}
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
                {getCandidateMenu().map((item: any) => {

                  const { id, name } = item;

                  return (
                    <NavItem key={id}>
                      <NavLink
                        onClick={(e) => {
                          e.preventDefault();
                          dropdownHandler(item);
                        }}
                      >
                        <span className={`nav-link-inner--text text-black`}>
                          {name}
                        </span>
                      </NavLink>
                    </NavItem>
                  );

                })}
              </div>
            </Nav>
          </UncontrolledCollapse>
        </div>
      </Navbar>

      <Alert
        title={'Logout'}
        subTitle={'Please click on proceed to logout'}
        isOpen={logoutModal.visible}
        onClose={logoutModal.hide}
        primary={"Logout"}
        secondaryOnClick={logoutModal.hide}
        primaryOnClick={proceedLogout}
      />
    </>
  );
}

export { TopNavbarCorporateFlow };
