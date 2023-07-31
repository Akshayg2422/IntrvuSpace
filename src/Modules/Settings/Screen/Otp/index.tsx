import { Divider, Button, showToast } from '@Components'
import React, { useEffect } from 'react'
import { Input } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { OTP_RESEND_DEFAULT_TIME, USER_TOKEN } from '@Utils';
import { useInput, useLoader, useNavigation, useTimer } from '@Hooks';
import { ROUTES } from '@Routes';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMemberUsingLoginOtp, memberLoginUsingPasswordSuccess, settingRegisterData } from '@Redux';

function Otp() {
    const { seconds, setSeconds } = useTimer(OTP_RESEND_DEFAULT_TIME);
    const Otp = useInput('')
    const { goTo, goBack } = useNavigation()
    const { registerData } = useSelector((state: any) => state.DashboardReducer);
    const dispatch = useDispatch()
    const loginLoader = useLoader(false);

    console.log("registerData", registerData)
    useEffect(() => {
        setSeconds(OTP_RESEND_DEFAULT_TIME);
    }, [])


    const loginOtp = () => {
        loginLoader.show()
        const params = {
            ...(registerData?.mobile_number && { mobile_number: registerData?.mobile_number }),
            ...(registerData?.email && { email: registerData?.email }),
            otp: Otp.value
        }

        dispatch(fetchMemberUsingLoginOtp({
            params,
            onSuccess: (response: any) => () => {
                loginLoader.hide()
                if (response?.success) {
                    dispatch(memberLoginUsingPasswordSuccess(response))
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

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <LoginSideContent />
                    <div className="col-sm-6 row align-items-center mx-auto pl-lg-8 pl-sm-0 pl-5 pt-6 ">
                        <div className="row ">
                            <div className="mb--2">
                                <h1 className="text-black mb--1">Login in to your Account</h1><br></br>
                                <h2 className=" font-weight-bolder text-black "
                                    style={{
                                        fontSize: '3vh'
                                    }}
                                >Mobile Number </h2>
                                <h4 className='text-black font-weight-normal py-2'>{"+91 - " + registerData?.mobile_number || registerData?.email} <i className="bi bi-pencil text-primary ml-3 pointer" onClick={() => { goBack() }}></i></h4>
                            </div>
                            <div className=" col-sm-9  pr-3 ml-lg--3 px-0 ml-sm-0 ml--2 pt-1"
                                style={{
                                    // zoom:'90%'
                                    scale: '0.9'
                                }}
                            >
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
                                    An OTP has been sent to {registerData?.mobile_number || registerData?.email}. You may not receive the OTP if the email/number is not registered with Mockeasy.
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
                </div>
            </div >
        </>
    )
}

export { Otp }