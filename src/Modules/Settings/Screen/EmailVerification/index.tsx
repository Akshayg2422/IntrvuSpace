
import { Back, Button, Input, Logo, showToast } from '@Components';
import { useInput, useLoader, useNavigation } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { EMAIL_RULES, validate, ifObjectExist, getValidateError, EMAIL_VERIFICATION_RULES } from '@Utils';
import { getOtpForEmailVerification, verifyEmailUsingOtp, userLoginDetails } from '@Redux';
import { ROUTES } from '@Routes'
import './index.css'
import { useState } from 'react';


function EmailVerification() {

    const GET_OTP = 1
    const SUBMIT_OTP = 2


    const { goTo } = useNavigation()
    const dispatch = useDispatch()

    const { userEmail } = useSelector((state: any) => state.AuthReducer);
    const { loginDetails } = useSelector((state: any) => state.AppReducer);

    const otp = useInput('');
    const [actionType, setActionType] = useState(GET_OTP)

    const loader = useLoader(false);


    const getOtpFormEmailApiHelper = () => {
        const params = {
            email: userEmail
        }

        const validation = validate(EMAIL_RULES, params)

        if (ifObjectExist(validation)) {
            loader.show()

            dispatch(
                getOtpForEmailVerification({
                    params,
                    onSuccess: (response: any) => () => {

                        setActionType(SUBMIT_OTP)
                        const { message } = response
                        loader.hide()
                        showToast(message, "success");
                    },
                    onError: (error: any) => () => {
                        const { error_message } = error
                        setActionType(GET_OTP)
                        loader.hide()
                        showToast(error_message, "error");

                    }
                }
                )

            )
        }
        else {
            showToast(getValidateError(validation))
        }

    }



    const verifyUserOtpApiHandler = () => {

        const params = {
            email: userEmail,
            otp: otp?.value

        }
        const validation = validate(EMAIL_VERIFICATION_RULES, params)

        if (ifObjectExist(validation)) {

            loader.show()
            dispatch(
                verifyEmailUsingOtp({
                    params,
                    onSuccess: (response: any) => () => {
                        const { message } = response
                        loader.hide()
                        showToast(message, 'success');
                        dispatch(
                            userLoginDetails({
                                ...loginDetails,
                                isLoggedIn: true,
                            })
                        );
                        goTo(ROUTES["auth-module"].splash, true);
                    },
                    onError: (error: any) => () => {
                        const { error_message } = error
                        loader.hide()
                        showToast(error_message, 'error');
                    }
                })
            )
        }
        else {
            showToast(getValidateError(validation))
        }


    }

    const isGetOtp = actionType === GET_OTP

    return (

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
                    className={"bg-white"}
                    readOnly={true}
                    value={userEmail}
                    placeholder={'Enter your Mail ID'}
                />

                {!isGetOtp &&
                    <Input
                        value={otp.value}
                        type={'number'}
                        placeholder={'Enter the OTP'}
                        onChange={otp.onChange}
                        maxLength={4}
                    />
                }

                <div className='text-center m-0 p-0'>
                    <span className='text-des'>
                        {isGetOtp ? 'You will receive an OTP via email' : 'Enter the verification code sent you on your email'}
                    </span>
                </div>
                <div className='mt-3'>
                    <Button
                        loading={loader.loader}
                        block
                        text={isGetOtp ? 'Get OTP' : 'Submit'}
                        onClick={() => {

                            if (isGetOtp) {
                                getOtpFormEmailApiHelper();
                            } else {
                                verifyUserOtpApiHandler();
                            }
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

export { EmailVerification }
