/* eslint-disable jsx-a11y/anchor-is-valid */
import { Logo, showToast } from "@Components";
import { useLoader, useNavigation } from "@Hooks";
import { RegisterAdmin, RegisterCompany } from '@Modules';
import { ROUTES } from "@Routes";
import { REGISTER_RULES, REGISTER_COMPANY_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerAsCompany, userLoginDetails } from '@Redux'
import './index.css';


function CorporateRegister() {

  const REGISTER_ADMIN = 1
  const REGISTER_COMPANY = 2

  const { goTo } = useNavigation();

  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  const dispatch = useDispatch();

  const [params, setParams] = useState({});
  const [formType, setFormType] = useState(REGISTER_ADMIN);



  const loader = useLoader(false);





  const proceedRegisterCorporateApiHandler = () => {

    const validation = validate({ ...REGISTER_RULES, ...REGISTER_COMPANY_RULES }, params)


    const {
      first_name,
      email,
      password,
      mobile_number,
      brand_name,
      communication_address,
      pincode,
      sector,
      photo
    } = params as any;

    const base64Photo = photo && photo.length > 0 ? photo[0].base64 : "";

    const updatedParams = {
      first_name,
      email,
      password,
      mobile_number,
      brand_name,
      communication_address,
      pincode,
      sector,
      logo: base64Photo,
    };
    loader.show()
    if (ifObjectExist(validation)) {
      dispatch(
        registerAsCompany({
          params: updatedParams,
          onSuccess: (response: any) => () => {
            console.log(response);

            loader.hide()
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

  function goToLogin() {
    goTo(ROUTES["auth-module"].login);
  }

  return (
    <div className={'auth-screen'}>
      <div className={'auth-logo'}>
        <Logo />
      </div>
      <div className={'auth-container'}>
        {formType === REGISTER_ADMIN &&
          <RegisterAdmin
            params={params}
            onParams={updatedParamsHandler}
            onSubmit={setRegisterCompanyHandler}
          />
        }
        {formType === REGISTER_COMPANY &&
          <RegisterCompany
            loading={loader.loader}
            params={params}
            onBackPress={setRegisterAdminHandler}
            onParams={updatedParamsHandler}
            onSubmit={proceedRegisterCorporateApiHandler} />
        }

        <div className="text-center font-size-md bottom-text">
          <span className="text-secondary font-weight-700"> {'Go back to'}</span>
          <span className="text-primary font-weight-700 pointer ml-1" onClick={goToLogin}> {'Login'}</span>
        </div>

      </div>
    </div>

  );
}

export { CorporateRegister };
