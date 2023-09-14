import { icons, image } from '@Assets'
import { Image } from '@Components'
import { Container, Row, Col } from 'reactstrap'

function HowItWorks() {


    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <section className="pt-5 pb-0">
                <div className="container">
                <div className={'col-lg-8 col-md-6'}>
                            <div className={'display-3 text-black font-weight-bolder'}>How it Works?</div>
                            <p className={'custom-text-color mt-2'} >
                              Are you determined to shine in your interviews and secure that dream job?<br></br> Mastering the art of interviews through realistic mock practice.
                            </p>
                        </div>
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="">
                                <div className="position-relative mb-3 mt-2">
                                    <a className="d-block">
                                        <img
                                            src={image.Tab1Image}
                                            width={"100%"}
                                            height={"100%"}
                                            className="img-fluid shadow-none border-radius-lg"
                                            alt="img-blur-shadow"
                                        />
                                    </a>
                                </div>
                                <div className="card-body px-1 pt-3">
                                    {/* <p className="text-gradient text-dark mb-2 text-sm">Maui, Hawaii</p> */}
                                    <a href="javascript:;">
                                        <div className='row align-items-center pb-2'>
                                            <img className={'mt--1 ml-3'} src={icons.uploadJd} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                            <h3 className="text-black ml-3">Upload Your JD</h3>
                                        </div>
                                    </a>
                                    <p>
                                        Siri&#39;s latest trick is offering a hands-free TV viewing experience, that will allow consumers to turn on or off their television, change inputs, fast forward.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="">
                                <div className="position-relative mb-3 mt-2">
                                    <a className="d-block">
                                        <img
                                            src={image.Tab2Image}
                                            width={"100%"}
                                            height={"100%"}
                                            className="img-fluid shadow-none border-radius-lg"
                                        />
                                    </a>
                                </div>
                                <div className="card-body px-1 pt-3">
                                    {/* <p className="text-gradient text-dark mb-2 text-sm">Fuerteventura, Canary Islands</p> */}
                                    <a href="javascript:;">
                                        <div className='row align-items-center pb-2'>
                                            <img className={'mt--1 ml-3'} src={icons.startInterview} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                            <h3 className="text-black ml-3">Start Your Interview</h3>
                                        </div>
                                    </a>
                                    <p>
                                    When you're ready to begin, click the "Start Now" button. You can also access your scheduled interview from the home page, In the top right corner of the card, you'll find a "Start Interview" button to initiate the interview.
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="">
                                <div className="position-relative mb-3 mt-2">
                                    <a className="d-block">
                                        <img
                                            src={image.Tab5Image}
                                            width={"100%"}
                                            height={"100%"}
                                            className="img-fluid shadow-none border-radius-lg"
                                        />
                                    </a>
                                </div>
                                <div className="card-body px-1 pt-3">
                                    {/* <p className="text-gradient text-dark mb-2 text-sm">Tayrona National Park, Colombia</p> */}
                                    <a href="javascript:;">
                                        <div className='row align-items-center pb-2'>
                                            <img className={'mt--1 ml-3'} src={icons.reports} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                            <h3 className="text-black ml-3">Access Your Report</h3>
                                        </div>
                                    </a>
                                    <p>
                                    Once your interview is complete, a report will be generated. On the home screen, you can click "View Report" to access both basic and detailed reports. You can also print these reports if needed.
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="pt-0 pb-3 ">

                <Container>
                    <div className={'display-3 text-black font-weight-bolder'}>How it Works?</div>
                    <p className={'custom-text-color mt-2'} >
                        Are you a job seeker on the hunt for the perfect opportunity? Are you determined to shine in your interviews and secure that dream job? Look no further! Easy Interview is exclusively designed to support you in mastering the art of interviews through realistic mock practice.
                    </p>
                    <div className="d-flex justify-content-between">
                        <div className=" col-sm-4 d-flex align-items-center justify-content-center ml--2" style={{ borderRadius: '20px', backgroundColor: '#e9eff3', margin: '10px' }}>
                            <img
                                src={image.FormJd}
                                width={"100%"}
                                height={"100%"}
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                        <div className="col-sm-4 d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', backgroundColor: '#e9eff3', marginRight: '10px' }}>
                            <img
                                src={image.InterviewReady}
                                width={"100%"}
                                height={"100%"}
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                        <div className="col-sm-4 d-flex align-items-center justify-content-center" style={{ borderRadius: '20px', backgroundColor: '#e9eff3' }}>
                            <img
                                src={image.trait}
                                width={"100%"}
                                height={"100%"}
                                style={{ borderRadius: '12px' }}
                            />
                        </div>
                    </div>

                    <Row className=" mt-1 d-flex justify-content-between">
                        <Col md="4">
                            <div className='row align-items-center mt-4'>
                                <img className={'mt--2 ml-3'} src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                <h1 className={'text-black h4 font-weight-bolder col'}>Upload your JD</h1>
                            </div>
                            <div>
                                <span className={'custom-font-size mt-3'}>
                                    Paste the JD copied from the job portal.Paste the JD copied from the job portal
                                </span>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className='row align-items-center mt-4'>
                                <img className={'mt--2 ml-3'} src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                <h1 className={'text-black h4 font-weight-bolder col'}>Start your Interview</h1>
                            </div>
                            <div>
                                <span className={'custom-font-size mt-3'}>
                                    Join the interview at your convenient time..Paste the JD copied from the job portal.
                                </span>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className='row align-items-center mt-4'>
                                <img className={'mt--2 ml-3'} src={icons.lock} alt="Authentication icon" height={45} width={45} style={{ borderRadius: '10px' }} />
                                <h1 className={'text-black h4 font-weight-bolder col'}>Access your Reports</h1>
                            </div>
                            <div>
                                <span className={'custom-font-size mt-3'}>
                                    Join the interview at your convenient time.Specify the Sector and Role.
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}
        </div>
    )
}

export { HowItWorks }