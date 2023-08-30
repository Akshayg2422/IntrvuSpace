import { image } from '@Assets'
import { color } from '@Themes'
import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

function Data() {

    const [data, setData] = useState('')
    const dashBoardModule = ['Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.', 'Tailored course suggestions based on interests, goals, and performance, promoting focused learning.', 'Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.']


    return (
        <div className='pt-8' style={{backgroundColor:'#f6f6f6'}}>
            <section className="py-4">
                <Container fluid>
                    <Row className="justify-content-center text-center">
                        <Col md="7">
                            <h2 className="display-3 text-black">
                                Why Choose MockEasy
                            </h2>
                            <p className="font-weight-normal custom-text-color">
                                Secure access, centralized dashboard, comprehensive courses, and social media integration for an enhanced learning experience.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="pt-4">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col className="order-md-2" md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={image.AuthenticationImage}
                            />
                        </Col>
                        <Col className="order-md-1 " md="6">
                            <div className="pr-md-5 align-items-center">
                                <h1 className={'text-black'}>Authentication Module</h1>
                                <p className={'custom-text-color'}>
                                    To ensure secure access and user authentication in a learning environment, focus on the following key measures
                                </p>
                                <ul className="ml--2 mt-5 custom-text-color">
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="mb-0 text-sm">
                                                    Implement multi-factor authentication (MFA) for enhanced security.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="mb-0 text-sm">
                                                    Enforce strong password policies to prevent unauthorized access.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="mb-0 text-sm">
                                                    Stay up to date with regular security updates and patches.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container>
                    <Row className="row-grid align-items-center">
                        <Col md="6">
                            <img
                                alt="..."
                                className="img-fluid"
                                src={image.DashboardModule}
                            />
                        </Col>
                        <Col md="6">
                            <div className=' card-body mb-0'>
                                <h1 className={'text-black'}>Dashboard Module</h1>
                                <p className={'custom-text-color'}>
                                    Get an overview of your progress, upcoming tasks, and course recommendations in a centralized dashboard.
                                </p>
                                {
                                    dashBoardModule && dashBoardModule.length > 0 && dashBoardModule.map(each => {
                                        return (
                                          
                                                <div className='row align-items-center'>
                                                    <div style={{
                                                        width: 7,
                                                        height: 7,
                                                        backgroundColor: color.davyGrey,
                                                        borderRadius: 5
                                                    }}>
                                                    </div>
                                                    <p className="custom-text-color col" style={{ fontSize: '14px' }}>{each}</p>
                                                </div>
                                       
                                        )
                                    })
                                }
                            </div>

                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    )
}

export { Data }