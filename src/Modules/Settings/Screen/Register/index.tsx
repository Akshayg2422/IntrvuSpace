/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Input, InputPassword, Logo, showToast } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { registerAsMember, saveUserEmail, userLoginDetails } from "@Redux";
import { ROUTES } from "@Routes";
import { REGISTER_RULES, getValidateError, ifObjectExist, validate, USER_TOKEN } from '@Utils';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';

function Register() {

  const { goTo } = useNavigation();

  const { loginDetails } = useSelector((state: any) => state.AppReducer);


  const dispatch = useDispatch();

  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
  const mobileNumber = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");


  const loader = useLoader(false);


  const enterPress = useKeyPress("Enter");

  useEffect(() => {
    if (enterPress) {
      registerAsMemberApiHandler();
    }
  }, [enterPress]);



  const registerAsMemberApiHandler = () => {

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

        loader.show();
        dispatch(
          registerAsMember({
            params,
            onSuccess: (response: any) => () => {

              const { details } = response;
              const { is_email_verified, token } = details || {};

              loader.hide();

              if (response.success) {

                showToast(response.message, 'success');
                localStorage.setItem(USER_TOKEN, token);

                dispatch(
                  userLoginDetails({
                    ...loginDetails,
                    isLoggedIn: is_email_verified,
                    ...details,
                  })
                );

                if (is_email_verified) {
                  goTo(ROUTES["auth-module"].splash, true);
                } else {
                  dispatch(saveUserEmail(email?.value))
                  goTo(ROUTES["auth-module"]["mail-verification"], true);
                }

              } else {
                showToast(response.error_message, 'error');
              }
            },
            onError: (error) => () => {
              loader.hide();
              showToast(error.error_message, 'error');
            },
          })
        );
      } else {
        showToast('Passwords do not match', 'error')
      }
    } else {
      showToast(getValidateError(validation))
    }
  };

  function goToLogin() {
    goTo(ROUTES["auth-module"].login);
  }

  return (
    <div className={'auth-screen'}>
      <div className={'auth-logo'}>
        <Logo />
      </div>
      <div className={'auth-container'}>
        <div className='d-flex align-items-center heading-container'>
          <Back />
          <div className={'heading-txt'}>
            <div className="text-sub-heading m-0 p-0 text-center">{'Register'}</div>
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
          placeholder={'Password'}
          onChange={password.onChange}
        />
        <InputPassword
          value={confirmPassword.value}
          placeholder={'Confirm Password'}
          onChange={confirmPassword.onChange}
        />

        <Button
          loading={loader.loader}
          block
          text={"Submit"}
          onClick={registerAsMemberApiHandler} />

        <div className="text-center font-size-md bottom-text">
          <span className="text-secondary font-weight-700"> {'Go back to'}</span>
          <span className="text-primary font-weight-700 pointer ml-1" onClick={goToLogin}> {'Login'}</span>
        </div>

      </div>
    </div>

  );
}

export { Register };
