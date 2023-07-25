import React, { useEffect, useState } from 'react';
import { Input, Card, Back, Button, CommonTable, showToast, Breadcrumbs } from '@Components';
import { useInput, useKeyPress, useLoader, useNavigation, useWindowDimensions } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_QUESTION_FORM_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { createQuestionForm } from '@Redux';
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
                            goTo(ROUTES['group-module']['questions'])
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

    function resetValues() {
        nameInput.set('')
        nameInput.set('')
    }
    return (
        <>
            <Breadcrumbs />
            <Card className="m-3" style={{ height: height - 30 }}>

                <hr className="mt-2"></hr>

                <div className="col-md-9 col-lg-5">
                    <Input heading={'Name'} value={nameInput.value} onChange={nameInput.onChange} />

                    <Input
                        heading={'Description'}
                        value={descriptionInput.value}
                        onChange={descriptionInput.onChange}
                    />

                </div>

                <div className="col mt-4">
                    <Button size={'md'} text={'Submit'} onClick={submitQuestionFormHandler} />
                </div>



            </Card></>
    );
}

export { CreateQuestionForm };