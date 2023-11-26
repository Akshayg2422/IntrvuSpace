/* eslint-disable jsx-a11y/anchor-is-valid */
import { Logo, showToast } from "@Components";
import { useLoader, useNavigation } from "@Hooks";
import { SuperAdminRegisterAdmin, SuperAdminRegisterCompany } from '@Modules';
import { registerAsCompany } from '@Redux';
import { ROUTES } from "@Routes";
import { REGISTER_COMPANY_SUPER_ADMIN_RULES, REGISTER_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { useState } from "react";
import { useDispatch } from "react-redux";
import './index.css';


function SuperAdminCorporateRegister() {

    const REGISTER_ADMIN = 1
    const REGISTER_COMPANY = 2

    const { goTo } = useNavigation();


    const dispatch = useDispatch();

    const [params, setParams] = useState({});
    const [formType, setFormType] = useState(REGISTER_ADMIN);
    const loader = useLoader(false);


    const proceedRegisterCorporateApiHandler = () => {

        const validation = validate({ ...REGISTER_RULES, ...REGISTER_COMPANY_SUPER_ADMIN_RULES }, params)

        const {
            first_name,
            email,
            password,
            mobile_number,
            brand_name,
            communication_address,
            pincode,
            sector,
            photo,
            interview_limit,
            referrer,
            referral_code,
            company_code

        } = params as any;

        const base64Photo = photo && photo.length > 0 ? photo[0].base64 : "";

        const cleanBase64 = (base64String: string) => base64String.replace(/^data:(.*,)?/, '');

        const cleanedBase64Photo = cleanBase64(base64Photo);

        const updatedParams = {
            first_name,
            email,
            password,
            mobile_number,
            brand_name,
            communication_address,
            pincode,
            sector,
            interview_limit,
            referrer,
            referral_code,
            company_code,
            logo: cleanedBase64Photo,
        };

        loader.show()

        if (ifObjectExist(validation)) {

            dispatch(
                registerAsCompany({
                    params: updatedParams,
                    onSuccess: (response: any) => () => {
                        loader.hide()

                        showToast(response.message, 'success');

                        goTo(ROUTES['super-admin'].dashboard, true)
                    },
                    onError: (error) => () => {
                        loader.hide()
                        showToast(error.error_message, 'error');
                    },
                })

            );


        } else {
            showToast(getValidateError(validation))
        }
    };


    function updatedParamsHandler(updatedParams: any) {
        setParams(updatedParams)
    }

    function setRegisterAdminHandler() {
        setFormType(REGISTER_ADMIN);
    }

    function setRegisterCompanyHandler() {
        setFormType(REGISTER_COMPANY);
    }



    return (
        <div className={'auth-screen'}>
            <div className={'auth-logo'}>
                <Logo />
            </div>
            <div className={'auth-container'}>

                {formType === REGISTER_ADMIN &&
                    <SuperAdminRegisterAdmin
                        params={params}
                        onParams={updatedParamsHandler}
                        onSubmit={setRegisterCompanyHandler}
                    />
                }
                {formType === REGISTER_COMPANY &&
                    <SuperAdminRegisterCompany
                        loading={loader.loader}
                        params={params}
                        onBackPress={setRegisterAdminHandler}
                        onParams={updatedParamsHandler}
                        onSubmit={proceedRegisterCorporateApiHandler} />
                }

            </div>
        </div>

    );
}

export { SuperAdminCorporateRegister };

