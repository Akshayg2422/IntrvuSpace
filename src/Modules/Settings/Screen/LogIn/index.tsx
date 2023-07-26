import React from "react";
import { Input, Button, H, Logo, Radio, showToast, ComponentLoader } from "@Components";
import { translate } from "@I18n";
import { LANGUAGES, BUSINESS, validate, ifObjectExist, getValidateError } from "@Utils";
import { useInput, useNavigation, useLoader } from "@Hooks";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from '@Routes'



function Login() {

    const { goTo } = useNavigation()
    const name = useInput('')
    const mobileNumber = useInput('');
    const email = useInput('')
    const dispatch = useDispatch();
    const loginLoader = useLoader(false);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className="custom-gradient vh-100 d-flex justify-content-center align-items-center">
            <div className="col-sm-9 col-md-6 col-lg-4">
                <Logo />
                <div className="my-5">
                    <Input
                        heading={'Name'}
                        type={"text"}
                        onChange={name.onChange}
                        value={name.value}
                        onKeyDown={handleKeyDown}
                    />

                    <Input
                        heading={'Mobile Number'}
                        placeholder={"00000 00000"}
                        type={"number"}
                        onChange={mobileNumber.onChange}
                        value={mobileNumber.value}
                        maxLength={10}
                        onKeyDown={handleKeyDown}
                    />
                    <Input
                        heading={'Email'}
                        type={"text"}
                        onChange={email.onChange}
                        value={email.value}
                        onKeyDown={handleKeyDown}
                    />

                </div>

                <Button
                    className={'text-white'}
                    loading={loginLoader.loader}
                    block
                    text={'Submit'}
                    onClick={() => { }}
                />
            </div>
        </div>
    );
}

export { Login };
