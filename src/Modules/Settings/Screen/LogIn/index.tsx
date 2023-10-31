import { Button, Input, InputPassword, Logo, showToast } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { memberLoginUsingPassword, userLoginDetails } from "@Redux";
import { ROUTES } from "@Routes";
import { USER_TOKEN, ifObjectExist, getValidateError, validate, LOGIN_WITH_EMAIL_RULES } from "@Utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './index.css';

function Login() {

  const { goTo } = useNavigation();
  const dispatch = useDispatch();

  const password = useInput("");
  const email = useInput("");
  const loginLoader = useLoader(false);


  const enterPress = useKeyPress("Enter");
  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (enterPress) {
      loginApiHandler();
    }
  }, [enterPress]);


  const loginApiHandler = () => {
    //  loginLoader.show();

    const params = {
      ...(email.value && { email: email.value }),
      password: password.value,
    };

    console.log(JSON.stringify(params));

    const validation = validate(LOGIN_WITH_EMAIL_RULES, params)

    if (ifObjectExist(validation)) {

      loginLoader.show();

      dispatch(
        memberLoginUsingPassword({
          params,
          onSuccess: (response: any) => () => {
            const { details } = response;

            loginLoader.hide();

            if (response.success) {
              localStorage.setItem(USER_TOKEN, response.details.token);
              dispatch(
                userLoginDetails({
                  ...loginDetails,
                  isLoggedIn: true,
                  ...details,
                })
              );
              goTo(ROUTES["auth-module"].splash, true);
            } else {
              showToast(response.error_message, "error");
            }
          },
          onError: (error) => () => {
            loginLoader.hide();
            showToast(error.error_message, "error");
          },
        })
      );
    } else {
      showToast(getValidateError(validation))
    }


  };

  return (
    <div className="auth-screen">
      <div className="container-login">
        <Logo />
        <div className="text-sub-heading heading-text">Log in</div>
        <Input
          value={email.value}
          placeholder="Email"
          onChange={email.onChange}
        />
        <InputPassword
          value={password?.value}
          onChange={password.onChange}
        />
        <Button
          loading={loginLoader.loader}
          block
          text={"Log in"}
          onClick={loginApiHandler}
        />

        <h5 className={"forgot-password font-weight-700"}
          onClick={() => {
            goTo(ROUTES["auth-module"].forgotPassword);
          }}
        >
          Forgot password?
        </h5>

        <div className="text-center font-size-md register">
          <span className="text-secondary font-weight-700 pointer"> {"Not a member yet?"}</span>
          <span className="text-primary font-weight-700 pointer ml-1"> {"Register now "}</span>
        </div>
      </div>

    </div>
  );
}

export { Login };
