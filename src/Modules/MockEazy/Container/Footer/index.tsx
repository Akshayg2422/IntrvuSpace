import { icons } from '@Assets'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap'

function Footer() {
    const { goTo } = useNavigation()
    return (
        <>
            <footer className="pt-4 pb-4" id="footer-main" style={{ backgroundColor: '#ffffff' }}>
                <hr></hr>
                <Container>
                    <div className="d-flex">

                        <div>
                            <div>
                                <NavbarBrand to="/" tag={Link}>
                                    <img
                                        height={30}
                                        width={30}
                                        alt="..."
                                        src={icons.logoIcon}
                                    />
                                    <span className='ml-2 text-black' style={{fontWeight: 100}}>
                                        intrvu
                                    </span>

                                    <span className='h4 ml-1 text-black'>
                                         SPACE
                                    </span>
                                </NavbarBrand>
                            </div>
                        </div>
                        <div className={`ml-auto p-2 mt--1`}>
                            <small className={'copyright h5 text-sm'}>
                                Copyright © {new Date().getFullYear()}{" "} intrvu SPACE. All Rights Reserved.
                            </small>
                        </div>
                    </div>
                </Container>
            </footer>
        </>
    )
}

export { Footer }