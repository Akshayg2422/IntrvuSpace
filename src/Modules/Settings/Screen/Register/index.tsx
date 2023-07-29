/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Button } from '@Components'
import React from 'react'
import { Input } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'

function Register() {
    const { goTo } = useNavigation()
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <LoginSideContent />
                    <div className="col-sm-6 row align-items-center mx-auto pl-lg-8 pl-sm-0 pl-5 pt-6 ">
                        <div className="row ">
                            <div className="mb--2">
                                <h2 className="text-black mb--3">Login in to your Account</h2><br></br>
                                <h2 className="font-weight-normal display-4 text-black mt-0"
                                    style={{
                                        fontSize: '3vh'
                                    }}
                                >Don't have an account ? <a className="text-primary"
                                    onClick={() => {
                                        goTo(ROUTES['auth-module'].register)
                                    }}
                                    style={{
                                        fontSize: '20px'
                                    }}
                                ><b>Register</b></a></h2>
                            </div>
                            <div className=" col-sm-9  pr-3 ml-lg--3 px-0 ml-sm-0 ml--2 pt-4"
                                style={{
                                    // zoom:'90%'
                                    scale: '0.9'
                                }}
                            >
                                <div>
                                    <label className="h3 font-weight-bolder text-black">Mobile Number</label>
                                    <Input
                                        placeholder='Enter your mobile number'
                                    />
                                </div>
                                <h3 className=' text-black pt-4 font-weight-normal '>
                                    You will receive an OTP on this number
                                </h3>

                                <div className="py-3 ">
                                    <Button
                                        className={'text-white font-weight-bolder bg-primary'}
                                        // loading={loginLoader.loader}
                                        block
                                        size="lg"
                                        text={'Get OTP'}
                                        onClick={() => { }}
                                    />
                                    <div className='row justify-content-center align-items-center py-0 mt--'>
                                        <hr
                                            style={{
                                                border: '0.1px solid #dadada',
                                                width: '28vh',
                                            }}
                                        ></hr>
                                        <h4 className='  font-weight-normal'
                                            style={{
                                                fontSize: '25px',
                                                color: '#dadada'
                                            }}
                                        >Or</h4>
                                        <hr
                                            style={{
                                                border: '0.1px solid #dadada',
                                                width: '28vh',
                                            }}
                                        ></hr>
                                    </div>

                                    <Button
                                        style={{
                                            backgroundColor: '#f5f5f5'
                                        }}
                                        className={'text-primary  border-0 shadow-none'}
                                        // loading={loginLoader.loader}
                                        block
                                        size="lg"
                                        text={'Use Email to Login'}
                                        onClick={() => { }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export { Register }