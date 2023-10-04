import React from 'react';
import { Button } from 'reactstrap'; // Import Button from Reactstrap
import { icons } from '@Assets'; // Import icons from '@Assets'
import { ROUTES } from '@Routes';
import { useNavigation } from '@Hooks';
import './index.css';

function Pricing() {
    const { goTo } = useNavigation();
    const pricingOptions = [
        {
            title: '1 JD - Single Interview!',
            price: 'FREE',
            variants: 'Starter',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report'],
            onClick: () => { goTo(ROUTES['auth-module'].login) }
        },
        {
            title: '50 JD - Multiple Interviews!',
            price: '₹50',
            variants: 'Pro',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=50'
        },
        {
            title: '300 JD - Multiple Interviews!',
            price: '₹300',
            variants: 'Premium',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=300'
        },
        {
            title: '400 JD - Unlimited Interviews!',
            price: '₹400',
            variants: 'Enterprise',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=400'
        },
    ];

    return (
        <section style={{ backgroundColor: '#ffffff' }} className="py-sm-4" id="pricing-now-ui">
        
            <div className=" position-relative">
                <div className="container pb-lg-8 pb-7 pt-5 postion-relative z-index-2 position-relative">
                    <div className="row col-md-7 text-center">
                        <div className='row align-items-center pb-1'>
                            <img className={'mt--1 ml-3'} src={icons.horizontalLine} alt="Authentication icon" height={45} width={80} style={{ borderRadius: '10px' }} />
                            <h3 className="text-primary ml-3">Pricing</h3>
                        </div>
                    </div>
                    <div className={'h1 text-black font-weight-bolder mb-4'}>Choose the plan that's right for you</div>
                </div>
            </div>
            <div className="mt-lg-n8 mt-n6">
                <div className="container">
                    <div className="row">
                        {pricingOptions.map((option, index) => (
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4" key={index}>
                                <div className="card shadow-none h-100 index-card">
                                    <div className=" text-sm-start pt-4 pb-3 px-4">
                                        <div>
                                            <p className="mb-2 display-4 d-flex align-items-start font-weight-bolder">{option.variants}</p>
                                            <p className="text-sm font-weight-bold mt--2">{option.title}</p>
                                            <div className="font-weight-bold display-4">{option.price}</div>
                                        </div>

                                        {option.price === 'FREE' ? (
                                            <div
                                                className="custom-btn text-center border-0 col mt-3"
                                                onClick={option.onClick}
                                            >
                                                Try Now
                                            </div>
                                        ) : (
                                            <a
                                                href={option.link}
                                                target="_blank" // This attribute opens the link in a new tab
                                                rel="noopener noreferrer" // Added for security best practices
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    display: 'block',
                                                    width: '100%',
                                                }}
                                            >
                                                <div className="custom-btn text-center border-0 col mt-3">
                                                    Buy Now
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                    <hr className={`horizontal ${index % 2 === 0 ? 'light' : 'primary'} my-0`} />
                                    <div className={'col'}>
                                        {option.reports.map((each, subIndex) => (
                                            <div className="card-body py-2" key={subIndex}>
                                                <div className="row align-items-center">
                                                    <div className={'color-change'}
                                                        // style={{
                                                        //     width: 10,
                                                        //     height: 10,
                                                        //     backgroundColor: '#42cd33',
                                                        //     borderRadius: 60,
                                                        // }}
                                                    ></div>
                                                    <div className="d-flex">
                                                        <div className="ps-3 ml-2">
                                                            <span className="text-sm ">{each}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
}

export { Pricing };
