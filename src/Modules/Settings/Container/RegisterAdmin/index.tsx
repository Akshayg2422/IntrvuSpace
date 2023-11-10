/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Input, InputPassword, showToast } from "@Components";
import { useInput } from "@Hooks";
import { REGISTER_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { RegisterAdminProps } from './interfaces'
import './index.css';
import { useEffect } from "react";

function RegisterAdmin({ params, onParams }: RegisterAdminProps) {

    const NEXT_REGISTER_COMPANY = 2



    const firstName = useInput("");
    const lastName = useInput("");
    const email = useInput("");
    const mobileNumber = useInput("");
    const password = useInput("");
    const confirmPassword = useInput("");


    useEffect(() => {
        updatedRegisterAdmin();
    }, [params])


    function updatedRegisterAdmin() {

        if (params) {
            const { first_name, mobile_number } = params;
            firstName.set(first_name)
            email.set(params?.email)
            mobileNumber.set(mobile_number)
            password.set(params?.password)
            confirmPassword.set(params?.password)

        }

    }

    const validateCompanyAdminDetailsHandler = () => {

        const params = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            mobile_number: mobileNumber.value,
            password: password.value,
        };


        const validation = validate(REGISTER_RULES, params)

        if (ifObjectExist(validation)) {
            if (password?.value === confirmPassword?.value) {
                if (params) {
                    onParams(NEXT_REGISTER_COMPANY, params)
                }
            } else {
                showToast('Passwords do not match', 'error')
            }
        } else {
            showToast(getValidateError(validation))
        }
    };

    return (
        <>
            <div className='d-flex align-items-center admin-heading-container'>
                <Back />
                <div className={'admin-heading-txt'}>
                    <div className="text-sub-heading m-0 p-0 text-center">{'Register Company'}</div>
                </div>
            </div>

            <Input
                value={firstName?.value}
                placeholder={'Full Name'}
                onChange={firstName.onChange}
            />
            <Input
                value={email?.value}
                placeholder={'Email'}
                onChange={email.onChange}
            />
            <Input
                type={'number'}
                placeholder={"Phone"}
                maxLength={10}
                onChange={mobileNumber.onChange}
                value={mobileNumber.value}
            />
            <InputPassword
                value={password.value}
                placeholder={'Enter your password'}
                onChange={password.onChange}
            />
            <InputPassword
                value={confirmPassword.value}
                placeholder={'Confirm your password'}
                onChange={confirmPassword.onChange}
            />

            <Button
                block
                text={"Next Step"}
                onClick={validateCompanyAdminDetailsHandler} />

        </>
    );
}

export { RegisterAdmin };
