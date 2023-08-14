import classnames from 'classnames'
import React, { useState } from 'react'
import { Image } from "@Components";
import { Container, Row, Col, Card, CardBody, Button, UncontrolledTooltip, Badge, Form, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup } from 'reactstrap'
import './style.scss'

function LandingHeader() {




    return (
        <>
            <div className="header pt-5 pb-5  bg-customGradient"

            >
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">
                            <Col lg="6">
                                <div className="pr-5">
                                    <h1 className="display-2 custom-white font-weight-bold mb-0">
                                        Welcome to Mock Eazy

                                    </h1>
                                    <h2 className="display-4 custom-white font-weight-bold pt-4">

                                    </h2>
                                    <p className="text-white i7,kujtmli7,khw uy6y7y45t5tu-t-2">
                                        Embrace the Next Era of Interviews - Choose MockEasy (or)"Step into the Future of Interviews with MockEasy" (or) "Your Gateway to Futuristic Interviews - MockEasy" (or) Pioneering the Future of Interviewing - MockEasy"
                                    </p>
                                    <div className="mt-5">
                                        {/* <Button
                                                className="btn-neutral my-2"
                                                color="default"
                                                to="/admin/dashboard"
                                                tag={Link}
                                            >
                                                Explore Dashboard
                                            </Button>
                                            <Button
                                                className="my-2"
                                                color="default"
                                                href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-auth-navbar"
                                            >
                                                Purchase now
                                            </Button> */}
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-5' >
                                <Image
                                    // src={'https://img.freepik.com/premium-vector/flat-isometric-concept-ai-future-robot-human-cooperation_109064-842.jpg?w=900'}
                                    src={require('file:///C:/Users/tamil_hfh9g6g/Downloads/Chat%20bot-amico.png')}
                                    width={"80%"}
                                    height={"70%"}
                                />
                                {/* <div className='blend-img'>

                                    </div> */}
                            </Col>
                            {/* <Col lg='12'>
                                   
                                   
                                </Col> */}
                            {/* <div className="ocean">
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                            </div> */}
                        </Row>
                    </div>

                </Container >
            </div >
        </>
    )
}

export { LandingHeader }