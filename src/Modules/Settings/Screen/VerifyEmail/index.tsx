import { icons } from '@Assets'
import { Button, Image, Input, showToast } from '@Components'
import { useInput, useLoader,useNavigation } from '@Hooks'
import { useDispatch } from 'react-redux'
import {getOtpForEmailVerification,verifyEmailUsingOtp} from '@Redux'
import { useEffect, useState } from 'react'
import { EMAIL_RULES, getValidateError, ifObjectExist ,validate} from '@Utils'
import { useSelector } from 'react-redux'



function VerifyEmail() {
    const { goTo, goBack } = useNavigation()
    const  dispatch=useDispatch()
    const email =useInput('')
    const loginLoader=useLoader(false)
    const otp=useInput('')
    const [verifyEmail,setVerifyEmail]=useState(false)

    const{VerificationEmail}=useSelector((state:any)=>state.AuthReducer)

    useEffect(()=>{

        if(VerificationEmail){
            email.set(VerificationEmail)
        }
    },[])

const fetchOtpHandler =()=>{
    const params={

    }

    const validation = validate(EMAIL_RULES, params)

    if(ifObjectExist(validation)){
dispatch(
    getOtpForEmailVerification({
        params,
        onSuccess :(response:any)=>()=>{
            setVerifyEmail(true)

        },
        onError :(error:any)=>()=>{
            showToast(error.error_message, "error");
            
        }
    }
    )

)
    }
        else{
            showToast(getValidateError(validation))
        }

}

const verifyUserOtpHandler =()=>{

    const params ={

    }

    if(otp.value.length>0){
    dispatch(
        verifyEmailUsingOtp({
            params,
            onSuccess:(response:any)=>()=>{
                showToast(response.Success, 'success');
            },
            onError:(error:any)=>()=>{
                showToast(error.error_message, "error");
            }
        })
    )
    }

    else {
        showToast('Invalid Otp','error')
    }


}

  return (
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

                    <div className='my-2 ' >
                        <Input
                            className="form-control rounded-sm"
                            value={otp.value}
                            placeholder="Enter your Mail ID"
                            onChange={otp.onChange}
                        />
                    </div>
                    <div>
                        <h3 className=' text-default pt-3 font-weight-400'>
                            You will receive an OTP via email
                        </h3>
                    </div>


                 {!verifyEmail ?   <div className="pt-3">
                        <Button
                            className={'text-white font-weight-bold bg-primary rounded-sm'}
                            loading={loginLoader.loader}
                            block
                            size="lg"
                            text={'Get OTP'}
                            onClick={() => {
                                fetchOtpHandler()

                            }}
                        />
                    </div>
                    : <div className="pt-3">
                    <Button
                        className={'text-white font-weight-bold bg-primary rounded-sm'}
                        loading={loginLoader.loader}
                        block
                        size="lg"
                        text={'Submit'}
                        onClick={() => {
                            verifyUserOtpHandler()

                        }}
                    />
                </div>
}

                </div>
            </div>
        </div>
    </div></>
  )
}

export {VerifyEmail}