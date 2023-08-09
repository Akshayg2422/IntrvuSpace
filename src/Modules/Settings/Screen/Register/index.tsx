/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Button, showToast } from '@Components'
import React, { useEffect, useState } from 'react'
import { Input } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { ROUTES } from '@Routes'
import { useDispatch } from 'react-redux'
import { registerAsMember, settingRegisterData } from '@Redux'
import { REGISTER_AS_MEMBER_RULES, getValidateError, ifObjectExist, validate } from '@Utils'

function Register() {
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const password = useInput('')
    const lastName = useInput('')
    const mobileNumber = useInput('');
    const email = useInput('')
    const confirmPassword = useInput('')
    const firstName = useInput('')
    const loginLoader = useLoader(false);
    const [showPassword, setShowPassword] = useState(false)
    const [toggleInput, setToggleInput] = useState(0)
    const enterPress = useKeyPress('Enter')


    useEffect(() => {
        if (enterPress) {
            onSubmit()
        }
    }, [enterPress])



    const onSubmit = () => {

        if (firstName.value === '') {
            showToast('First Name Cannot be empty', 'error');
        }
        else if (lastName.value.length === 0) {
            showToast('Last Name Cannot be empty', 'error');
        }
        else if (email.value.length === 0) {
            showToast('Email ID  Cannot be empty', 'error');
        }
        else if (password.value.length === 0) {
            showToast('Password Cannot be empty', 'error');
        }
        else if (confirmPassword.value.length === 0) {
            showToast('Confirm Password Cannot be empty', 'error');
        }
        else if (password.value !== confirmPassword.value) {
            showToast('Confirm Password Does not Match', 'error');
        }
        else if (mobileNumber.value.length === 0) {
            showToast('Mobile Number Cannot be empty', 'error');
        }
        else {
            registerAsMemberHandler()
        }
    }

    const registerAsMemberHandler = () => {
        const params = { first_name: firstName.value, last_name: lastName.value, email: email.value, mobile_number: mobileNumber.value, password: password.value }

        dispatch(registerAsMember({
            params,
            onSuccess: (response: any) => () => {
                if (response.success) {
                    dispatch(settingRegisterData(params))
                    goTo(ROUTES['auth-module'].login)
                    showToast(response.message, 'success')
                }
                else {
                    showToast(response.error_message, 'error')
                }
            },
            onError: (error) => () => {
                showToast(error.error_message, 'error')
            },
        }))

    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col'>
                        <LoginSideContent />
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div className='position-absolute pointer m-3'
                            style={{
                                top: 0,
                                left: 8
                            }}
                            onClick={() => {
                                goBack()
                            }}
                        >
                            <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder"></i>
                        </div>
                        <div className="col-xl-8 mt-sm-0 mt-6">
                            <div className="mb-2">
                                <h1 className="text-black mb--3"> Find a job & grow your career</h1><br></br>
                                {/* <h2 className="font-weight-normal display-4 text-black mt-0"
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
                                ><b>Register</b></a></h2> */}
                            </div>
                            <div
                                style={{
                                    zoom: '80%'
                                }}
                            >
                                <div className='overflow-auto overflow-hide'
                                    style={{
                                        height: '80vh',
                                    }}
                                >
                                    <div className='my-4'>
                                        <label className="h3 text-black">First Name</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                className="form-control"
                                                placeholder='Enter your First name'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(1)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={firstName.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 1 ? '#68d75c' : ''
                                                }}

                                            >
                                                <i className="bi bi-person mt--1"
                                                    style={{
                                                        fontSize: '20px',
                                                        marginBottom: '-5px'
                                                    }}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <label className="h3 text-black">Last Name</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                className="form-control"
                                                placeholder='Enter your Last name'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(6)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={lastName.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 6 ? '#68d75c' : ''
                                                }}

                                            >
                                                <i className="bi bi-person mt--1"
                                                    style={{
                                                        fontSize: '20px',
                                                        marginBottom: '-5px'
                                                    }}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="h3 text-black">Email ID</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                className="form-control"
                                                placeholder='Enter your Email ID'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(2)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={email.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 2 ? '#68d75c' : ''
                                                }}

                                            >
                                                <i className="bi bi-envelope mt--1"
                                                    style={{
                                                        fontSize: '20px',
                                                        marginBottom: '-5px'
                                                    }}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="h3 text-black">Password</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                type={'password'}
                                                className="form-control"
                                                placeholder='Enter your Password'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(3)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={password.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 3 ? '#68d75c' : ''
                                                }}

                                            >
                                                <i className="bi bi-lock mt--1"
                                                    style={{
                                                        fontSize: '20px',
                                                        marginBottom: '-5px'
                                                    }}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="h3 text-black">Confirm Password</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                type={showPassword ? 'text' : 'password'}
                                                className="form-control"
                                                placeholder='Enter your Confirm Password'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(4)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={confirmPassword.onChange}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 4 ? '#68d75c' : ''
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

                                    <div>
                                        <label className="h3 text-black">Mobile Number</label>
                                        <div className="input-group mb-3">
                                            <input
                                                style={{
                                                    borderTopRightRadius: '0px',
                                                    borderBottomRightRadius: '0px',
                                                    borderRight: '0px'
                                                }}
                                                type='number'
                                                className="form-control"
                                                placeholder='Enter your Mobile Number'
                                                aria-label="Recipient's username"
                                                aria-describedby="basic-addon2"
                                                onFocus={() => {
                                                    setToggleInput(5)
                                                }}
                                                onBlur={() => {
                                                    setToggleInput(0)
                                                }}
                                                onChange={mobileNumber.onChange}
                                                maxLength={10}
                                                max={10}
                                            />
                                            <span className="input-group-text" id="basic-addon2"
                                                style={{
                                                    borderTopLeftRadius: '0px',
                                                    borderBottomLeftRadius: '0px',
                                                    borderLeft: '0px',
                                                    borderColor: toggleInput === 5 ? '#68d75c' : ''
                                                }}

                                            >
                                                <i className="bi bi-telephone mt--1"
                                                    style={{
                                                        fontSize: '20px',
                                                        marginBottom: '-5px'
                                                    }}
                                                ></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-xl-4 mb-sm-0 mb-4">
                                    <Button
                                        className={'text-white bg-primary font-weight-normal py-2 border-0 text-lg shadow-none'}
                                        block
                                        size="lg"
                                        text={'Register Now'}
                                        onClick={() => { onSubmit() }}
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