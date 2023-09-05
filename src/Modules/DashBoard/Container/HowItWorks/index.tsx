import { image } from '@Assets'
import { Image } from '@Components'
import { Container, Row, Col } from 'reactstrap'

function HowItWorks() {


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="pt-0 pb-3 ">
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
            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">

                            <Col lg="6">
                                <div className={''}>
                                    <span className={'display-3 text-black font-weight-bolder'}>How it Works?</span>
                                    <div className={'display-3 text-black font-weight-bolder mb-2 ml--2'}>
                                        {`1. Upload your Jd details`}
                                    </div>

                                    <ul className={'custom-font-size ml-3'}>
                                        <li>Specify the Sector and Role.</li>
                                        <li>Paste the JD copied from the job portal.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-7' >
                                <Image
                                    src={image.Tab3Image}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                        </Row>
                    </div>

                </Container >
                <Container>
                    <Row className="justify-content-end">
                        <Col md="7">

                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">

                            <Col lg="6">
                                <div className={''}>
                                    <span className={'display-3 text-black font-weight-bolder ml--1'}>2.Start your Interview</span>
                                    <ul className={'custom-font-size ml-3'}>
                                        <li>Join the interview at your convenient time.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-7' >
                                <Image
                                    src={image.Tab2Image}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                        </Row>
                    </div>

                </Container >
                <Container>
                    <Row className="justify-content-end">
                        <Col md="7">

                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row><span className={'display-3 text-black font-weight-bolder mb-3'}>3.Access your Reports :</span></Row>
                </Container>
            </section>

            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">

                            <Col lg="6">
                                <div className={''}>
                                    <div className={'display-3 text-black font-weight-bolder'}>Skill Matrix</div>
                                    <ul className={'custom-font-size ml-3'}>
                                        <li>Get curate analytics of each questions you answered.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col style={{ borderRadius: '100px', backgroundColor: 'white' }} lg="6" className='pl-sm-7' >
                                <img
                                    src={image.Tab4Image}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                        </Row>
                    </div>

                </Container >
                <Container>
                    <Row className="justify-content-end">
                        <Col md="7">

                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">

                            <Col lg="6">
                                <div className={''}>
                                    <span className={'display-3 text-black font-weight-bolder ml--'}>Communication</span>
                                    <ul className={'custom-font-size ml-3'}>
                                        <li>Get insights of your communication.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-7' >
                                <Image
                                    src={image.Tab6Image}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                        </Row>
                    </div>

                </Container >
            </section>


            <section className="">
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">

                            <Col lg="6">
                                <div className={''}>
                                    <span className={'display-3 text-black font-weight-bolder ml--'}>Traits</span>
                                    <ul className={'custom-font-size ml-3'}>
                                        <li>Get insights of your softskills frame of approach.</li>
                                    </ul>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-7' >
                                <Image
                                    src={image.Tab6Image}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                        </Row>
                    </div>

                </Container >
            </section>

            <section className="pt-0 pb-9 mt-8 ">
                <Container>
                    <Row className="justify-content-center text-center">
                        <Col md="8">
                            <h3 className="text-primary">
                                Not happy with your Reports?
                            </h3>
                            <span className={'display-3 text-black font-weight-bolder'}>Don't worry<br></br>
                                We get your concern !</span>
                            <p className="custom-text-color pt-2" style={{ fontSize: '17px' }}>
                                Try as many Interview for the given JD,until you are satisfied.
                            </p>

                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export { HowItWorks }