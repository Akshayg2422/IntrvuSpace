
import { Button, Input, showToast, Back, Logo } from '@Components'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { forgotPassword } from '@Redux'
import { ROUTES } from '@Routes'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.css'
import { validate, EMAIL_RULES, ifObjectExist, getValidateError } from '@Utils';


function ForgotPassword() {
    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const email = useInput('')
    const enterPress = useKeyPress('Enter')
    const loader = useLoader(false);


    useEffect(() => {
        if (enterPress) {
            forgotPasswordApiHandler()
        }
    }, [enterPress])



    const forgotPasswordApiHandler = () => {

        const params = {
            email: email.value
        }

        const validation = validate(EMAIL_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()
            dispatch(forgotPassword({
                params,
                onSuccess: (response: any) => () => {
                    loader.hide()
                    if (response.success) {
                        showToast(response.message, 'success')
                        goTo(ROUTES["auth-module"].createNewPassword)
                    }
                    else {
                        showToast(response.error_message, 'error')
                    }
                },
                onError: (error: any) => () => {
                    loader.hide()
                    showToast(error.error_message, 'error')
                },
            }))
        } else {
            showToast(getValidateError(validation))
        }
    }

    return (
<>
        <div className={'auth-screen'}>
            <div className={'auth-logo'}>
                <Logo />
            </div>
            <div className={'auth-container'}>
                <div className='d-flex align-items-center heading-container'>
                    <Back />
                    <div className={'heading-txt'}>
                        <div className="text-sub-heading m-0 p-0 text-center">{'Verify Your Email'}</div>
                    </div>
                </div>
                <Input
                    value={email.value}
                    placeholder={'Enter your Mail ID'}
                    onChange={email.onChange}
                />
                <div className='text-center m-0 p-0'>
                    <span className='text-des'>
                        You will receive an OTP via email
                    </span>
                </div>
                <div className='mt-3'>
                    <Button
                        loading={loader.loader}
                        block
                        text={'Get OTP'}
                        onClick={forgotPasswordApiHandler}
                    />
                </div>
            </div>
        </div >
        </>
    )
}

export { ForgotPassword }
