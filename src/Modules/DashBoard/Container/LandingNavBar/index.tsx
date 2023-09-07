import { icons, image } from '@Assets'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Container, NavbarBrand, UncontrolledCollapse, Row, Col, Nav, NavItem, NavLink, Button } from 'reactstrap'

function LandingNavBar() {

    const { goTo } = useNavigation()

    return (
        <>
            <Navbar
                className="navbar-horizontal navbar-main navbar-dark  fixed-top py-3"
                expand="lg"
                id="navbar-main"
                style={{
                    backgroundColor: '#ffffff',
                    boxShadow: '0 2px 6px 0 rgba(0, 0, 0, 0.12), inset 0 -1px 0 0 #dadce0'
                }}

            >
                <Container>
                    <NavbarBrand to="/" tag={Link}>
                        <img
                            alt="..."
                            src={icons.logo}
                        />
                        <span className='h4 ml-2 text-black'>
                            Mock Eazy
                        </span>
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
                        <span className="navbar-toggler-icon" />
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
                                        <img alt="..." src={icons.logo} />
                                        <span className='h6 ml-2 text-black'>
                                            Mock Eazy
                                        </span>
                                    </Link>
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

                        <Nav className="align-items-lg-center ml-lg-auto" navbar>
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <Button
                                    className="bg-primary px-4 text-white "
                                    style={{ borderRadius: '25px' }}
                                    size='md'
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