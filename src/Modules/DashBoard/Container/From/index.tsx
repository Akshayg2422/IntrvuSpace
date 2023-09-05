import React, { useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { icons } from '@Assets';
import { Image, Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4, Tab5, Tab6 } from '@Modules'



function From() {

    const TABS = [
        { id: "1", title: <div className="text-center pointer">Interview by Experience</div>, component: <Tab1 /> },
        { id: "2", title: <div className="text-center pointer">Mock Interviews by Company</div>, component: <Tab2 /> },
        { id: "3", title: <div className="text-center pointer">Seamless Registration</div>, component: <Tab3 /> },
        { id: "4", title: <div className="text-center pointer">Personalized Interview Process</div>, component: <Tab4 /> },
        { id: "5", title: <div className="text-center pointer">Mastering Your Interview Success</div>, component: <Tab5/> },
        { id: "6", title: <div className="text-center pointer">Insights for Improvement</div>, component: <Tab6 /> },
    ];
    const [selectedTab, setSelectedTab] = useState(TABS[0]);


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
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