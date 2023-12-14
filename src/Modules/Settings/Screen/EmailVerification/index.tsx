
import { Back, Button, Input, Logo, showToast } from '@Components';
import { useInput, useLoader, useNavigation } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { validate, ifObjectExist, getValidateError, EMAIL_VERIFICATION_RULES } from '@Utils';
import { verifyEmailUsingOtp, userLoginDetails } from '@Redux';
import { ROUTES } from '@Routes'
import './index.css'


function EmailVerification() {

    const { goTo } = useNavigation()
    const dispatch = useDispatch()
    const { userEmail } = useSelector((state: any) => state.AuthReducer);
    const { loginDetails } = useSelector((state: any) => state.AppReducer);
    const otp = useInput('');
    const loader = useLoader(false);

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

                <Input
                    value={otp.value}
                    type={'number'}
                    placeholder={'Enter the OTP'}
                    onChange={otp.onChange}
                    maxLength={4}
                />

                <div className='text-center m-0 p-0'>
                    <span className={'text-description'}>
                        {'Enter the verification code sended on your email'}
                    </span>
                </div>

                <div className='mt-3'>
                    <Button
                        loading={loader.loader}
                        block
                        text={'Submit'}
                        onClick={() => { verifyUserOtpApiHandler() }}
                    />
                </div>
            </div>
        </div >
    )
}

export { EmailVerification }
