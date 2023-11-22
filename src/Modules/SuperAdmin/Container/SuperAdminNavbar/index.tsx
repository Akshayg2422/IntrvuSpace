
import { icons } from '@Assets';
import { Alert, Button, Image } from '@Components';
import { useModal, useNavigation } from '@Hooks';
import { userLogout, showCreateForOthersJdModal } from "@Redux";
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
import { capitalizeFirstLetter } from '@Utils';


function SuperAdminNavbar() {


  const HEADER_MENU = [
    { id: '1', name: 'Home', value: 'HM', route: ROUTES['designation-module']['admin-schedule'] },
    { id: '2', name: 'Ongoing Schedule', value: 'OGS', route: ROUTES['designation-module']['scheduling-interview'] },
    { id: '3', name: 'Logout', value: 'LG', route: "" }
  ]


  const logoutModal = useModal(false);
  const { goTo } = useNavigation()

  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);


  console.log("dashboardDetails", dashboardDetails);

  const { name, email, designation, department } = dashboardDetails?.basic_info || {}

  const { jdItem } = useSelector((state: any) => state.DashboardReducer);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)



  const dispatch = useDispatch();



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
            goTo(ROUTES["auth-module"].splash, true)
          },
          onError: () => {

          },
        })
      );
    } catch (error) { }
  }


  const toggleDropdownHandler = () => {
    setIsOpenDropdown(!isOpenDropdown)
  }


  const handleCreateForOthersInterviewClick = () => {
    dispatch(showCreateForOthersJdModal());
  };




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

              <NavItem className="d-none d-lg-block ml-2">
                <div className='row align-items-center m-auto'>

                  <span className='mb-0 text-black font-weight-400 pointer' onClick={toggleDropdownHandler}>
                    {capitalizeFirstLetter(name)}
                  </span>

                  <Nav navbar>
                    <UncontrolledDropdown nav
                      isOpen={isOpenDropdown}
                      toggle={toggleDropdownHandler}>
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
        primary={"Logout"}
        secondaryOnClick={logoutModal.hide}
        primaryOnClick={proceedLogout}
      />
    </>

  )
}

export { SuperAdminNavbar };

