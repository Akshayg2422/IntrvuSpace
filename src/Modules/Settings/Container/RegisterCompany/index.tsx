/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, ImagePicker, Input, showToast } from "@Components";
import { REGISTER_COMPANY_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { RegisterAdminProps } from './interfaces';
import './index.css';


function RegisterCompany({ loading, params, onParams, onBackPress, onSubmit }: RegisterAdminProps) {



    const validateCompanyAdminDetailsHandler = () => {
        const validation = validate(REGISTER_COMPANY_RULES, params)

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
                    <div className="text-sub-heading m-0 p-0 text-center">{'Register Company'}</div>
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

export { RegisterCompany };
