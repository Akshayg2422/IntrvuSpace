import { ROUTES } from '@Routes'
import React, { useState } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../LoginSideContent'
import { useInput, useLoader, useNavigation } from '@Hooks'
import { Button, showToast } from '@Components'
import { useDispatch } from 'react-redux'
import { fetchOTP, settingRegisterData } from '@Redux'

function LoginWithOtp() {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const mobileNumber = useInput('');
    const email = useInput('')
    const loginLoader = useLoader(false);
    const [toggleInput, setToggleInput] = useState(false)
    const [loginWithOtp, setLoginWithOtp] = useState(false)


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
            ...(mobileNumber.value && { mobile_number: mobileNumber.value }),
            ...(email.value && { email: email.value })
        }
        dispatch(fetchOTP({
            params,
            onSuccess: (response: any) => () => {
                loginLoader.hide()
                if (response.success) {
                    dispatch(settingRegisterData(params))
                    goTo(ROUTES['auth-module'].otp)
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
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <LoginSideContent />
                    <div className="col d-flex justify-content-center align-items-center "
                        style={{
                            scale: '0.97'
                        }}
                    >
                        <div className="col-8">
                            <div className="mb--2 ml-4">
                                <h2 className="text-black mb--3">Login in to your Account</h2><br></br>
                                <h2 className="font-weight-normal display-4 text-black mt-0"
                                    style={{
                                        fontSize: '3vh'
                                    }}
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
                                    <div className='row justify-content-center align-items-center'>
                                        <hr
                                            style={{
                                                border: '0.1px solid #dadada',
                                                width: '28vh',
                                                opacity: '0.4'
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
                </div>
            </div >
        </>
    )
}

export { LoginWithOtp }