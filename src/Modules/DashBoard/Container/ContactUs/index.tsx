import classnames from 'classnames'
import { Card, Row, Col, Form, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, NavbarBrand, NavLink, NavItem, Nav } from 'reactstrap'
import './index.css'
import { icons } from '@Assets'
import { Link } from 'react-router-dom'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'

function ContactUs() {
    const { goTo } = useNavigation()
    return (
        <>
            <section style={{ backgroundColor: '#ffffff' }}>
                <div >
                    <div className='container-fluid'>
                        <Card className=' mb-4 pt-5 shadow-none'>
                            <Row className="">
                                <Col className="ml-auto mr-auto text-center mt-5" md="8">
                                    <span className="text-primary mb-2 h3">Leave A Message</span>
                                    <h3 className="title text-black">
                                        Tell us more about <b>yourself</b>
                                    </h3>
                                    <p className="custom-text-color">
                                        Whether you have questions or you would just like to say
                                        hello, contact us.
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mx-auto" md="10">
                                    <Form
                                        className="p-3"
                                        id="contact-form-1"
                                        method="post"
                                        role="form"
                                    >
                                        <CardBody>
                                            <Row>
                                                <Col md="6">
                                                    <label>First name</label>
                                                    <InputGroup
                                                        className={classnames({
                                                            // "input-group-focus": firstNameFocus
                                                        })}
                                                    >
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="bi bi-person" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            style={{
                                                                borderLeft: '0px'
                                                            }}
                                                            aria-label="First Name..."
                                                            placeholder="First Name..."
                                                            type="text"
                                                        // onFocus={(e) => setFirstNameFocus(true)}
                                                        // onBlur={(e) => setFirstNameFocus(false)}
                                                        />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>
                                                        <label>Last name</label>
                                                        <InputGroup
                                                            className={classnames({
                                                                //   "input-group-focus": lastNameFocus
                                                            })}
                                                        >
                                                            <InputGroupAddon addonType="prepend">
                                                                <InputGroupText>
                                                                    <i className="bi bi-fonts" />
                                                                </InputGroupText>
                                                            </InputGroupAddon>
                                                            <Input
                                                                style={{
                                                                    borderLeft: '0px'
                                                                }}
                                                                aria-label="Last Name..."
                                                                placeholder="Last Name..."
                                                                type="text"
                                                            //   onFocus={(e) => setLastNameFocus(true)}
                                                            //   onBlur={(e) => setLastNameFocus(false)}
                                                            />
                                                        </InputGroup>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <FormGroup>
                                                <label>Email address</label>
                                                <InputGroup
                                                    className={classnames({
                                                        //   "input-group-focus": emailFocus
                                                    })}
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="bi bi-envelope" />
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        style={{
                                                            borderLeft: '0px'
                                                        }}
                                                        placeholder="Email Here..."
                                                        type="text"
                                                    //   onFocus={(e) => setEmailFocus(true)}
                                                    //   onBlur={(e) => setEmailFocus(false)}
                                                    />
                                                </InputGroup>
                                            </FormGroup>
                                            <FormGroup>
                                                <label>Your message</label>
                                                <Input
                                                    id="message-1"
                                                    name="message"
                                                    rows="6"
                                                    type="textarea"
                                                />
                                            </FormGroup>
                                            <Row>
                                                <Col className="d-flex justify-content-center">
                                                    <button className="button">
                                                        <div className="icon">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"></path>
                                                            </svg>
                                                        </div>
                                                        <h5 className={'pt-2 text-white'}>Send Message</h5>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>

                    </div>
                    <div className='container'>
                        <div className="row mt-7 ">
                            <div className='col-sm-3 d-flex justify-content-start'>
                                <div className="">
                                    <div className="mr-3">
                                        <NavbarBrand to="/" tag={Link}>
                                            <img
                                                height={30}
                                                width={30}
                                                alt="..."
                                                src={icons.logo}
                                            />
                                            <span className='h2 font-weight-bolder ml-2 text-black'>
                                                Mock Eazy
                                            </span>
                                        </NavbarBrand>
                                        <p className="description custom-color mt-3 d-flex justify-content-start"
                                            style={{
                                                fontSize: '13px'
                                            }}
                                        >Mock Easy  is your dedicated companion in the pursuit of interview success. Prepare effectively,
                                            outshine the competition, and unlock the job you deserve!
                                        </p>
                                        <Nav className="align-items-lg-center ml-lg-auto">
                                            <NavItem>
                                                <NavLink
                                                    className="nav-link-icon"
                                                    style={{ fontSize: '24px', color: '#3b5998' }}
                                                    href="https://www.facebook.com/profile.php?id=100089929992241&mibextid=ZbWKwL"
                                                    id="tooltip601201423"
                                                    target="_blank"
                                                >
                                                    <i className="fab fa-facebook-square" />
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
                                                    className=""
                                                    style={{
                                                        fontSize: '24px',
                                                        background: 'linear-gradient(to bottom, #405de6, #833ab4)',
                                                        WebkitBackgroundClip: 'text', // For Webkit-based browsers like Chrome
                                                        WebkitTextFillColor: 'transparent', // For Webkit-based browsers like Chrome
                                                        color: 'transparent',
                                                    }}
                                                    href="https://www.instagram.com/leorainfotech27/?igshid=ZDdkNTZiNTM%3D"
                                                    id="tooltip871243015"
                                                    target="_blank"
                                                >
                                                    <i className="fab fa-instagram" />
                                                    <span className="nav-link-inner--text d-lg-none">
                                                        Instagram
                                                    </span>
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className="nav-link-icon"
                                                    style={{ fontSize: '24px', color: '#55acee' }}
                                                    href="https://twitter.com/Leora_Infotech?t=L0eNeuCutuNAVYRaQKYeAA&s=08"
                                                    id="tooltip366258619"
                                                    target="_blank"
                                                >
                                                    <i className="fab fa-twitter-square" />
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
                                                    style={{ fontSize: '24px', color: '#1e73e2' }}
                                                    href="https://www.google.com/maps/place/Leora+Infotech+Private+Limited/@13.4210932,80.1274008,15z/data=!4m5!3m4!1s0x0:0xc9ff7b04d36a6217!8m2!3d13.4210932!4d80.127401?coh=164777&entry=tt"
                                                    target="_blank"
                                                >
                                                    <i className="ni ni-pin-3" />
                                                    <span className="nav-link-inner--text d-lg-none">Location</span>
                                                </NavLink>
                                            </NavItem>

                                        </Nav>

                                    </div>


                                </div>
                            </div>
                            <div className='col-sm-3 d-flex justify-content-start mt-lg-0 mt-5'>
                                <div className="">

                                    <h3 className="info-title">Company</h3>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        About Us
                                        <br></br>
                                        Pricing
                                        <br></br>
                                        Blog
                                        <br></br>
                                        Careers</p>
                                </div>
                            </div>
                            <div className='col-sm-3 d-flex justify-content-start mt-lg-0 mt-5'>
                                <div className="">
                                    <h3 className="info-title">Products</h3>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        Features
                                        <br></br>
                                        <a className='custom-color pointer' onClick={() => goTo(ROUTES["auth-module"].privacy)}> Privacy Policy </a>
                                        <br></br>
                                        <a className='custom-color pointer' onClick={() => goTo(ROUTES["auth-module"].TermsAndConditions)}> Terms & Conditions </a>
                                        <br></br>
                                        <a className='custom-color pointer' onClick={() => goTo(ROUTES["auth-module"].ReturnAndRefund)}> Return & Refund Policy </a>
                                    </p>
                                </div>
                            </div>
                            <div className='col-sm-3 d-flex justify-content-start mt-lg-0 mt-5'>
                                <div className="">

                                    <h3 className="info-title">Contact Us</h3>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '13px'
                                        }}
                                    >
                                        contact@leorainfotech.in<br></br>
                                        +91 9445-092-211<br></br>
                                        +91 9834-054-352<br></br>
                                        No.3, First floor, Prithiv Nagar, G.N.T Road, Gummidipoondi - 601201.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export { ContactUs } 