import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { videos, image, icons } from '@Assets';
import { Image, Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4 } from '@Modules'

function AuthenticationAndDashboardModule() {

    const [data, setData] = useState('')
    const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="">
                <Container>
                    <Row>
                        <div className="">
                            <div className='row align-items-center pb-2'>
                                <img className={'mt--2 ml-3'} src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                <h1 className={'text-black display-3 font-weight-bolder col'}>Authentication Module</h1>
                            </div>

                            <p className={'custom-text-color'} >
                            The Authentication Module is the cornerstone of MockEazy's commitment to secure and reliable interview experiences. In an era where data privacy and security are paramount, we understand the importance of safeguarding your personal information. Our Authentication Module employs cutting-edge encryption and multi-factor authentication techniques to ensure that your data remains confidential and protected. With MockEazy, you can trust that your information is in safe hands, allowing you to focus solely on your interview preparation and success.
                            </p>
                        </div>
                    </Row>
                    <Row className="row-grid align-items-center">
                        <Col className="order-md-2" md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={image.AuthenticationImage}
                            />
                        </Col>
                        <Col className="order-md-1 " md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={image.AuthenticationImage}
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container>
                    <Row>
                        <Col className={'text-center'}>
                            <h3 className={'text-primary'}>Dashboard Module</h3>
                            <p className={'display-3 text-black font-weight-bolder'}>
                                Get an overview of your progress, upcoming tasks, and course recommendations in a centralized dashboard.
                            </p></Col>
                    </Row>
                    <Row>
                        <Col lg={'12'}>
                            <div>
                                
                            </div>
                        </Col>
                    </Row>
                   
                </Container>
            </section>

        </div>
    )
}

export { AuthenticationAndDashboardModule }