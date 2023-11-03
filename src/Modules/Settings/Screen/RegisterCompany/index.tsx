/* eslint-disable jsx-a11y/anchor-is-valid */
import { Divider, Button, showToast, Image, Input } from "@Components";
import React, { useEffect, useState } from "react";
import { LoginSideContent } from "../../Container";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { ROUTES } from "@Routes";
import { useDispatch } from "react-redux";
import { registerAsMember, settingRegisterData } from "@Redux";
import {
    REGISTER_AS_MEMBER_RULES,
    getValidateError,
    ifObjectExist,
    validate,
} from "@Utils";
import { icons } from "@Assets";

function RegisterCompany() {
    const { goTo, goBack } = useNavigation();
    const dispatch = useDispatch();
    const password = useInput("");
    const lastName = useInput("");
    const mobileNumber = useInput("");
    const email = useInput("");
    const confirmPassword = useInput("");
    const firstName = useInput("");
    const loginLoader = useLoader(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [toggleInput, setToggleInput] = useState(0);
    const enterPress = useKeyPress("Enter");

    useEffect(() => {
        if (enterPress) {
            onSubmit();
        }
    }, [enterPress]);

    function validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        return null;
    }

    const isValidEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const mobileNumberPattern = /^\d{10}$/; // Matches a 10-digit number

    const onSubmit = () => {
        if (firstName.value === "") {
            showToast("First Name Cannot be empty", "error");
        } else if (firstName.value.length < 3) {
            showToast("First Name minimum 3 characters", "error");
        } else if (email.value.length === 0) {
            showToast("Email ID  Cannot be empty", "error");
        } else if (!isValidEmail(email.value)) {
            showToast('Please enter a valid email address', 'error');
        } else if (mobileNumber.value.length === 0) {
            showToast("Mobile Number Cannot be empty", "error");
        } else if (!mobileNumberPattern.test(mobileNumber.value)) {
            showToast("Mobile Number should be a valid 10-digit number", "error");
        } else if (password.value.length === 0) {
            showToast("Password Cannot be empty", "error");
        } else if (password.value.length < 8) {
            showToast("Password must be at least 8 characters long", "error");
        } else if (confirmPassword.value.length === 0) {
            showToast("Confirm Password Cannot be empty", "error");
        } else if (password.value !== confirmPassword.value) {
            showToast("Passwords do not match", "error");
        } else {
            registerAsMemberHandler();
        }
    };

    const registerAsMemberHandler = () => {
        loginLoader.show();

        const params = {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            mobile_number: mobileNumber.value,
            password: password.value,
        };

        dispatch(
            registerAsMember({
                params,
                onSuccess: (response: any) => () => {
                    if (response.success) {
                        dispatch(settingRegisterData(params));
                        goTo(ROUTES["auth-module"].login);
                        showToast(response.message, "success");
                        loginLoader.hide();
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
            <div className="row m-0 p-0 bg-white h-100vh">
                <div className="mt-3 ml-lg-7 ml-3">
                    <Image src={icons.logoText} height={22} />
                </div>
                <div className="col-xl-12 d-flex justify-content-center align-items-center ">
                    <div className="col-12 col-md-6 col-lg-4 text-center align-items-center">
                        <div className="">
                            <h1
                                className="text-secondary"
                                style={{ fontSize: 22, fontWeight: 800 }}
                            >
                                Register Company
                            </h1>
                        </div>
                        <div
                            className="mx-md-3 mx-0"
                            style={{
                                // zoom: "80%",
                                marginTop: -33,
                                scale: "0.9",
                            }}
                        >
                            <div>

                                <div className="py-4">
                                    <div className="input-group">
                                        <input
                                            className="form-control rounded-sm"
                                            placeholder="Full Name"
                                            onChange={firstName.onChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="input-group mb-4">
                                        <input
                                            className="form-control rounded-sm"
                                            placeholder="Email"
                                            onChange={email.onChange}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="">
                                        <Input
                                            type="number"
                                            className="form-control rounded-sm"
                                            placeholder="Phone"
                                            onChange={mobileNumber.onChange}
                                            value={mobileNumber.value}
                                            maxLength={10}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 mb-sm-0 mb-2">
                                <Button
                                    className={
                                        "text-white bg-primary font-weight-bold py-3 border-0"
                                    }
                                    loading={loginLoader.loader}
                                    block
                                    size="lg"
                                    text={"Submit"}
                                    onClick={() => {
                                        onSubmit();
                                    }}
                                    style={{ borderRadius: 4, fontSize: 15 }}
                                />
                            </div>
                            <div className="" style={{ paddingTop: 35 }}>
                                <b
                                    className="font-weight-900 display-5 text-secondary mt-0"
                                    style={{ fontSize: 17 }}
                                >
                                    Go back to{" "}
                                    <a
                                        className="text-primary pointer pl-1"
                                        onClick={() => {
                                            goTo(ROUTES["auth-module"].login);
                                        }}
                                        style={{
                                            fontSize: "17px",
                                        }}
                                    >
                                        <b>Login</b>
                                    </a>
                                </b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </>
    );
}

export { RegisterCompany };
