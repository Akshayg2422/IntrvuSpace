
import { Button, Divider, Modal, Input, Card, showToast } from '@Components';
import { useModal, useNavigation, useInput, useLoader } from '@Hooks';
import { generateForm, getQuestionForm, setSelectedQuestionForm } from '@Redux';
import { ROUTES } from '@Routes';
import { capitalizeFirstLetter } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnalyzingAnimation } from '../../Container';



function Questions() {

    const { goTo } = useNavigation();
    const dispatch = useDispatch()

    const addGenerateFormModal = useModal(false);

    const { selectedRole, questions } = useSelector((state: any) => state.DashboardReducer)
    const name = useInput('');
    const description = useInput('');
    const [dataGenerated, setDataGenerated] = useState(false);


    useEffect(() => {
        getQuestionsFormApi()
    }, [])


    const loader = useLoader(false);


    const getQuestionsFormApi = () => {
        const params = {
            knowledge_group_variant_id: selectedRole?.id
        };

        dispatch(
            getQuestionForm({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );
    }


    function proceedGenerateFormApiHandler() {

        const params = {
            name: name.value,
            description: description.value,
            knowledge_group_variant_id: selectedRole?.id
        }
        setDataGenerated(true)

        dispatch(
            generateForm({
                params,
                onSuccess: () => (response) => {
                    goTo(ROUTES['designation-module']['questions'])
                    resetValues()
                    showToast(response.message, 'success')
                    setDataGenerated(false)

                },
                onError: () => (error) => {
                    showToast(error.error_message)
                    setDataGenerated(false)
                },
            })
        );

    }

    function resetValues() {
        name.set('')
        description.set('')
    }

    return (
        <>
            <div className='m-3'>
                <div className='col text-right ml-3'>

                    <Button
                        text={'Generate using AI'}
                        className="text-white"
                        onClick={addGenerateFormModal.show}
                    />

                    <Button
                        text={'Generate by User'}
                        className="text-white"
                        onClick={() => {
                            goTo(ROUTES['designation-module']['create-question-form'])
                        }}
                    />
                </div>

                <div className='row mt-3'>
                    {
                        questions && questions.length > 0 && questions?.map((item: any) => {
                            const { id, name, description } = item;
                            return (
                                <div className='col-4' key={id}>
                                    <Card className='card justify-content-center '
                                        onClick={() => {
                                            goTo(ROUTES['designation-module']['question-sections'])
                                            dispatch(setSelectedQuestionForm(item))
                                        }} >
                                        <h4 className='mb-0 pointer mt--2'>{name}</h4>
                                        <div className={'mx--4'}><Divider space={'3'} /></div>
                                        <small className='mb-0 pointer'>{description}</small>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>

            </div >

            {dataGenerated ? <AnalyzingAnimation /> :
                <Modal title={'Generate Form'} isOpen={addGenerateFormModal.visible} onClose={addGenerateFormModal.hide}>
                    <Input className={'col-6'} heading={'Name'} value={name.value} onChange={name.onChange} />
                    <Input className={'col-6'} heading={'Description'} value={description.value} onChange={description.onChange} />
                    <Button text={'Submit'} onClick={proceedGenerateFormApiHandler} />
                </Modal>
            }
        </>
    )
}

export { Questions };
