import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';

function Introduction() {
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="">

                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">
                            <Col lg="5" className='' >
                                <img
                                    src={image.Introduction}
                                    width={"100%"}
                                    height={"100%"}
                                    style={{borderRadius:'20px'}}
                                />
                            </Col>
                            <Col lg="7" className={"pl-sm-7 mt--7"}>
                                <div className='row align-items-center pb-2'>
                                    <img className={'mt--1 ml-3'} src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} />
                                    <h3 className="text-primary ml-3">Introduction</h3>
                                </div>
                                <span className={'display-3 text-black font-weight-bolder'}>Land Your Dream Job with<br></br><div className={'mt--2'}>Confidence</div></span>

                                <p className={'custom-text-color mt-3'} >
                                    Are you a job seeker on the hunt for the perfect opportunity? Are you determined to shine in your interviews and secure that dream job? Look no further! Easy Interview is exclusively designed to support you in mastering the art of interviews through realistic mock practice.
                                </p>
                            </Col>
                        </Row>
                    </div>

                </Container >
            </section>
        </div>
    )
}

export { Introduction }