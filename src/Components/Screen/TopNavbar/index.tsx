
import { icons } from '@Assets';
import { Alert, Button, Image } from '@Components';
import { useLogout, useModal, useNavigation } from '@Hooks';
import { showCreateJddModal } from "@Redux";
import { ROUTES } from '@Routes';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Col,
  DropdownItem, DropdownMenu, DropdownToggle, Media,
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Row,
  UncontrolledCollapse,
  UncontrolledDropdown
} from "reactstrap";
import { capitalizeFirstLetter } from '@Utils'


function TopNavbar() {

  const HEADER_MENU = [
    { id: '1', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
  ]

  const { loader, logout } = useLogout()
  const logoutModal = useModal(false);
  const { goTo } = useNavigation()
  const { jdItem } = useSelector((state: any) => state.DashboardReducer);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)
  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);
  const { name } = dashboardDetails?.basic_info || {}
  const dispatch = useDispatch();


  const dropdownHandler = (item: any) => {
    if (item.value === 'ST') {
      goTo(ROUTES['designation-module'].settings)
    }
    else if (item.value === 'LG') {
      logoutModal.show()
    }
  };


  const handleCreateInterviewClick = () => {
    dispatch(showCreateJddModal());
  };


  const toggleDropdownHandler = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }


  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent bg-white position-fixed  py-xl-0 py-sm-0"
        expand="lg"
        id="navbar-main"
        style={{
          zIndex: 999
        }}
      >
        <div className="container-fluid mx-md-3 mx-sm-0 mx-2">
          <NavbarBrand tag={Link}>
            <div className="d-flex justify-content-between">
              <img className={'d-none d-lg-block d-md-block d-xl-block'} src={icons.logoText} alt="Logo"
                height={'100%'} width={'70%'}
                style={{
                  objectFit: 'contain'
                }} />
              <img className={'d-block d-md-none d-lg-none d-xl-none'} src={icons.logoText} alt="Logo" style={{ height: '30%', width: '30%' }} />
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
                  <div className='font-weight-bold text-black'>
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

              {jdItem && jdItem.length > 0 && (
                <NavItem>
                  <NavLink to="/home" tag={Link}>
                    <div className={'btn-wrapper'}>
                      <Button
                        block
                        text={"Create Interview"}
                        onClick={handleCreateInterviewClick}
                      />
                    </div>
                  </NavLink>
                </NavItem>
              )}

              <NavItem className="d-none d-lg-block ml-2">
                <div className='row align-items-center m-auto'>

                  <span className='mb-0 text-secondary font-weight-400 pointer' onClick={toggleDropdownHandler}>
                    {capitalizeFirstLetter(name)}
                  </span>

                  <Nav navbar>
                    <UncontrolledDropdown nav
                      isOpen={isOpenDropdown}
                      toggle={toggleDropdownHandler}>
                      <DropdownToggle className="nav-link pr-0" color="" tag="a">
                        <Media className="align-items-center">
                          <Media className="d-none d-lg-block ml--2 mr-2 pointer">
                            <Image height={12} width={12} src={icons.downArrowSecondary} />
                          </Media>
                        </Media>
                      </DropdownToggle>
                      <DropdownMenu right className='dropdown-menu-items'>
                        {HEADER_MENU.map((item) => {
                          return (
                            <DropdownItem className='menu-items text-secondary'
                              onClick={(e) => {
                                e.preventDefault()
                                dropdownHandler(item);

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
                {HEADER_MENU.map((item) => {
                  return (
                    <NavItem>
                      <NavLink
                        onClick={(e) => {
                          e.preventDefault()
                          dropdownHandler(item);
                        }}
                      >
                        <span className={`nav-link-inner--text text-black`} >{item.name}</span>
                      </NavLink>
                    </NavItem>
                  );
                })}
              </div>
            </Nav>
          </UncontrolledCollapse>
        </div>
      </Navbar >

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

  )
}

export { TopNavbar };

