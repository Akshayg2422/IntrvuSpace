import { ROUTES } from '@Routes'
import React, { useEffect, useState } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../LoginSideContent'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, showToast } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOTP, settingRegisterData } from '@Redux'

function LoginWithOtp() {
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const mobileNumber = useInput('');
    const email = useInput('')
    const enterPress = useKeyPress('Enter')
    const loginLoader = useLoader(false);
    const [toggleInput, setToggleInput] = useState(false)
    const [loginWithOtp, setLoginWithOtp] = useState(false)
    const { registerData } = useSelector((state: any) => state.DashboardReducer);

    useEffect(() => {
        if (enterPress) {
            onSubmit()
        }
    }, [enterPress])

    useEffect(() => {
        if (registerData) {
            if (registerData?.mobile_number) {
                setLoginWithOtp(false)
                mobileNumber.set(registerData?.mobile_number)
            }
            else {
                setLoginWithOtp(true)
                email.set(registerData?.email)
            }
        }
    }, [])


    const onSubmit = () => {

        if (!loginWithOtp === false) {
            if (email.value.length === 0) {
                showToast('Email ID  Cannot be empty', 'error')
            }
            else {
                memberLoginHandler()
            }
        }
        else {
            if (mobileNumber.value.length === 0) {
                showToast('Mobile Number  Cannot be empty', 'error')
            }
            else {
                memberLoginHandler()
            }
        }
    }

    const memberLoginHandler = () => {
        loginLoader.show()
        const params = {
            ...(!loginWithOtp ? { mobile_number: mobileNumber.value } : { email: email.value }),
        }
        dispatch(fetchOTP({
            params,
            onSuccess: (response: any) => () => {
                loginLoader.hide()
                if (response.success) {
                    dispatch(settingRegisterData(params))
                    showToast(response.message, 'success')
                    goTo(ROUTES['auth-module'].otp, true)
                }
                else {
                    showToast(response.error_message, 'error')
                }
            },
            onError: (error) => () => {
                loginLoader.hide()
                showToast(error.error_message, 'error')
            },
        }))
    }


    return (
        <div className='row m-0 p-0'>
            <div className='col-xl-6 col-md-6'>
                <LoginSideContent />
            </div>
            <div className="col-xl-6 col-md-6 d-flex justify-content-center align-items-center"
            >
                <div className='position-absolute pointer m-3'
                    style={{
                        top: 0,
                        left: 9
                    }}
                    onClick={() => {
                        goBack()
                    }}
                >
                    <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder"></i>
                </div>
                <div className="col-xl-8 my-sm-0 my-6">

                    <div className="mb--2 ml-xl-4 ml-sm-0 ml-3">
                        <h1 className="text-black mb--3">Login in to your Account</h1><br></br>
                        <h2 className="font-weight-normal display-5 text-black mt-0"
                        >Don't have an account ? <a className="text-primary pointer"
                            onClick={() => {
                                goTo(ROUTES['auth-module'].register)
                            }}
                            style={{
                                fontSize: '20px'
                            }}
                        ><b>Register</b></a></h2>
                    </div>
                    <div className=""
                        style={{
                            // zoom:'90%'
                            scale: '0.9'
                        }}
                    >
                        {!loginWithOtp ?
                            <div>
                                <label className="h3 font-weight-bolder text-black">Mobile Number</label>
                                <Input
                                    className='rounded-0'
                                    type={'number'}
                                    value={mobileNumber.value}
                                    placeholder='Enter your mobile number'
                                    onChange={mobileNumber.onChange}
                                    maxLength={10}
                                />
                            </div>
                            :
                            <div>
                                <label className="h3 font-weight-bolder text-black">Email ID</label>
                                <Input
                                    className='rounded-0'
                                    type={'text'}
                                    value={email.value}
                                    placeholder='Enter your Email ID'
                                    onChange={email.onChange}
                                />
                            </div>
                        }
                        <h3 className=' text-black pt-3 font-weight-normal '>
                            You will receive an OTP on this {loginWithOtp ? 'Email' : 'Number'}
                        </h3>

                        <div className="pb-3 pt-2 ">
                            <Button
                                className={'text-white font-weight-normal text-lg py-2 bg-primary'}
                                loading={loginLoader.loader}
                                block
                                size="lg"
                                text={'Get OTP'}
                                onClick={() => { onSubmit() }}
                            />
                            <div className='row justify-content-center align-items-center mx-auto'>
                                <hr
                                    className='col'
                                    style={{
                                        border: '0.1px solid #dadada',
                                        opacity: '0.4'
                                    }}
                                ></hr>
                                <h4 className='mx-2 font-weight-normal'
                                    style={{
                                        fontSize: '25px',
                                        color: '#dadada'
                                    }}
                                >Or</h4>
                                <hr
                                    className='col'
                                    style={{
                                        border: '0.1px solid #dadada',
                                        opacity: '0.4'
                                    }}
                                ></hr>
                            </div>
                            <div className="text-center mt--2 ">
                                <h4 className="text-primary pointer"
                                    onClick={() => {
                                        setLoginWithOtp(!loginWithOtp)
                                    }}
                                >
                                    {!loginWithOtp ? 'Use Email to Get OTP' : 'Use Mobile Number to Get OTP'}
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { LoginWithOtp }