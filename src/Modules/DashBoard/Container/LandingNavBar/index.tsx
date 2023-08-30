import { icons } from '@Assets'
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
                className="navbar-horizontal navbar-main navbar-dark  fixed-top py-1"
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
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    href="https://www.facebook.com/profile.php?id=100089929992241&mibextid=ZbWKwL"
                                    id="tooltip601201423"
                                    target="_blank"
                                >
                                    <i className="fab fa-facebook-square custom-color" />
                                    <span className="nav-link-inner--text d-lg-none">
                                        Facebook
                                    </span>
                                </NavLink>
                                {/* <UncontrolledTooltip delay={0} target="tooltip601201423">
                                    Like us on Facebook
                                </UncontrolledTooltip> */}
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    href="https://www.instagram.com/leorainfotech27/?igshid=ZDdkNTZiNTM%3D"
                                    id="tooltip871243015"
                                    target="_blank"
                                >
                                    <i className="fab fa-instagram custom-color" />
                                    <span className="nav-link-inner--text d-lg-none">
                                        Instagram
                                    </span>
                                </NavLink>
                                {/* <UncontrolledTooltip delay={0} target="tooltip871243015">
                                    Follow us on Instagram
                                </UncontrolledTooltip> */}
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    href="https://twitter.com/Leora_Infotech?t=L0eNeuCutuNAVYRaQKYeAA&s=08"
                                    id="tooltip366258619"
                                    target="_blank"
                                >
                                    <i className="fab fa-twitter-square custom-color" />
                                    <span className="nav-link-inner--text d-lg-none">
                                        Twitter
                                    </span>
                                </NavLink>
                                {/* <UncontrolledTooltip delay={0} target="tooltip366258619">
                                    Follow us on Twitter
                                </UncontrolledTooltip> */}
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    href="https://www.google.com/maps/place/Leora+Infotech+Private+Limited/@13.4210932,80.1274008,15z/data=!4m5!3m4!1s0x0:0xc9ff7b04d36a6217!8m2!3d13.4210932!4d80.127401?coh=164777&entry=tt"
                                    target="_blank"
                                >
                                    <i className="ni ni-pin-3 custom-color" />
                                    <span className="nav-link-inner--text d-lg-none">Github</span>
                                </NavLink>
                                {/* <UncontrolledTooltip delay={0} target="tooltip931502898">
                                    Location
                                </UncontrolledTooltip> */}
                            </NavItem>
                            <NavItem className="d-none d-lg-block ml-lg-4">
                                <Button
                                    className="btn-neutral btn-icon bg-custom border-0 text-black "
                                    size='sm'
                                    onClick={() => {
                                        goTo(ROUTES['auth-module'].login)
                                    }}

                                >
                                    <span className="nav-link-inner--text">Login</span>
                                </Button>
                            </NavItem>
                            <NavItem className="d-lg-none d-sm-block ml-lg-4">
                                <NavLink
                                    className="nav-link-icon"
                                >
                                    <span className="nav-link-inner--text d-lg-none">Login</span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    )
}

export { LandingNavBar }