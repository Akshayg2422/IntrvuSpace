import React, { useEffect, useState } from "react";
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader, Image, InputHeading, } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, validate, ifObjectExist, getValidateError, USER_TOKEN } from "@Utils";
import { useInput, useNavigation, useLoader } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '@Routes'
import { Card } from "reactstrap";
import { LoginSideContent } from "../../Container";
import { registerAsMember, memberLoginUsingPassword } from '@Redux'



function Login() {

    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const password = useInput('')
    const mobileNumber = useInput('');
    const email = useInput('')
    const loginLoader = useLoader(false);
    const [showPassword, setShowPassword] = useState(false)
    const [toggleInput, setToggleInput] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    useEffect(() => {
    }, [])

    const registerAsMemberApi = () => {
        const params = {"email":"test@gmail.com","password":"test123"}
        // {
        //     email: email.value,
        //     password: password.value
        // }
        // { "first_name": "Azharudheen", "last_name": "K", "email": "test@gmail.com", "mobile_number": "90088008800", "password": "test123" }

        dispatch(memberLoginUsingPassword({
            params,
            onSuccess: (response: any) => () => {
                localStorage.setItem(USER_TOKEN, response.token);
                goTo(ROUTES['auth-module'].otp)
            },
            onError: (error) => () => {

            },
        }))
    }

    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <LoginSideContent />
                    <div className="col-sm-6 bg-primary d-block d-sm-none"
                        style={{
                            height: '90vh'
                        }}
                    >
                        <div className="row justify-content-center pt-1 mt-3 align-items-center ">
                            <h1 className=' font-weight-bolder text-white'
                                style={{
                                    fontSize: '8vh'
                                }}
                            >MOCK <b className='text-black'>EASY</b></h1>
                            <p className="text-center text-white"
                                style={{
                                    maxWidth: '85vh'
                                }}
                            >
                                Interview App is the easiest way to interview people automatically. Invite people to answer your question spontaneously with their webcam. Where
                            </p>
                            <Image
                                className=""
                                src={require('file:///C:/Users/tamil_hfh9g6g/OneDrive/Pictures/P007_1-2.png')}
                                height={'60%'}
                                width={'60%'}
                            />
                        </div>
                    </div>
                    {/*  */}
                    <div className="col-sm-6 row align-items-center mx-auto pl-lg-8 pl-sm-0 pl-5 pt-6 ">
                        <div className="row ">
                            <div className="mb--2">
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
                            <div className=" col-sm-9  pr-3 ml-lg--3 px-0 ml-sm-0 ml--2"
                                style={{
                                    // zoom:'90%'
                                    scale: '0.9'
                                }}
                            >
                                <div>
                                    <label className="h2 text-black">Email Address</label>
                                    <Input
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
                                        className={'text-white font-weight-bolder bg-primary'}
                                        // loading={loginLoader.loader}
                                        block
                                        size="lg"
                                        text={'Login'}
                                        onClick={() => { registerAsMemberApi() }}
                                    />

                                    <div className="text-center pt-2 ">
                                        <h4 className="text-primary">
                                            Use OTP to Login
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export { Login };