import { Button, Image, Input, showToast } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { fetchEmailVerify, memberLoginUsingPassword, userLoginDetails } from "@Redux";
import { ROUTES } from "@Routes";
import { USER_TOKEN } from "@Utils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginSideContent } from "../../Container";
import { icons } from "@Assets";

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
  const myButton = document.getElementById("myButton");



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
            if(!details?.is_email_verified){
              dispatch(
                fetchEmailVerify(
                  {
                        ...loginDetails,
                        isLoggedIn: true,
                        ...(email.value && { email: email.value }),
                        ...details,

                      }
                )
              )
              goTo(ROUTES["auth-module"]['verify-email']);
            }
            else{
              
              dispatch(
                userLoginDetails({
                  ...loginDetails,
                  isLoggedIn: true,
                  ...details,
                })
              );
              goTo(ROUTES["auth-module"].splash, true);
            }
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
              className="pt-2 mx-md-3 mx-0"
              style={{
                scale: "0.9",
              }}
            >
              <div>
                <Input
                  className="form-control"
                  value={email.value}
                  placeholder="Email"
                  onChange={email.onChange}
                />
              </div>
              <div>
                <div className="input-group mb-3">
                  <input
                    style={{
                      borderRight: 0,
                      borderRadius: '4px 0 0 4px',
                      borderColor: toggleInput ? "#673de6" : "#d0d0d0"
                    }}
                    value={password.value}
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    onFocus={() => {
                      setToggleInput(true);
                    }}
                    onBlur={() => {
                      setToggleInput(false);
                    }}
                    onChange={password.onChange}
                  />
                  <span
                    className="input-group-text"
                    id="basic-addon2"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      borderLeft: 0,
                      borderRadius: '0 4px 4px 0',
                      borderColor: toggleInput ? "#673de6" : "#d0d0d0",
                    }}
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <i
                        className="bi bi-eye-fill text-default mt--1"
                        style={{
                          fontSize: "20px",
                          marginBottom: "-5px",
                        }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-eye-slash-fill text-default mt--1 pb-0"
                        style={{
                          fontSize: "20px",
                          marginBottom: "-5px",
                        }}
                      ></i>
                    )}
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <Button
                  className={"text-white font-weight-bold py-3 bg-primary rounded-sm"}
                  loading={loginLoader.loader}
                  block
                  size="md"
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
                  <div
                    className="text-primary pointer pl-1"
                    onClick={() => {
                      goTo(ROUTES['auth-module']['register-company']);
                    }}
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    <b> Register now</b>
                  </div>
                  <div
                    className="text-primary pointer"
                    onClick={() => {
                      goTo(ROUTES["auth-module"].register);
                    }}
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    <b> Register as student</b>
                  </div>
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
