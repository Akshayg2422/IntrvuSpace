import { icons, image } from '@Assets'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import React from 'react'
import { Link } from 'react-router-dom'
import {Image} from '@Components'
import { Navbar, Container, NavbarBrand, UncontrolledCollapse, Row, Col, Nav, NavItem, NavLink, Button } from 'reactstrap'
import './index.css'
function LandingNavBar() {

    const { goTo } = useNavigation()

    return (
        <>
            <Navbar
                className="navbar-horizontal navbar-main navbar-dark fixed-top py-3"
                expand="lg"
                id="navbar-main"
                style={{
                    backgroundColor: '#ffffff',
                    // boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.12), inset 0 -1px 0 0 #dadce0'
                }}
            >
                <Container>
                    <NavbarBrand to="/" tag={Link}>
                        <img className={'mt--1'}
                            alt="..."
                            src={icons.logoText}
                        />
                    </NavbarBrand>
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
                        {/* <span style={{}} className="navbar-toggler-icon " /> */}
                        <div className={'pt-2'}><Image height={30} width={30} src={icons.navbarToggler} /></div>
                    </button>
                    <UncontrolledCollapse
                        className="navbar-custom-collapse"
                        navbar
                        toggler="#navbar-collapse"
                    >
                        <div className="navbar-collapse-header">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/admin/dashboard">
                                        <img alt="..." src={icons.logoIcon} />
                                        {/* <span className='h6 ml-2 text-primary'>
                                            intrvu SPACE
                                        </span> */}
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button
                                        aria-controls="navbar-collapse"
                                        aria-expanded={false}
                                        aria-label="Toggle navigation"
                                        className="navbar-toggler text-black"
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

                        <Nav className="align-items-lg-center ml-lg-auto" navbar>
                            <NavItem className="d-block ml-lg-4">
                                <Button
                                    className="bg-primary rounded-0 text-white"
                                    size='sm'
                                    onClick={() => {
                                        goTo(ROUTES['auth-module'].login)
                                    }}

                                >
                                    <span className="nav-link-inner--text">Login</span>
                                </Button>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    )
}

export { LandingNavBar }