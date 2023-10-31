import { Button, Image, showToast, InputPassword } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { memberLoginUsingPassword, userLoginDetails } from "@Redux";
import { ROUTES } from "@Routes";
import { USER_TOKEN } from "@Utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginSideContent } from "../../Container";
import { icons } from "@Assets";
import classnames from "classnames";
import {
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

function Login() {
  const { goTo } = useNavigation();
  const dispatch = useDispatch();
  const password = useInput("");
  const mobileNumber = useInput("");
  const email = useInput("");
  const loginLoader = useLoader(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toggleInput, setToggleInput] = useState(false);
  const [loginWithOtp, setLoginWithOtp] = useState(false);

  const enterPress = useKeyPress("Enter");
  const { loginDetails } = useSelector((state: any) => state.AppReducer);

  useEffect(() => {
    if (enterPress) {
      onSubmit();
    }
  }, [enterPress]);

  const reset = () => {
    password.set("");
    mobileNumber.set("");
    email.set("");
  };

  const onSubmit = () => {
    if (loginWithOtp === false) {
      if (email.value.length === 0) {
        showToast("Email ID  Cannot be empty", "error");
      } else if (password.value.length === 0) {
        showToast("Password  Cannot be empty", "error");
      } else {
        memberLoginHandler();
      }
    } else {
      if (mobileNumber.value.length === 0) {
        showToast("Mobile Number  Cannot be empty", "error");
      } else {
        memberLoginHandler();
      }
    }
  };

  const memberLoginHandler = () => {
    loginLoader.show();
    const params = {
      ...(email.value && { email: email.value }),
      password: password.value,
    };

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
  };

  return (
    <>

      <div className="row  m-0 p-0 h-100vh">
        <div className="col-xl-12 d-flex bg-white align-items-center justify-content-center  my-sm-0 my-4">
          <div className="col-12 col-md-6 col-lg-4  text-center align-items-center">
            <div className="mb--2">
              <div className="">
                <Image src={icons.logoText} height={22} />
              </div>
              <div className="pt-4">
                <span
                  className="text-secondary"
                  style={{ fontSize: 22, fontWeight: 800 }}
                >
                  Log in
                </span>
              </div>
            </div>
            <div
              className="pt-2 mx-md-3 mx-0">
              <div>
                <Input
                  value={email.value}
                  placeholder="Email"
                  onChange={email.onChange}
                />
              </div>
              <div>
                <InputPassword />
              </div>
              <div className="pt-2">
                <Button
                  loading={loginLoader.loader}
                  block
                  text={"Log in"}
                  onClick={() => onSubmit()}
                />
              </div>

              <div className="pt-4">
                <span
                  className="text-primary pointer"
                  style={{ fontWeight: 800, fontSize: 14 }}
                  onClick={() => {
                    goTo(ROUTES["auth-module"].forgotPassword);
                  }}
                >
                  Forgot password?
                </span>
              </div>
              <div className="" style={{ paddingTop: 35 }}>
                <b
                  className="font-weight-900 display-5 text-secondary mt-0"
                  style={{ fontSize: 17 }}
                >
                  Not a member yet?{" "}
                  <a
                    className="text-primary pointer pl-1"
                    onClick={() => {
                      goTo(ROUTES["auth-module"].register);
                    }}
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    <b> Register now</b>
                  </a>
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Login };
