import { ROUTES } from '@Routes'
import React, { useEffect } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, showToast } from '@Components'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '@Redux'

function ForgotPassword() {
    const { goTo, goBack } = useNavigation()
    const dispatch = useDispatch()
    const email = useInput('')
    const enterPress = useKeyPress('Enter')
    const loginLoader = useLoader(false);


    useEffect(() => {
        if (enterPress) {
            onSubmit()
        }
    }, [enterPress])

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const onSubmit = () => {
        if (email.value.length === 0) {
            showToast('Email ID cannot be empty', 'error');
        } else if (!isValidEmail(email.value)) {
            showToast('Please enter a valid email address', 'error');
        } else {
            forgotPasswordHandler();
        }
    };


    const forgotPasswordHandler = () => {
        loginLoader.show()
        const params = {
            email: email.value
        }
        dispatch(forgotPassword({
            params,
            onSuccess: (response: any) => () => {
                loginLoader.hide()
                if (response.success) {
                    console.log('111111111111', response?.details)
                    showToast(response.message, 'success')
                    goTo(ROUTES["auth-module"].createNewPassword)
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
                        <h1 className="text-black mb--3">Verify Your Email</h1><br></br>
                    </div>
                    <div style={{ scale: '0.9' }}>
                        <div>
                            <label className="h3 font-weight-bolder text-black">Email ID</label>
                            <Input
                                className='rounded-sm'
                                type={'text'}
                                value={email.value}
                                placeholder='Enter your Mail ID'
                                onChange={email.onChange}
                            />
                        </div>

                        <h3 className=' text-black pt-3 font-weight-normal '>
                            You will receive an OTP via email
                        </h3>

                        <div className="pb-3 pt-2 ">
                            <Button
                                className={'text-white font-weight-normal rounded-sm text-lg py-2 bg-primary'}
                                loading={loginLoader.loader}
                                block
                                size="lg"
                                text={'Get OTP'}
                                onClick={() => { onSubmit() }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export { ForgotPassword }