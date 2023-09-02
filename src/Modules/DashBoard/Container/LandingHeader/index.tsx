import { Col, Container, Row } from 'reactstrap';
import './style.scss';
import { videos, image } from '@Assets';
import { Image, Button } from "@Components";

function LandingHeader() {
    return (
        <>
            <div className="header pt-5 pb-5" style={{ backgroundColor: '#ffffff' }}>
                {/* <video
            autoPlay
            loop
            muted
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -1,
                borderRadius: 6,
                marginBottom: -10
                // opacity: 0.3, // Set the desired opacity value
                // marginBottom: -10
            }}
        >
            <source src={videos.backgroundLanding} type="video/mp4" />
        </video> */}
                <Container>
                    <div className="header-body">
                        <Row className="align-items-center h-100vh">
                            <Col lg="6">
                                <div className="pr-5">
                                    <h1 className="display-1 custom-black font-weight-bolder mb-0" style={{ fontSize: '60px' }}>
                                        Welcome to Mock Eazy

                                    </h1>
                                    <h2 className="display-4 custom-black font-weight-bold pt-4">

                                    </h2>
                                    <p className="custom-text-color h5 ">
                                        Embrace the Next Era of Interviews - Choose MockEazy (or)"Step into the Future of Interviews with MockEazy" (or) "Your Gateway to Futuristic Interviews - MockEazy" (or) Pioneering the Future of Interviewing - MockEazy"
                                    </p>
                                    <div className="mt-5">
                                        <Button  className={'px-6'}
                                            style={{ borderRadius: '25px'}}
                                            size={'lg'}
                                            text={'Register Now'}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-5' >
                                <Image
                                    src={image.MockEazy2}
                                    width={"100%"}
                                    height={"100%"}
                                />
                            </Col>
                            {/* <Col lg='12'>
                                   
                                   
                                </Col> */}
                            {/* <div className="ocean">
                                <div className="wave"></div>
                                <div className="wave"></div>
                                <div className="wave"></div>
                            </div> */}
                        </Row>
                    </div>

                </Container >
            </div >
        </>
    )
}

export { LandingHeader };
