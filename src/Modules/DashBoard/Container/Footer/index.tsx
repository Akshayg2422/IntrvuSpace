import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap'

function Footer() {
    const { goTo } = useNavigation()
    return (
        <>
            <footer className="pt-7 pb-5" id="footer-main">
                <Container>
                    <Row className="align-items-center justify-content-xl-between">
                        <Col xl="6">
                            <div className="copyright text-center text-xl-left text-muted">
                                © {new Date().getFullYear()}{" "}
                                <a
                                    className="font-weight-bold ml-1"
                                    // href="https://www.creative-tim.com?ref=adpr-auth-footer"
                                    target="_blank"
                                >
                                    Mock Eazy
                                </a>
                            </div>
                        </Col>
                        <Col xl="6">
                            <Nav className="nav-footer justify-content-center justify-content-xl-end">
                                <NavItem>
                                    <NavLink>
                                        <p style={{ cursor: 'pointer' }} className=''>  <a className='' onClick={() => goTo(ROUTES["auth-module"].privacy)}><b> Privacy Policy </b> </a></p>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <p style={{ cursor: 'pointer' }} className=''>  <a className='' onClick={() => goTo(ROUTES["auth-module"].TermsAndConditions)}><b> Terms & Conditions </b> </a></p>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink>
                                        <p style={{ cursor: 'pointer' }} className=''>  <a className='text-black' onClick={() => goTo(ROUTES["auth-module"].ReturnAndRefund)}><b> Return & Refund Policy </b> </a></p>
                                    </NavLink>
                                </NavItem>
                                {/* <NavItem>
                                    <NavLink
                                        href="https://www.creative-tim.com/license?ref=adpr-auth-footer"
                                        target="_blank"
                                    >
                                        License
                                    </NavLink>
                                </NavItem> */}
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    )
}

export { Footer }