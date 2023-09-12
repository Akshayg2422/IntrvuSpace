import { Button, Container, Row, Col, UncontrolledTooltip } from 'reactstrap'
import { color } from '@Themes'
import { icons, image } from '@Assets'
import { ROUTES } from '@Routes'
import { useNavigation } from '@Hooks'
import './index.css'

function Pricing() {
    const { goTo } = useNavigation()
    const reportsHeading = ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report']
    const advanceReportsHeading = ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced']
    return (
        <>
            <section className="py-sm-7" id="pricing-now-ui">
                <div className=" position-relative"
                    style={{
                        backgroundColor: '#ffffff'
                    }}
                >
                    <div className="container pb-lg-8 pb-7 pt-5 postion-relative z-index-2 position-relative">
                        <div className="row">
                            <div className="col-md-7 mx-auto text-center">
                                <span className="display-4 text-black mb-2 text-md">Pricing</span>
                                <h3 className="text-black">Ready to get which course you want to learn?</h3>
                                <p className="custom-text-color">Based on the license you get, you will have direct access to our team <br /> to learn courses.</p>
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


                                        <p className="mb-3 text-sm custom-text-color">Single Interview!</p>
                                        <h3 className="font-weight-bold mt-3 "
                                            style={{
                                                fontStyle: "none"
                                            }}
                                        >
                                            FREE
                                        </h3>
                                        <Button className='bg-custom custom-btn btn-1 text-white border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            onClick={() => {
                                                goTo(ROUTES['auth-module'].login)
                                            }}
                                            // href={"https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=1"}
                                            // target="_blank"
                                        >
                                            Try Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                    
                                    <div className={'col'}>

                                        {
                                            reportsHeading && reportsHeading.length > 0 && reportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#424242',
                                                                borderRadius: 5
                                                            }}>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm custom-text-color">{each}</span>
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
                                                src={icons.documentMultipleJd} 
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">1 JD</h5>
                                        </div>

                                        <p className="mb-3 text-sm custom-text-color">Multiple Interviews! </p>
                                        <h3 className="font-weight-bold mt-3">
                                            ₹50
                                        </h3>
                                        <Button className='bg-custom custom-btn btn-1 text-white border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=50"}
                                            target="_blank"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                  
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#424242',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm custom-text-color">{each}</span>
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
                                                src={icons.documentMultipleJd}
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">Upto 10 JD</h5>
                                        </div>
                                        <p className="mb-3 text-sm custom-text-color">Multiple Interviews!</p>
                                        <h3 className="font-weight-bold mt-3 ">
                                            ₹300
                                        </h3>
                                        <Button className='bg-custom custom-btn btn-1 text-white border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px'
                                                }
                                            }
                                            href={"https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=300"}
                                            target="_blank"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal light my-0" />
                                   
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#424242',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm custom-text-color">{each}</span>
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
                                                src={icons.documentUnlimitedJd} 
                                                alt='...'
                                                height={60}
                                                width={60}
                                            />
                                            <h5 className="mb-1 h2 text-uppercase">Unlimited JD'S</h5>
                                        </div>
                                        <p className="mb-3 text-sm custom-text-color">Unlimited Interviews!</p>
                                        <h3 className="font-weight-bold mt-3">
                                            ₹400
                                        </h3>
                                        <Button className='bg-custom custom-btn btn-1 text-white border-0 col  mt-3 '
                                            style={
                                                {
                                                    borderRadius: '20px',
                                                }
                                            }
                                            href={"https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=400"}
                                            target="_blank"
                                        >
                                            Buy Now
                                        </Button>
                                    </div>
                                    <hr className="horizontal dark my-0" />
                                   
                                    <div className={'col'}>

                                        {
                                            advanceReportsHeading && advanceReportsHeading.length > 0 && advanceReportsHeading.map(each => {
                                                return (
                                                    <div className="card-body py-2">
                                                        <div className="row align-items-center">
                                                            <div style={{
                                                                width: 10,
                                                                height: 10,
                                                                backgroundColor: '#424242',
                                                                borderRadius: 5
                                                            }}>

                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="ps-3 ml-2">
                                                                    <span className="text-sm custom-text-color">{each}</span>
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
           
        </>
    )
}

export { Pricing }