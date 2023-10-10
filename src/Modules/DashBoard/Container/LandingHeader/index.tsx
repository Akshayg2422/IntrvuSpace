import { Col, Container, Row } from 'reactstrap';
import './style.scss';
import { videos, image } from '@Assets';
import { Image, Button } from "@Components";
import { useNavigation } from '@Hooks';
import { ROUTES } from '@Routes';

function LandingHeader() {
    const { goTo } = useNavigation()
    return (
        <>
            <div className="header pt-5" style={{ backgroundColor: '#ffffff' }}>
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
                                <div className="mt--3">
                                    <h1 className="display-1 custom-black font-weight-bolder mb-0" style={{ fontSize: '60px' }}>
                                        Welcome to
                                        <br></br>
                                        <div className={'mt--3'}>intrvu SPACE</div>
                                    </h1>
                                    <p className="custom-text-color" style={{ fontSize: '17px' }}>
                                        Step into the Future of Interviews with intrvu SPACE.
                                    </p>
                                    <div className="mt-4">
                                        <Button
                                            className={'px-6 bg-primary rounded-0 text-white'}
                                            size={'lg'}
                                            text={'Register Now'}
                                            onClick={() => { goTo(ROUTES['auth-module'].register) }}
                                        />
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6" className='pl-sm-5'>
                                <img
                                    src={image.MockEazy2}
                                    width={"100%"}
                                    height={"100%"}
                                    style={{ borderRadius: '20px' }}
                                />
                            </Col>

                        </Row>
                    </div>

                </Container >
            </div >
        </>
    )
}

export { LandingHeader };
