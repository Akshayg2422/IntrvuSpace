import { Button, Container, Row, Col, UncontrolledTooltip } from 'reactstrap'
import { color } from '@Themes'
import { icons, image } from '@Assets'

function Pricing() {
    const reportsHeading = ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report']
    const advanceReportsHeading = ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced']
    return (
        <>
            <section className="py-sm-7" id="pricing-now-ui">
                <div className=" position-relative"
                    style={{
                        backgroundColor: '#cbefdd'
                    }}
                >
                    <div className="container pb-lg-8 pb-7 pt-5 postion-relative z-index-2 position-relative">
                        <div className="row">
                            <div className="col-md-7 mx-auto text-center">
                                <span className="badge bg-gradient-green text-black mb-2 text-md">Pricing</span>
                                <h3 className="text-black">Ready to get which course you want to learn?</h3>
                                <p className="text-black">Based on the license you get, you will have direct access to our team <br /> to learn courses.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-lg-n8 mt-n6">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4">
                                <div className="card h-100">
                                    <div className="card-header text-sm-start text-center pt-4 pb-3 px-4">
                                        <div className=''>
                                            <img
                                                src={icons.documentJd} 
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">1 JD</h5>
                                        </div>


                                        <p className="mb-3 text-sm">Single Interview!</p>
                                        <h3 className="font-weight-bold mt-3 "
                                            style={{
                                                fontStyle: "none"
                                            }}
                                        >
                                            FREE
                                        </h3>
                                        <Button className='bg-customGradient border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://tmsprimary.quantaedat.com/authentication/payment/?name=React&amount=700"}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                    {/* <div className="card-body text-center">
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="rounded-box text-primary text-sm "></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Components</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3 ">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Hooks</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">React-Redux</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Redux-Saga</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">React Router</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Rest Api</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className={'col'}>

                                        {
                                            reportsHeading && reportsHeading.length > 0 && reportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#42cd33',
                                                                borderRadius: 5
                                                            }}>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm">{each}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {/* <div className="mb-0 display-4 text-center text-black pb-3">FREE</div> */}
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4">
                                <div className="card h-100">
                                    <div className="card-header text-sm-start text-center pt-4 pb-3 px-4">
                                        <div className=''>
                                            <img
                                                src={icons.documentJd} 
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">1 JD</h5>
                                        </div>

                                        <p className="mb-3 text-sm">Multiple Interviews! </p>
                                        <h3 className="font-weight-bold mt-3">
                                            ₹50
                                        </h3>
                                        <Button className='bg-customGradient border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://tmsprimary.quantaedat.com/authentication/payment/?name=Python&amount=500"}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                    {/* <div className="card-body">
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Class</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Variable</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Data Type</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">List</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Dictionaries</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Function</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#42cd33',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm">{each}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4">
                                <div className="card h-100 ">
                                    <div className="card-header text-sm-start text-center pt-4 pb-3 px-4">
                                        <div>
                                            <img
                                                src={icons.documentJd}
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">Upto 10 JD</h5>
                                        </div>
                                        <p className="mb-3 text-sm ">Multiple Interviews!</p>
                                        <h3 className="font-weight-bold mt-3 ">
                                            ₹300
                                        </h3>
                                        <Button className='bg-customGradient border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://tmsprimary.quantaedat.com/authentication/payment/?name=HTML&amount=300"}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal light my-0" />
                                    {/* <div className="card-body">
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary  text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm ">All tags</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm ">HTML Attributes</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm ">Create well-structured web pages with HTML</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary  text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm ">Understand web accessibility and create accessible webpages</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#42cd33',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm">{each}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4">
                                <div className="card h-100">
                                    <div className="card-header text-sm-start text-center pt-4 pb-3 px-4">
                                        <div>
                                            <img
                                                src={icons.documentJd} 
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">Unlimited JD'S</h5>
                                        </div>
                                        <p className="mb-3 text-sm">Unlimited Interviews!</p>
                                        <h3 className="font-weight-bold mt-3">
                                            ₹400
                                        </h3>
                                        <Button className='bg-customGradient border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://tmsprimary.quantaedat.com/authentication/payment/?name=CSS&amount=300"}
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                    {/* <div className="card-body">
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Flex</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Grid</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Margin,Padding</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">CSS Transition</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">CSS Animation</span>
                                            </div>
                                        </div>
                                        <div className="d-flex pb-3">
                                            <div>
                                                <i className="fas fa-check text-primary text-sm"></i>
                                            </div>
                                            <div className="ps-3 ml-2">
                                                <span className="text-sm">Responsive Design</span>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#42cd33',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm">{each}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="">
                <Container>
                    <Row className="row-grid justify-content-center">
                        <Col className="text-center" lg="8">
                            <div className="text-center">
                                <h4 className="display-4 mb-5 mt-2">
                                    Available on these technologies
                                </h4>
                                <Row className="justify-content-center">
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=adpr-index-page"
                                            id="tooltip170669606"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle shadow shadow-lg--hover"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/bootstrap.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip170669606">
                                            Bootstrap 4 - Most popular front-end component library
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-index-page"
                                            id="tooltip374813715"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip374813715">
                                            React - A JavaScript library for building user
                                            interfaces
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="mt-4 mb-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro-nodejs?ref=adpr-index-page"
                                            id="tooltip374813716"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                height={70}
                                                className=""
                                            // src={icons.python}
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip374813716">
                                            Python
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro-laravel?ref=adpr-index-page"
                                            id="tooltip374813717"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/laravel_logo.png"
                                                style={{ backgroundColor: "white" }}
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip374813717">
                                            Laravel - The PHP Framework For Web Artisans
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/vue-argon-dashboard-pro?ref=adpr-index-page"
                                            id="tooltip616015001"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip616015001">
                                            Vue.js - The progressive javascript framework
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro-angular?ref=adpr-index-page"
                                            id="tooltip211254026"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip211254026">
                                            Angular - One framework. Mobile & desktop
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.creative-tim.com/product/argon-dashboard-pro-react?ref=adpr-index-page"
                                            id="tooltip82987604"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/sketch.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip82987604">
                                            Sketch - Digital design toolkit
                                        </UncontrolledTooltip>
                                    </Col>
                                    <Col className="my-2" md="2" xs="3">
                                        <a
                                            // href="https://www.adobe.com/products/photoshop.html?ref=creative-tim"
                                            id="tooltip731835410"
                                            target="_blank"
                                        >
                                            <img
                                                alt="..."
                                                className="img-fluid rounded-circle opacity-3"
                                                src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/ps.jpg"
                                            />
                                        </a>
                                        <UncontrolledTooltip delay={0} target="tooltip731835410">
                                            Adobe Photoshop - Software for digital images
                                            manipulation
                                        </UncontrolledTooltip>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section> */}
        </>
    )
}

export { Pricing }