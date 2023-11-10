/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Back, Button, Input, InputPassword, showToast } from "@Components";
import { useInput } from "@Hooks";
import { REGISTER_COMPANY_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { RegisterAdminProps } from './interfaces'
import './index.css';

function RegisterCompany({ params, onParams, onBackPress }: RegisterAdminProps) {



    const brandName = useInput("");
    const address = useInput("");
    const mobileNumber = useInput("");
    const pincode = useInput("");
    const sector = useInput("");

    useEffect(() => {
        updatedRegisterCompany();
    }, [params])


    function updatedRegisterCompany() {
        if (params) {
            const { mobile_number, brand_name, communication_address } = params;
            mobileNumber.set(mobile_number)
            brandName.set(brand_name)
            pincode.set(params?.pincode)
            sector.set(params?.sector)
            address.set(communication_address)
        }
    }

    const validateCompanyAdminDetailsHandler = () => {

        const params = {
            brand_name: brandName.value,
            communication_address: address.value,
            pincode: pincode.value,
            mobile_number: mobileNumber.value,
            sector: sector.value,
        };


        const validation = validate(REGISTER_COMPANY_RULES, params)

        if (ifObjectExist(validation)) {
            if (params) {
                onParams(params)
            }

        } else {
            showToast(getValidateError(validation))
        }
    };

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

            <Input
                value={brandName?.value}
                placeholder={'Brand Name'}
                onChange={brandName.onChange}
            />
            <Input
                value={address?.value}
                placeholder={'Address'}
                onChange={address.onChange}
            />
            <Input
                className={'bg-white'}
                readOnly={true}
                type={'number'}
                placeholder={"Phone"}
                maxLength={10}
                onChange={mobileNumber.onChange}
                value={mobileNumber.value}
            />

            <Input
                type={'number'}
                placeholder={"Pincode"}
                maxLength={6}
                onChange={pincode.onChange}
                value={pincode.value}
            />
            <Input
                value={sector?.value}
                placeholder={'Sector'}
                onChange={sector.onChange}
            />
            <Button
                block
                text={"Submit"}
                onClick={validateCompanyAdminDetailsHandler} />

        </>
    );
}

export { RegisterCompany };
