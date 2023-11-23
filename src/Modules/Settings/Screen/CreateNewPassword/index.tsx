

import { ROUTES } from '@Routes'
import React, { useEffect } from 'react'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, showToast, Logo, Back, Input, InputPassword } from '@Components'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '@Redux'
import { ifObjectExist, validate, RESET_PASSWORD_RULES, getValidateError } from '@Utils'
import './index.css'


function CreateNewPassword() {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    const otp = useInput('');
    const newPassword = useInput('')
    const confirmPassword = useInput('')

    const enterPress = useKeyPress('Enter')
    const loader = useLoader(false);

    const { retrieveEmail } = useSelector((state: any) => state.DashboardReducer);

    useEffect(() => {
        if (enterPress) {
            createNewPasswordHandler()
        }
    }, [enterPress])

    const createNewPasswordHandler = () => {

        const { email } = retrieveEmail

        const params = {
            email: email,
            otp: otp?.value,
            password: newPassword?.value,
        };

        const validation = validate(RESET_PASSWORD_RULES, params)

        if (ifObjectExist(validation)) {
            if (newPassword?.value === confirmPassword?.value) {
                loader.show()
                dispatch(resetPassword({
                    params,
                    onSuccess: (response) => () => {
                        showToast(response.message, "success");
                        goTo(ROUTES["auth-module"].login, true);
                        loader.hide();
                    },
                    onError: (error) => () => {
                        showToast(error.error_message, 'error');
                        loader.hide();
                    },
                })
                );
            } else {
                showToast('Passwords do not match', 'error')
            }
        } else {
            showToast(getValidateError(validation))
        }

    }

    return (

        <div className={'auth-screen'}>
            <div className={'auth-logo'}>
                <Logo />
            </div>
            <div className={'auth-container'}>
                <div className='d-flex align-items-center'>
                    <Back />
                    <div className={'heading-txt'}>
                        <div className={'text-sub-heading m-0 p-0 text-center'}>{'Verify Your Code'}</div>
                    </div>
                </div>

                <div className={'text-center verify-heading-container'}>
                    <span className={'text-des'}>
                        {'Enter the verification code sent you on your email'}
                    </span>
                </div>

                <Input
                    value={otp.value}
                    type={'number'}
                    placeholder={'Enter the OTP'}
                    onChange={otp.onChange}
                    maxLength={4}
                />
                <InputPassword
                    value={newPassword.value}
                    placeholder={'Enter your password'}
                    onChange={newPassword.onChange}
                />
                <InputPassword
                    value={confirmPassword.value}
                    placeholder={'Confirm your password'}
                    onChange={confirmPassword.onChange}
                />

                <Button
                    loading={loader.loader}
                    block
                    text={'Submit'}
                    onClick={createNewPasswordHandler}
                />

            </div>
        </div>
    )
}

export { CreateNewPassword }