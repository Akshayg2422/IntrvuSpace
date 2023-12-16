// nodejs library that concatenates classes
import classnames from "classnames";
// nodejs library to set properties for components
// reactstrap components
import { icons } from '@Assets';
import { Alert, Button, Image } from '@Components';
import { useLogout, useModal, useNavigation } from '@Hooks';
import { capitalizeFirstLetter } from '@Utils';
import { useSelector } from "react-redux";
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
import { SuperAdminNavbarProps } from './interface';

function SuperAdminNavbar({ actions, sidenavOpen, toggleSidenav }: SuperAdminNavbarProps) {

  const HEADER_MENU = [
    { id: '3', name: 'Logout', value: 'LG', route: "" }
  ]
  const { loader, logout } = useLogout()

  const logoutModal = useModal(false);
  const { goTo } = useNavigation()

  const { dashboardDetails } = useSelector((state: any) => state.AuthReducer);

  const { name } = dashboardDetails?.basic_info || {}

  const dropdownHandler = (item: any) => {

    const { route } = item
    
    if (item.value === 'LG') {
      logoutModal.show()
    } else {
      goTo(route);
    }

  };


  return (
    <>
      <Navbar className={'navbar-top navbar-expand navbar-light py-4 bg-white'} expand={'lg'}>
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: sidenavOpen },
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
              {
                actions && actions.length > 0 &&
                <>
                  <div className="d-none d-xl-block ">
                    <div className="d-flex mr-2">
                      {
                        actions.map((each: any) => {
                          const { text, callback } = each
                          return (
                            <NavItem>
                              <div className={'btn-wrapper ml-4'}>
                                <Button block text={text} onClick={callback} />
                              </div>
                            </NavItem>
                          )
                        })
                      }
                    </div>
                  </div>

                  <UncontrolledDropdown nav className={"d-xl-none"}>
                    <DropdownToggle className="nav-link p-0" color="" tag="a">
                      <span className={"text-primary text-des font-weight-800 px-3"}>{'Add'}</span>
                    </DropdownToggle>
                    <DropdownMenu
                      className="dropdown-menu-xl py-0 overflow-hidden"
                      right
                    >
                      {
                        actions.map((action: any) => {
                          const { text, callback } = action
                          return (
                            <DropdownItem
                              className="text-center text-primary font-weight-bold py-3"
                              onClick={(e) => {
                                e.preventDefault()
                                if (callback)
                                  callback();
                              }}
                            >
                              {text}
                            </DropdownItem>
                          )
                        })

                      }
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </>
              }
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                    <Media className="d-lg-block d-flex align-items-center">
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
        loading={loader.loader}
        primaryOnClick={logout}
      />
    </>
  );
}

export { SuperAdminNavbar };
export type { SuperAdminNavbarProps }