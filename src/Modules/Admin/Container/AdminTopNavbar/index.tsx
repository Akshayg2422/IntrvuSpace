import { useState } from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import { icons } from "@Assets";
import { Alert, Button, Image } from "@Components";
import { useLogout, useModal, useNavigation } from "@Hooks";
import { switchToAdvance } from "@Redux";
import { ROUTES } from "@Routes";
import { capitalizeFirstLetter, filteredName } from "@Utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown,
} from "reactstrap";

import { AdminTopNavbarProps } from './interfaces'

function AdminTopNavbar({ showCreateOpening, onCreateOpeningClick }: AdminTopNavbarProps) {
  const logoutModal = useModal(false);
  const { goTo } = useNavigation();
  const { loader, logout } = useLogout()
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);
  const { name } = dashboardDetails?.basic_info || {}
  const { is_super_admin, is_light_variant } = dashboardDetails?.rights || {}




  const HEADER_MENU = [
    ...(is_light_variant ? [{ id: '0', name: 'Switch to Advanced Dashboard', value: 'STP', route: "" }] : []),
    ...(is_super_admin && !is_light_variant ? [{ id: '1', name: 'Settings', value: 'ST', route: ROUTES['designation-module'].settings }] : []),
    { id: '2', name: 'Logout', value: 'LG', route: "" },
  ]

  function switchToAdvanceApiHandler() {
    const params = {}
    dispatch(
      switchToAdvance({
        params,
        onSuccess: () => () => {
          goTo(ROUTES["auth-module"].splash, true);
        },
        onError: () => () => { },
      })
    );
  }



  const dropdownHandler = (item: any) => {

    const { route } = item
    if (item.value === 'LG') {
      logoutModal.show()
    }
    else if (item.value === 'STP') {
      switchToAdvanceApiHandler();
    }
    else {
      goTo(route);
    }

  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };



  return (
    <>

      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent bg-white position-fixed py-xl-0 py-sm-0"
        expand="lg"
        id="navbar-main"
        style={{
          zIndex: 999
        }}
      >
        <div className="container-fluid mx-md-3 mx-sm-0">
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
                    {capitalizeFirstLetter(name)}
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
              {showCreateOpening && (
                <NavItem>
                  <NavLink tag={Link}>
                    <div className={'btn-wrapper'}>
                      <Button
                        block
                        text={"Create Opening"}
                        onClick={onCreateOpeningClick}
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
                    {filteredName(capitalizeFirstLetter(name), 20)}
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
                              src={icons.downArrowSecondary}
                            />
                          </Media>
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu right className="dropdown-menu-items">
                        {HEADER_MENU.map((item: any) => {

                          return (
                            <DropdownItem className="menu-items"
                              onClick={(e) => {
                                e.preventDefault();
                                dropdownHandler(item);
                                setDropdownOpen(false);
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
                {HEADER_MENU.map((item: any) => {

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
        primary={"Proceed"}
        secondaryOnClick={logoutModal.hide}
        loading={loader.loader}
        primaryOnClick={logout}
      />
    </>
  );
}

export { AdminTopNavbar };
