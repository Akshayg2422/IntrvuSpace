import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'

function Data() {

    const [data, setData] = useState('')


    return (
        <div className='pt-8'>
            <section className="py-4">
                <Container fluid>
                    <Row className="justify-content-center text-center">
                        <Col md="7">
                            <h2 className="display-3 text-black">
                            Why Choose MockEasy
                            </h2>
                            <p className="font-weight-normal">
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
                            // src={icons.authenticationModule}
                            />
                        </Col>
                        <Col className="order-md-1 " md="6">
                            <div className="pr-md-5 align-items-center">
                                <h1>Authentication Module</h1>
                                <p>
                                    To ensure secure access and user authentication in a learning environment, focus on the following key measures
                                </p>
                                <ul className="ml--2 mt-5">
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
                            // src={icons.dashboardModule}
                            />
                        </Col>
                        <Col md="6">
                            <div className="pr-md-5">
                                <h1>Dashboard Module</h1>
                                <p>
                                    Get an overview of your progress, upcoming tasks, and course recommendations in a centralized dashboard.
                                </p>
                                <ul className="ml--2 mt-5">
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="text-sm  mb-0">
                                                    Centralized dashboard: Track progress, manage tasks, assignments, and deadlines for improved organization and productivity.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="text-sm  mb-0">
                                                    Personalized recommendations: Tailored course suggestions based on interests, goals, and performance, promoting focused learning.
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-2">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <p className="mb-0 text-sm">
                                                    Easy access to resources: Retrieve course materials, lecture notes, videos, and engage in discussions, facilitating collaboration and resource retrieval.
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
          
        </div>
    )
}

export { Data }