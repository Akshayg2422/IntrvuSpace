import { ROUTES } from '@Routes'
import React, { useEffect } from 'react'
import { Input, } from 'reactstrap'
import { LoginSideContent } from '../../Container'
import { useInput, useKeyPress, useLoader, useNavigation } from '@Hooks'
import { Button, Image, showToast } from '@Components'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '@Redux'
import { icons } from '@Assets'

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
        // <div className='h-100vh d-flex justify-content-center align-items-center m-0 p-0'>
        //     {/* <div className='col-xl-6 col-md-6'>
        //         <LoginSideContent />
        //     </div> */}
        //         <div className="col-md-4 my-sm-0 my-6 position-relative">
        //         <div className='position-absolute pointer top-0 left-3'
        //             onClick={() => {
        //                 goBack()
        //             }}
        //         >
        //             <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder"></i>
        //         </div>
        //         <div className="d-flex justify-content-center">
        //         <Image src={icons.logoText} height={22} />
        //       </div>

        //             <div className="text-center mt-4">
        //             <span
        //           className="text-secondary"
        //           style={{ fontSize: 22, fontWeight: 800 }}
        //         >
        //           Verify Your Email
        //         </span>
        //             </div>
        //             <div style={{ scale: '' }}>
        //                 <div className='mt-3'>
        //                     {/* <label className="h3 font-weight-bolder text-black">Email ID</label> */}
        //                     <Input
        //                         className='rounded-sm form-control'
        //                         type={'text'}
        //                         value={email.value}
        //                         placeholder='Enter your Mail ID'
        //                         onChange={email.onChange}
        //                     />
        //                 </div>

        //                 <h3 className=' text-default pt-3 font-weight-400 '>
        //                     You will receive an OTP via email
        //                 </h3>

        //                 <div className="pb-3 pt-4 ">
        //                     <Button
        //                         className={'text-white font-weight-bold py-3 bg-primary rounded-sm'}
        //                         loading={loginLoader.loader}
        //                         block
        //                         size="lg"
        //                         text={'Get OTP'}
        //                         onClick={() => { onSubmit() }}
        //                     />
        //                 </div>
        //             </div>
        //         </div>

        // </div >
        <>
            <div className="row  m-0 p-0 h-100vh">
                <div className="col-xl-12 d-flex bg-white align-items-center justify-content-center  my-sm-0 my-4 ">

                    <div className="col-12 col-md-6 col-lg-4  align-items-center ">
                        <div className='position-absolute pointer top-0 left-sm-9'
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

                        </div>
                        <div
                            className="pt-2  mx-0"
                            style={{
                                scale: "",
                            }}
                        >
                            <div className="my-4 ">
                                <span
                                    className="text-secondary"
                                    style={{ fontSize: 22, fontWeight: 800 }}
                                >
                                    Verify Your Email
                                </span>
                            </div>
                            <div className='my-2 ' >
                                <Input
                                    className="form-control rounded-sm"
                                    value={email.value}
                                    placeholder="Enter your Mail ID"
                                    onChange={email.onChange}
                                />
                            </div>
                            <div>
                                <h3 className=' text-default pt-3 font-weight-400'>
                                    You will receive an OTP via email
                                </h3>
                            </div>


                            <div className="pt-3">
                                <Button
                                    className={'text-white font-weight-bold bg-primary rounded-sm'}
                                    loading={loginLoader.loader}
                                    block
                                    size="lg"
                                    text={'Get OTP'}
                                    onClick={() => {
                                        onSubmit()


                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div></>
    )
}

export { ForgotPassword }