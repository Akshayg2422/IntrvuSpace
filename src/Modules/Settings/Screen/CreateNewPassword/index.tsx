

import { ROUTES } from '@Routes'
import React, { useEffect, useState } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, showToast } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '@Redux'

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
        <div className='row m-0 p-0'>
            <div className='col-xl-6 col-md-6'>
                <LoginSideContent />
            </div>
            <div className="col-xl-6 col-md-6 d-flex justify-content-center align-items-center bg-white">
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
                        <h1 className="text-black mb--3">Enter the verification code sent you on your email</h1><br></br>
                    </div>
                    <div style={{ scale: '0.9' }}>
                        <div className={'mb-3'}>
                            <label className="h3 font-weight-bolder text-black">Enter the OTP</label>
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
                            <label className="h2 text-black">New Password</label>
                            <div className="input-group mb-3">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRight: 0,
                                        borderRadius: '4px 0 0 4px',
                                    }}
                                    value={newPassword.value}
                                    type={showNewPassword ? 'text' : 'password'}
                                    className="form-control rounded-sm"
                                    placeholder='Enter your password'
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
                                <span className="input-group-text" id="basic-addon2"
                                    style={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderLeft: 0,
                                        borderRadius: '0 4px 4px 0',
                                        borderColor: toggleNewPassword ? '#673de6' : 'black',
                                    }}
                                    onClick={() => {
                                        setShowNewPassword(!showNewPassword)
                                    }}
                                >
                                    {showNewPassword ? <i className="bi bi-eye-fill mt--1"
                                        style={{
                                            fontSize: '20px',
                                            marginBottom: '-5px'
                                        }}
                                    ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                        style={{
                                            fontSize: '20px',
                                            marginBottom: '-5px'
                                        }}
                                    ></i>}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="h2 text-black">Confirm Password</label>
                            <div className="input-group mb-3">
                                <input
                                    style={{
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        borderRight: 0,
                                        borderRadius: 0
                                    }}
                                    value={confirmPassword.value}
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    className="form-control rounded-sm"
                                    placeholder='Enter your password'
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
                                <span className="input-group-text" id="basic-addon2"
                                    style={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        borderLeft: 0,
                                        borderRadius: 0,
                                        borderColor: toggleConfirmPassword ? '#000000' : 'black',
                                    }}
                                    onClick={() => {
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }}
                                >
                                    {showConfirmPassword ? <i className="bi bi-eye-fill mt--1"
                                        style={{
                                            fontSize: '20px',
                                            marginBottom: '-5px'
                                        }}
                                    ></i> : <i className="bi bi-eye-slash-fill mt--1 pb-0"
                                        style={{
                                            fontSize: '20px',
                                            marginBottom: '-5px'
                                        }}
                                    ></i>}
                                </span>
                            </div>
                        </div>

                        <div className="pb-3 pt-2 ">
                            <Button
                                className={'text-white font-weight-normal text-lg py-2 bg-primary'}
                                loading={loginLoader.loader}
                                block
                                size="lg"
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