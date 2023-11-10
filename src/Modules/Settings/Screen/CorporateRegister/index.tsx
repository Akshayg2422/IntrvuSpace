/* eslint-disable jsx-a11y/anchor-is-valid */
import { Logo, showToast } from "@Components";
import { useLoader, useNavigation } from "@Hooks";
import { RegisterAdmin, RegisterCompany } from '@Modules';
import { ROUTES } from "@Routes";
import { REGISTER_RULES, REGISTER_COMPANY_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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





  const registerCorporateApiHandler = (registerCompanyParams: any) => {

    const updatedParams = { ...params, ...registerCompanyParams }
    setParams(updatedParams);

    const validation = validate({ ...REGISTER_RULES, ...REGISTER_COMPANY_RULES }, updatedParams)

    if (ifObjectExist(validation)) {

      console.log(JSON.stringify(updatedParams));


      console.log('proceed-api');

    } else {
      showToast(getValidateError(validation))
    }
  };


  function updatedParamsHandler(next: any, updatedParams: any) {

    setFormType(next);

    setParams({
      ...params,
      ...updatedParams
    })

  }

  function setRegisterAdminHandler() {
    setFormType(REGISTER_ADMIN);
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
          />
        }
        {formType === REGISTER_COMPANY &&
          <RegisterCompany
            params={params}
            onBackPress={setRegisterAdminHandler}
            onParams={registerCorporateApiHandler} />
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
