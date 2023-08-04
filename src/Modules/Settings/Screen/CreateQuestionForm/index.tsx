import React, { useEffect, useState } from 'react';
import { Input, Card, Back, Button, CommonTable, showToast, Breadcrumbs, } from '@Components';
import { useInput, useKeyPress, useLoader, useNavigation, useWindowDimensions } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_QUESTION_FORM_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { createQuestionForm, generateForm } from '@Redux';
import { ROUTES } from '@Routes';
import { AnalyzingAnimation } from '../../Container';


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
    const addManualLoader = useLoader(false);
    const generateLoader = useLoader(false)
    const { selectedRole, questions } = useSelector((state: any) => state.DashboardReducer)
    const { goTo } = useNavigation()
    const [dataGenerated, setDataGenerated] = useState(false);

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
            addManualLoader.show()
            setLoading(true)
            dispatch(
                createQuestionForm({
                    params,
                    onSuccess: (response: any) => () => {
                        if (response.success) {
                            resetValues()
                            addManualLoader.hide()
                            goTo(ROUTES['designation-module']['questions'])
                            showToast(response.message, "success");
                        }
                        setLoading(false)

                    },
                    onError: (error) => () => {
                        showToast(error.error_message, 'error');
                        setLoading(false)

                        addManualLoader.hide()
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
        const validation = validate(CREATE_QUESTION_FORM_RULES, params)
        if (ifObjectExist(validation)) {
            generateLoader.show()
            setDataGenerated(true)
            setLoading(true)
            dispatch(
                generateForm({
                    params,
                    onSuccess: (response) => () => {
                        if (response.success) {
                            resetValues()
                            generateLoader.hide()
                            showToast(response.message, "success");
                            setDataGenerated(false)
                            goTo(ROUTES['designation-module']['questions'])
                        }
                    },
                    onError: (error) => () => {
                        showToast(error.error_message, 'error');
                        setLoading(false)
                        generateLoader.hide()
                        setDataGenerated(false)
                    },
                })
            )
        } else {
            showToast(getValidateError(validation))
        }

    }

    function resetValues() {
        nameInput.set('')
        descriptionInput.set('')
    }
    return (
        <>

            {!dataGenerated && <Card className="m-3" style={{ height: height - 30 }}>
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
                            <Button className={'text-white'} loading={addManualLoader.loader} size={'md'} text={'Add Manually'} onClick={submitQuestionFormHandler} />
                        </div>

                        <div className={'col'}>
                            <Button className={'text-white'} loading={generateLoader.loader} size={'md'} text={'Generate'} onClick={proceedGenerateFormApiHandler} />
                        </div>
                    </div>

                </div>

            </Card>}
            {dataGenerated && <AnalyzingAnimation />}
        </>
    );
}

export { CreateQuestionForm };
