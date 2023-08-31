import classnames from 'classnames'
import React from 'react'
import { Card, Row, Col, Badge, Form, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Button } from 'reactstrap'
import './index.css'

function ContactUs() {
    return (
        <>
            <section>
                <div >
                    <div className='container-fluid' style={{
                        backgroundColor: '#ffffff'
                    }}>

                        <Card className=' mt-5 mb-4 pt-5 shadow-none'>
                            <Row className="">
                                <Col className="ml-auto mr-auto text-center mt-5" md="8">
                                    <span className={'text-black display-4'} color="black">Leave A Message</span>
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
                                                        <h5 className={'pt-2'}>Send Message</h5>
                                                    </button>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Form>
                                </Col>
                            </Row>
                        </Card>

                    </div>
                    <div className='container-fluid'>
                        <div className="row mt-7 ">
                            <div className='col-sm-3 text-center'>
                                <div className="">
                                    <div className=" mr-3">
                                        {/* <img

                                            alt="..."
                                            className="blog"
                                        // src={require('./success.png')}
                                        /> */}
                                        <i className="bi bi-geo-alt"
                                            style={{
                                                fontSize: '2.5em',
                                                marginLeft: '0.3em',
                                                color: '#424242',
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Address</h4>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '12px'
                                        }}
                                    >No.3, First floor, Prithiv Nagar, G.N.T Road, Gummidipoondi - 601201.</p>
                                </div>
                            </div>
                            <div className='col-sm-3 text-center mt-lg-0 mt-5'>
                                <div className="">
                                    <div className=" mr-3">
                                        {/* <img
                                            alt="..."
                                            className="blog "
                                        // src={require('./info.png')}
                                        /> */}
                                        <i className="bi bi-envelope"
                                            style={{
                                                fontSize: '2.5em',
                                                marginLeft: '0.3em',
                                                color: '#424242'
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Email</h4>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '12px'
                                        }}
                                    >dhivyaprabhandan@leorainfotech.in ,<br></br>jayakumar@leorainfotech.in ,<br></br>jagan.k@leorainfotech.in</p>
                                </div>
                            </div>
                            <div className='col-sm-3 text-center mt-lg-0 mt-5'>
                                <div className="">
                                    <div className="mr-3">
                                        {/* <img
                                            alt="..."
                                            className="blog "
                                        // src={require('./warning.png')}
                                        /> */}
                                        <i className="bi bi-phone "
                                            style={{
                                                fontSize: '2.5em',
                                                marginLeft: '0.3em',
                                                color: '#424242',
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Phone Number</h4>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '12px'
                                        }}
                                    >+91 9445-092-211<br></br>
                                        +91 9834-054-352</p>
                                </div>
                            </div>
                            <div className='col-sm-3 text-center mt-lg-0 mt-5'>
                                <div className="">
                                    <div className="">
                                        {/* <img
                                            alt="..."
                                            className="blog "
                                        // src={require('./success.png')}
                                        /> */}
                                        <i className="bi bi-person"
                                            style={{
                                                fontSize: '2.5em',
                                                marginLeft: '0.3em',
                                                color: '#424242'
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Contact</h4>
                                    <p className="description custom-color"
                                        style={{
                                            fontSize: '12px'
                                        }}
                                    >Dhivyaprabhandan<br></br>Jagan<br></br>Jayakumar</p>
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