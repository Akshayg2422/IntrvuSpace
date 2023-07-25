
import { Button, Divider, Modal, Input } from '@Components';
import { useModal, useNavigation, useInput, useLoader } from '@Hooks';
import { generateForm, getQuestionForm, setSelectedQuestionForm } from '@Redux';
import { ROUTES } from '@Routes';
import { capitalizeFirstLetter } from '@Utils';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



function Questions() {

    const { goTo } = useNavigation();
    const dispatch = useDispatch()

    const addGenerateFormModal = useModal(false);

    const { selectedRole, questions } = useSelector((state: any) => state.DashboardReducer)
    const name = useInput('');


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
            form_name: name.value,
            group_variant_id: selectedRole?.id
        }


        dispatch(
            generateForm({
                params,
                onSuccess: () => () => {
                },
                onError: () => () => {
                },
            })
        );

    }
console.log('1111111111111111111111111111',JSON.stringify(questions))

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
                                    <div className='card justify-content-center p-3'
                                        onClick={() => {
                                            goTo(ROUTES['group-module']['question-sections'])
                                            dispatch(setSelectedQuestionForm(item))
                                        }} >
                                        <h4 className='mb-0 pointer'>{name}</h4>
                                        <div className={'mx--3'}><Divider space={'3'} /></div>
                                        <small className='mb-0 pointer'>{description}</small>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div >
            <Modal title={'Generate Form'} isOpen={addGenerateFormModal.visible} onClose={addGenerateFormModal.hide}>
                <Input className={'col-6'} heading={'Name'} value={name.value} onChange={name.onChange} />
                <Button text={'Submit'} onClick={proceedGenerateFormApiHandler} />
            </Modal>
        </>
    )
}

export { Questions };
