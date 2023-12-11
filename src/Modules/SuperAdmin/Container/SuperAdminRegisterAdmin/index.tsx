/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Input, InputPassword, showToast } from "@Components";
import { getRegisterRules, getValidateError, ifObjectExist, validate } from '@Utils';
import './index.css';
import { SuperAdminRegisterAdminProps } from './interfaces';

function SuperAdminRegisterAdmin({ edit, params, onParams, onSubmit }: SuperAdminRegisterAdminProps) {

    const validateCompanyAdminDetailsHandler = () => {

        const validation = validate(getRegisterRules(edit), params)
        if (ifObjectExist(validation)) {
            if (params?.password === params?.confirm_password) {
                if (onSubmit) {
                    onSubmit()
                }
            } else {
                showToast('Passwords do not match', 'error')
            }
        } else {
            showToast(getValidateError(validation))
        }
    };

    function updatedParamsHandler(currentParams: any) {
        const updatedParams = { ...params, ...currentParams }


        if (onParams) {
            onParams(updatedParams);
        }
    }


    const registerAdminOnChange = (e: any) => {
        const key = e.target.id;
        let value = e.target.value;
        const maxLength = e.target.maxLength

        let final_value = undefined;

        if (maxLength !== -1) {
            if (maxLength >= value.length) {

                final_value = value.slice(0, maxLength);
                const currentParams = { [key]: final_value }
                updatedParamsHandler(currentParams)
            }
        } else {
            final_value = value
            const currentParams = { [key]: final_value }
            updatedParamsHandler(currentParams)
        }
    }


    return (
        <>
            <div className='d-flex align-items-center admin-heading-container'>
                <Back />
                <div className={'admin-heading-txt'}>
                    <div className="text-sub-heading m-0 p-0 text-center">{edit ? 'Edit Company' : "Register Company"}</div>
                </div>
            </div>

            <Input
                id={'first_name'}
                value={params?.first_name}
                placeholder={'Full Name'}
                onChange={registerAdminOnChange}
            />
            <Input
                id={'email'}
                value={params?.email}
                placeholder={'Email'}
                onChange={registerAdminOnChange}
            />
            <Input
                id={'mobile_number'}
                type={'number'}
                placeholder={"Phone"}
                maxLength={10}
                value={params.mobile_number}
                onChange={registerAdminOnChange}

            />
            {
                !edit &&
                <>
                    <InputPassword
                        id={'password'}
                        value={params.password}
                        placeholder={'Password'}
                        onChange={registerAdminOnChange}
                    />
                    <InputPassword
                        id={'confirm_password'}
                        value={params.confirm_password}
                        placeholder={'Confirm Password'}
                        onChange={registerAdminOnChange}
                    />
                </>
            }
            <Button
                block
                text={"Submit"}
                onClick={validateCompanyAdminDetailsHandler}
            />

        </>
    );
}

export { SuperAdminRegisterAdmin };
