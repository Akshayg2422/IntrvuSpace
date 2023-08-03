
import { Button, Divider, Modal, Input, Card, showToast } from '@Components';
import { useModal, useNavigation, useInput, useLoader, useWindowDimensions } from '@Hooks';
import { generateForm, getQuestionForm, setSelectedQuestionForm } from '@Redux';
import { ROUTES } from '@Routes';
import { capitalizeFirstLetter } from '@Utils';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnalyzingAnimation } from '../../Container';



function Questions() {

    const { goTo, goBack } = useNavigation();
    const dispatch = useDispatch()
    const addGenerateFormModal = useModal(false);
    const { selectedRole, questions } = useSelector((state: any) => state.DashboardReducer)
    const name = useInput('');
    const description = useInput('');
    const [dataGenerated, setDateGenerated] = useState(false)
    const { height } = useWindowDimensions()
    console.log('dataGenerated-------->', dataGenerated)


    useEffect(() => {
        getQuestionsFormApi()
    }, [])



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
        setDateGenerated(true)
        addGenerateFormModal.hide()

        const params = {
            name: name.value,
            description: description.value,
            knowledge_group_variant_id: selectedRole?.id
        }

        dispatch(
            generateForm({
                params,
                onSuccess: () => (response) => {
                    setDateGenerated(false)
                    resetValues()
                    showToast(response.message, 'success')
                    // goTo(ROUTES['designation-module']['questions'])
                },
                onError: () => (error) => {
                    setDateGenerated(false)
                    showToast(error.error_message, 'error')
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
            <span className='pointer ml-3 text-black h3 '
                onClick={() => { goBack() }}
            >
                <i className="bi bi-arrow-left text-black fa-lg font-weight-bolder pr-1"></i>  Past
            </span>
            {
                dataGenerated ? null :
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

                        <div className='row mt-3 px-1'>
                            {
                                questions && questions.length > 0 && questions?.map((item: any) => {
                                    const { id, name, description } = item;
                                    return (
                                        <div className='col-4 px-2 mb--3 pb-1' key={id}>
                                            <Card className='shadow-none justify-content-center overflow-auto overflow-hide '
                                                style={{ height: height - 280 }}
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
            }


            <Modal title={'Generate Form'} isOpen={addGenerateFormModal.visible} onClose={addGenerateFormModal.hide}>
                <Input className={'col-6'} heading={'Name'} value={name.value} onChange={name.onChange} />
                <Input className={'col-6'} heading={'Description'} value={description.value} onChange={description.onChange} />
                <Button text={'Submit'} onClick={proceedGenerateFormApiHandler} />
            </Modal>
            {dataGenerated && <AnalyzingAnimation />}
        </>
    )
}

export { Questions };
