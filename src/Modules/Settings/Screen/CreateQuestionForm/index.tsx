import React, { useEffect, useState } from 'react';
import { Input, Card, Back, Button, CommonTable, showToast, Breadcrumbs, Divider, } from '@Components';
import { useInput, useKeyPress, useLoader, useModal, useNavigation, useWindowDimensions } from '@Hooks';
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_QUESTION_FORM_RULES, getValidateError, ifObjectExist, validate } from '@Utils';
import { createQuestionForm, generateForm } from '@Redux';
import { ROUTES } from '@Routes';
import { AnalyzingAnimation, GenerateModal } from '@Modules';


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
    const { goTo, } = useNavigation()
    const [dataGenerated, setDataGenerated] = useState(false);
    const generateJdModal = useModal(false);

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
            generateJdModal.show()
            setLoading(true)
            dispatch(
                generateForm({
                    params,
                    onSuccess: (response) => () => {
                        if (response.success) {
                            resetValues()
                            generateJdModal.hide()
                            showToast(response.message, "success");
                            goTo(ROUTES['designation-module']['questions'])
                        }
                    },
                    onError: (error) => () => {
                        showToast(error.error_message, 'error');
                        setLoading(false)
                        generateJdModal.hide()
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

            <Card className="m-3" style={{ height: height - 30 }}>

                <div className={'row pl-1'}>
                    <Back /><span className={'h3 pl-1'}> CREATE FORM</span>
                </div>
                <div className={'mx--4 '}>
                    <Divider space={'2'} />
                </div>

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

            </Card>

            <div className={'my--9'}>
                <GenerateModal isOpen={generateJdModal.visible} onClose={generateJdModal.hide}>
                    <AnalyzingAnimation />
                </GenerateModal>
            </div>

        </>
    );
}

export { CreateQuestionForm };
