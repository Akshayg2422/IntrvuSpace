import { icons, image } from '@Assets';
import { Tabs } from "@Components";
import { Tab1, Tab2, Tab3, Tab4, Tab5, Tab6 } from '@Modules';
import { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';

function Reports() {
    const TABS = [
        { id: "1", title: <div className="text-center pointer">Basic Report</div>, component: <Tab1 /> },
        { id: "2", title: <div className="text-center pointer">Skill Matrix Report</div>, component: <Tab2 /> },
        { id: "3", title: <div className="text-center pointer">Communication Report</div>, component: <Tab3 /> },
        { id: "4", title: <div className="text-center pointer">Trait Report</div>, component: <Tab4 /> },
        { id: "5", title: <div className="text-center pointer">Skill Matrix Advanced</div>, component: <Tab5 /> },
        { id: "6", title: <div className="text-center pointer">Communication Advanced</div>, component: <Tab6 /> },
    ];
    const [selectedTab, setSelectedTab] = useState(TABS[0]);

    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section>
                <Container>
                    <Row>
                        <Col className="mb-4 mt-8">
                            <div className="text-center">
                                <div className="row align-items-center justify-content-center pb-2">
                                    <img className="mt--1 ml-3" src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} />
                                    <h3 className="text-primary ml-3">Reports</h3>
                                </div>
                                <div className="display-4 text-black font-weight-bolder">Unlocking Your Interview <br /><div className="mt--2">Potential with intrvu SPACE Reports</div></div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container>
                    <Row>
                        <Col lg="12" md="12" sm="12">
                            <div>
                                <Tabs tabs={TABS} selected={selectedTab} onChange={(item: any) => { setSelectedTab(item) }} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container className={'mt-8'}>
                    <div className="header-body">
                        <Row className="align-items-center">
                            <Col lg="5" md="6" sm="12" className="">
                                <img
                                    src={image.DontWorry}
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: '20px' }}
                                    alt="DontWorry"
                                />
                            </Col>
                            <Col lg="7" md="6" sm="12" className="pl-sm-6">
                                <div className="row align-items-center pb-2">
                                    <img className="mt--1 ml-3" src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} />
                                    <h3 className="text-primary ml-3">Not happy with your Reports ?</h3>
                                </div>
                                <span className="display-3 text-black font-weight-bolder">Try as many interviews for the given JD until you are satisfied.</span>
                                <p className="custom-text-color pt-2" style={{ fontSize: '17px' }}></p>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </div>
    )
}

export { Reports };
