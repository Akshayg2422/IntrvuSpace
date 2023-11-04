/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Divider, ImagePicker, Input, InputPassword, Logo, showToast } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { registerAsCompany } from "@Redux";
import { ROUTES } from "@Routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ifObjectExist, validate, getValidateError, REGISTER_COMPANY_RULES } from '@Utils'
import './index.css'

function RegisterCompany() {

    const { goTo } = useNavigation();
    const dispatch = useDispatch();
    const brandName = useInput("");
    const address = useInput("");
    const mobileNumber = useInput("");
    const pincode = useInput("");
    const loader = useLoader(false);
    const enterPress = useKeyPress("Enter");
    const firstName = useInput("")
    const email = useInput("")
    const sector = useInput("")
    const password = useInput("")
    const confirmPassword = useInput("")
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (enterPress) {
            registerAsCompanyApiHandler();
        }
    }, [enterPress]);

    const registerAsCompanyApiHandler = () => {

        const params = {
            logo: photo,
            brand_name: brandName.value,
            mobile_number: mobileNumber.value,
            communication_address: address.value,
            pincode: pincode.value,
            sector: sector.value,
            first_name: firstName.value,
            email: email.value,
            password: password.value,
        };
        console.log('Params:', params);

        const validation = validate(REGISTER_COMPANY_RULES, params)

        console.log('Validation:', validation);

        if (ifObjectExist(validation)) {
            if (password?.value === confirmPassword?.value) {
                loader.show();
                dispatch(
                    registerAsCompany({
                        params,
                        onSuccess: (response: any) => () => {
                            if (response.success) {
                                goTo(ROUTES["auth-module"].login);
                                showToast(response.message, "success");
                                loader.hide();
                            } else {
                                showToast(response.error_message, "error");
                            }
                        },
                        onError: (error) => () => {
                            loader.hide();
                            showToast(error.error_message, "error");
                        },
                    })
                )
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
        <div className={'auth-screen border border-primary'}>

            <div className={'auth-container'}>

                <div className='d-flex align-items-center heading-container'>
                    <Back />
                    <div className={'heading-txt'}>
                        <div className="text-sub-heading m-0 p-0 text-center">{'Register Company'}</div>
                    </div>
                </div>

                <div className="mb-2 row">
                    <ImagePicker
                        size='xl'
                        noOfFileImagePickers={0}
                        onSelect={(image) => {
                            let file = image.toString().replace(/^data:(.*,)?/, "")
                            setPhoto(file);
                        }}
                    />
                </div>

                <div className={'text-default h4 mb-3'}>{'Company Details :'}</div>

                <Input
                    value={brandName?.value}
                    placeholder={'Brand Name'}
                    onChange={brandName.onChange}
                />
                <Input
                    value={address?.value}
                    placeholder={'Address'}
                    onChange={address.onChange}
                />
                <Input
                    type={'number'}
                    placeholder={"Phone"}
                    maxLength={10}
                    onChange={mobileNumber.onChange}
                    value={mobileNumber.value}
                />
                <Input
                    type={'number'}
                    placeholder={"Pincode"}
                    onChange={pincode.onChange}
                    value={pincode.value}
                />
                <Input
                    value={sector?.value}
                    placeholder={'Sector'}
                    onChange={sector.onChange}
                />

                <Divider />

                <div className={'text-default h4 mb-3'}>{'Primary Contact Person :'}</div>

                <Input
                    value={firstName?.value}
                    placeholder={'Name'}
                    onChange={firstName.onChange}
                />
                <Input
                    value={email?.value}
                    placeholder={'Email'}
                    onChange={email.onChange}
                />

                <InputPassword
                    value={password.value}
                    placeholder={'Enter your password'}
                    onChange={password.onChange}
                />
                <InputPassword
                    value={confirmPassword.value}
                    placeholder={'Confirm your password'}
                    onChange={confirmPassword.onChange}
                />

                <Button
                    className={'rounded-sm'}
                    loading={loader.loader}
                    block
                    text={"Submit"}
                    onClick={registerAsCompanyApiHandler} />

                <div className="text-center font-size-md bottom-text">
                    <span className="text-secondary font-weight-700"> {'Go back to'}</span>
                    <span className="text-primary font-weight-700 pointer ml-1" onClick={goToLogin}> {'Login'}</span>
                </div>

            </div>
        </div>

    );
}

export { RegisterCompany };
