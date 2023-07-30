import React from 'react'
import { Icons } from 'react-toastify';
import { DropdownItem, DropdownMenu, DropdownToggle, Media, Nav, UncontrolledDropdown } from 'reactstrap';
import { Button, Image, Modal } from '@Components';
import { getPhoto } from '@Utils';
import { icons } from '@Assets';
import { useModal, useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';

function Profile() {

    const logoutModal = useModal(false);
    const { goTo } = useNavigation()

    const HEADER_MENU = [
        { id: '1', name: 'Setting', value: 'ST', icon: 'ni ni-badge' },
        { id: '2', name: 'Logout', value: 'LG', icon: 'ni ni-button-power' },
    ]


    const DropdownHandler = (item: any) => {
        if (item.value === 'ST') {
        }
        else if (item.value === 'LG') {
            logoutModal.show()
        }
    };

    function proceedLogout() {
        try {
            localStorage.clear();
            goTo(ROUTES['auth-module'].login)
        } catch (error) {
        }
    }

    return (
        <div className='row align-items-center m-auto'>
            <div className='col'>
                {/* {dashboardDetails && dashboardDetails.user_details && (
                    <span className='mb-0 text-primary  font-weight-bold'>
                        {dashboardDetails.user_details.name}
                    </span>
                )} */}
                <span className='mb-0 text-primary  font-weight-bold'>
                    {'Tamil Selvan'}
                </span>
            </div>
            <Nav navbar>
                <UncontrolledDropdown nav>
                    <DropdownToggle className="nav-link pr-0" color="" tag="a">
                        <Media className="align-items-center">
                            <Image
                                variant={'rounded'}
                                src={getPhoto(icons.profile)}
                            />
                            <Media className="ml-2 d-none d-lg-block">
                                <div className='media-body text-primary d-none d-lg-block dropdown-toggle'> </div>
                            </Media>
                        </Media>
                    </DropdownToggle>
                    <DropdownMenu right>
                        {HEADER_MENU.map((item) => {
                            return (
                                <DropdownItem
                                    onClick={(e) => {
                                        e.preventDefault()
                                        DropdownHandler(item)
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
            <Modal title={'Logout User'} isOpen={logoutModal.visible} onClose={logoutModal.hide}>
                <div>
                    <span className='ml-3'>{"Please click on Proceed to Logout user"}</span>
                    <div
                        className='d-flex justify-content-end m-3'
                    >
                        <Button
                            size='lg'
                            color='white'
                            text={'Cancel'}
                            onClick={() => logoutModal.hide()}
                        />
                        <Button
                            size='lg'
                            text={'Proceed'}
                            onClick={proceedLogout}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export { Profile }
