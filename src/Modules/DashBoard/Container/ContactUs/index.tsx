import classnames from 'classnames'
import React from 'react'
import { Card, Row, Col, Badge, Form, CardBody, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup, Button } from 'reactstrap'

function ContactUs() {
    return (
        <>
            <section>
                <div >
                    <div className='container-fluid'>

                        <Card className=' mt-5 mb-4 pt-5'>
                            <Row className="">
                                <Col className="ml-auto mr-auto text-center mt-5" md="8">
                                    <Badge className={'bg-customGradient'} color="white">Leave a message</Badge>
                                    <h1 className="title">
                                        Tell us more about <b>yourself</b>
                                    </h1>
                                    <h4 className="desc">
                                        Whether you have questions or you would just like to say
                                        hello, contact us.
                                    </h4>
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
                                                <Col className="text-center">
                                                    <Button
                                                        className="btn-round bg-customGradient text-white"
                                                        onClick={() => {

                                                        }}
                                                    >
                                                        Send Message
                                                    </Button>
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
                                                color: 'rgb(12, 237, 174)',
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Address</h4>
                                    <p className="description "
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
                                                color: '#1d8cf8'
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Email</h4>
                                    <p className="description "
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
                                                color: '#ff8d72',
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Phone Number</h4>
                                    <p className="description"
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
                                                color: '#00f2c3'
                                            }}
                                        />
                                    </div>
                                    <h4 className="info-title">Contact</h4>
                                    <p className="description"
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