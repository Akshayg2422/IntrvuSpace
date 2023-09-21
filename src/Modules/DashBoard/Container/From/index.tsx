import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'
import { icons } from '@Assets';
import './index.css'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function From() {

    const [cardContent, setCardContent] = useState([

        { id: 2, icon: <img src={icons.skillMatrixReport} alt="skillMatrixReport icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Your Expertise, Your Advantage', para: '' },
        { id: 3, icon: <img src={icons.communicationReport} alt="communicationReport icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Mock Interviews by Company', para: '' },
        { id: 4, icon: <img src={icons.traitReport} alt="traitReport icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Seamless Registration', para: '' },
        { id: 5, icon: <img src={icons.skillMatrixAdvanced} alt="skillMatrixAdvanced icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Personalized Interview Process', para: '' },
        { id: 6, icon: <img src={icons.communicationAdvanced} alt="communicationAdvanced icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Mastering Your Interview Success', para: '' },
        { id: 1, icon: <img src={icons.basicReport} alt="basicReport icon" style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover', }} />, heading: 'Insights for Improvement', para: ` Experience Matters, Practice Perfectly! In the "Interview by Experience" method, we take into account your years of professional experience. The app will present you with a series of interview questions carefully tailored to match your expertise level. This means you'll face relevant and challenging questions that resonate with your specific background and qualifications.` },
    ])
    const cardElements = cardContent.map((item) => (
        <div className="col-lg-4 col-sm-6 mb-lg-0 mb-4 py-3" key={item.id}>
            <div className="card-animation card-animation:hover">
                <div className="text-sm-start text-center pt-5 px-4">
                    <span>{item.icon}</span>
                    <h5 className="mb-2 mt-3 h2 text-uppercase text-primary">{item.heading}</h5>
                    <p>{item.para}</p>
                </div>
            </div>
        </div>
    ));

    return (

        <div style={{ backgroundColor: '#ffffff' }}>
            <section>
                <Container>
                    <Row className="">
                        <Col md="8">
                            <div className='row align-items-center pb-2'>
                                <img className={'mt--1 ml-3'} src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} />
                                <h3 className="text-primary ml-3">Key Features</h3>
                            </div>
                            <span className={'display-3 text-black font-weight-bolder'}>Experience in multipleinterview<br></br><div className={'mt--2'}>practices</div></span>

                        </Col>
                    </Row>

                    <div className="row mt-4">
                        <Carousel
                            className={'carousel carousel-slider'}
                            showStatus={false}
                            showThumbs={false}
                            infiniteLoop
                            autoPlay
                            interval={5000}
                            showArrows={false}
                            showIndicators={true}
                            centerMode={true}
                            centerSlidePercentage={33.33}
                        >
                            {cardElements}
                        </Carousel>
                    </div>
                </Container>
            </section>
        </div>

    )
}

export { From }