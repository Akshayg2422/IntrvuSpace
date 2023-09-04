import React, { useState } from 'react'
import { Container, Row, Col, Card, CardBody } from 'reactstrap'
import { icons } from '@Assets';
import { Image, Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4, Tab5, Tab6 } from '@Modules'



function From() {

    const TABS = [
        { id: "1", title: <div className="text-center pointer">Interview by Experience</div>, component: <Tab1 /> },
        { id: "2", title: <div className="text-center pointer">Mock Interviews by Company</div>, component: <Tab2 /> },
        { id: "3", title: <div className="text-center pointer">Seamless Registration</div>, component: <Tab3 /> },
        { id: "4", title: <div className="text-center pointer">Personalized Interview Process</div>, component: <Tab4 /> },
        { id: "5", title: <div className="text-center pointer">Excel in Your Interviews -Nailing Your Responses</div>, component: <Tab5/> },
        { id: "6", title: <div className="text-center pointer">Insights for Improvement</div>, component: <Tab6 /> },
    ];
    const [selectedTab, setSelectedTab] = useState(TABS[0]);


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="pt-0 pb-5 ">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md="8">
                            <h3 className="text-primary">
                                Introduction
                            </h3>
                            <span className={'display-3 text-black font-weight-bolder'}>Land Your Dream Job<br></br>
                                with Confidence</span>
                            <p className="custom-text-color pt-2" style={{ fontSize: '17px' }}>
                                Are you a job seeker on the hunt for the perfect opportunity? Are you determined to shine in your interviews and secure that dream job? Look no further! Easy Interview is exclusively designed to support you in mastering the art of interviews through realistic mock practice.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col className={'mb-4'}>
                            <h4 className='display-5 text-primary'>
                                Key Features
                            </h4>
                            <span className={'display-3 text-black font-weight-bolder'}>Experience in multiple<br></br>
                                interview practices
                            </span>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container>
                    <Row>
                        <Col lg={'12'}>
                            <div>
                                <Tabs tabs={TABS} selected={selectedTab} onChange={(item: any) => { setSelectedTab(item) }} />
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </div>
    )
}

export { From }