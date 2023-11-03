/* eslint-disable jsx-a11y/anchor-is-valid */
import { Back, Button, Divider, ImagePicker, Input, Logo, showToast } from "@Components";
import { useInput, useKeyPress, useLoader, useNavigation } from "@Hooks";
import { registerAsCompany } from "@Redux";
import { ROUTES } from "@Routes";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ifObjectExist, validate, getValidateError, REGISTER_RULES } from '@Utils'
import './index.css'

function RegisterCompany() {

    const { goTo } = useNavigation();


    const dispatch = useDispatch();

    const name = useInput("");
    const address = useInput("");
    const mobileNumber = useInput("");
    const pincode = useInput("");
    const loader = useLoader(false);
    const enterPress = useKeyPress("Enter");
    const fullName = useInput("")
    const email = useInput("")
    const sector = useInput("")
    const [photo, setPhoto] = useState("");

    useEffect(() => {
        if (enterPress) {
            registerAsCompanyApiHandler();
        }
    }, [enterPress]);



    const registerAsCompanyApiHandler = () => {

        const params = {
            name: name.value,
            mobile_number: mobileNumber.value,
            address: address.value,
            pincode: pincode.value,
            sector: sector.value,
            full_name: fullName.value,
            email: email.value
        };
        // const validation = validate(REGISTER_RULES, params)

        // if (ifObjectExist(validation)) {


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
        );
        // } else {
        //     showToast(getValidateError(validation))
        // }
    };

    function goToLogin() {
        goTo(ROUTES["auth-module"].login);
    }

    return (
        <div className={'auth-screen '}>

            <div className={'auth-container overflow-auto overflow-hidden'}>

                <div className='d-flex align-items-center heading-container'>
                    <Back />
                    <div className={'heading-txt'}>
                        <div className="text-sub-heading m-0 p-0 text-center">{'Register Company'}</div>
                    </div>
                </div>

                <div className=" pb-2">
                    <div className="row">
                        <ImagePicker
                            size='xl'
                            // heading={'Logo'}
                            noOfFileImagePickers={0}
                            onSelect={(image) => {
                                let file = image.toString().replace(/^data:(.*,)?/, "")
                                setPhoto(file);


                            }}
                            onSelectImagePicker={(el) => { }}
                        />
                    </div>
                </div>

                <div className={'text-default h4 mb-3'}>{'Company Details :'}</div>

                <Input
                    value={name?.value}
                    placeholder={'Name'}
                    onChange={name.onChange}
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
                    // maxLength={6}
                    onChange={pincode.onChange}
                    value={pincode.value}
                />
                <Input
                    value={sector?.value}
                    placeholder={'Name'}
                    onChange={sector.onChange}
                />

                {/* <Divider /> */}

                <div className={'text-default h4 mb-3'}>{'Primary Contact Person :'}</div>

                <Input
                    value={fullName?.value}
                    placeholder={'Name'}
                    onChange={fullName.onChange}
                />
                <Input
                    value={email?.value}
                    placeholder={'Address'}
                    onChange={email.onChange}
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
