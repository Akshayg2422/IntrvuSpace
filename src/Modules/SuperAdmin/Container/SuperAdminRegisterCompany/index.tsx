/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Checkbox, ImagePicker, Input, showToast } from "@Components";
import { REGISTER_COMPANY_SUPER_ADMIN_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { SuperAdminRegisterCompanyProps } from './interfaces';
import './index.css';


function SuperAdminRegisterCompany({ edit, loading, params, onParams, onBackPress, onSubmit }: SuperAdminRegisterCompanyProps) {


    const validateCompanyAdminDetailsHandler = () => {
        const validation = validate(REGISTER_COMPANY_SUPER_ADMIN_RULES, params)

        if (ifObjectExist(validation)) {
            if (onSubmit) {
                onSubmit();
            }
        } else {
            showToast(getValidateError(validation))
        }
    };

    const registerCompanyOnChange = (e: any) => {

        const key = e.target.id;
        const value = e.target.value;
        const maxLength = e.target.maxLength

        let final_value = undefined;


        if (maxLength !== -1) {
            if (maxLength >= value.length) {
                final_value = value.slice(0, maxLength);
                const currentParams = { [key]: final_value }
                registerCompanyParamsHandler(currentParams)
            }
        } else {
            final_value = value
            const currentParams = { [key]: final_value }
            registerCompanyParamsHandler(currentParams)
        }

    }


    function checkboxOnChange(checked: boolean, id: string) {
        const currentParams = { [id]: checked }
        registerCompanyParamsHandler(currentParams)
    }

    const registerCompanyParamsHandler = (currentParams: any) => {
        const updatedParams = { ...params, ...currentParams }
        if (onParams) {
            onParams(updatedParams);
        }
    }

    return (
        <>
            <div className='d-flex align-items-center admin-heading-container'>
                <Back variant={'override'} onClick={() => {
                    if (onBackPress) {
                        onBackPress()
                    }
                }} />
                <div className={'admin-heading-txt'}>
                    <div className="text-sub-heading m-0 p-0 text-center">{edit ? 'Edit Company' : 'Register Company'}</div>
                </div>
            </div>
            <div className={'field-wrapper'}>
                <ImagePicker
                    defaultPhotos={params?.photo}
                    onSelect={(images) => {
                        registerCompanyParamsHandler({ photo: [images] })
                    }}
                />
                <Input
                    id={'brand_name'}
                    value={params?.brand_name}
                    placeholder={'Company Name'}
                    onChange={registerCompanyOnChange}
                />
                <Input
                    id={'communication_address'}
                    value={params?.communication_address}
                    placeholder={'Address'}
                    onChange={registerCompanyOnChange}
                />
                {/* <Input
                    className={'bg-white'}
                    readOnly={true}
                    type={'number'}
                    placeholder={"Phone"}
                    maxLength={10}
                    value={params?.mobile_number}
                /> */}

                <Input
                    id={'pincode'}
                    value={params?.pincode}
                    type={'number'}
                    placeholder={"Pincode"}
                    maxLength={6}
                    onChange={registerCompanyOnChange}

                />
                <Input
                    id={'sector'}
                    value={params?.sector}
                    placeholder={'Sector'}
                    onChange={registerCompanyOnChange}
                />
                <Input
                    id={'interview_limit'}
                    value={params?.interview_limit}
                    type={'number'}
                    placeholder={'Interview Limit'}
                    maxLength={6}
                    onChange={registerCompanyOnChange}
                />
                <Input
                    id={'referrer'}
                    value={params?.referrer}
                    placeholder={'Referrer'}
                    onChange={registerCompanyOnChange}
                />
                <Input
                    id={'referral_code'}
                    value={params?.referral_code}
                    placeholder={'Referral Code'}
                    onChange={registerCompanyOnChange}
                />
                <Input
                    id={'company_code'}
                    value={params?.company_code}
                    placeholder={'company Code'}
                    onChange={registerCompanyOnChange}
                />

                <Checkbox
                    id={'is_light_variant'}
                    text={'Is Light Variant'}
                    defaultChecked={params?.is_light_variant}
                    onCheckChange={(checked) => { checkboxOnChange(checked, 'is_light_variant') }}
                />
            </div>
            <Button
                loading={loading}
                block
                text={"Submit"}
                onClick={validateCompanyAdminDetailsHandler}
            />

        </>
    );
}

export { SuperAdminRegisterCompany };
