import React, { useEffect, useState } from 'react';
import { Input, Card, Back, Button, CommonTable, showToast, Breadcrumbs, } from '@Components';
import { useInput, useKeyPress, useLoader, useNavigation, useWindowDimensions } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_QUESTION_FORM_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { createQuestionForm, generateForm } from '@Redux';
import { ROUTES } from '@Routes';


type Task = {
    name: string;
    description: string;
};

function CreateQuestionForm() {
    const { height } = useWindowDimensions()
    const nameInput = useInput('');
    const descriptionInput = useInput('');
    const isEnterPressed = useKeyPress("Enter");
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
    const loginLoader = useLoader(false);
    const { goBack } = useNavigation();
    const { selectedRole, questions } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation()
    const [dataGenerated, setDataGenerated] = useState(false);

    useEffect(() => {
        if (dataGenerated) {
            goTo(ROUTES['group-module']['questions']);
            showToast("Data generation completed!", "success");
        }
    }, [dataGenerated]);

    useEffect(() => {
        if (isEnterPressed) {
            submitQuestionFormHandler()
        }
    }, [isEnterPressed]);

    const submitQuestionFormHandler = () => {

        const params = {
            name: nameInput?.value,
            description: descriptionInput?.value,
            knowledge_group_variant_id: selectedRole?.id
        }
        const validation = validate(CREATE_QUESTION_FORM_RULES, params)

        console.log(JSON.stringify(validation));

        if (ifObjectExist(validation)) {
            loginLoader.show()
            setLoading(true)
            dispatch(
                createQuestionForm({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            resetValues()
                            loginLoader.hide()
                            goTo(ROUTES['designation-module']['questions'])
                            showToast(response.message, "success");
                        }
                        setLoading(false)

                    },
                    onError: (error) => () => {
                        showToast(error.error_message);
                        setLoading(false)

                        loginLoader.hide()
                    },
                })
            );
        } else {
            showToast(getValidateError(validation));
        }
    }

    function proceedGenerateFormApiHandler() {

        const params = {
            name: nameInput?.value,
            description: descriptionInput?.value,
            knowledge_group_variant_id: selectedRole?.id
        }

        loginLoader.show()
        setLoading(true)
        dispatch(
            generateForm({
                params,
                onSuccess: (response) => () => {
                    if (response.success) {
                        resetValues()
                        loginLoader.hide()
                        goTo(ROUTES['group-module']['analyzing-animation']);
                        if (response.dataGenerationCompleted) {
                            setDataGenerated(true);
                        }
                        showToast(response.message, "success");
                    }
                },
                onError: (error) => () => {
                    showToast(error.error_message);
                    setLoading(false)
                    loginLoader.hide()
                },
            })
        );

    }

    function resetValues() {
        nameInput.set('')
        descriptionInput.set('')
    }
    return (
        <>

            <Card className="m-3" style={{ height: height - 30 }}>
                <h3>CREATE FORM</h3>
                <hr className="mt-2"></hr>

                <div className="col-md-9 col-lg-5">
                    <Input heading={'Name'} value={nameInput.value} onChange={nameInput.onChange} />

                    <Input
                        heading={'Description'}
                        value={descriptionInput.value}
                        onChange={descriptionInput.onChange}
                    />

                    <div className={'row '}>
                        <div className={'col'}>
                            <Button className={'text-white'} size={'md'} text={'Add Manually'} onClick={submitQuestionFormHandler} />
                        </div>

                        <div className={'col'}>
                            <Button className={'text-white'} size={'md'} text={'Generate'} onClick={proceedGenerateFormApiHandler} />
                        </div>
                    </div>

                </div>

            </Card></>
    );
}

export { CreateQuestionForm };
