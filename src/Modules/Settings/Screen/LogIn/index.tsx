import React, { useEffect, useState } from "react";
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading, } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, validate, ifObjectExist, getValidateError, USER_TOKEN } from "@Utils";
import { useInput, useNavigation, useLoader } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '@Routes'
import { Card } from "reactstrap";
import { LoginSideContent } from "../../Container";
import { registerAsMember, memberLoginUsingPassword, fetchOTP } from '@Redux'



function Login() {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const password = useInput('')
    const mobileNumber = useInput('');
    const email = useInput('')
    const loginLoader = useLoader(false);
    const [showPassword, setShowPassword] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)
    const [loginWithOtp, setLoginWithOtp] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
        reset()
    }, [loginWithOtp])


    const reset = () => {
        password.set('')
        mobileNumber.set('')
        email.set('')
    }

    const onSubmit = () => {
        if (loginWithOtp === false) {
            if (email.value.length === 0) {
                showToast('Email ID  Cannot be empty', 'error')
            }
            else if (password.value.length === 0) {
                showToast('Password  Cannot be empty', 'error')
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

        if (loginWithOtp) {
            const params = {
                mobileNumber: mobileNumber.value
            }
            dispatch(fetchOTP({
                params,
                onSuccess: (response: any) => () => {
                    if (response.success) {
                        localStorage.setItem(USER_TOKEN, response.token);
                        goTo(ROUTES['auth-module'].otp)
                    }
                    else if (!response.success) {
                        showToast(response.error_message, 'error')
                    }
                },
                onError: (error) => () => {
                    showToast(error.error_message, 'error')
                },
            }))
        }
        else {
            const params = {
                ...(email.value && { email: email.value }),
                password: password.value
            }
            dispatch(memberLoginUsingPassword({
                params,
                onSuccess: (response: any) => () => {
                    // if (response.success) {
                    //     localStorage.setItem(USER_TOKEN, response.token);
                    //     goTo(ROUTES['auth-module'].splash)
                    // }
                    // else {
                    //     showToast(response.error_message, 'error')
                    // }
                    if (response.token) {
                        localStorage.setItem(USER_TOKEN, response.token);
                        goTo(ROUTES['auth-module'].splash)
                    }
                    else if (!response.success) {
                        showToast(response.error_message, 'error')
                    }
                },
                onError: (error) => () => {
                    showToast(error.error_message, 'error')
                },
            }))
        }


    }

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <LoginSideContent />
                    {!loginWithOtp ?
                        <div className="col d-flex justify-content-center align-items-center ">
                            <div className="col-8">
                                <div className="mb--2 ml-4">
                                    <h2 className="text-black mb--3">Login in to your Account</h2><br></br>
                                    <h2 className="font-weight-normal display-4 text-black mt-0"
                                        style={{
                                            fontSize: '3vh'
                                        }}
                                    >Don't have an account ? <a href="/register" className="text-primary pointer"
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
                                    <div>
                                        <label className="h2 text-black">Email Address</label>
                                        <Input
                                            value={email.value}
                                            placeholder='Enter your email address'
                                            onChange={email.onChange}
                                        />
                                    </div>
                                    <div>
                                        <label className="h2 text-black">Password</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                value={password.value}
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder='Enter your password'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(true)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(false)
                                                }}
                                                onChange={password.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput ? '#68d75c' : ''
                                                }}
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                            >
                                                {showPassword ? <i className="bi bi-eye-fill mt--1"
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
                                    <div className="row justify-content-between align-items-center ml-0 mr-0 pt-3 pb-2">
                                        <div className="custom-control custom-checkbox custom-checkbox-success ">
                                            <input
                                                className="custom-control-input"
                                                defaultChecked
                                                id="chk-todo-task-1"
                                                type="checkbox"
                                            />
                                            <label
                                                className="custom-control-label"
                                                htmlFor="chk-todo-task-1"
                                            />
                                            <label className="text-black text-sm">Remember me</label>
                                        </div>
                                        <div className="text-right">
                                            <a className="text-primary text-sm" href="/">Forgot Password ?</a>
                                        </div>
                                    </div>
                                    <div className="py-3 ">
                                        <Button
                                            className={'text-white font-weight-normal text-lg py-2 bg-primary'}
                                            // loading={loginLoader.loader}
                                            block
                                            size="lg"
                                            text={'Login'}
                                            onClick={() => { onSubmit() }}
                                        />

                                        <div className="text-center pt-2 ">
                                            <h4 className="text-primary pointer"
                                                onClick={() => {
                                                    // goTo(ROUTES['auth-module'].loginWithOtp)
                                                    setLoginWithOtp(true)
                                                }}
                                            >
                                                Use OTP to Login
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
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
                                    {/* <div>
                                        <label className="h2 text-black">Password</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                value={password.value}
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder='Enter your password'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(true)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(false)
                                                }}
                                                onChange={password.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput ? '#68d75c' : ''
                                                }}
                                                onClick={() => {
                                                    setShowPassword(!showPassword)
                                                }}
                                            >
                                                {showPassword ? <i className="bi bi-eye-fill mt--1"
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
                                    </div> */}
                                    <h3 className=' text-black pt-3 font-weight-normal '>
                                        You will receive an OTP on this number
                                    </h3>

                                    <div className="pb-3 pt-2 ">
                                        <Button
                                            className={'text-white font-weight-normal text-lg py-2 bg-primary'}
                                            // loading={loginLoader.loader}
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

                                        <Button
                                            className={'text-black bg-white text-lg py-2 font-weight-normal  border-0 shadow-none'}
                                            // loading={loginLoader.loader}
                                            block
                                            size="lg"
                                            text={'Use Email to Login'}
                                            onClick={() => {
                                                setLoginWithOtp(false)
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    );
}

export { Login };