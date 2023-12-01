// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  NavItem,
  Navbar,
  UncontrolledDropdown
} from "reactstrap";
import { Image, Alert } from '@Components'
import { icons } from '@Assets'
import { ROUTES } from '@Routes'
import { useDispatch, useSelector } from "react-redux";
import { useModal, useNavigation } from '@Hooks';
import { capitalizeFirstLetter } from '@Utils';
import { userLogout } from '@Redux'


function SuperAdminNavbar({ theme, sidenavOpen, toggleSidenav }) {

  const dispatch = useDispatch();
  const HEADER_MENU = [
    { id: '1', name: 'Home', value: 'HM', route: ROUTES['designation-module']['admin-schedule'] },
    { id: '2', name: 'Ongoing Schedule', value: 'OGS', route: ROUTES['designation-module']['scheduling-interview'] },
    { id: '3', name: 'Logout', value: 'LG', route: "" }
  ]

  const logoutModal = useModal(false);
  const { goTo } = useNavigation()

  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);


  const { name, } = dashboardDetails?.basic_info || {}

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

  return (
    <>
      <Navbar className={'navbar-top navbar-expand navbar-light py-4'} expand="lg">
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
                    { "sidenav-toggler-dark": theme === "dark" }
                  )}
                  onClick={toggleSidenav}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
            </Nav>

            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <Media className="ml-2 d-lg-block d-flex align-items-center">
                      <span className='mb-0 text-secondary font-weight-400 pointer mr-2'>
                        {capitalizeFirstLetter(name)}
                      </span>
                      <Image
                        height={12}
                        width={12}
                        src={icons.downArrowSecondary}
                        style={{
                          objectFit: 'contain'
                        }}
                      />
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  {
                    HEADER_MENU.map(each => {
                      const { name } = each;
                      return (
                        <DropdownItem onClick={(e) => {
                          e.preventDefault()
                          dropdownHandler(each);
                        }
                        }>
                          <span>{name}</span>
                        </DropdownItem>
                      )
                    })
                  }

                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar >
      <Alert
        title={'Logout'}
        subTitle={'Please click on proceed to logout'}
        isOpen={logoutModal.visible}
        onClose={logoutModal.hide}
        primary={"Proceed"}
        secondaryOnClick={logoutModal.hide}
        primaryOnClick={proceedLogout}
      />
    </>
  );
}

SuperAdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};


SuperAdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};


export { SuperAdminNavbar };

