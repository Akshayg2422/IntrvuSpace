import { Divider, Button, showToast } from '@Components'
import React, { useEffect } from 'react'
import { Input } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { OTP_RESEND_DEFAULT_TIME, USER_TOKEN } from '@Utils';
import { useInput, useKeyPress, useLoader, useNavigation, useTimer } from '@Hooks';
import { ROUTES } from '@Routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberUsingLoginOtp, settingRegisterData, userLoginDetails } from '@Redux';

function Otp() {
    const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
    const Otp = useInput('')
    const { goTo, goBack } = useNavigation()
    const enterPress = useKeyPress('Enter')
    const { registerData } = useSelector((state: any) => state.DashboardReducer);
    const dispatch = useDispatch()
    const loginLoader = useLoader(false);
    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    useEffect(() => {
        setSeconds(OTP_RESEND_DEFAULT_TIME);
    }, [])

    useEffect(() => {
        if (enterPress) {
            loginOtp()
        }
    }, [enterPress])

    const loginOtp = () => {
        loginLoader.show()

        if (Otp.value.length > 0) {
            const params = {
                ...(registerData?.mobile_number && { mobile_number: registerData?.mobile_number }),
                ...(registerData?.email && { email: registerData?.email }),
                otp: Otp.value
            }

            dispatch(fetchMemberUsingLoginOtp({
                params,
                onSuccess: (response: any) => () => {
                    loginLoader.hide()

                    const { details } = response;

                    if (response?.success) {
                        dispatch(
                            userLoginDetails({
                                ...loginDetails,
                                isLoggedIn: true,
                                ...details
                            }),
                        );
                        localStorage.setItem(USER_TOKEN, response.details.token);
                        goTo(ROUTES['auth-module'].splash)
                        dispatch(settingRegisterData(undefined))
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
        else {
            showToast('Otp Number Cannot be empty', 'error')
            loginLoader.hide()
        }



    }

    return (
        <>
            <div className='row m-0 p-0'>
                <div className='col-xl-6 col-md-6'>
                    <LoginSideContent />
                </div>
                <div className="col-xl-6 col-md-6  my-sm-0 my-5 d-flex justify-content-center align-items-center">
                    <div className="col-xl-8 ">
                        <div className="mb--2">
                            <h1 className="text-black mb--1">Login in to your Account</h1><br></br>
                            <h1 className=" font-weight-bolder text-black "
                            >{registerData?.mobile_number ? 'Mobile Number' : 'Email ID'} </h1>
                            <h4 className='text-black font-weight-normal py-2'>{registerData?.mobile_number ? "+91 - " + registerData?.mobile_number : registerData?.email} <i className="bi bi-pencil text-primary ml-3 pointer" onClick={() => { goTo(ROUTES['auth-module'].loginWithOtp) }}></i></h4>
                            <div>
                                <label className="h3 font-weight-bolder text-black">OTP</label>
                                <Input
                                    value={Otp.value}
                                    placeholder='Enter your OTP number'
                                    onChange={Otp.onChange}
                                />
                            </div>
                            <h3 className=' text-black pt-4 pb-2 font-weight-normal text-sm'>
                                {seconds <= 0 ?
                                    <div className='d-flex '>
                                        Didn't receive an OTP ? <h3 className='text-primary ml-2 pt-0 mt--1'>Resend OTP</h3>
                                    </div> : `You OTP should arrive in ${(seconds < 10 ? "0" + seconds : seconds)} Seconds`}
                            </h3>
                            <h4 className='text-black  font-weight-normal text-sm'>
                                An OTP has been sent to {registerData?.mobile_number || registerData?.email}. You may not receive the OTP if the email/number is not registered with intrvu SPACE.
                            </h4>

                            <div className="py-3 ">
                                <Button
                                    className={'text-white font-weight-normal bg-primary text-lg'}
                                    loading={loginLoader.loader}
                                    block
                                    size="md"
                                    text={'Login'}
                                    onClick={() => { loginOtp() }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export { Otp }