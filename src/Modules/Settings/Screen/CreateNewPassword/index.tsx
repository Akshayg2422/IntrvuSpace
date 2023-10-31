

import { ROUTES } from '@Routes'
import React, { useEffect, useState } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, Image, showToast } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '@Redux'
import { icons } from '@Assets'

function CreateNewPassword() {
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const otp = useInput('');
    const newPassword = useInput('')
    const confirmPassword = useInput('')
    const enterPress = useKeyPress('Enter')
    const loginLoader = useLoader(false);
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [toggleNewPassword, setToggleNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [toggleConfirmPassword, setToggleConfirmPassword] = useState(false)
    const { retrieveEmail } = useSelector((state: any) => state.DashboardReducer);

    console.log('retrieveEmail----->', retrieveEmail)
    useEffect(() => {
        if (enterPress) {
            createNewPasswordHandler()
        }
    }, [enterPress])

    function validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return null;
    }

    const createNewPasswordHandler = () => {
        loginLoader.show();
        const otpValue = otp.value;
        const newPasswordValue = newPassword.value;
        const confirmPasswordValue = confirmPassword.value;

        if (!otpValue || otpValue.length !== 4) {
            showToast('Please enter a valid 4-digit OTP', 'error');
            loginLoader.hide();
            return;
        }

        const newPasswordError = validatePassword(newPasswordValue);
        if (newPasswordError) {
            showToast(newPasswordError, 'error');
            loginLoader.hide();
            return;
        }

        if (newPasswordValue !== confirmPasswordValue) {
            showToast('Passwords do not match', 'error');
            loginLoader.hide();
            return;
        }

        const { email } = retrieveEmail

        const params = {
            email: email,
            otp: otpValue,
            password: newPasswordValue,
        };

        dispatch(resetPassword({
            params,
            onSuccess: (response) => {
                showToast(response.message, "success");
                goTo(ROUTES['auth-module'].splash, true);
                loginLoader.hide();
            },
            onError: (error) => {
                showToast(error.error_message, 'error');
                loginLoader.hide();
            },
        })
        );
    }

    return (
        <div className='h-100vh d-flex justify-content-center align-items-center m-0 p-0'>
            {/* <div className='col-xl-6 col-md-6'>
                <LoginSideContent />
            </div> */}
            <div className="col-md-6 d-flex justify-content-center align-items-center bg-white m-3">
           
                <div className="col-xl-8 position-relative p-0">
               
                <div className='position-absolute pointer'
                    style={{
                        top: 0,
                        left:0
                    }}
                    onClick={() => {
                        goBack()
                    }}
                >
                    <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder"></i>
                </div>
                    <div className="mb--2">
                            <div className="align-items-center text-center">
                                <Image src={icons.logoText} height={22} />
                            </div>
                            <div className="p-0 mt-4">
                                <span
                                    className="text-secondary"
                                    style={{ fontSize: 22, fontWeight: 800, paddingLeft: 2 }}
                                >
                                  Enter the verification code sent you on your email
                                </span>
                            </div>
                        </div>
                    <div className='mt-4' style={{ scale: '' }}>
                        <div className={'mb-4'}>
                            {/* <label className="h3 font-weight-bolder text-black">Enter the OTP</label> */}
                            <Input
                                className='rounded-sm'
                                type={'number'}
                                value={otp.value}
                                placeholder='Enter the OTP'
                                onChange={otp.onChange}
                                maxLength={4}
                            />
                        </div>
                        <div>
                            {/* <label className="h2 text-black">New Password</label> */}
                            <div className="input-group mb-4">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRight: 0,
                                        borderRadius: '4px 0 0 4px',
                                        borderColor: toggleNewPassword ? "#6747c7" : "#dee0e3",
                                    }}
                                    value={newPassword.value}
                                    type={showNewPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onFocus={() => {
                                        setToggleNewPassword(true)
                                    }}
                                    onBlur={() => {
                                        setToggleNewPassword(false)
                                    }}
                                    onChange={newPassword.onChange}
                                />
                                <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                    style={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderLeft: 0,
                                        borderRadius: '0 4px 4px 0',
                                        borderColor: toggleNewPassword ? "#6747c7" : "#dee0e3",
                                    }}
                                    onClick={() => {
                                        setShowNewPassword(!showNewPassword);
                                    }}
                                >
                                    {showNewPassword ? (
                                        <i
                                            className="bi bi-eye-fill mt--1 text-default"
                                            style={{
                                                fontSize: "20px",
                                                marginBottom: "-5px",
                                            }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="bi bi-eye-slash-fill mt--1 pb-0 text-default"
                                            style={{
                                                fontSize: "20px",
                                                marginBottom: "-5px",
                                            }}
                                        ></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div>
                            {/* <label className="h2 text-black">Confirm Password</label> */}
                            <div className="input-group mb-4">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRight: 0,
                                        borderRadius: '4px 0 0 4px',
                                        borderColor: toggleConfirmPassword ? "#6747c7" : "#dee0e3",
                                    }}
                                    value={confirmPassword.value}
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onFocus={() => {
                                        setToggleConfirmPassword(true)
                                    }}
                                    onBlur={() => {
                                        setToggleConfirmPassword(false)
                                    }}
                                    onChange={confirmPassword.onChange}
                                />
                                <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                    style={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderLeft: 0,
                                        borderRadius: '0 4px 4px 0',
                                        borderColor: toggleConfirmPassword ? "#6747c7" : "#dee0e3",
                                    }}
                                    onClick={() => {
                                        setShowConfirmPassword(!showConfirmPassword);
                                    }}
                                >
                                    {showConfirmPassword ? (
                                        <i
                                            className="bi bi-eye-fill mt--1 text-default"
                                            style={{
                                                fontSize: "20px",
                                                marginBottom: "-5px",
                                            }}
                                        ></i>
                                    ) : (
                                        <i
                                            className="bi bi-eye-slash-fill mt--1 pb-0 text-default"
                                            style={{
                                                fontSize: "20px",
                                                marginBottom: "-5px",
                                            }}
                                        ></i>
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="pb-3 pt-2 ">
                            <Button
                                className={'bg-primary rounded-sm'}
                                loading={loginLoader.loader}
                                block
                                size={'lg'}
                                text={'Submit'}
                                onClick={createNewPasswordHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { CreateNewPassword }