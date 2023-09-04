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
            title: 'Single Interview!',
            price: 'FREE',
            amount: '1 JD',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report'],
            onClick: () => { goTo(ROUTES['auth-module'].login) }
        },
        {
            title: 'Multiple Interviews!',
            price: '₹50',
            amount: '50 JD',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=50'
        },
        {
            title: 'Multiple Interviews!',
            price: '₹300',
            amount: '300 JD',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=300'
        },
        {
            title: 'Unlimited Interviews!',
            price: '₹400',
            amount: '400 JD',
            reports: ['Basic Report', 'Skill Matrix Report', 'Communication Report', 'Trait Report', 'Skill Matrix Advanced', 'Communication Advanced'],
            link: 'https://mockeazyprimary.leorainfotech.in/authentication/payment/?name=subscription&amount=400'
        },
    ];

    return (
        <section style={{ backgroundColor: '#ffffff' }} className="py-sm-7" id="pricing-now-ui">
            <div className=" position-relative">
                <div className="container pb-lg-8 pb-7 pt-5 postion-relative z-index-2 position-relative">
                    <div className="row">
                        <div className="col-md-7 mx-auto text-center">
                            <span className="text-primary mb-2 h3">Pricing</span>
                            <h3 className="text-black">Ready to get which course you want to learn?</h3>
                            <p className="custom-text-color">
                                Based on the license you get, you will have direct access to our team <br /> to learn courses.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-lg-n8 mt-n6">
                <div className="container">
                    <div className="row">
                        {pricingOptions.map((option, index) => (
                            <div className="col-lg-3 col-sm-6 mb-lg-0 mb-4" key={index}>
                                <div className="card h-100">
                                    <div className="card-header text-sm-start text-center pt-4 pb-3 px-4">
                                        <div>
                                            <img className={'mb-1'} src={icons.lock} alt="..." height={60} width={60} />
                                            <p className="mb-1">{option.amount}</p>
                                        </div>
                                        <p className="text-sm custom-text-color">{option.title}</p>
                                        <h2 className="font-weight-bold mt--2">{option.price}</h2>
                                        {option.price === 'FREE' ? (
                                            <div
                                                className="custom-btn bg-primary text-white border-0 col mt-1"
                                                style={{ borderRadius: '20px' }}
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
                                                <div className="custom-btn bg-primary text-white border-0 col mt-1" style={{ borderRadius: '20px' }}>
                                                    Buy Now
                                                </div>
                                            </a>
                                        )}
                                    </div>
                                    <hr className={`horizontal ${index % 2 === 0 ? 'light' : 'dark'} my-0`} />
                                    <div className={'col'}>
                                        {option.reports.map((each, subIndex) => (
                                            <div className="card-body py-2" key={subIndex}>
                                                <div className="row align-items-center">
                                                    <div
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            backgroundColor: '#424242',
                                                            borderRadius: 5,
                                                        }}
                                                    ></div>
                                                    <div className="d-flex">
                                                        <div className="ps-3 ml-2">
                                                            <span className="text-sm custom-text-color">{each}</span>
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
