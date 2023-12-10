/* eslint-disable jsx-a11y/anchor-is-valid */
import { Logo, showToast } from "@Components";
import { useLoader, useNavigation } from "@Hooks";
import { SuperAdminRegisterAdmin, SuperAdminRegisterCompany, } from '@Modules';
import { createCompanySuperAdmin } from '@Redux';
import { ROUTES } from "@Routes";
import { REGISTER_COMPANY_SUPER_ADMIN_RULES, getRegisterRules, getValidateError, ifObjectExist, validate } from '@Utils';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';


function SuperAdminCorporateRegister() {

    const REGISTER_ADMIN = 1
    const REGISTER_COMPANY = 2

    const { goTo } = useNavigation();


    const { selectedCompany } = useSelector((state: any) => state.SuperAdminReducer);

    const dispatch = useDispatch();

    const [params, setParams] = useState({});
    const [formType, setFormType] = useState(REGISTER_ADMIN);
    const loader = useLoader(false);

   

    const isEdit = selectedCompany||false

    useEffect(() => {

        if (selectedCompany) {
            prefillCompanyDetails();
        }

    }, [])


    async function prefillCompanyDetails() {


        const {
            interview_limit = '',
            display_name = '',
            phone = '',
            email = '',
            sector = '',
            address = '',
            pincode = '',
            admin_name = '',
            referrer = '',
            referral_code = '',
            code = '',
            logo,
            is_light_variant = false
        } = selectedCompany;

        // const base64Logo = logo ? await urlToBase64(logo) as string : '';

        setParams({
            first_name: admin_name,
            interview_limit,
            brand_name: display_name,
            email,
            sector,
            communication_address: address,
            referrer,
            company_code: code,
            mobile_number: phone,
            referral_code,
            pincode,
            is_light_variant,
            photo: logo ?  logo  : []
        });

    }




    const proceedRegisterCorporateApiHandler = () => {

        const validation = validate({ ...getRegisterRules(isEdit), ...REGISTER_COMPANY_SUPER_ADMIN_RULES }, params)

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
            company_code,
            is_light_variant
        } = params as any;

        const base64Photo = photo && photo.length > 0 ? photo[0].base64 : "";

        const cleanBase64 = (base64String: string) => base64String.replace(/^data:(.*,)?/, '');

        const cleanedBase64Photo = cleanBase64(base64Photo);

        const updatedParams = {
            ...(isEdit && { id: selectedCompany?.id }),
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
            is_light_variant: is_light_variant,
            ...(cleanedBase64Photo && { logo: cleanedBase64Photo }),
        };


        loader.show()

        if (ifObjectExist(validation)) {

            dispatch(
                createCompanySuperAdmin({
                    params: updatedParams,
                    onSuccess: (response: any) => () => {
                        loader.hide()
                        showToast(response.message, 'success');
                        goTo(ROUTES['super-admin'].companies, true)
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
            {/* <div className={'auth-logo'}>
                <Logo />
            </div> */}
            <div className={'auth-container'}>

                {
                    formType === REGISTER_ADMIN &&
                    <SuperAdminRegisterAdmin
                        edit={isEdit}
                        params={params}
                        onParams={updatedParamsHandler}
                        onSubmit={setRegisterCompanyHandler}
                    />
                }
                {formType === REGISTER_COMPANY &&
                    <SuperAdminRegisterCompany
                        edit={isEdit}
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

